import type { CSSProperties, FC, SVGProps } from "react";
import styles from "./Winners.module.css";
import winnersData from "./winners.json";
import BeerIcon from "@shared/assets/icons/beer.svg?react";
import HopsIcon from "@shared/assets/icons/brunka.svg?react";
import GrillIcon from "@shared/assets/icons/grill.svg?react";
import TentIcon from "@shared/assets/icons/shater.svg?react";

interface Draw {
  date: string;
  coupons: string[];
  icon?: string;
}

type IconKey = "tent" | "hops" | "beer" | "grill";

const ICONS: Record<
  IconKey,
  { Component: FC<SVGProps<SVGSVGElement>>; color: string }
> = {
  tent: { Component: TentIcon, color: "var(--color-orange)" },
  hops: { Component: HopsIcon, color: "var(--color-green)" },
  beer: { Component: BeerIcon, color: "var(--color-red)" },
  grill: { Component: GrillIcon, color: "var(--color-dark)" },
};

// Порядок иконок по умолчанию, если в JSON поле icon не задано или неизвестно.
const ICON_ROTATION: IconKey[] = ["tent", "hops", "beer", "grill"];

const resolveIcon = (icon: string | undefined, index: number) => {
  if (icon && icon in ICONS) return ICONS[icon as IconKey];
  return ICONS[ICON_ROTATION[index % ICON_ROTATION.length]];
};

const draws = winnersData as Draw[];

export const Winners = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Победители</h2>

      <div className={styles.draws}>
        {draws.map((draw, index) => {
          const { Component: Icon, color } = resolveIcon(draw.icon, index);

          return (
            <div
              key={`${draw.date}-${index}`}
              className={styles.draw}
              style={{ "--accent": color } as CSSProperties}
            >
              <div className={styles.head}>
                <h3 className={styles.drawTitle}>
                  <span className={styles.word}>Розыгрыш</span>
                  <span className={styles.date}>{draw.date}</span>
                </h3>
                <span className={styles.icon}>
                  <Icon />
                </span>
              </div>

              <p className={styles.couponsLabel}>Купоны победители:</p>

              <ul className={styles.coupons}>
                {draw.coupons.map((coupon, couponIndex) => (
                  <li key={couponIndex} className={styles.coupon}>
                    {coupon}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};
