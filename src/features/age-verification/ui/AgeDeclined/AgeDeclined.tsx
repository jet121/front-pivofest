import { Button } from "@shared/ui";
import { useAppDispatch } from "@app/providers/store";
import { resetAgeStatus } from "../../model/slice";
import styles from "../AgeGate/AgeGate.module.css";
import LogoIcon from "@shared/assets/icons/logo.svg?react";

export const AgeDeclined = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.image}>
        <img src="/images/age.png" alt="Age Gate" />
      </div>

      <div className={styles.card}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <h2 className={styles.title}>Извините, доступ ограничен</h2>
        <p className={styles.text}>
          Этот сайт предназначен для лиц старше 18 лет.
        </p>

        <div className={styles.actions}>
          <Button variant="primary" onClick={() => dispatch(resetAgeStatus())}>
            Ответить заново
          </Button>
        </div>
      </div>
    </div>
  );
};
