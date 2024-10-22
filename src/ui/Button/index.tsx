import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

export const Button = ({
  text,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.disabled]: disabled,
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}
