// import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function HomePage({ children }) {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main className="grid grid-cols-1 justify-items-center items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
