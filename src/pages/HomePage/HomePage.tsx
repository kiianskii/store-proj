import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSaleProducts } from "../../redux/products/slice";
import { AppDispatch } from "../../redux/store";
import { selectCart } from "../../redux/auth/slice";
import { addToCartThunk } from "../../redux/products/operations";

const HomePage: React.FC = () => {
  const mockProducts = useSelector(selectSaleProducts);

  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector(selectCart);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Welcome to Our Store!
      </Typography>

      <Typography
        variant="h6"
        component="p"
        sx={{
          color: "gray",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Discover the best products tailored just for you.
      </Typography>

      <Grid container spacing={4}>
        {mockProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    fontWeight: "bold",
                    marginTop: "5px",
                    color: "red",
                    textDecoration: "line-through",
                  }}
                >
                  ${(product.price + 2).toFixed(2)}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(addToCartThunk(product._id));
                  }}
                  disabled={cart.some(
                    (obj) => obj.productId._id === product._id
                  )}
                >
                  Add to Cart
                </Button>
                <Button size="small" variant="outlined" color="secondary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
