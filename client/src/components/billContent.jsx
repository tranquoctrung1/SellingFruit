import { useCallback, useEffect, useRef, useState } from 'react';

import { useReactToPrint } from 'react-to-print';

import { BillingToPrint } from './billToPrint';

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

    const onBeforeGetContentResolve = useRef(null);

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('old boring text');

    const handleAfterPrint = useCallback(() => {
        console.log('`onAfterPrint` called');
        const decodeToken = jwt_decode(localStorage.getItem('token'));

        if (decodeToken.role !== 'admin') {
            if (currentOrder != null && currentOrder !== undefined) {
                let order = JSON.parse(localStorage.getItem('currentOrder'));

                order.allowPrint = 1;
                order.status = 1;
                useUpdatePrintOrderMutation.mutate(order);
            }
        }
    }, []);

    const handleBeforePrint = useCallback(() => {
        console.log('`onBeforePrint` called'); // tslint:disable-line no-console
    }, []);

    const handleOnBeforeGetContent = useCallback(() => {
        console.log('`onBeforeGetContent` called'); // tslint:disable-line no-console
        setLoading(true);
        setText('Loading new text...');

        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText('New, Updated Text!');
                resolve();
            }, 1000);
        });
    }, [setLoading, setText]);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: currentOrder.customerName,
        onBeforeGetContent: handleOnBeforeGetContent,
        onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,
        removeAfterPrint: true,
    });

    useEffect(() => {
        if (
            text === 'New, Updated Text!' &&
            typeof onBeforeGetContentResolve.current === 'function'
        ) {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, text, currentOrder]);

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
                    currentOrder.allowPrint = 2;
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
                ) : currentOrder.status === 0 ? (
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
                ) : currentOrder.status === 1 ? (
                    <Grid style={{ marginTop: '10px' }}>
                        <Col span={12}>
                            <Center>
                                <Button
                                    color="violet"
                                    variant="filled"
                                    onClick={onRequestPrintOrderClicked}
                                >
                                    Yêu cầu in hóa đơn
                                </Button>
                            </Center>
                        </Col>
                    </Grid>
                ) : (
                    <Grid style={{ marginTop: '10px' }}>
                        <Col span={12}>
                            <Center>
                                <Button
                                    color="violet"
                                    variant="filled"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    Đang phê duyệt
                                </Button>
                            </Center>
                        </Col>
                    </Grid>
                )
            ) : null}
        </>
    );
};

export default BillContent;
