import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

export const Button = ({
  text,
  icon,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  size = "md",
  color = "blue",
}: ButtonProps) => {
  const isIconOnly = icon && !text;

  const classes = classNames(
    styles.button,
    styles[size],
    styles[color],
    className,
    {
      [styles.disabled]: disabled,
      [styles.iconOnly]: isIconOnly,
    }
  );

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isIconOnly ? (
        <span className={styles.icon}>{icon}</span>
      ) : (
        text
      )}
    </button>
  );
};

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  color?: "blue" | "green" | "red";
}
