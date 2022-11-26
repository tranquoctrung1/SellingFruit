import { motion } from 'framer-motion';
import CreateConsumer from './createConsumer';

const Consumer = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <CreateConsumer />
        </motion.div>
    );
};

export default Consumer;
