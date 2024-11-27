import React from "react";
import { selectCart } from "../../redux/auth/slice";
import { useSelector } from "react-redux";
import UserCartItem from "../../components/UserCartItem/UserCartItem";

const CartPage = () => {
  const cartProds = useSelector(selectCart);

  return (
    <div>
      {cartProds.map((prod) => {
        return <UserCartItem key={prod._id} product={prod} />;
      })}
    </div>
  );
};

export default CartPage;
