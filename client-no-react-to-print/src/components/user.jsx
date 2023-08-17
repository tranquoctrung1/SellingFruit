import { motion } from 'framer-motion';
import CreateUser from './createUser';

const User = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <CreateUser />
        </motion.div>
    );
};

export default User;
