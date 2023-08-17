import { useRef, useState } from 'react';

import { BillingToPrint } from './billToPrint';
import BillToPrinter from './billToPrinter';

import { Button, Center, Col, Grid } from '@mantine/core';
import { IconPrinter } from '@tabler/icons';

import { useUpdatePrintOrder } from '../hooks/orderHooks';

import { useOrderGlobalState } from '../globalState/currentOrder.state';
import { useOrderDetailGlobalState } from '../globalState/orderDetail.state';

import jwt_decode from 'jwt-decode';

import Swal from 'sweetalert2';

const BillContent = () => {
    const componentRef = useRef(null);

    const [currentOrder, setCurrentOrder] = useOrderGlobalState(
        'currentOrder',
        {},
    );

    const [listOrderDetail, setListOrderDetail] = useOrderDetailGlobalState(
        'listOrderDetail',
        [],
    );

    const useUpdatePrintOrderMutation = useUpdatePrintOrder();

    const [loading, setLoading] = useState(false);

    const handlePrint = () => {
        const content = document.getElementById('contentPrint');
        //@ts-ignore
        const pri = document.getElementById('framePrint').contentWindow;
        pri.document.open();
        //@ts-ignore
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();

        if (currentOrder != null && currentOrder !== undefined) {
            let order = JSON.parse(localStorage.getItem('currentOrder'));

            order.allowPrint = 1;
            order.status = 1;
            useUpdatePrintOrderMutation.mutate(order);
        }
    };

    const onRequestPrintOrderClicked = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn yêu cầu in hóa đơn lại?',
            text: 'Thinking before you click!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0f0',
            confirmButtonText: 'Yêu cầu',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                if (currentOrder !== undefined && currentOrder !== null) {
                    currentOrder.allowPrint = 1;
                    currentOrder.status = 2;

                    useUpdatePrintOrderMutation.mutate(currentOrder);
                }
            }
        });
    };

    return (
        <>
            <BillingToPrint
                order={currentOrder}
                orderDetail={listOrderDetail}
                ref={componentRef}
            />
            <iframe
                id="framePrint"
                style={{ height: '0px', width: '0px', position: 'absolute' }}
            >
                <div id="contentPrint">
                    <BillToPrinter
                        order={currentOrder}
                        orderDetail={listOrderDetail}
                    />
                </div>
            </iframe>
            {Object.keys(currentOrder).length !== 0 ? (
                jwt_decode(localStorage.getItem('token')).role === 'admin' ? (
                    <Grid style={{ marginTop: '10px' }}>
                        <Col span={12}>
                            <Center>
                                {loading === true ? (
                                    <Button
                                        variant="filled"
                                        color={'violet'}
                                        onClick={handlePrint}
                                        leftIcon={<IconPrinter size={14} />}
                                        loading
                                        loaderPosition="right"
                                    >
                                        In hóa đơn bán lẻ
                                    </Button>
                                ) : (
                                    <Button
                                        variant="filled"
                                        color={'violet'}
                                        onClick={handlePrint}
                                        leftIcon={<IconPrinter size={14} />}
                                    >
                                        In hóa đơn bán lẻ
                                    </Button>
                                )}
                            </Center>
                        </Col>
                    </Grid>
                ) : //: currentOrder.status === 0 ? (
                //     <Grid style={{ marginTop: '10px' }}>
                //         <Col span={12}>
                //             <Center>
                //                 {loading === true ? (
                //                     <Button
                //                         variant="filled"
                //                         color={'violet'}
                //                         onClick={handlePrint}
                //                         leftIcon={<IconPrinter size={14} />}
                //                         loading
                //                         loaderPosition="right"
                //                     >
                //                         In hóa đơn bán lẻ
                //                     </Button>
                //                 ) : (
                //                     <Button
                //                         variant="filled"
                //                         color={'violet'}
                //                         onClick={handlePrint}
                //                         leftIcon={<IconPrinter size={14} />}
                //                     >
                //                         In hóa đơn bán lẻ
                //                     </Button>
                //                 )}
                //             </Center>
                //         </Col>
                //     </Grid>
                // )
                currentOrder.status === 2 ? (
                    <Grid style={{ marginTop: '10px' }}>
                        <Col span={12}>
                            <Center>
                                <Button
                                    color="violet"
                                    variant="filled"
                                    onClick={onRequestPrintOrderClicked}
                                >
                                    Yêu cầu in lại hóa đơn
                                </Button>
                            </Center>
                        </Col>
                    </Grid>
                ) : null
            ) : null}
        </>
    );
};

export default BillContent;
