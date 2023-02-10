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
				<MenuOutlinedIcon
					onClick={() => collapseSidebar()}
					sx={{ color: colors.primary[100] }}
				/>
			</IconButton>
			{/* SEARCH BAR */}
			<Box
				display="flex"
				sx={{ background: 'linear-gradient(145deg, #f0f0f0, #cacaca)' }}
				borderRadius="25px"
				width="80%"
			>
				<InputBase
					sx={{ ml: 2, flex: 1, color: colors.primary[100] }}
					placeholder="Search"
				/>
				<IconButton type="button" sx={{ p: 1 }}>
					<SearchIcon mr="2px" sx={{ color: colors.primary[100] }} />
				</IconButton>
			</Box>

			{/* ICON BUTTONS */}
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlinedIcon sx={{ color: colors.primary[100] }} />
					) : (
						<LightModeOutlinedIcon sx={{ color: colors.primary[100] }} />
					)}
				</IconButton>
				<IconButton>
					<NotificationsOutlinedIcon sx={{ color: colors.primary[100] }} />
				</IconButton>
				<IconButton>
					<SettingsOutlinedIcon sx={{ color: colors.primary[100] }} />
				</IconButton>
				<IconButton>
					<PersonOutlinedIcon sx={{ color: colors.primary[100] }} />
				</IconButton>
			</Box>
		</Box>
	);
};

export default Topbar;
