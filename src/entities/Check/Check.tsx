import React from "react";
import styles from "./Check.module.css";
import PendingIcon from "./_i/pending.svg?react";
import SuccessIcon from "./_i/done.svg?react";
import ErrorIcon from "./_i/attention.svg?react";

export interface ICheck {
  status: "pending" | "success" | "error";
  title: string;
  date: string;
  amount?: number;
}

export const Check: React.FC<ICheck> = ({ amount, date, status, title }) => {
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <h5>{title}</h5>

        <p>
          <span>{date}</span>
          {amount && <span>Сумма покупки: {amount} ₽</span>}
        </p>
      </div>
      <div className={styles.icon}>
        {status === "pending" ? (
          <PendingIcon />
        ) : status === "success" ? (
          <SuccessIcon />
        ) : (
          <ErrorIcon />
        )}
      </div>
    </li>
  );
};
