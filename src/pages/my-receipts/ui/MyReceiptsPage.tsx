import { Header } from "@widgets/Header";
import { Footer } from "@widgets/Footer";
import { MyChecks } from "@widgets/MyChecks/MyChecks";
import styles from "./MyReceiptsPage.module.css";

export const MyReceiptsPage = () => {
  return (
    <main className={styles.page}>
      <Header />
      <MyChecks />
      <Footer orange />
    </main>
  );
};
