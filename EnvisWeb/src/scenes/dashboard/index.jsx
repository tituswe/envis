import { Box, IconButton, useTheme } from '@mui/material';
import React from 'react';
import Card from '../../components/Card';

const Dashboard = () => {
	return (
		<Box
			sx={{
				display: 'grid',
				gap: 1,
				gridTemplateColumns: 'repeat(4, 250px)',
				m: '50px',
			}}
		>
			<Card description="Lorem Ipsum" />
			<Card description="Dolor Eria" />
			<Card description="Lorem Ipsum" />
			<Card description="Lorem Ipsum" />
			<Card description="Lorem Ipsum" />
			<Card description="Lorem Ipsum" />
			<Card description="Lorem Ipsum" />
			<Card description="Lorem Ipsum" />
			<Card description="Lorem Ipsum" />
		</Box>
	);
};

export default Dashboard;
