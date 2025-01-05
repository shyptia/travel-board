import React from "react";
import classNames from "classnames";
import styles from "./TextInput.module.scss";

export const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  name,
  onBlur,
  min,
}: TextInputProps) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={classNames(styles.inputField, {
          [styles.errorBorder]: error,
        })}
        min={min}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  name: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: string;
}
