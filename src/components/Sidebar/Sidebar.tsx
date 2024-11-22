import { useSelector } from "react-redux";
import s from "./Sidebar.module.css";
import { selectCategories } from "../../redux/products/slice";

const Sidebar = () => {
  const categories = useSelector(selectCategories);

  return (
    <div className={s.sidebar}>
      <ul>
        {categories.map((item) => {
          return (
            <li key={item}>
              {item
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
