import { Header } from "@widgets/Header";
import { Feedback } from "@widgets/Feedback";
import { Footer } from "@widgets/Footer";
import styles from "./FeedbackPage.module.css";

export const FeedbackPage = () => {
  return (
    <main className={styles.page}>
      <Header />
      <Feedback />
      <Footer orange />
    </main>
  );
};
