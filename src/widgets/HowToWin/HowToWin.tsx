import type { MouseEvent } from "react";
import styles from "./HowToWin.module.css";
import GrillIcon from "@shared/assets/icons/grill.svg?react";
import BeerIcon from "@shared/assets/icons/beer.svg?react";
import MapIcon from "./_i/map.svg?react";
import { Link } from "react-router-dom";
import { ROUTES } from "@shared/config/routes";
import { EXTERNAL_LINKS, openExternal } from "@shared/config/links";

export const HowToWin = () => {
  const handleProducts = (event: MouseEvent) => {
    event.preventDefault();
    openExternal(EXTERNAL_LINKS.PRODUCTS);
  };

  return (
    <section className={styles.section}>
      <h2>Призы</h2>
      <div className={styles.icon}>
        <GrillIcon />
      </div>

      <p className={styles.description}>
        <b>Еженедельно</b> разыгрывается <b>10 билетов</b> на фестиваль КРАФТ
        БАЗАР. А за каждый чек получите промокод <b>на скидку 20%</b> на билет.
      </p>

      <h3 className={styles.subtitle}>
        <span>Как</span>
        <span>выиграть</span>
        <span>призы</span>
      </h3>

      <div className={styles.map}>
        <div className={styles.mapCanvas}>
          <MapIcon className={styles.mapImage} aria-hidden />

          <div className={styles.points}>
            <div className={styles.point}>
              <b>Совершай покупки*</b> <a href="#" onClick={handleProducts}>любой продукции завода</a>{" "}
              Крафт в магазинах-участниках акции
            </div>

            <div className={styles.point}>
              <b>Отсканируй QR-код</b> на кассовом чеке
            </div>

            <div className={styles.point}>
              <b>Получай промокод</b> на скидку 20% на билетв «КРАФТ БАЗАР»{" "}
              <Link to={ROUTES.MY_RECEIPTS}>в личном кабинете</Link>
            </div>

            <div className={styles.point}>
              Каждую неделю <b>выбираем 10 промокодов победителей</b>, которые
              получат бесплатные билеты!
            </div>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <a href="#" onClick={handleProducts}>
          Смотреть всю продукцию пивоваренного завода Крафт, участвующую в акции
        </a>

        <BeerIcon />
      </div>

      <p className={styles.hint}>
        *Участвуют чеки от 700 руб. с хотя бы одной позицией Крафта.    
      </p>
    </section>
  );
};
