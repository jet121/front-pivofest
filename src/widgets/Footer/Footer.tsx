import React from "react";
import styles from "./Footer.module.css";
import LogoIcon from "@shared/assets/icons/logo.svg?react";
import ArrowIcon from "@shared/assets/icons/arrow.svg?react";
import EightTeenIcon from "./_i/18.svg?react";
import OrangeBg from "@widgets/FAQ/_i/vector.svg?react";
import PatternBg from "@widgets/UserSection/_i/pattern.svg?react";
import { useAppSelector } from "@app/providers/store";
import { selectRulesLink } from "@entities/service-data";

interface Props {
  orange?: boolean;
}

export const Footer: React.FC<Props> = ({ orange }) => {
  const rulesLink = useAppSelector(selectRulesLink);

  return (
    <>
      {orange && (
        <div className={styles.orange}>
          <div className={styles.orangeCanvas}>
            <div className={styles.vector}>
              <OrangeBg className={styles.vectorImage} aria-hidden />
            </div>
          </div>

          <div className={styles.pattern}>
            <PatternBg className={styles.patternImage} aria-hidden />
          </div>
        </div>
      )}
      <section className={`${styles.section}`}>
        <div className={styles.bg}>
          <img src="/images/footer.png" alt="Footer background" />
        </div>

        <div className={styles.content}>
          <div className={styles.logo}>
            <LogoIcon />
          </div>

          <a
            href={rulesLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.conditions}
          >
            Условия акции <ArrowIcon />
          </a>

          <div className={styles.row}>
            <p>
              Чрезмерное употребление алкоголя вредит вашему здоровью
              <span>Возрастное ограничение 18+</span>
            </p>
            <EightTeenIcon />
          </div>

          <div className={styles.copy}>
            © 2026 Оренбургский пивоваренный завод «Крафт»
          </div>
        </div>
      </section>
    </>
  );
};
