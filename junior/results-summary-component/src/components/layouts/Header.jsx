import logo from "../../assets/images/logo.png";
import styles from "./Layout.module.scss";

export default function Header() {
  return (
    <header className={styles["l-header"]}>
      <h1>RESULT SUMMARY</h1>
      <img alt="Logo" src={logo} />
    </header>
  );
}
