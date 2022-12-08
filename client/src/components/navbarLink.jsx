import { Button, Col, Grid, Text, ThemeIcon } from '@mantine/core';
import {
    IconApple,
    IconChecklist,
    IconFileInfo,
    IconLicense,
    IconTruckDelivery,
    IconUser,
    IconUserCheck,
    IconUserPlus,
} from '@tabler/icons';
import { Link, Navigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

const NavBarLink = () => {
    const getRoleAdmin = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return <Navigate to="/login" />;
        } else {
            const token = localStorage.getItem('token');

            let decodeToken = jwt_decode(token);

            return decodeToken.role === 'admin';
        }
    };
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
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            },
                            inner: {
                                justifyContent: 'flex-start',
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
                        to="/ordermanager"
                        leftIcon={
                            <ThemeIcon color="grape">
                                <IconChecklist />
                            </ThemeIcon>
                        }
                        styles={(theme) => ({
                            root: {
                                border: 0,
                                height: 42,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            },
                            inner: {
                                justifyContent: 'flex-start',
                            },
                            leftIcon: {
                                marginRight: 10,
                                opacity: 0.5,
                            },
                        })}
                    >
                        <Text size="sx" weight={500}>
                            Quản lý đơn hàng
                        </Text>
                    </Button>
                </Col>
                {getRoleAdmin() ? (
                    <>
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
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    },
                                    inner: {
                                        justifyContent: 'flex-start',
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
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    },
                                    inner: {
                                        justifyContent: 'flex-start',
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
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    },
                                    inner: {
                                        justifyContent: 'flex-start',
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
                        <Col span={12}>
                            <Button
                                variant="subtle"
                                fullWidth={true}
                                component={Link}
                                to="/staff"
                                leftIcon={
                                    <ThemeIcon color="grape">
                                        <IconUserCheck />
                                    </ThemeIcon>
                                }
                                styles={(theme) => ({
                                    root: {
                                        border: 0,
                                        height: 42,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    },
                                    inner: {
                                        justifyContent: 'flex-start',
                                    },
                                    leftIcon: {
                                        marginRight: 10,
                                        opacity: 0.5,
                                    },
                                })}
                            >
                                <Text size="sx" weight={500}>
                                    Nhân viên
                                </Text>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                variant="subtle"
                                fullWidth={true}
                                component={Link}
                                to="/user"
                                leftIcon={
                                    <ThemeIcon color="grape">
                                        <IconUserPlus />
                                    </ThemeIcon>
                                }
                                styles={(theme) => ({
                                    root: {
                                        border: 0,
                                        height: 42,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    },
                                    inner: {
                                        justifyContent: 'flex-start',
                                    },
                                    leftIcon: {
                                        marginRight: 10,
                                        opacity: 0.5,
                                    },
                                })}
                            >
                                <Text size="sx" weight={500}>
                                    Người dùng
                                </Text>
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                variant="subtle"
                                fullWidth={true}
                                component={Link}
                                to="/permission"
                                leftIcon={
                                    <ThemeIcon color="grape">
                                        <IconLicense />
                                    </ThemeIcon>
                                }
                                styles={(theme) => ({
                                    root: {
                                        border: 0,
                                        height: 42,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    },
                                    inner: {
                                        justifyContent: 'flex-start',
                                    },
                                    leftIcon: {
                                        marginRight: 10,
                                        opacity: 0.5,
                                    },
                                })}
                            >
                                <Text size="sx" weight={500}>
                                    Phân Quyền
                                </Text>
                            </Button>
                        </Col>
                    </>
                ) : null}
            </Grid>
        </div>
    );
};

export default NavBarLink;
