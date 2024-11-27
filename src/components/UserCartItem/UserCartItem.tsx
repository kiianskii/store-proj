import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Icon } from "../../icons/Icon";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteFromCartThunk } from "../../redux/products/operations";

interface CartProductProps {
  product: {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
  };
}

const UserCartItem: React.FC<CartProductProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

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
        image={product.image}
        alt={product.title}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Price: ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      <IconButton
        onClick={() => {
          dispatch(deleteFromCartThunk(product._id));
        }}
        color="error"
        sx={{ marginLeft: 2 }}
      >
        <Icon className="delete_icon" id="close" size={20} />
      </IconButton>
    </Card>
  );
};

export default UserCartItem;
