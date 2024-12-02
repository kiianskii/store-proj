import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addToCartThunk } from "../../redux/products/operations";
import { selectCart } from "../../redux/auth/slice";
import toast from "react-hot-toast";
import { msgOptions } from "../../helpers/customTypes";

interface ProductProps {
  product: {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
  };
}

const CardItem: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector(selectCart);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{ maxWidth: 345, margin: "auto", borderRadius: 2, boxShadow: 3 }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="caption" color="primary" gutterBottom>
            Category: {product.category}
          </Typography>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ mt: 1, fontWeight: "bold" }}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Button variant="contained" color="primary">
            Buy Now
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={async () => {
              try {
                await dispatch(addToCartThunk(product._id)).unwrap();
                toast("Product added to your cart!", msgOptions);
              } catch (error) {
                toast(
                  "Failed to add product to your cart. Try again!",
                  msgOptions
                );
              }
            }}
            disabled={cart.some((obj) => obj.productId._id === product._id)}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default CardItem;
