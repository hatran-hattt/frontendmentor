// import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

import type { ReactNode } from "react";

export default function HomePage({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 justify-items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
