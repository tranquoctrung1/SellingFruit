import { useCallback, useEffect, useRef, useState } from 'react';

import { useReactToPrint } from 'react-to-print';

import { BillingToPrint } from './billToPrint';

import { Button, Center, Col, Grid } from '@mantine/core';
import { IconPrinter } from '@tabler/icons';

const BillContent = () => {
    const componentRef = useRef(null);

    const onBeforeGetContentResolve = useRef(null);

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('old boring text');

    const handleAfterPrint = useCallback(() => {
        console.log('`onAfterPrint` called'); // tslint:disable-line no-console
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
            }, 2000);
        });
    }, [setLoading, setText]);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: 'AwesomeFileName',
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
    }, [onBeforeGetContentResolve.current, text]);

    return (
        <>
            <BillingToPrint ref={componentRef} />
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
        </>
    );
};

export default BillContent;
