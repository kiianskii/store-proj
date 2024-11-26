import { useSelector } from "react-redux";
import s from "./Sidebar.module.css";
import { selectCategories } from "../../redux/products/slice";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const categories = useSelector(selectCategories);

  return (
    <div className={s.sidebar}>
      <Link to={`/catalog/`}>Show all</Link>
      {categories.map((item) => {
        return (
          <NavLink to={`/catalog/${item}`} key={item}>
            {item
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
