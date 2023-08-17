import { motion } from 'framer-motion';
import StaffConusumerPermission from './staffConsumerPermission';

const Permission = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <StaffConusumerPermission />
        </motion.div>
    );
};

export default Permission;
