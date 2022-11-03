import { motion } from "framer-motion";

const Product = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Product page
    </motion.div>
  );
};

export default Product;
