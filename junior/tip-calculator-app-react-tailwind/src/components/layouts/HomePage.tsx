// import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

import type { ReactNode } from "react";

export default function HomePage({ children }: { children: ReactNode }) {
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
