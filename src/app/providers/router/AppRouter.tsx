import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { HomePage } from '@pages/home';
import { RegistrationPage } from '@pages/registration';
import { ReceiptScanPreviewPage } from '@pages/receipt-scan-preview';
import { ReceiptScannerPage } from '@pages/receipt-scanner';
import { PromoCodesPage } from '@pages/promo-codes';
import { MyReceiptsPage } from '@pages/my-receipts';
import { FeedbackPage } from '@pages/feedback';
import { WinnersPage } from '@pages/winners';

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.REGISTRATION, element: <RegistrationPage /> },
  { path: ROUTES.RECEIPT_SCAN_PREVIEW, element: <ReceiptScanPreviewPage /> },
  { path: ROUTES.RECEIPT_SCANNER, element: <ReceiptScannerPage /> },
  { path: ROUTES.PROMO_CODES, element: <PromoCodesPage /> },
  { path: ROUTES.MY_RECEIPTS, element: <MyReceiptsPage /> },
  { path: ROUTES.FEEDBACK, element: <FeedbackPage /> },
  { path: ROUTES.WINNERS, element: <WinnersPage /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
