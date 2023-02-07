import CssBaseLine from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Route, Routes } from 'react-router';
import Cookies from 'universal-cookie';
import './App.css';
import Auth from './components/Auth';
import Dashboard from './scenes/dashboard';
import Sidemenu from './scenes/global/Sidemenu';
import TopBar from './scenes/global/Topbar';
import { ColorModeContext, useMode } from './theme';

const cookies = new Cookies();

const App = () => {
	const [theme, colorMode] = useMode();
	const [isSidemenu, setIsSidemenu] = useState(true);
	const [isDashboard, setIsDashboard] = useState(true); //put user
	const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));

	console.log(isAuth);

	if (!isAuth) {
		return (
			<div>
				<Auth setIsAuth={setIsAuth} />
			</div>
		);
	}
	return (
		<ProSidebarProvider>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseLine />
					<div className="app">
						<Sidemenu setIsAuth={setIsAuth} isSidemenu={isSidemenu} />
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
