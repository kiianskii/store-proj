import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  changeCurrentPage,
  selectCurrentPage,
  selectProducts,
} from "../../redux/products/slice";
import CardItem from "../../components/CardItem/CardItem";
import s from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectCurrentPage);
  const products = useSelector(selectProducts);
  return (
    <section>
      <div className={s.catalog}>
        {products.map((item) => (
          <CardItem key={item._id} product={item} />
        ))}
      </div>

      <div>
        <button
          onClick={() => {
            if (currentPage > 1) {
              dispatch(changeCurrentPage(currentPage - 1));
            }
          }}
        >
          Previous page
        </button>
        <button
          onClick={() => {
            dispatch(changeCurrentPage(currentPage + 1));
          }}
        >
          Next Page
        </button>
      </div>
    </section>
  );
};

export default CatalogPage;
