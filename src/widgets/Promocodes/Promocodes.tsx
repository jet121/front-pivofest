import { useEffect, useState } from "react";
import styles from "./Promocodes.module.css";
import { Button } from "@shared/ui";
import CopyIcon from "@shared/assets/icons/copy.svg?react";
import { Link } from "react-router-dom";
import { getApiErrorMessage } from "@shared/api";
import { ROUTES } from "@shared/config/routes";
import { EXTERNAL_LINKS, openExternal } from "@shared/config/links";
import { useAppDispatch, useAppSelector } from "@app/providers/store";
import { selectAuth } from "@entities/user";
import { openRegistration } from "@features/registration";
import { getBonuses, type Bonus } from "./api";

const getCode = (bonus: Bonus): string =>
  bonus.code ?? bonus.tr_num ?? bonus.title;

export const Promocodes = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) return;
    let active = true;
    setLoading(true);
    setError(null);
    getBonuses({ auth_key: auth.auth_key, user_id: auth.user_id, activated: 1 })
      .then((list) => {
        if (active) setBonuses(list);
      })
      .catch((e) => {
        if (active) setError(getApiErrorMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [auth]);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      window.setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      setCopiedCode(null);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>ВАШИ ПРОМОКОДЫ НА СКИДКУ</h2>

      <h4 className={styles.subtitle}>
        20<span className={styles.purcent}>%</span>
        <span className={styles.orange}>на фестиваль</span>
        <span className={styles.green}>09.08.2026</span>
      </h4>

      {!auth ? (
        <p className={styles.hint}>
          Войдите, чтобы увидеть свои промокоды.{" "}
          <button
            type="button"
            className={styles.link}
            onClick={() => dispatch(openRegistration())}
          >
            Войти
          </button>
        </p>
      ) : loading ? (
        <p className={styles.hint}>Загрузка…</p>
      ) : error ? (
        <p className={styles.hint}>{error}</p>
      ) : bonuses.length === 0 ? (
        <p className={styles.hint}>Пока нет активных промокодов.</p>
      ) : (
        <ul className={styles.list}>
          {bonuses.map((bonus) => {
            const code = getCode(bonus);
            return (
              <li key={bonus.id}>
                <button
                  type="button"
                  className={styles.item}
                  onClick={() => handleCopy(code)}
                >
                  <span>{code}</span>
                  <span className={styles.copyHint}>
                    {copiedCode === code ? "Скопировано" : <CopyIcon />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Button
        className={styles.button}
        variant="primary"
        onClick={() => openExternal(EXTERNAL_LINKS.TICKET)}
      >
        Купить билет со скидкой
      </Button>

      <div className={styles.text}>
        Каждую неделю выбираем промокоды, обладатели которых получат бесплатные
        билеты.
        <Link to={ROUTES.WINNERS}>Смотреть победителей розыгрышей</Link>
      </div>
    </section>
  );
};
