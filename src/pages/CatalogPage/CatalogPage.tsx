import Catalog from "../../components/Catalog/Catalog";
import s from "./CatalogPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const CatalogPage = () => {
  return (
    <section className={s.wrapper}>
      <Sidebar />
      <Catalog />
    </section>
  );
};

export default CatalogPage;
