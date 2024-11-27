import React from "react";
import { selectCart } from "../../redux/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import UserCartItem from "../../components/UserCartItem/UserCartItem";
import s from "./CartPage.module.css";
import { AppDispatch } from "../../redux/store";
import { clearCartThunk } from "../../redux/products/operations";

const CartPage = () => {
  const cartProds = useSelector(selectCart);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={s.cart_wrapper}>
      {cartProds.length > 0 && (
        <div className={s.btn_wrapper}>
          <button type="button" onClick={() => dispatch(clearCartThunk())}>
            Clear all
          </button>
        </div>
      )}

      <div>
        {cartProds.map((prod) => {
          return <UserCartItem key={prod._id} product={prod} />;
        })}
      </div>

      {cartProds.length < 1 && (
        <h2 className={s.empty_title}>
          Your cart is empty! Add some products and come back!
        </h2>
      )}
    </div>
  );
};

export default CartPage;
