import React, { ReactNode } from "react";
import Header from "../commons/header";
import Footer from "../commons/footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
