import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { tokens } from '../theme';

const AddCard = ({ handleOpen }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Card
			onClick={handleOpen}
			sx={{
				width: 300,
				height: 250,
				// backgroundColor: colors.primary[500],
				background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
				':hover': { background: 'linear-gradient(145deg, #9e9e9e, #bcbcbc)' },
				borderRadius: '25px',
				boxShadow: '25px 25px 50px #fcfcfc, -25px -25px 50px #ffffff',
			}}
		>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				width="100%"
				height="100%"
			>
				<AddIcon
					fontSize="large"
					style={{ color: colors.primary[100], fontSize: 60 }}
				/>
			</Grid>
		</Card>
	);
};

export default AddCard;
