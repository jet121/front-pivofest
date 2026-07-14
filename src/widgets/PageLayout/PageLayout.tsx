import type { ReactNode } from "react";
import styles from "./PageLayout.module.css";

interface PageLayoutProps {
  children?: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
