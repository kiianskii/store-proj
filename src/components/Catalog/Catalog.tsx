import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  changeCurrentPage,
  selectCurrentPage,
  selectProducts,
} from "../../redux/products/slice";
import CardItem from "../../components/CardItem/CardItem";
import s from "./Catalog.module.css";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectCurrentPage);
  const products = useSelector(selectProducts);

  const { category } = useParams();

  return (
    <div className={s.catalog}>
      <SearchBar />

      <Grid container spacing={4}>
        {products.map((item) => (
          <CardItem key={item._id} product={item} />
        ))}
      </Grid>

      {!category && (
        <div className={s.btn_wrapper}>
          <button
            className={s.btn}
            onClick={() => {
              if (currentPage > 1) {
                dispatch(changeCurrentPage(currentPage - 1));
              }
            }}
            disabled={currentPage === 1}
          >
            Previous page
          </button>
          <button
            className={s.btn}
            onClick={() => {
              dispatch(changeCurrentPage(currentPage + 1));
            }}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;
