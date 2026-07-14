import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserSection.module.css";
import Image from "./_i/image.png";
import BrunkaIcon from "@shared/assets/icons/brunka.svg?react";
import { Button } from "@shared/ui";
import { ROUTES } from "@shared/config/routes";
import { useAppDispatch, useAppSelector } from "@app/providers/store";
import { selectAuth, selectUser, getAccount, type Account } from "@entities/user";
import { selectRulesLink } from "@entities/service-data";
import { openRegistration } from "@features/registration";

const formatMsisdn = (msisdn: string): string => {
  const d = msisdn.replace(/\D/g, "").replace(/^[78]/, "");
  if (d.length !== 10) return msisdn;
  return `+7 ${d.slice(0, 3)} ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}`;
};

export const UserSection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const rulesLink = useAppSelector(selectRulesLink);

  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (!auth) {
      setAccount(null);
      return;
    }
    let active = true;
    getAccount({ auth_key: auth.auth_key, user_id: auth.user_id })
      .then((data) => {
        if (active) setAccount(data);
      })
      .catch(() => {
        /* профиль недоступен — покажем данные из логина */
      });
    return () => {
      active = false;
    };
  }, [auth]);

  const isAuthed = Boolean(user);
  const name = account?.fullname || user?.fullname || "Участник";
  const phone = formatMsisdn(account?.msisdn || user?.msisdn || "");

  return (
    <section className={styles.section}>
      {/* Паттерн — фон-плитка через CSS: полная ширина + повтор по высоте */}
      <div className={styles.bg} />

      <div className={styles.content}>
        {!isAuthed ? (
          <>
            <div className={styles.container}>
              <h2>Принять участие</h2>
              <div className={styles.icon}>
                <BrunkaIcon />
              </div>

              <Button
                className={styles.button}
                variant="red"
                onClick={() => dispatch(openRegistration())}
              >
                Cтать участником акции
              </Button>
            </div>

            <div className={styles.image}>
              <img src={Image} alt="User Section" />
            </div>
          </>
        ) : (
          <>
            <div className={styles.container}>
              <h2 className={styles.name}>{name}</h2>
              <div className={styles.phone}>{phone}</div>

              <div className={styles.actions}>
                <Button
                  variant="primary"
                  onClick={() => navigate(ROUTES.RECEIPT_SCAN_PREVIEW)}
                >
                  Сканировать чек
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(ROUTES.MY_RECEIPTS)}
                >
                  Мои чеки
                </Button>
                <Button
                  variant="red"
                  onClick={() => navigate(ROUTES.PROMO_CODES)}
                >
                  Мои промокоды на скидку
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(ROUTES.FEEDBACK)}
                >
                  Обратная связь
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(rulesLink, "_blank")}
                >
                  Условия акции
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(ROUTES.WINNERS)}
                >
                  Победители розыгрышей
                </Button>
              </div>
            </div>

            <div className={styles.image}>
              <img src={Image} alt="User Section" />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
