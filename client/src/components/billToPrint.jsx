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
								<Text color="red" size="lg" transform="uppercase" style="color: red; font-weight: 500; text-transform: uppercase">Tổng Cộng</Text>
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
                    'không',
                    'một',
                    'hai',
                    'ba',
                    'bốn',
                    'năm',
                    'sáu',
                    'bảy',
                    'tám',
                    'chín',
                ],
                r = function (r, n) {
                    var o = '',
                        a = Math.floor(r / 10),
                        e = r % 10;
                    return (
                        a > 1
                            ? ((o = ' ' + t[a] + ' mươi'),
                              1 == e && (o += ' mốt'))
                            : 1 == a
                            ? ((o = ' mười'), 1 == e && (o += ' một'))
                            : n && e > 0 && (o = ' lẻ'),
                        5 == e && a >= 1
                            ? (o += ' lăm')
                            : 4 == e && a >= 1
                            ? (o += ' tư')
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
                            ? ((a = ' ' + t[e] + ' trăm'), (a += r(n, !0)))
                            : (a = r(n, !1)),
                        a
                    );
                },
                o = function (t, r) {
                    var o = '',
                        a = Math.floor(t / 1e6),
                        t = t % 1e6;
                    // eslint-disable-next-line no-unused-expressions
                    a > 0 && ((o = n(a, r) + ' triệu'), (r = !0));
                    var e = Math.floor(t / 1e3),
                        t = t % 1e3;
                    return (
                        e > 0 && ((o += n(e, r) + ' ngàn'), (r = !0)),
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
                        a = ' tỷ';
                    } while (r > 0);
                    return n.trim();
                },
            };
        };

        return (
            <div className="relativeCSS">
                <style type="text/css" media="print">
                    {'\
				@page { size: ; }\
			'}
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
                            Công Ty TNHH Thương Mại - Xuất Nhập Khẩu Nhất Nam
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
                                Kênh sỉ: 038 200 8984 (Huy Nguyễn)
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
                                        Chuyên Sỉ Trái Cây Nhập Khẩu
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
                                        Kho lạnh Năm Châu, P. Tam Bình, TP Thủ
                                        Đức
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
                                        A15 Đường B (Chợ Đầu Mối Nông Sản Thủ
                                        Đức), P.Tam Bình, Thủ Đức
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
                                        Số 238 Đường 3/2, Phường 12, Quận 10,
                                        TP. Hồ Chí Minh
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
                                        Số 316 Lạc Long Quân, Xuân La, Tây Hồ,
                                        Hà Nội
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
                                        77 Trịnh Đình Thảo, Khuê Trung, Cẩm Lệ,
                                        TP. Đà Nẵng
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
                                Hóa Đơn Bán Lẻ
                            </Text>
                            <Space w="lg" />
                            <Text size="lg" color="red">
                                Số:{' '}
                            </Text>
                            <Space w="xs" />
                            <Text size="md" color="red" weight={500}>
                                {order.numberOrder}
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
                                Tên KH:{' '}
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
                                Điện thoại:{' '}
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
                                Địa chỉ:{' '}
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
                                                    Tên Hàng
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
                                                    Số Lượng
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
                                                    Giá Đơn Vị
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
                                                    Thành Tiền
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
                                Cộng thành tiền (Viết bằng chữ):
                            </Text>
                            <Space w="xs" />
                            <Text color="blue" size="md">
                                {orderDetail.length > 0
                                    ? num2Word2().convert(totalPrice) +
                                      ' việt nam đồng'
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
                        <div style={{ opacity: 0 }}>Ngày tháng năm</div>
                        <Space w="sm"></Space>
                        <Center>
                            <Text color="red" weight={500} size="md">
                                Người nhận hàng
                            </Text>
                        </Center>
                    </Col>
                    <Col
                        span={4}
                        style={{ paddingBottom: '50px', paddingTop: '0' }}
                    >
                        <div style={{ opacity: 0 }}>Ngày tháng năm</div>
                        <Space w="sm"></Space>
                        <Center>
                            <Text color="red" weight={500} size="md">
                                Người giao hàng
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
                            <Text color="red">Ngày</Text>
                            <Space w="xs" />
                            <Text color="blue">
                                {new Date(order.dateCreated).getDate()}
                            </Text>
                            <Space w="xs" />
                            <Text color="red">tháng</Text>
                            <Space w="xs" />
                            <Text color="blue">
                                {new Date(order.dateCreated).getMonth() + 1}
                            </Text>
                            <Space w="xs" />
                            <Text color="red">năm</Text>
                            <Space w="xs" />
                            <Text color="blue">
                                {new Date(order.dateCreated).getFullYear()}
                            </Text>
                        </div>
                        <Space w="sm"></Space>
                        <Center>
                            <Text color="red" weight={500} size="md">
                                Người lập phiếu
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
