import React from "react";
import styles from "./About.module.css";
import BeerIcon from "@shared/assets/icons/beer.svg?react";
import GrillIcon from "@shared/assets/icons/grill.svg?react";
import BrunkaIcon from "@shared/assets/icons/brunka.svg?react";
import ShaterIcon from "@shared/assets/icons/shater.svg?react";
import { Button } from "@shared/ui";
import { EXTERNAL_LINKS, openExternal } from "@shared/config/links";

const items = [
  {
    icon: BeerIcon,
    title: "10+ ПАРТНЁРОВ",
    description: "Локальные бренды и ремесленные лавки.",
  },
  {
    icon: ShaterIcon,
    title: "8 ПЛОЩАДОК РАЗВЛЕЧЕНИЙ",
    description: "Битва диджеев, музыкальные группы, стенд-ап, розыгрыш призов",
  },
  {
    icon: GrillIcon,
    title: "10+ ГАСТРО-СТАНЦИЙ",
    description: "Вкусная еда от оренбургских рестораторов.",
  },
  {
    icon: BrunkaIcon,
    title: "20+ УЧАСТНИКОВ",
    description:
      "Пивовары и производители напитков со всей страны с безлимитной дегустацией",
  },
];

const Item = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <li className={styles.item}>
      <div className={styles.icon}>
        <Icon />
      </div>

      <div className={styles.data}>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </li>
  );
};

export const About = () => {
  return (
    <section className={styles.section}>
      <h4 className={styles.date}>5 сентября</h4>

      <div className={styles.icons}>
        <BeerIcon />
        <GrillIcon />
        <BrunkaIcon />
        <ShaterIcon />
      </div>

      <h2>ФЕСТИВАЛЬ НАПИТКОВ, ГАСТРОНОМИИ И МУЗЫКИ В ОРЕНБУРГЕ</h2>

      <p className={styles.desciption}>
        5 сентября в Оренбурге пройдет{" "}
        <b>II фестиваль музыки, еды и напитков «КРАФТ БАЗАР»</b>. Организаторы
        представят лучший крафт со всей страны — более 120 сортов напитков в
        формате безлимитной дегустации.
      </p>

      <ul className={styles.list}>
        {items.map((item) => (
          <Item
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>

      <Button
        variant="red"
        className={styles.button}
        onClick={() => openExternal(EXTERNAL_LINKS.FESTIVAL)}
      >
        Подробнее
      </Button>
    </section>
  );
};
