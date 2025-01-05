import React from "react";
import Image from "next/image";
import styles from "./Icon.module.scss";

interface IconProps {
  icon: string;
  alt?: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const Icon = ({
  icon,
  alt = "icon",
  width = 24,
  height = 24,
  color,
  className = "",
}: IconProps) => {
  return (
    <span className={`${styles.iconContainer} ${className}`} style={{ color }}>
      <Image
        src={icon}
        alt={alt}
        width={width}
        height={height}
        priority={true}
      />
    </span>
  );
};
