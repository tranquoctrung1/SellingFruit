import { motion } from 'framer-motion';
import CreateStaff from './createStaff';

const Staff = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <CreateStaff />
        </motion.div>
    );
};

export default Staff;
