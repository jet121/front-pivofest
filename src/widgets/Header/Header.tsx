import React from "react";
import styles from "./Header.module.css";
import LogoIcon from "./_i/Logo.svg?react";
import BackIcon from "./_i/back.svg?react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <button className={styles.back} onClick={handleBack}>
        <BackIcon />
      </button>
      <div className={styles.logo}>
        <LogoIcon />
      </div>
    </header>
  );
};
