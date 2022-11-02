import { Button, Col, Grid, Text, ThemeIcon } from "@mantine/core";
import {
  IconApple,
  IconFileInfo,
  IconTruckDelivery,
  IconUser,
} from "@tabler/icons";
import { Link } from "react-router-dom";

const NavBarLink = () => {
  return (
    <div>
      <Grid align="center">
        <Col span={12}>
          <Button
            variant="subtle"
            fullWidth={true}
            component={Link}
            to="/"
            leftIcon={
              <ThemeIcon color="grape">
                <IconFileInfo />
              </ThemeIcon>
            }
            styles={(theme) => ({
              root: {
                border: 0,
                height: 42,
                justifyContent: "flex-start",
                alignItems: "center",
              },
              inner: {
                justifyContent: "flex-start",
              },
              leftIcon: {
                marginRight: 10,
                opacity: 0.5,
              },
            })}
          >
            <Text size="sx" weight={500}>
              Hóa đơn bán lẻ
            </Text>
          </Button>
        </Col>
        <Col span={12}>
          <Button
            variant="subtle"
            fullWidth={true}
            component={Link}
            to="/consumer"
            leftIcon={
              <ThemeIcon color="grape">
                <IconUser />
              </ThemeIcon>
            }
            styles={(theme) => ({
              root: {
                border: 0,
                height: 42,
                justifyContent: "flex-start",
                alignItems: "center",
              },
              inner: {
                justifyContent: "flex-start",
              },
              leftIcon: {
                marginRight: 10,
                opacity: 0.5,
              },
            })}
          >
            <Text size="sx" weight={500}>
              Khách hàng
            </Text>
          </Button>
        </Col>
        <Col span={12}>
          <Button
            variant="subtle"
            fullWidth={true}
            component={Link}
            to="/product"
            leftIcon={
              <ThemeIcon color="grape">
                <IconApple />
              </ThemeIcon>
            }
            styles={(theme) => ({
              root: {
                border: 0,
                height: 42,
                justifyContent: "flex-start",
                alignItems: "center",
              },
              inner: {
                justifyContent: "flex-start",
              },
              leftIcon: {
                marginRight: 10,
                opacity: 0.5,
              },
            })}
          >
            <Text size="sx" weight={500}>
              Sản phẩm
            </Text>
          </Button>
        </Col>
        <Col span={12}>
          <Button
            variant="subtle"
            fullWidth={true}
            component={Link}
            to="/provider"
            leftIcon={
              <ThemeIcon color="grape">
                <IconTruckDelivery />
              </ThemeIcon>
            }
            styles={(theme) => ({
              root: {
                border: 0,
                height: 42,
                justifyContent: "flex-start",
                alignItems: "center",
              },
              inner: {
                justifyContent: "flex-start",
              },
              leftIcon: {
                marginRight: 10,
                opacity: 0.5,
              },
            })}
          >
            <Text size="sx" weight={500}>
              Nhà cung cấp
            </Text>
          </Button>
        </Col>
      </Grid>
    </div>
  );
};

export default NavBarLink;
