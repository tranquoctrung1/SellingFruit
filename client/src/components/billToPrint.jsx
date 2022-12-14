import {
    BackgroundImage,
    Center,
    Col,
    Grid,
    Image,
    Space,
    Table,
    Text,
    ThemeIcon,
} from '@mantine/core';
import { IconBrandHtml5, IconPhoneCall } from '@tabler/icons';
import * as React from 'react';
import BackgroundLogo from '../image/backgroundlogo.png';
import Logo from '../image/logo.png';

export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { checked: false };
    }

    render() {
        let { order, orderDetail } = this.props;

        let totalPrice = 0;

        let dataForBody = [];
        for (let i = 0; i < 10; i++) {
            let body = '';

            if (i <= orderDetail.length - 1) {
                let total = orderDetail[i].amount * orderDetail[i].price;
                body += `<tr>
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="red" size="md" style="color: red" >${i + 1}</Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" >
								${orderDetail[i].productName}
							</Text>
						</Center>
					</td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" >${
                                orderDetail[i].amount
                            }</Text>
						</Center>
					</td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" >${
                                orderDetail[i].price
                            }</Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" >${total}</Text>
						</Center>
					</td>
				</tr>`;
                totalPrice += total;
            } else {
                body += `<tr>
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="red" size="md" style="color: red">${i + 1}</Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" ></Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" ></Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" ></Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db"></Text>
						</Center>
					</td>
				</tr>`;
            }

            dataForBody.push(body);
        }

        dataForBody.push(`<tr>
						<td style="border-color: red; padding-top: 8px; padding-bottom: 8px"></td>
						<td colspan="3" style="border-color: red; padding-top: 8px; padding-bottom: 8px">
							<Center>
								<Text color="red" size="lg" transform="uppercase" style="color: red; font-weight: 500; text-transform: uppercase">T???ng C???ng</Text>
							</Center>
						</td>
						<td style="border-color: red; padding-top: 8px; padding-bottom: 8px">
							<Center>
								<Text color="blue" size="md" style="color: #3498db" >${
                                    orderDetail.length > 0 ? totalPrice : ''
                                }</Text>
							</Center>
						</td>
						</tr>`);

        function createBody() {
            return { __html: dataForBody.join('') };
        }

        const num2Word2 = function () {
            var t = [
                    'kh??ng',
                    'm???t',
                    'hai',
                    'ba',
                    'b???n',
                    'n??m',
                    's??u',
                    'b???y',
                    't??m',
                    'ch??n',
                ],
                r = function (r, n) {
                    var o = '',
                        a = Math.floor(r / 10),
                        e = r % 10;
                    return (
                        a > 1
                            ? ((o = ' ' + t[a] + ' m????i'),
                              1 == e && (o += ' m???t'))
                            : 1 == a
                            ? ((o = ' m?????i'), 1 == e && (o += ' m???t'))
                            : n && e > 0 && (o = ' l???'),
                        5 == e && a >= 1
                            ? (o += ' l??m')
                            : 4 == e && a >= 1
                            ? (o += ' t??')
                            : (e > 1 || (1 == e && 0 == a)) &&
                              (o += ' ' + t[e]),
                        o
                    );
                },
                n = function (n, o) {
                    var a = '',
                        e = Math.floor(n / 100),
                        n = n % 100;
                    return (
                        o || e > 0
                            ? ((a = ' ' + t[e] + ' tr??m'), (a += r(n, !0)))
                            : (a = r(n, !1)),
                        a
                    );
                },
                o = function (t, r) {
                    var o = '',
                        a = Math.floor(t / 1e6),
                        t = t % 1e6;
                    // eslint-disable-next-line no-unused-expressions
                    a > 0 && ((o = n(a, r) + ' tri???u'), (r = !0));
                    var e = Math.floor(t / 1e3),
                        t = t % 1e3;
                    return (
                        e > 0 && ((o += n(e, r) + ' ng??n'), (r = !0)),
                        t > 0 && (o += n(t, r)),
                        o
                    );
                };
            return {
                convert: function (r) {
                    if (0 == r) return t[0];
                    var ty;
                    var n = '',
                        a = '';
                    do {
                        ty = r % 1e9;
                        r = Math.floor(r / 1e9);
                        n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n;
                        a = ' t???';
                    } while (r > 0);
                    return n.trim();
                },
            };
        };

        return (
            <div className="relativeCSS">
                <style type="text/css" media="print">
                    {
                        '\
				@page { size: ; }\
			'
                    }
                </style>
                <Grid style={{ padding: '0 20px' }}>
                    <Col
                        span={12}
                        style={{ paddingBottom: '0', paddingTop: '20px' }}
                    >
                        <Text
                            size="md"
                            color={'red'}
                            weight={700}
                            align="center"
                            transform="uppercase"
                        >
                            C??ng Ty TNHH Th????ng M???i - Xu???t Nh???p Kh???u Nh???t Nam
                            Food
                        </Text>
                    </Col>
                    <Col
                        span={6}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <Center>
                            <ThemeIcon
                                color="red"
                                variant="filled"
                                radius={'md'}
                                size="sm"
                            >
                                <IconPhoneCall />
                            </ThemeIcon>
                            <Space w="xs" />
                            <Text size={'sm'} color="red" weight={500}>
                                K??nh s???: 038 200 8984 (Huy Nguy???n)
                            </Text>
                        </Center>
                    </Col>
                    <Col
                        span={6}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <Center>
                            <ThemeIcon
                                color="red"
                                variant="filled"
                                radius={'md'}
                                size="sm"
                            >
                                <IconBrandHtml5 />
                            </ThemeIcon>
                            <Space w="xs" />
                            <Text size={'sm'} color="red" weight={500}>
                                Website: nhatnamfood.com
                            </Text>
                        </Center>
                    </Col>
                    <Col
                        span={12}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <hr />
                    </Col>
                    <Col
                        span={4}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <Center>
                            <Image
                                width={200}
                                height={200}
                                radius="md"
                                src={Logo}
                                alt="Nhat Nam Food"
                                styles={{
                                    image: {
                                        width: '120px',
                                        height: '120px',
                                    },
                                }}
                            />
                        </Center>
                        <Grid>
                            <Col
                                span={12}
                                style={{
                                    paddingBottom: '0',
                                    paddingTop: '0',
                                }}
                            >
                                <Center>
                                    <Text
                                        size="xs"
                                        transform="uppercase"
                                        color="red"
                                    >
                                        Chuy??n S??? Tr??i C??y Nh???p Kh???u
                                    </Text>
                                </Center>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    paddingBottom: '0',
                                    paddingTop: '0',
                                }}
                            >
                                <Center>
                                    <Text size="xs" color="red">
                                        Hotline: 0945.834.444
                                    </Text>
                                </Center>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    paddingBottom: '0',
                                    paddingTop: '0',
                                }}
                            >
                                <Center>
                                    <Text size="xs" color="red">
                                        0984.149.999 - 0812.747.555
                                    </Text>
                                </Center>
                            </Col>
                        </Grid>
                    </Col>
                    <Col
                        span={8}
                        style={{ paddingBottom: '0px', paddingTop: '20px' }}
                    >
                        <Grid>
                            <Col
                                span={12}
                                style={{
                                    paddingBottom: '0',
                                    paddingTop: '0',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text size="sm" color="red" weight={500}>
                                        DC 1:
                                    </Text>
                                    <Space w="xs" />
                                    <Text size="xs" color="red">
                                        Kho l???nh N??m Ch??u, P. Tam B??nh, TP Th???
                                        ?????c
                                    </Text>
                                </div>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    paddingBottom: '0',
                                    paddingTop: '0',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text size="sm" color="red" weight={500}>
                                        DC 2:
                                    </Text>
                                    <Space w="xs" />
                                    <Text size="xs" color="red">
                                        A15 ???????ng B (Ch??? ?????u M???i N??ng S???n Th???
                                        ?????c), P.Tam B??nh, Th??? ?????c
                                    </Text>
                                </div>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    paddingBottom: '0',
                                    paddingTop: '0',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text size="sm" color="red" weight={500}>
                                        DC 3:
                                    </Text>
                                    <Space w="xs" />
                                    <Text size="xs" color="red">
                                        S??? 238 ???????ng 3/2, Ph?????ng 12, Qu???n 10,
                                        TP. H??? Ch?? Minh
                                    </Text>
                                </div>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    paddingBottom: '0',
                                    paddingTop: '0',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text size="sm" color="red" weight={500}>
                                        CN 1:
                                    </Text>
                                    <Space w="xs" />
                                    <Text size="xs" color="red">
                                        S??? 316 L???c Long Qu??n, Xu??n La, T??y H???,
                                        H?? N???i
                                    </Text>
                                </div>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    paddingBottom: '0',
                                    paddingTop: '0',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text size="sm" color="red" weight={500}>
                                        CN 2:
                                    </Text>
                                    <Space w="xs" />
                                    <Text size="xs" color="red">
                                        77 Tr???nh ????nh Th???o, Khu?? Trung, C???m L???,
                                        TP. ???? N???ng
                                    </Text>
                                </div>
                            </Col>
                        </Grid>
                    </Col>
                    <Col
                        span={12}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                size={'xl'}
                                color="red"
                                transform="uppercase"
                                weight={700}
                            >
                                H??a ????n B??n L???
                            </Text>
                            <Space w="lg" />
                            <Text size="lg" color="red">
                                S???:{' '}
                            </Text>
                            <Space w="xs" />
                            <Text size="md" color="red" weight={500}>
                                {order.numberOrder !== undefined
                                    ? order.numberOrder
                                          .toString()
                                          .padStart(6, '0')
                                    : ''}
                            </Text>
                        </div>
                    </Col>
                    <Col
                        span={6}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Text size="sm" color="red">
                                T??n KH:{' '}
                            </Text>
                            <Space w="xs" />
                            <Text size="md" color="blue" weight={500}>
                                {order.consumerName}
                            </Text>
                        </div>
                    </Col>
                    <Col
                        span={6}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Text size="sm" color="red">
                                ??i???n tho???i:{' '}
                            </Text>
                            <Space w="xs" />
                            <Text size="md" color="blue" weight={500}>
                                {order.phoneNumber}
                            </Text>
                        </div>
                    </Col>
                    <Col
                        span={12}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Text size="sm" color="red">
                                ?????a ch???:{' '}
                            </Text>
                            <Space w="xs" />
                            <Text size="md" color="blue" weight={500}>
                                {order.address}
                            </Text>
                        </div>
                    </Col>
                    <Col span={12}>
                        <BackgroundImage
                            src={BackgroundLogo}
                            style={{
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                            }}
                        >
                            <Table
                                highlightOnHover
                                withBorder
                                withColumnBorders
                                style={{ borderColor: 'red' }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                borderColor: 'red',
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                            }}
                                        >
                                            <Center>
                                                <Text
                                                    transform="uppercase"
                                                    color="red"
                                                    size="md"
                                                >
                                                    Stt
                                                </Text>
                                            </Center>
                                        </th>
                                        <th
                                            style={{
                                                borderColor: 'red',
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                            }}
                                        >
                                            <Center>
                                                <Text
                                                    transform="uppercase"
                                                    color="red"
                                                    size="md"
                                                >
                                                    T??n H??ng
                                                </Text>
                                            </Center>
                                        </th>
                                        <th
                                            style={{
                                                borderColor: 'red',
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                            }}
                                        >
                                            <Center>
                                                <Text
                                                    transform="uppercase"
                                                    color="red"
                                                    size="md"
                                                >
                                                    S??? L?????ng
                                                </Text>
                                            </Center>
                                        </th>
                                        <th
                                            style={{
                                                borderColor: 'red',
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                            }}
                                        >
                                            <Center>
                                                <Text
                                                    transform="uppercase"
                                                    color="red"
                                                    size="md"
                                                >
                                                    Gi?? ????n V???
                                                </Text>
                                            </Center>
                                        </th>
                                        <th
                                            style={{
                                                borderColor: 'red',
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                            }}
                                        >
                                            <Center>
                                                <Text
                                                    transform="uppercase"
                                                    color="red"
                                                    size="md"
                                                >
                                                    Th??nh Ti???n
                                                </Text>
                                            </Center>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    dangerouslySetInnerHTML={createBody()}
                                ></tbody>
                            </Table>
                        </BackgroundImage>
                    </Col>
                    <Col
                        span={12}
                        style={{ paddingBottom: '0', paddingTop: '0' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <Text color="red" size="md">
                                C???ng th??nh ti???n (Vi???t b???ng ch???):
                            </Text>
                            <Space w="xs" />
                            <Text color="blue" size="md">
                                {orderDetail.length > 0
                                    ? num2Word2().convert(totalPrice) +
                                      ' vi???t nam ?????ng'
                                    : ''}
                            </Text>
                        </div>
                    </Col>
                    <Col span={12}></Col>
                    <Col span={12}></Col>
                    <Col
                        span={4}
                        style={{ paddingBottom: '50px', paddingTop: '0' }}
                    >
                        <div style={{ opacity: 0 }}>Ng??y th??ng n??m</div>
                        <Space w="sm"></Space>
                        <Center>
                            <Text color="red" weight={500} size="md">
                                Ng?????i nh???n h??ng
                            </Text>
                        </Center>
                    </Col>
                    <Col
                        span={4}
                        style={{ paddingBottom: '50px', paddingTop: '0' }}
                    >
                        <div style={{ opacity: 0 }}>Ng??y th??ng n??m</div>
                        <Space w="sm"></Space>
                        <Center>
                            <Text color="red" weight={500} size="md">
                                Ng?????i giao h??ng
                            </Text>
                        </Center>
                    </Col>
                    <Col
                        span={4}
                        style={{ paddingBottom: '50px', paddingTop: '0' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text color="red">Ng??y</Text>
                            <Space w="xs" />
                            <Text color="blue">
                                {order.dateCreated !== '' &&
                                order.dateCreated !== null &&
                                order.dateCreated !== undefined
                                    ? new Date(order.dateCreated).getDate()
                                    : ''}
                            </Text>
                            <Space w="xs" />
                            <Text color="red">th??ng</Text>
                            <Space w="xs" />
                            <Text color="blue">
                                {order.dateCreated !== '' &&
                                order.dateCreated !== null &&
                                order.dateCreated !== undefined
                                    ? new Date(order.dateCreated).getMonth() + 1
                                    : ''}
                            </Text>
                            <Space w="xs" />
                            <Text color="red">n??m</Text>
                            <Space w="xs" />
                            <Text color="blue">
                                {order.dateCreated !== '' &&
                                order.dateCreated !== null &&
                                order.dateCreated !== undefined
                                    ? new Date(order.dateCreated).getFullYear()
                                    : ''}
                            </Text>
                        </div>
                        <Space w="sm"></Space>
                        <Center>
                            <Text color="red" weight={500} size="md">
                                Ng?????i l???p phi???u
                            </Text>
                        </Center>
                    </Col>
                </Grid>
            </div>
        );
    }
}
export const BillingToPrint = React.forwardRef((props, ref) => {
    return <ComponentToPrint {...props} ref={ref} />;
});
