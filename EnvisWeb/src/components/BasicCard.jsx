import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
	const { header, description } = props;
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Card
			sx={{
				width: 350,
				height: 250,
				backgroundColor: colors.primary[400],
				':hover': { backgroundColor: colors.primary[100] },
			}}
		>
			<CardContent>
				<Typography variant="h2" color="text.secondary" gutterBottom>
					{header}
				</Typography>
				<Typography variant="body2">{description}</Typography>
			</CardContent>
		</Card>
	);
};

export default BasicCard;
