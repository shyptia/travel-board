import React from "react";
import classNames from "classnames";
import styles from "./Select.module.scss";

export const Select = ({
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  name,
  required = false,
}: SelectProps) => {
  return (
    <div className={styles.selectGroup}>
      <label className={styles.selectLabel}>{`${
        required && "* "
      }${label}`}</label>
      <select
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames(styles.selectField, {
          [styles.errorBorder]: error,
        })}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  name: string;
  required?: boolean;
}
