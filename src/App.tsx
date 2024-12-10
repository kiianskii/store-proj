import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { PrivateRoute } from "./routes/PrivateRoute";
import { RestrictedRoute } from "./routes/RestrictedRoute";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";

import "./App.css";
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage/AuthPage"));
const CartPage = React.lazy(() => import("./pages/CartPage/CartPage"));
const CatalogPage = React.lazy(() => import("./pages/CatalogPage/CatalogPage"));

function App() {
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
