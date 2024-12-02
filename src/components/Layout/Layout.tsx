import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
// import Footer from "../Footer/Footer";
import s from "./Layout.module.css";
import { selectIsLoading } from "../../redux/loader/loaderSlice";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const Layout = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <section className={s.layout}>
      <div>
        <Header />
      </div>

      <div className={s.outlet}>
        <Outlet />
      </div>

      {isLoading && <Loader />}
    </section>
  );
};

export default Layout;
