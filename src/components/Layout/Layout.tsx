import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
// import Footer from "../Footer/Footer";
import s from "./Layout.module.css";

const Layout = () => {
  return (
    <section className={s.layout}>
      <div>
        <Header />
      </div>

      <div className={s.outlet}>
        <Outlet />
      </div>

      {/* <div>
        <Footer />
      </div> */}
    </section>
  );
};

export default Layout;
