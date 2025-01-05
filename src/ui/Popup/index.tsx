import React from "react";
import styles from "./Popup.module.scss";
import { Button } from "../Button";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export const Popup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
}: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3 className={styles.title}>{title}</h3>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.buttons}>
          <Button text={cancelText} onClick={onClose} color="red" />
          <Button text={confirmText} onClick={onConfirm} color="blue" />
        </div>
      </div>
    </div>
  );
};
