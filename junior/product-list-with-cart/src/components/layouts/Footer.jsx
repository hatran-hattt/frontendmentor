import styles from "./Layout.module.scss";

export default function Footer() {
  return (
    <footer className={styles["l-footer"]}>
      <div>
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          #Frontend Mentor
        </a>
        . Coded by
        <a
          href="https://www.frontendmentor.io/profile/hatran-hattt"
          target="_blank"
        >
          #Ha
        </a>
        .
      </div>
    </footer>
  );
}
