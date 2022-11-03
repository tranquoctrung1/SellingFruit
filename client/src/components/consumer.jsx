import { motion } from "framer-motion";

const Consumer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      consumer page
    </motion.div>
  );
};

export default Consumer;
