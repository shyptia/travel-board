import Link from "next/link";
import styles from "./ErrorPage.module.scss";
import Image from "next/image";

export const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/programmer.png"
          alt="Error Page Illustration"
          layout="responsive"
          width={300}
          height={300}
        />
      </div>
      <h1 className={styles.title}>Sorry, this page is under construction</h1>
      <p className={styles.description}>
        Please check back later or go back to the{" "}
        <Link href="/board" className={styles.link}>
          main board
        </Link>
        .
      </p>
    </div>
  );
};
