import {
    ActionIcon,
    AppShell,
    Burger,
    ColorSchemeProvider,
    Header,
    Image,
    MantineProvider,
    MediaQuery,
    Navbar,
    Space,
    Text,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { useState } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

import IconChangeTheme from '../components/iconChangeTheme';
import MainContent from '../components/mainContent';
import NavBarLink from '../components/navbarLink';

import Logo from '../image/logo.png';

import { IconPower } from '@tabler/icons';

function Layout() {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme-selling-fruit',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    const [opened, setOpened] = useState(false);

    const navigate = useNavigate();

    const onLogoutClick = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token');

        navigate('/login');
    };

    const getUsername = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return <Navigate to="/login" />;
        } else {
            const token = localStorage.getItem('token');

            let decodeToken = jwt_decode(token);

            return decodeToken.username;
        }
    };

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCSS
            >
                <div className="main">
                    <AppShell
                        padding="md"
                        navbarOffsetBreakpoint="sm"
                        navbar={
                            <Navbar
                                hiddenBreakpoint="sm"
                                hidden={!opened}
                                width={{ sm: 200, lg: 250 }}
                                p="xs"
                            >
                                <NavBarLink />
                            </Navbar>
                        }
                        header={
                            <Header height={60} p="xs">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: '100%',
                                    }}
                                >
                                    <MediaQuery
                                        largerThan="sm"
                                        styles={{ display: 'none' }}
                                    >
                                        <Burger
                                            opened={opened}
                                            onClick={() => setOpened((o) => !o)}
                                            size="sm"
                                            mr="xl"
                                        />
                                    </MediaQuery>
                                    <Image
                                        width={65}
                                        radius="md"
                                        src={Logo}
                                        alt="Random unsplash image"
                                    />
                                    <Text
                                        size="lg"
                                        weight={500}
                                        variant="gradient"
                                        gradient={{
                                            from: 'red',
                                            to: 'yellow',
                                            deg: 45,
                                        }}
                                        transform="uppercase"
                                    >
                                        Nhất Nam Food
                                    </Text>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text color="white" size="sm">
                                            {getUsername()}
                                        </Text>
                                        <Space w="md" />
                                        <ActionIcon
                                            color="teal"
                                            variant="filled"
                                            onClick={onLogoutClick}
                                        >
                                            <IconPower size={18} />
                                        </ActionIcon>
                                        <Space w="md" />
                                        <IconChangeTheme />
                                    </div>
                                </div>
                            </Header>
                        }
                        styles={(theme) => ({
                            main: {
                                backgroundColor:
                                    theme.colorScheme === 'dark'
                                        ? theme.colors.dark[8]
                                        : theme.colors.gray[0],
                            },
                        })}
                    >
                        <MainContent />
                    </AppShell>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default Layout;
