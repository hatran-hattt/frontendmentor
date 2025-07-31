import logo from "../../assets/images/logo.svg";
import styles from "./Layout.module.scss";

export default function Header() {
  return (
    <header className={styles["l-header"]}>
      <h1 className="hidden">SPLITTER</h1>
      <img alt="Logo" src={logo} />
    </header>
  );
}
