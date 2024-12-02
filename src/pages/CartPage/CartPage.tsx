import React from "react";
import { selectCart } from "../../redux/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import UserCartItem from "../../components/UserCartItem/UserCartItem";
import s from "./CartPage.module.css";
import { AppDispatch } from "../../redux/store";
import { clearCartThunk } from "../../redux/products/operations";
import { Button } from "@mui/material";

const CartPage = () => {
  const cartProds = useSelector(selectCart);
  const dispatch = useDispatch<AppDispatch>();
  const totalPrice = cartProds.reduce((acc, item) => {
    const itemTotal = item.productId.price * item.quantity;
    return acc + itemTotal;
  }, 0);

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
          return <UserCartItem key={prod.productId._id} product={prod} />;
        })}
      </div>

      {cartProds.length < 1 && (
        <h2 className={s.empty_title}>
          Your cart is empty! Add some products and come back!
        </h2>
      )}

      {cartProds.length > 0 && (
        <div className={s.order_wrapper}>
          <p>TOTAL: ${totalPrice.toFixed(2)}</p>

          <Button variant="contained" color="primary">
            Make an order
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
