import { motion } from 'framer-motion';
import CreateStaffManager from './createStaffManager';

const Staff = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <CreateStaffManager />
        </motion.div>
    );
};

export default Staff;
