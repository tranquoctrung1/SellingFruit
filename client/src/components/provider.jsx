import { motion } from 'framer-motion';
import CreateProvider from './createProvider';

const Provider = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <CreateProvider />
        </motion.div>
    );
};

export default Provider;
