import {
    BackgroundImage,
    Box,
    Button,
    Center,
    Col,
    Container,
    Grid,
    Group,
    Image,
    Text,
    TextInput,
} from '@mantine/core';

import { motion } from 'framer-motion';
import Background from '../image/background.png';

import { IconKey, IconUser } from '@tabler/icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Logo from '../image/logo.png';

import { useNavigate } from 'react-router-dom';

import { postLogin } from '../apis/login.api';

const Login = () => {
    const navigate = useNavigate();

    const [errorUserName, setErrorUserName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');

    const { control, getValues, register } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSigninClicked = () => {
        const formValue = getValues();

        let isAllowSignIn = true;
        if (formValue.username === '') {
            setErrorUserName('Tài khoản không được trống!!');
            isAllowSignIn = false;
        } else {
            setErrorUserName('');
        }

        if (formValue.password === '') {
            setErrorPassword('Mật khẩu không được trống!!');
            isAllowSignIn = false;
        } else {
            setErrorPassword('');
        }

        if (isAllowSignIn) {
            postLogin(formValue)
                .then((res) => {
                    if (res.data.hasOwnProperty('error')) {
                        setErrorLogin(res.data.error);
                        localStorage.clear();
                    } else {
                        setErrorLogin('');
                        localStorage.setItem('username', res.data.username);
                        localStorage.setItem('role', res.data.role);
                        localStorage.setItem('token', res.data.token);

                        navigate('/');
                    }
                })
                .catch((err) => console.log(err.message));
        }
    };

    const onUserNameBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorUserName('');
        }
    };

    const onPasswordBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorPassword('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div style={{ height: '100vh' }}>
                <BackgroundImage src={Background} style={{ height: '100%' }}>
                    <Container
                        fluid={true}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box style={{ width: '70%' }}>
                            <Grid
                                style={{
                                    padding: '20px',
                                    borderRadius: '10px',
                                    boxShadow: '0 0 5px 0 rgba(0,0,0,.1)',
                                    backgroundColor: '#ffffff42',
                                }}
                            >
                                <Col
                                    span={12}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Grid>
                                        <Col span={12}>
                                            <div
                                                style={{
                                                    width: '100px',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                }}
                                            >
                                                <Image
                                                    radius="md"
                                                    src={Logo}
                                                    alt="Random unsplash image"
                                                />
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <Center>
                                                <Text
                                                    weight={500}
                                                    size="xl"
                                                    transform="uppercase"
                                                >
                                                    Đăng nhập
                                                </Text>
                                            </Center>
                                        </Col>
                                        <Col span={12}>
                                            <Controller
                                                name="username"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextInput
                                                        type="text"
                                                        placeholder="Tài khoản"
                                                        label="Tài khoản"
                                                        {...field}
                                                        error={errorUserName}
                                                        {...register(
                                                            'username',
                                                            {
                                                                onBlur: onUserNameBlur,
                                                            },
                                                        )}
                                                        icon={<IconUser />}
                                                    />
                                                )}
                                            ></Controller>
                                        </Col>
                                        <Col span={12}>
                                            <Controller
                                                name="password"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextInput
                                                        type="password"
                                                        placeholder="Mật khẩu"
                                                        label="Mật khẩu"
                                                        {...field}
                                                        error={errorPassword}
                                                        {...register(
                                                            'password',
                                                            {
                                                                onBlur: onPasswordBlur,
                                                            },
                                                        )}
                                                        icon={<IconKey />}
                                                    />
                                                )}
                                            ></Controller>
                                        </Col>
                                        {errorLogin !== '' ? (
                                            <Col span={12}>
                                                <Text color="red" size="sm">
                                                    {errorLogin}
                                                </Text>
                                            </Col>
                                        ) : null}
                                        <Col span={12}>
                                            <Button
                                                color="blue"
                                                variant="filled"
                                                fullWidth
                                                onClick={onSigninClicked}
                                            >
                                                Đăng nhập
                                            </Button>
                                        </Col>
                                    </Grid>
                                </Col>
                            </Grid>
                        </Box>
                    </Container>
                </BackgroundImage>
            </div>
        </motion.div>
    );
};

export default Login;
