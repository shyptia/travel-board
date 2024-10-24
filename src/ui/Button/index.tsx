import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

export const Button = ({
  text,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  size = "md",
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[size],
        className,
        {
          [styles.disabled]: disabled,
        }
      )}
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
  size?: "xs" | "sm" | "md" | "lg";
}
