import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";
import styles from "./PromoCodesPage.module.css";
import { Promocodes } from "@widgets/Promocodes";

export const PromoCodesPage = () => {
  return (
    <main className={styles.page}>
      <Header />
      <Promocodes />
      <Footer orange />
    </main>
  );
};
