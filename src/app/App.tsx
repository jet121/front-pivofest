import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "@app/providers/store";
import { AppRouter } from "@app/providers/router";
import { AgeVerificationGuard } from "@features/age-verification";
import { RegistrationModal } from "@features/registration";
import { fetchServiceData } from "@entities/service-data";
import "./styles/global.css";

const AppInit = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchServiceData());
  }, [dispatch]);
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
