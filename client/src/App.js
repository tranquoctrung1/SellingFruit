import {
  AppShell,
  Burger,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";

import IconChangeTheme from "./components/iconChangeTheme";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.title = "Selling Fruits | Nhật Nam Food";
  }, []);

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
                width={{ sm: 200, lg: 300 }}
                p="xs"
              ></Navbar>
            }
            header={
              <Header height={60} p="xs">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      mr="xl"
                    />
                  </MediaQuery>
                  <Text>Application header</Text>
                  <IconChangeTheme />
                </div>
              </Header>
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            {/* Your application here */}
          </AppShell>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
