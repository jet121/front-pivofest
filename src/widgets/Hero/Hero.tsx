import styles from "./Hero.module.css";
import BeerIcon from "@shared/assets/icons/beer.svg?react";
import VectorGreenIcon from "./_i/vector-green.svg?react";
import VectorOrangeIcon from "./_i/vector-orange.svg?react";
import LogoIcon from "@shared/assets/icons/logo.svg?react";
import RoundGreen from "./_i/round-green.svg?react";
import RoundRed from "./_i/round-red.svg?react";
import { Button } from "@shared/ui";
import { useAppDispatch } from "@app/providers/store";
import { openRegistration } from "@features/registration";
import { EXTERNAL_LINKS, openExternal } from "@shared/config/links";
import { useAppSelector } from "@app/providers/store";
import { selectAuth } from "@entities/user";
import { ROUTES } from "@shared/config/routes";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const isAuthed = Boolean(auth);
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <img src="/images/hero.webp" alt="Hero Background" />
      </div>

      <div className={styles.content}>
        <div className={styles.buy}>
          <h5 className={styles.subtitle}>
            <span>Покупай</span>
            <div className={styles.vector}>
              <VectorOrangeIcon />
            </div>
            <div className={styles.beer}>
              <BeerIcon />
            </div>
          </h5>

          <span>продукцию пивоваренного завода «КРАФТ»</span>
        </div>

        <div className={styles.win}>
          <h5 className={styles.subtitle}>
            <span>И выигрывай</span>
            <div className={styles.vector}>
              <VectorGreenIcon />
            </div>
          </h5>

          <span>билеты на фестиваль</span>
        </div>

        <div className={styles.logo}>
          <LogoIcon />
        </div>

        <div className={styles.rewards}>
          <div className={styles.reward}>
            <div className={styles.info}>
              <div className={styles.red}>
                <RoundRed />
              </div>
              10 <span>билетов</span>
            </div>

            <span className={`${styles.hint} ${styles.red}`}>
              разыгрываем еженедельно
            </span>
          </div>

          <div className={styles.reward}>
            <div className={styles.info}>
              <div className={styles.green}>
                <RoundGreen />
              </div>
              20<b>%</b> <span>скидка</span>
            </div>

            <span className={styles.hint}>
              на билет за каждый чек гарантированно
            </span>
          </div>
        </div>

        <Button
          className={styles.button}
          variant="primary"
          onClick={
            isAuthed
              ? () => navigate(ROUTES.RECEIPT_SCAN_PREVIEW)
              : () => dispatch(openRegistration())
          }
        >
          ЗАРЕГИСТРИРОВАТЬ ЧЕК
        </Button>

        <div className={styles.text}>
          <p>Акция проходит с 1 августа по 1 сентября 2026 года.</p>
          <p>
            Фестиваль пройдет 05 сентября 2026 года на поляне перед заводом
            Крафт.
          </p>
          <p>Оренбург, ул. Тихая 8/2</p>

          <Button
            className={styles.button}
            variant="secondary"
            onClick={() => openExternal(EXTERNAL_LINKS.TICKET)}
          >
            Купить билет
          </Button>
        </div>
      </div>
    </section>
  );
};
