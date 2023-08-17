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

const BillToPrinter = ({ order, orderDetail }) => {
    let totalPrice = 0;

    let dataForBody = [];
    for (let i = 0; i < 10; i++) {
        let body = '';

        if (i <= orderDetail.length - 1) {
            let total = orderDetail[i].amount * orderDetail[i].price;
            body += `<tr>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text >${i + 1}</Text>
						</Center>
					</td>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text>
								${orderDetail[i].productName}
							</Text>
						</Center>
					</td>
					<td style="border: 1px solid black;border-collapse: collapse; padding-bottom: 8px">
						<Center>
							<Text >${orderDetail[i].amount}</Text>
						</Center>
					</td>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text >${orderDetail[i].price}</Text>
						</Center>
					</td>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text >${total}</Text>
						</Center>
					</td>
				</tr>`;
            totalPrice += total;
        } else {
            body += `<tr>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text >${i + 1}</Text>
						</Center>
					</td>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text></Text>
						</Center>
					</td>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text></Text>
						</Center>
					</td>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text></Text>
						</Center>
					</td>
					<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
						<Center>
							<Text></Text>
						</Center>
					</td>
				</tr>`;
        }

        dataForBody.push(body);
    }

    dataForBody.push(`<tr>
						<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px"></td>
						<td colspan="3" style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
							<Center>
								<Text style="font-weight: 500;text-transform: uppercase; font-size: 1rem">Tổng Cộng</Text>
							</Center>
						</td>
						<td style="border: 1px solid black;border-collapse: collapse; padding-top: 8px; padding-bottom: 8px">
							<Center>
								<Text  style="font-weight: 500">${
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
                        ? ((o = ' ' + t[a] + ' mươi'), 1 == e && (o += ' mốt'))
                        : 1 == a
                        ? ((o = ' mười'), 1 == e && (o += ' một'))
                        : n && e > 0 && (o = ' lẻ'),
                    5 == e && a >= 1
                        ? (o += ' lăm')
                        : 4 == e && a >= 1
                        ? (o += ' tư')
                        : (e > 1 || (1 == e && 0 == a)) && (o += ' ' + t[e]),
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
                {
                    '\
				@page { size: ; }\
			'
                }
            </style>
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Công Ty TNHH Thương Mại - Xuất Nhập Khẩu Nhất Nam Food
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ThemeIcon variant="filled" radius={'md'} size="sm">
                        <IconPhoneCall />
                    </ThemeIcon>
                    <span
                        style={{
                            fontSize: '.8rem',
                            fontWeight: '500',
                            marginLeft: '5px',
                        }}
                    >
                        Kênh sỉ: 038 200 8984 (Huy Nguyễn)
                    </span>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ThemeIcon variant="filled" radius={'md'} size="sm">
                        <IconBrandHtml5 />
                    </ThemeIcon>
                    <span
                        style={{
                            fontSize: '.8rem',
                            fontWeight: '500',
                            marginLeft: '5px',
                        }}
                    >
                        Website: nhatnamfood.com
                    </span>
                </div>
            </div>
            <div>
                <hr />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignContent: 'center',
                }}
            >
                <div>
                    <div>
                        <Image
                            width={150}
                            height={130}
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
                    </div>
                    <div style={{ marginLeft: '30px' }}>
                        <div
                            style={{
                                textTransform: 'uppercase',
                                fontSize: '.75rem',
                                textAlign: 'center',
                            }}
                        >
                            Chuyên Sỉ Trái Cây Nhập Khẩu
                        </div>
                        <div
                            style={{
                                fontSize: '.73rem',
                                textAlign: 'center',
                            }}
                        >
                            Hotline: 0945.834.444
                        </div>
                        <div
                            style={{
                                fontSize: '.73rem',
                                textAlign: 'center',
                            }}
                        >
                            0984.149.999 - 0812.747.555
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <strong style={{ fontSize: '.9rem' }}>DC 1:</strong>
                        <span style={{ fontSize: '.8rem' }}>
                            {' '}
                            Kho lạnh Năm Châu, P. Tam Bình, TP Thủ Đức
                        </span>
                    </div>
                    <div>
                        <strong style={{ fontSize: '.9rem' }}>DC 2:</strong>
                        <span style={{ fontSize: '.8rem' }}>
                            {' '}
                            A15 Đường B (Chợ Đầu Mối Nông Sản Thủ Đức), P.Tam
                            Bình, Thủ Đức
                        </span>
                    </div>
                    <div>
                        <strong style={{ fontSize: '.9rem' }}>DC 3:</strong>
                        <span style={{ fontSize: '.8rem' }}>
                            {' '}
                            Số 238 Đường 3/2, Phường 12, Quận 10, TP. Hồ Chí
                            Minh
                        </span>
                    </div>
                    <div>
                        <strong style={{ fontSize: '.9rem' }}>CN 1:</strong>
                        <span style={{ fontSize: '.8rem' }}>
                            {' '}
                            Số 316 Lạc Long Quân, Xuân La, Tây Hồ, Hà Nội
                        </span>
                    </div>
                    <div>
                        <strong style={{ fontSize: '.9rem' }}>CN 2:</strong>
                        <span style={{ fontSize: '.8rem' }}>
                            {' '}
                            77 Trịnh Đình Thảo, Khuê Trung, Cẩm Lệ, TP. Đà Nẵng
                        </span>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h3>Hóa Đơn Bán Lẻ</h3>
                <h4 style={{ marginLeft: '10px', marginRight: '6px' }}>Số:</h4>
                <h4>
                    {order.numberOrder !== undefined
                        ? order.numberOrder.toString().padStart(6, '0')
                        : ''}
                </h4>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: '19px',
                }}
            >
                <div>
                    <span style={{ fontSize: '.9rem', marginRight: '6px' }}>
                        Tên KH:{' '}
                    </span>
                    <strong>{order.consumerName}</strong>
                </div>

                <div style={{ marginLeft: '14rem' }}>
                    <span style={{ fontSize: '.9rem', marginRight: '6px' }}>
                        Điện thoại:{' '}
                    </span>
                    <strong>{order.phoneNumber}</strong>
                </div>
            </div>
            <div style={{ marginLeft: '19px' }}>
                <span style={{ fontSize: '.9rem', marginRight: '6px' }}>
                    Địa chỉ:{' '}
                </span>
                <span style={{ fontWeight: '500' }}>{order.address}</span>
            </div>
            <div>
                <BackgroundImage
                    src={BackgroundLogo}
                    style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        padding: '10px',
                    }}
                >
                    <table
                        style={{
                            border: '1px solid black',
                            borderCollapse: 'collapse',
                            width: '100%',
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px',
                                        border: '1px solid black',
                                        borderCollapse: 'collapse',
                                    }}
                                >
                                    <Center>
                                        <Text transform="uppercase" size="md">
                                            Stt
                                        </Text>
                                    </Center>
                                </th>
                                <th
                                    style={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px',
                                        border: '1px solid black',
                                        borderCollapse: 'collapse',
                                    }}
                                >
                                    <Center>
                                        <Text transform="uppercase" size="md">
                                            Tên Hàng
                                        </Text>
                                    </Center>
                                </th>
                                <th
                                    style={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px',
                                        border: '1px solid black',
                                        borderCollapse: 'collapse',
                                    }}
                                >
                                    <Center>
                                        <Text transform="uppercase" size="md">
                                            Số Lượng
                                        </Text>
                                    </Center>
                                </th>
                                <th
                                    style={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px',
                                        border: '1px solid black',
                                        borderCollapse: 'collapse',
                                    }}
                                >
                                    <Center>
                                        <Text transform="uppercase" size="md">
                                            Giá Đơn Vị
                                        </Text>
                                    </Center>
                                </th>
                                <th
                                    style={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px',
                                        border: '1px solid black',
                                        borderCollapse: 'collapse',
                                    }}
                                >
                                    <Center>
                                        <Text transform="uppercase" size="md">
                                            Thành Tiền
                                        </Text>
                                    </Center>
                                </th>
                            </tr>
                        </thead>
                        <tbody dangerouslySetInnerHTML={createBody()}></tbody>
                    </table>
                </BackgroundImage>
            </div>
            <div style={{ marginLeft: '19px' }}>
                <span style={{ marginRight: '10px' }}>
                    Cộng thành tiền (Viết bằng chữ):
                </span>
                <span>
                    {orderDetail.length > 0
                        ? num2Word2().convert(totalPrice) + ' việt nam đồng'
                        : ''}
                </span>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <strong>Người nhận hàng</strong>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <strong>Người giao hàng</strong>
                </div>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ marginRight: '5px' }}>Ngày</Text>
                        <Text style={{ marginRight: '5px' }}>
                            {order.dateCreated !== '' &&
                            order.dateCreated !== null &&
                            order.dateCreated !== undefined
                                ? new Date(order.dateCreated).getDate()
                                : ''}
                        </Text>
                        <Text style={{ marginRight: '5px' }}>tháng</Text>
                        <Text style={{ marginRight: '5px' }}>
                            {order.dateCreated !== '' &&
                            order.dateCreated !== null &&
                            order.dateCreated !== undefined
                                ? new Date(order.dateCreated).getMonth() + 1
                                : ''}
                        </Text>
                        <Text style={{ marginRight: '5px' }}>năm</Text>
                        <Text>
                            {order.dateCreated !== '' &&
                            order.dateCreated !== null &&
                            order.dateCreated !== undefined
                                ? new Date(order.dateCreated).getFullYear()
                                : ''}
                        </Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <strong>Người lập phiếu</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillToPrinter;
