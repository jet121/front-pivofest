import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyChecks.module.css";
import { Check, type ICheck } from "@entities/Check";
import { Button } from "@shared/ui";
import { getApiErrorMessage } from "@shared/api";
import { ROUTES } from "@shared/config/routes";
import { useAppDispatch, useAppSelector } from "@app/providers/store";
import { selectAuth } from "@entities/user";
import { openRegistration } from "@features/registration";
import { getTransactions, type Transaction } from "./api";

const mapStatus = (transaction: Transaction): ICheck["status"] => {
  const status = transaction.status?.toLowerCase() ?? "";
  if (["pending", "moderation", "new", "wait"].some((s) => status.includes(s))) {
    return "pending";
  }
  if (
    ["error", "declined", "reject", "invalid"].some((s) => status.includes(s))
  ) {
    return "error";
  }
  return "success";
};

const formatDate = (value: string): string => {
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const mapToCheck = (transaction: Transaction): ICheck => ({
  status: mapStatus(transaction),
  title:
    transaction.title ??
    transaction.event?.title ??
    transaction.place?.title ??
    transaction.bonus?.title ??
    "Чек",
  date: formatDate(transaction.created),
  amount: transaction.tr_value > 0 ? transaction.tr_value : undefined,
});

export const MyChecks = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [checks, setChecks] = useState<ICheck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) return;
    let active = true;
    setLoading(true);
    setError(null);
    getTransactions({ auth_key: auth.auth_key, user_id: auth.user_id })
      .then((list) => {
        if (active) setChecks(list.map(mapToCheck));
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

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Мои чеки</h2>

      {!auth ? (
        <p className={styles.hint}>
          Войдите, чтобы увидеть свои чеки.{" "}
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
      ) : checks.length === 0 ? (
        <p className={styles.hint}>Пока нет загруженных чеков.</p>
      ) : (
        <ul className={styles.list}>
          {checks.map((check, index) => (
            <Check key={index} {...check} />
          ))}
        </ul>
      )}

      <div className={styles.actions}>
        <Button
          variant="primary"
          onClick={() => navigate(ROUTES.RECEIPT_SCAN_PREVIEW)}
        >
          ЗАРЕГИСТРИРОВАТЬ ЧЕК
        </Button>
        <Button variant="red" onClick={() => navigate(ROUTES.PROMO_CODES)}>
          СМОТРЕТЬ ПРОМОКОДЫ
        </Button>
      </div>
    </section>
  );
};
