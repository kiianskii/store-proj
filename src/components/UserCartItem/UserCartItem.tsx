import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Icon } from "../../icons/Icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  changeQuantityThunk,
  deleteFromCartThunk,
} from "../../redux/products/operations";

interface CartProductProps {
  product: {
    productId: {
      _id: string;
      title: string;
      category: string;
      price: number;
      image: string;
    };
    quantity: number;
  };
}

const UserCartItem: React.FC<CartProductProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { productId, quantity } = product;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: "contain", marginRight: 2 }}
        image={productId.image}
        alt={productId.title}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography variant="h6" component="div" noWrap>
          {productId.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {productId.category}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Price: ${productId.price.toFixed(2)}
        </Typography>
      </CardContent>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          disabled={quantity <= 1}
          onClick={() => {
            dispatch(
              changeQuantityThunk({
                productId: productId._id,
                quantity: quantity - 1,
              })
            );
          }}
        >
          <Icon id="minus" size={10} className="minus_icon" />
        </IconButton>
        <Typography variant="body1">{quantity}</Typography>
        <IconButton
          disabled={quantity > 9}
          onClick={() => {
            dispatch(
              changeQuantityThunk({
                productId: productId._id,
                quantity: quantity + 1,
              })
            );
          }}
        >
          <Icon id="plus" size={10} className="plus_icon" />
        </IconButton>
      </Box>

      <IconButton
        onClick={() => {
          dispatch(deleteFromCartThunk(productId._id));
        }}
        color="error"
        sx={{ marginLeft: 2 }}
      >
        <Icon className="delete_icon" id="close" size={30} />
      </IconButton>
    </Card>
  );
};

export default UserCartItem;
