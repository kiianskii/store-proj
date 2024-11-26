import Catalog from "../../components/Catalog/Catalog";
import s from "./CatalogPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getProdByCategoryThunk } from "../../redux/products/operations";

const CatalogPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (category) {
      dispatch(getProdByCategoryThunk(category));
    }
  });

  return (
    <section className={s.wrapper}>
      <Sidebar />
      <Catalog />
    </section>
  );
};

export default CatalogPage;
