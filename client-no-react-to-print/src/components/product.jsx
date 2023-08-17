import { motion } from 'framer-motion';
import CreateProduct from './createProduct';

const Product = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <CreateProduct />
        </motion.div>
    );
};

export default Product;
