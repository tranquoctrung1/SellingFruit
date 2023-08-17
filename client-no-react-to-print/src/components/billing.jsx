import { Col, Grid } from '@mantine/core';
import BillContent from './billContent';
import CreateBilling from './createBilling';
import ListOrder from './listOrder';

import { motion } from 'framer-motion';

const Billing = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Grid>
                <Col lg={6} md={12}>
                    <ListOrder />

                    <CreateBilling />
                </Col>
                <Col lg={6} md={12}>
                    <BillContent />
                </Col>
            </Grid>
        </motion.div>
    );
};

export default Billing;
