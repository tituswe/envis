import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import React, { useContext } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { ColorModeContext, tokens } from '../../theme';

const Topbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);
	const { collapseSidebar } = useProSidebar();

	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			<IconButton>
				<MenuOutlinedIcon onClick={() => collapseSidebar()} />
			</IconButton>
			{/* SEARCH BAR */}
			<Box
				display="flex"
				backgroundColor={colors.primary[400]}
				borderRadius="3px"
				width="75%"
			>
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
				<IconButton type="button" sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box>

			{/* ICON BUTTONS */}
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
				<IconButton>
					<NotificationsOutlinedIcon />
				</IconButton>
				<IconButton>
					<SettingsOutlinedIcon />
				</IconButton>
				<IconButton>
					<PersonOutlinedIcon />
				</IconButton>
			</Box>
		</Box>
	);
};

export default Topbar;
