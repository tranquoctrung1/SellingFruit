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
} from "@mantine/core";
import { IconBrandHtml5, IconPhoneCall } from "@tabler/icons";
import * as React from "react";
import Logo from "../image/logo.png";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  render() {
    let fakeData = [];
    let objData1 = {};
    objData1.productName = "Táo góc 44";
    objData1.amount = 15;
    objData1.price = 10000;
    objData1.total = objData1.amount * objData1.price;
    fakeData.push(objData1);
    let objData2 = {};
    objData2.productName = "Táo góc 55";
    objData2.amount = 15;
    objData2.price = 10000;
    objData2.total = objData2.amount * objData2.price;
    fakeData.push(objData2);

    let objData3 = {};
    objData3.productName = "Táo góc 66";
    objData3.amount = 15;
    objData3.price = 10000;
    objData3.total = objData3.amount * objData3.price;
    fakeData.push(objData3);

    let totalPrice = 0;

    let dataForBody = [];
    for (let i = 0; i < 10; i++) {
      let body = "";

      if (i <= fakeData.length - 1) {
        body += `<tr>
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="red" size="md" style="color: red" >${i + 1}</Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" >
								${fakeData[i].productName}
							</Text>
						</Center>
					</td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" >${
                fakeData[i].amount
              }</Text>
						</Center>
					</td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" >${fakeData[i].price}</Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" >${fakeData[i].total}</Text>
						</Center>
					</td>
				</tr>`;
        totalPrice += fakeData[i].total;
      } else {
        body += `<tr>
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="red" size="md" style="color: red">${i + 1}</Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" ></Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" ></Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db" ></Text>
						</Center>
					</td>
					<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
						<Center>
							<Text color="blue" size="md" style="color: #3498db"></Text>
						</Center>
					</td>
				</tr>`;
      }

      dataForBody.push(body);
    }

    dataForBody.push(`<tr>
						<td style="border-color: red; padding-top: 5px; padding-bottom: 5px"></td>
						<td colspan="3" style="border-color: red; padding-top: 5px; padding-bottom: 5px">
							<Center>
								<Text color="red" size="lg" transform="uppercase" style="color: red; font-weight: 500; text-transform: uppercase">Tổng Cộng</Text>
							</Center>
						</td>
						<td style="border-color: red; padding-top: 5px; padding-bottom: 5px">
							<Center>
								<Text color="blue" size="md" style="color: #3498db" >${totalPrice}</Text>
							</Center>
						</td>
						</tr>`);

    function createBody() {
      return { __html: dataForBody.join("") };
    }

    return (
      <div className="relativeCSS">
        <style type="text/css" media="print">
          {"\
				@page { size: landscape; }\
			"}
        </style>
        <Grid style={{ padding: "0 20px" }}>
          <Col span={12} style={{ paddingBottom: "0" }}>
            <Text
              size="xl"
              color={"red"}
              weight={700}
              align="center"
              transform="uppercase"
            >
              Công Ty TNHH Thương Mại - Xuất Nhập Khẩu Nhất Nam Food
            </Text>
          </Col>
          <Col span={6} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <Center>
              <ThemeIcon color="red" variant="filled" radius={"md"} size="sm">
                <IconPhoneCall />
              </ThemeIcon>
              <Space w="xs" />
              <Text size={"md"} color="red" weight={500}>
                Kênh sỉ: 038 200 8984 (Huy Nguyễn)
              </Text>
            </Center>
          </Col>
          <Col span={6} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <Center>
              <ThemeIcon color="red" variant="filled" radius={"md"} size="sm">
                <IconBrandHtml5 />
              </ThemeIcon>
              <Space w="xs" />
              <Text size={"md"} color="red" weight={500}>
                Website: nhatnamfood.com
              </Text>
            </Center>
          </Col>
          <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <hr />
          </Col>
          <Col span={4} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <Center>
              <Image
                width={100}
                height={100}
                radius="md"
                src={Logo}
                alt="Nhat Nam Food"
                styles={{
                  image: {
                    width: "120px",
                    height: "120px",
                  },
                }}
              />
            </Center>
            <Grid>
              <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
                <Center>
                  <Text size="sm" transform="uppercase" color="red">
                    Chuyên Sỉ Trái Cây Nhập Khẩu
                  </Text>
                </Center>
              </Col>
              <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
                <Center>
                  <Text size="sm" color="red">
                    Hotline: 0945.834.444
                  </Text>
                </Center>
              </Col>
              <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
                <Center>
                  <Text size="sm" color="red">
                    0984.149.999 - 0812.747.555
                  </Text>
                </Center>
              </Col>
            </Grid>
          </Col>
          <Col span={8} style={{ paddingBottom: "0px", paddingTop: "20px" }}>
            <Grid>
              <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text size="md" color="red" weight={500}>
                    DC 1:
                  </Text>
                  <Space w="xs" />
                  <Text size="sm" color="red">
                    Kho lạnh Năm Châu, P. Tam Bình, TP Thủ Đức
                  </Text>
                </div>
              </Col>
              <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text size="md" color="red" weight={500}>
                    DC 2:
                  </Text>
                  <Space w="xs" />
                  <Text size="sm" color="red">
                    A15 Đường B (Chợ Đầu Mối Nông Sản Thủ Đức), P.Tam Bình, Thủ
                    Đức
                  </Text>
                </div>
              </Col>
              <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text size="md" color="red" weight={500}>
                    DC 3:
                  </Text>
                  <Space w="xs" />
                  <Text size="sm" color="red">
                    Số 238 Đường 3/2, Phường 12, Quận 10, TP. Hồ Chí Minh
                  </Text>
                </div>
              </Col>
              <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text size="md" color="red" weight={500}>
                    CN 1:
                  </Text>
                  <Space w="xs" />
                  <Text size="sm" color="red">
                    Số 316 Lạc Long Quân, Xuân La, Tây Hồ, Hà Nội
                  </Text>
                </div>
              </Col>
              <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text size="md" color="red" weight={500}>
                    CN 2:
                  </Text>
                  <Space w="xs" />
                  <Text size="sm" color="red">
                    77 Trịnh Đình Thảo, Khuê Trung, Cẩm Lệ, TP. Đà Nẵng
                  </Text>
                </div>
              </Col>
            </Grid>
          </Col>
          <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text size={"xl"} color="red" transform="uppercase" weight={700}>
                Hóa Đơn Bán Lẻ
              </Text>
              <Space w="lg" />
              <Text size="lg" color="red">
                Số:{" "}
              </Text>
              <Space w="xs" />
              <Text size="md" color="red" weight={500}>
                0014141
              </Text>
            </div>
          </Col>
          <Col span={6} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text size="md" color="red">
                Tên KH:{" "}
              </Text>
              <Space w="xs" />
              <Text size="lg" color="blue" weight={500}>
                {" "}
                Đoài ĐL
              </Text>
            </div>
          </Col>
          <Col span={6} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text size="md" color="red">
                Điện thoại:{" "}
              </Text>
              <Space w="xs" />
              <Text size="lg" color="blue" weight={500}>
                {" "}
                Cty
              </Text>
            </div>
          </Col>
          <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text size="md" color="red">
                Địa chỉ:{" "}
              </Text>
              <Space w="xs" />
              <Text size="lg" color="blue" weight={500}>
                {" "}
                123 Cao thắng, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh
              </Text>
            </div>
          </Col>
          <Col span={12}>
            <BackgroundImage
              src={Logo}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              <Table
                highlightOnHover
                withBorder
                withColumnBorders
                style={{ borderColor: "red" }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        borderColor: "red",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <Center>
                        <Text transform="uppercase" color="red" size="lg">
                          Stt
                        </Text>
                      </Center>
                    </th>
                    <th
                      style={{
                        borderColor: "red",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <Center>
                        <Text transform="uppercase" color="red" size="lg">
                          Tên Hàng
                        </Text>
                      </Center>
                    </th>
                    <th
                      style={{
                        borderColor: "red",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <Center>
                        <Text transform="uppercase" color="red" size="lg">
                          Số Lượng
                        </Text>
                      </Center>
                    </th>
                    <th
                      style={{
                        borderColor: "red",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <Center>
                        <Text transform="uppercase" color="red" size="lg">
                          Giá Đơn Vị
                        </Text>
                      </Center>
                    </th>
                    <th
                      style={{
                        borderColor: "red",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <Center>
                        <Text transform="uppercase" color="red" size="lg">
                          Thành Tiền
                        </Text>
                      </Center>
                    </th>
                  </tr>
                </thead>
                <tbody dangerouslySetInnerHTML={createBody()}></tbody>
              </Table>
            </BackgroundImage>
          </Col>
          <Col span={12} style={{ paddingBottom: "0", paddingTop: "0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text color="red" size="lg">
                Cộng thành tiền (Viết bằng chữ):
              </Text>
              <Space w="xs" />
              <Text color="blue" size="md">
                bốn trăm năm mươi nghìn việt nam đồng
              </Text>
            </div>
          </Col>
          <Col span={4} style={{ paddingBottom: "15px", paddingTop: "0" }}>
            <div style={{ opacity: 0 }}>Ngày tháng năm</div>
            <Space w="sm"></Space>
            <Center>
              <Text color="red" weight={500} size="md">
                người nhận hàng
              </Text>
            </Center>
          </Col>
          <Col span={4} style={{ paddingBottom: "15px", paddingTop: "0" }}>
            <div style={{ opacity: 0 }}>Ngày tháng năm</div>
            <Space w="sm"></Space>
            <Center>
              <Text color="red" weight={500} size="md">
                người giao hàng
              </Text>
            </Center>
          </Col>
          <Col span={4} style={{ paddingBottom: "15px", paddingTop: "0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text color="red">Ngày</Text>
              <Space w="xs" />
              <Text color="blue">03</Text>
              <Space w="xs" />
              <Text color="red">tháng</Text>
              <Space w="xs" />
              <Text color="blue">11</Text>
              <Space w="xs" />
              <Text color="red">năm</Text>
              <Space w="xs" />
              <Text color="blue">2022</Text>
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
  return <ComponentToPrint ref={ref} />;
});
