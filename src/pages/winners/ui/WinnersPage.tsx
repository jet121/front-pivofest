import { Header } from "@widgets/Header";
import { Winners } from "@widgets/Winners";
import { Footer } from "@widgets/Footer";
import styles from "./WinnersPage.module.css";

export const WinnersPage = () => {
  return (
    <main className={styles.page}>
      <Header />
      <Winners />
      <Footer orange />
    </main>
  );
};
