import Link from "next/link";
import styles from "./Header.module.scss";
import { headerNavigation } from "@/constants/headerNavigation";
import Image from "next/image";
import { useRouter } from "next/router";
import classNames from "classnames";

export const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/board" passHref className={styles.logo}>
            <Image src="/images/logo.png" alt="Logo" width={160} height={34} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {headerNavigation.map((item) => (
              <li
                key={item.href}
                className={classNames(styles.navItem, {
                  [styles.active]: router.pathname === item.href,
                })}
              >
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
