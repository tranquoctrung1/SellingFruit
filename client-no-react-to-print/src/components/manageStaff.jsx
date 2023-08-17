import { motion } from 'framer-motion';
import CreateManageStaff from './createManageStaff';

const ManageStaff = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <CreateManageStaff />
        </motion.div>
    );
};

export default ManageStaff;
