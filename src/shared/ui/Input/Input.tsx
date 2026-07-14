import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  center?: boolean;
};

export const Input = ({ className, center, ...props }: InputProps) => {
  return <input className={`${styles.input} ${className ?? ""} ${center ? styles.center : ""}`} {...props} />;
};
