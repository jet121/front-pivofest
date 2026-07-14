import { ScannerPreview } from "@widgets/ScannerPreview";
import styles from "./ReceiptScanPreviewPage.module.css";

export const ReceiptScanPreviewPage = () => {
  return (
    <main className={styles.page}>
      <ScannerPreview />
    </main>
  );
};
