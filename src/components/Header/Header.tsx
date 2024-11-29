import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/auth/slice";
import { AppDispatch } from "../../redux/store";
import { logOutThunk } from "../../redux/auth/operations";
import logo from "../../icons/logo.png";
import { Icon } from "../../icons/Icon";
import Box from "@mui/material/Box";
import s from "./Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            component={Link}
            to="/"
          >
            <img src={logo} alt="Shop logo" width={32} height={32} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            Online Shopping
          </Typography>
        </Box>

        {isLoggedIn && (
          <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
            <Button color="inherit" component={NavLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/catalog">
              Catalog
            </Button>
          </Box>
        )}

        {isLoggedIn && (
          <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.username}
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/cart");
              }}
              aria-label="cart"
              className={cart.length > 0 ? "cart_dot" : " "}
            >
              <Icon id="cart" size={20} className="cart_icon" />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => dispatch(logOutThunk())}
              aria-label="log out"
            >
              <Icon id="sign-out" size={20} className="sign_out_icon" />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
