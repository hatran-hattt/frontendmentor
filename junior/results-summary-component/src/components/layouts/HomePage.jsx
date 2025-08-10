// import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";

export default function HomePage({ children }) {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main className={styles["l-main"]}>{children}</main>
      <Footer />
    </>
  );
}
