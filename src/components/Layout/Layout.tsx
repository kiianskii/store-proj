import { useEffect } from "react";
import Header from "../Header/Header";
import { Outlet, useLocation } from "react-router-dom";

import s from "./Layout.module.css";
import { selectIsLoading } from "../../redux/loader/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { selectIsLoggedIn, selectIsRefreshing } from "../../redux/auth/slice";
import { AppDispatch } from "../../redux/store";
import {
  selectCurrentPage,
  selectSearchValue,
} from "../../redux/products/slice";
import { refreshThunk } from "../../redux/auth/operations";
import { getProductsThunk } from "../../redux/products/operations";

const Layout = () => {
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectCurrentPage);
  const value = useSelector(selectSearchValue);

  const location = useLocation();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!isRefreshing && isLoggedIn) {
      const isCatalogWithCategory = /^\/catalog\/[^/]+$/.test(
        location.pathname
      );

      if (!isCatalogWithCategory) {
        dispatch(getProductsThunk({ page: currentPage, value }));
      }
    }
  }, [
    isLoggedIn,
    currentPage,
    location.pathname,
    value,
    isRefreshing,
    dispatch,
  ]);

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
