import { Button } from "@shared/ui";
import { useAppDispatch } from "@app/providers/store";
import { confirmAdult, declineAdult } from "../../model/slice";
import styles from "./AgeGate.module.css";
import LogoIcon from "@shared/assets/icons/logo.svg?react";
import VectorIcon from "./_i/vector.svg?react";

export const AgeGate = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.image}>
        <img src="/images/age.webp" alt="Age Gate" />
      </div>

      <div className={styles.card}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <h2 className={styles.title}>
          Вам исполнилось{" "}
          <span>
            18 лет? <VectorIcon />
          </span>
        </h2>

        <div className={styles.actions}>
          <Button variant="primary" onClick={() => dispatch(confirmAdult())}>
            Да
          </Button>
          <Button variant="primary" onClick={() => dispatch(declineAdult())}>
            Нет
          </Button>
        </div>
      </div>
    </div>
  );
};
