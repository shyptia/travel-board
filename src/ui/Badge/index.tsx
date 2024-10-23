import React from "react";
import classNames from "classnames";
import styles from "./Badge.module.scss";

interface BadgeProps {
  text: string;
  color: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  const badgeClass = classNames(styles.badge, styles[color]);

  return <span className={badgeClass}>{text}</span>;
};
