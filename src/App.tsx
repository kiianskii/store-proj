import { Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { PrivateRoute } from "./routes/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { RestrictedRoute } from "./routes/RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux/store";
import { getProductsThunk } from "./redux/products/operations";
import { selectIsLoggedIn } from "./redux/auth/slice";
import { selectCurrentPage } from "./redux/products/slice";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectCurrentPage);

  const location = useLocation();

  useEffect(() => {
    const isCatalogWithCategory = /^\/catalog\/[^/]+$/.test(location.pathname); // Перевірка, чи є щось після /catalog/

    if (isLoggedIn && !isCatalogWithCategory) {
      dispatch(getProductsThunk(currentPage));
    }
  }, [isLoggedIn, currentPage, location.pathname]);

  // useEffect(() => {
  //   if (isLoggedIn && !location.pathname.startsWith("/catalog/")) {
  //     dispatch(getProductsThunk(currentPage));
  //   }
  // }, [isLoggedIn, currentPage, location.pathname]);

  return (
    <Suspense fallback={<h1>Loading</h1>}>
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
            path="auth"
            element={<RestrictedRoute redirectTo="/" component={AuthPage} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
