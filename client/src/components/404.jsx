import { Image } from '@mantine/core';
import { motion } from 'framer-motion';
import Error404 from '../image/404.jpg';

const Page404 = () => {
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <div
            style={{
                width: '70%',
                height: '90vh',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                radius="md"
                src={Error404}
                alt="Random unsplash image"
                caption="Error 404! Not Found"
            />
        </div>
    </motion.div>;
};

export default Page404;
