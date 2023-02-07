import React from "react";
import { useState } from "react";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router";
import CssBaseLine from "@mui/material/CssBaseline";
import { ProSidebarProvider } from "react-pro-sidebar";
import TopBar from "./scenes/global/Topbar";
import Sidemenu from "./scenes/global/Sidemenu";
import Dashboard from "./scenes/dashboard";

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidemenu, setIsSidemenu] = useState(true);

  return (
    <ProSidebarProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseLine />
          <div className="app">
            <Sidemenu isSidemenu={isSidemenu} />
            <main className="content">
              <TopBar setIsSidemenu={setIsSidemenu} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ProSidebarProvider>
  );
};

export default App;
