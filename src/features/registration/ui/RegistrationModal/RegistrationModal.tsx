import { useState } from "react";
import { Button, Modal, Input, Checkbox } from "@shared/ui";
import { useAppDispatch, useAppSelector } from "@app/providers/store";
import { getApiErrorMessage } from "@shared/api";
import { setUser } from "@entities/user";
import { selectRulesLink, selectPdLink } from "@entities/service-data";
import { selectRegistrationOpen } from "../../model/selectors";
import { closeRegistration } from "../../model/slice";
import { registrationRequest, login } from "../../api";
import { formatPhone, isPhoneComplete, toMsisdn } from "../../lib/formatPhone";
import styles from "./RegistrationModal.module.css";

type Mode = "phone" | "confirm" | "login";

const PROMO_TEXT =
  "Регистрируйся, сканируй чеки, накапливай бонусы и обменивай на подарки! Введите номер телефона, и мы отправим вам код";

export const RegistrationModal = () => {
  const isOpen = useAppSelector(selectRegistrationOpen);
  const rulesLink = useAppSelector(selectRulesLink);
  const pdLink = useAppSelector(selectPdLink);
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<Mode>("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [agreeRules, setAgreeRules] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setMode("phone");
    setName("");
    setPhone("");
    setCode("");
    setAgreeRules(false);
    setAgreePrivacy(false);
    setError(null);
    setLoading(false);
  };

  const handleClose = () => {
    dispatch(closeRegistration());
    resetForm();
  };

  const subtitle =
    mode === "phone"
      ? PROMO_TEXT
      : phone
        ? `На номер телефона ${phone} был отправлен код`
        : "Введите код, отправленный вам в SMS";

  const primaryLabel = mode === "login" ? "Войти" : "Зарегистрироваться";
  const secondaryLabel =
    mode === "login" ? "Зарегистрироваться" : "У меня уже есть код";

  const doLogin = async () => {
    const res = await login({ msisdn: toMsisdn(phone), password: code.trim() });
    dispatch(
      setUser({
        auth_key: res.auth_key,
        user_id: res.user_id,
        fullname: res.fullname,
        email: res.email,
        msisdn: toMsisdn(phone),
      }),
    );
    handleClose();
  };

  const handlePrimary = async () => {
    setError(null);

    if (mode === "phone") {
      if (!isPhoneComplete(phone)) {
        setError("Введите корректный номер телефона");
        return;
      }
      setLoading(true);
      try {
        await registrationRequest({
          msisdn: toMsisdn(phone),
          fullname: name.trim() || undefined,
        });
        setCode("");
        setMode("confirm");
      } catch (e) {
        setError(getApiErrorMessage(e));
      } finally {
        setLoading(false);
      }
      return;
    }

    // confirm / login — вход по коду
    if (!code.trim()) {
      setError("Введите код из SMS");
      return;
    }
    setLoading(true);
    try {
      await doLogin();
    } catch (e) {
      setError(getApiErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const handleSecondary = () => {
    setError(null);
    // Переход к входу по коду возможен только с введённым номером телефона.
    if (mode === "phone" && !isPhoneComplete(phone)) {
      setError("Введите номер телефона");
      return;
    }
    setMode(mode === "login" ? "phone" : "login");
  };

  const primaryDisabled =
    loading || (mode === "confirm" && !(agreeRules && agreePrivacy));

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles.modal}>
      <h2 className={styles.title}>Регистрация</h2>
      <p className={styles.subtitle}>{subtitle}</p>

      <div className={styles.fields}>
        {mode === "phone" && (
          <>
            <Input
              placeholder="ваше имя"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              placeholder="телефон"
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
          </>
        )}

        {(mode === "confirm" || mode === "login") && (
          <Input
            center
            placeholder="Введите код"
            inputMode="numeric"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        )}
      </div>

      {mode === "confirm" && (
        <div className={styles.checkboxes}>
          <Checkbox checked={agreeRules} onChange={setAgreeRules}>
            Согласен с{" "}
            <a
              href={rulesLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              правилами акции
            </a>
          </Checkbox>
          <Checkbox checked={agreePrivacy} onChange={setAgreePrivacy}>
            Ознакомлен с{" "}
            <a
              href={pdLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              политикой персональных данных
            </a>
          </Checkbox>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <Button
          variant="primary"
          fullWidth
          onClick={handlePrimary}
          disabled={primaryDisabled}
        >
          {loading ? "Подождите…" : primaryLabel}
        </Button>
        <button
          type="button"
          className={styles.textButton}
          onClick={handleSecondary}
          disabled={loading}
        >
          {secondaryLabel}
        </button>
      </div>
    </Modal>
  );
};
