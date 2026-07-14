export { ageVerificationReducer } from './model/slice';
export {
  confirmAdult,
  declineAdult,
  resetAgeStatus,
} from './model/slice';
export { selectAgeStatus } from './model/selectors';
export type { AgeStatus } from './model/types';
export { AgeGate } from './ui/AgeGate/AgeGate';
export { AgeVerificationGuard } from './ui/AgeVerificationGuard/AgeVerificationGuard';
