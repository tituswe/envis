import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { tokens } from '../theme';

import {
	getDownloadURL,
	getStorage,
	listAll,
	ref,
	uploadBytes,
} from 'firebase/storage';

const BasicCard = (props) => {
	const { header, description, deleteTextFile } = props;
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Card
			sx={{
				width: 300,
				height: 250,
				background: 'linear-gradient(145deg, #cacaca, #f0f0f0)',
				':hover': { background: 'linear-gradient(145deg, #9e9e9e, #bcbcbc)' },
				borderRadius: '25px',
				boxShadow: '25px 25px 50px #dedede, -25px -25px 50px #e2e2e2',
			}}
		>
			<Box>
				<CardContent>
					<Typography
						px="8px"
						variant="h2"
						color={colors.primary[100]}
						gutterBottom
					>
						{header}
					</Typography>
					<Divider
						sx={{ backgroundColor: colors.primary[100], borderBottomWidth: 1 }}
					/>
					<Typography
						px="4px"
						py="8px"
						variant="body2"
						color={colors.primary[200]}
						height="150px"
					>
						{description}
					</Typography>
					<Box
						width="100%"
						sx={{
							display: 'flex',
							flexDirection: 'row-reverse',
							justifyContent: 'flex-end',
						}}
					>
						{/* <IconButton onClick={deleteTextFile(header)}> */}
						<DeleteIcon
							sx={{ color: colors.primary[100] }}
							onClick={() => deleteTextFile(header)}
						/>
						{/* </IconButton> */}
						<Box sx={{ flexGrow: 1 }} />
					</Box>
				</CardContent>
			</Box>
		</Card>
	);
};

export default BasicCard;
