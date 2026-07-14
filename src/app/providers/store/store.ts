import { configureStore } from '@reduxjs/toolkit';
import { ageVerificationReducer } from '@features/age-verification';
import { registrationReducer } from '@features/registration';
import { userReducer } from '@entities/user';
import { serviceDataReducer } from '@entities/service-data';

export const store = configureStore({
  reducer: {
    ageVerification: ageVerificationReducer,
    registration: registrationReducer,
    user: userReducer,
    serviceData: serviceDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
