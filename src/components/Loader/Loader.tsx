import { Triangle } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <Triangle
        visible={true}
        height="100"
        width="100"
        color="#1976d2"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
