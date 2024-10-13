import Link from "next/link";
import styles from "./Header.module.scss";
import { headerNavigation } from "@/constants/headerNavigation";
import Image from "next/image";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" passHref className={styles.logo}>
            <Image src="/images/logo.png" alt="Logo" width={160} height={34} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            {headerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} passHref>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.actions}>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </div>
    </header>
  );
};
