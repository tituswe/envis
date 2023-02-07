import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Typography, useTheme } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { auth } from '../../firebase/firebase-config';
import { tokens } from '../../theme';

const cookies = new Cookies();

const Sidemenu = (props) => {
	const { setIsAuth } = props;
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [selected, setSelected] = useState('Dashboard');
	const { collapsed } = useProSidebar();

	const signOutUser = async () => {
		console.log('sup2');
		try {
			console.log('signing out');
			const result = await signOut(auth);
			cookies.remove('auth-token', { path: '/' });
			setIsAuth(false);
		} catch (err) {
			console.log(err);
		}
	};

	const Item = ({ title, to, icon, selected, setSelected }) => {
		return (
			<MenuItem
				active={selected === title}
				style={{
					color: colors.grey[100],
				}}
				onClick={title === 'Logout' ? setSelected : () => setSelected(title)}
				icon={icon}
			>
				<Typography>{title}</Typography>
				<Link to={to} />
			</MenuItem>
		);
	};

	const HeaderBox = () => {
		return (
			<Box mb="20px" height="180px">
				<Box display="flex" justifyContent="center" alignItems="center">
					<img
						alt="profile-user"
						width="100px"
						height="100px"
						src={`../../logo192.png`}
						style={{ cursor: 'pointer', borderRadius: '50%' }}
					/>
				</Box>
				<Box textAlign="center">
					<Typography
						variant="h2"
						color={colors.grey[100]}
						fontWeight="bold"
						sx={{ m: '10px 0 0 0' }}
					>
						Titus Lowe
					</Typography>
					<Typography variant="h5" color={colors.greenAccent[500]}>
						Senior Software Developer
					</Typography>
				</Box>
			</Box>
		);
	};

	return (
		<Sidebar
			backgroundColor={colors.primary[400]}
			transitionDuration={800}
			collapsedWidth="100px"
		>
			<Menu iconShape="square">
				<Box mx="10px" my="20px">
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						ml="10px"
						mb="10px"
					>
						<Typography variant="h3" color={colors.grey[100]}>
							ENVIS
						</Typography>
					</Box>

					{collapsed ? <Box mb="20px" height="180px" /> : <HeaderBox />}

					<Box>
						<Item
							title="Dashboard"
							to="/"
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
					<Box>
						<Item
							title="Logout"
							to="/"
							icon={<LogoutIcon />}
							selected={selected}
							setSelected={signOutUser}
						/>
					</Box>
				</Box>
			</Menu>
		</Sidebar>
	);
};

export default Sidemenu;
