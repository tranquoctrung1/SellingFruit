import { Route, Routes, useLocation } from "react-router-dom";
import Page404 from "./404";
import Billing from "./billing";
import Consumer from "./consumer";
import Product from "./product";
import Provider from "./provider";

import { AnimatePresence } from "framer-motion";

const MainContent = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Billing />} />
        <Route exact path="/consumer" element={<Consumer />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/provider" element={<Provider />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </AnimatePresence>
  );
};

export default MainContent;
