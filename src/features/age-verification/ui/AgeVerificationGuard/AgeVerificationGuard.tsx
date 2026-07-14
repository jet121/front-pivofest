import type { ReactNode } from "react";
import { useAppSelector } from "@app/providers/store";
import { selectAgeStatus } from "../../model/selectors";
import { AgeDeclined } from "../AgeDeclined/AgeDeclined";
import { AgeGate } from "../AgeGate/AgeGate";

interface AgeVerificationGuardProps {
  children: ReactNode;
}

export const AgeVerificationGuard = ({
  children,
}: AgeVerificationGuardProps) => {
  const status = useAppSelector(selectAgeStatus);

  if (status === "declined") {
    return <AgeDeclined />;
  }

  return (
    <>
      {children}
      {status === "pending" && <AgeGate />}
    </>
  );
};
