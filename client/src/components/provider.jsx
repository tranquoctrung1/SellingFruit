import { motion } from "framer-motion";

const Provider = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      provider page
    </motion.div>
  );
};

export default Provider;
