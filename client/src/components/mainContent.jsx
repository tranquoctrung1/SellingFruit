import { Route, Routes } from "react-router-dom";
import Page404 from "./404";
import Billing from "./billing";
import Consumer from "./consumer";
import Product from "./product";
import Provider from "./provider";

const MainContent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Billing />} />
      <Route exact path="/consumer" element={<Consumer />} />
      <Route exact path="/product" element={<Product />} />
      <Route exact path="/provider" element={<Provider />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default MainContent;
