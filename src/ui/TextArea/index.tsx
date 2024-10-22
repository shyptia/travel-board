import React from "react";
import classNames from "classnames";
import styles from "./TextArea.module.scss";

export const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
  onBlur,
  name,
}: TextareaProps) => {
  return (
    <div className={styles.textareaGroup}>
      <label className={styles.textareaLabel}>{label}</label>
      <textarea
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        className={classNames(styles.textareaField, {
          [styles.errorBorder]: error,
        })}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
  name: string;
}
