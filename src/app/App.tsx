import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "@app/providers/store";
import { AppRouter } from "@app/providers/router";
import { AgeVerificationGuard } from "@features/age-verification";
import { RegistrationModal, openRegistration } from "@features/registration";
import { fetchServiceData } from "@entities/service-data";
import { clearUser, selectIsAuthed } from "@entities/user";
import { setAuthErrorHandler } from "@shared/api";
import "./styles/global.css";

const AppInit = () => {
  const dispatch = useAppDispatch();
  const isAuthed = useAppSelector(selectIsAuthed);

  useEffect(() => {
    dispatch(fetchServiceData());
  }, [dispatch]);

  // Протухла сессия → выходим и предлагаем войти заново.
  useEffect(() => {
    setAuthErrorHandler(() => {
      if (isAuthed) {
        dispatch(clearUser());
        dispatch(openRegistration());
      }
    });
    return () => setAuthErrorHandler(null);
  }, [dispatch, isAuthed]);

  return null;
};

export const App = () => {
  return (
    <div className="wrapper">
      <Provider store={store}>
        <AppInit />
        <AgeVerificationGuard>
          <AppRouter />
        </AgeVerificationGuard>
        <RegistrationModal />
      </Provider>
    </div>
  );
};
