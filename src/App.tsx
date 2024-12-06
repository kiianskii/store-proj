import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import CartPage from "./pages/CartPage/CartPage";

import Layout from "./components/Layout/Layout";
import Loader from "./components/Loader/Loader";
import { PrivateRoute } from "./routes/PrivateRoute";
import { RestrictedRoute } from "./routes/RestrictedRoute";

import { AppDispatch } from "./redux/store";
import { getProductsThunk } from "./redux/products/operations";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/slice";
import { selectCurrentPage, selectSearchValue } from "./redux/products/slice";
import "./App.css";
import { refreshThunk } from "./redux/auth/operations";

function App() {
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
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<PrivateRoute redirectTo="/auth" component={HomePage} />}
          />
          <Route
            path="catalog"
            element={
              <PrivateRoute redirectTo="/auth" component={CatalogPage} />
            }
          />
          <Route
            path="catalog/:category"
            element={
              <PrivateRoute redirectTo="/auth" component={CatalogPage} />
            }
          />
          <Route
            path="cart"
            element={<PrivateRoute redirectTo="/auth" component={CartPage} />}
          />
          <Route
            path="auth"
            element={<RestrictedRoute redirectTo="/" component={AuthPage} />}
          />
        </Route>
      </Routes>
      <Toaster />
    </Suspense>
  );
}

export default App;
