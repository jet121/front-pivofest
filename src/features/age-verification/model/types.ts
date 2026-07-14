export type AgeStatus = 'pending' | 'confirmed' | 'declined';

export interface AgeVerificationState {
  status: AgeStatus;
}
