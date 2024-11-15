import React from "react";
import s from "./Header.module.css";
import logo from "../../icons/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/slice";
import { Icon } from "../../icons/Icon";
import { AppDispatch } from "../../redux/store";
import { logOutThunk } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className={s.header}>
      <div className={s.logo_wrapper}>
        <img src={logo} alt="Shop logo" width={32} height={32} />
        <p>Online shopping</p>
      </div>
      {isLoggedIn && (
        <>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/catalog">Catalog</NavLink>
          </nav>
          <div className={s.user_wrapper}>
            <p>{user.username}</p>
            <button onClick={() => dispatch(logOutThunk())}>
              <Icon id="sign-out" size={20} />
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
