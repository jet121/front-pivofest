export const ROUTES = {
  HOME: '/',
  REGISTRATION: '/registration',
  RECEIPT_SCAN_PREVIEW: '/receipt-scan',
  RECEIPT_SCANNER: '/receipt-scan/scanner',
  PROMO_CODES: '/promo-codes',
  MY_RECEIPTS: '/my-receipts',
  FEEDBACK: '/feedback',
  WINNERS: '/winners',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
