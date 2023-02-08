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
				width: 350,
				height: 250,
				backgroundColor: colors.primary[200],
				':hover': { backgroundColor: colors.primary[100] },
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
				<AddIcon fontSize="large" />
			</Grid>
		</Card>
	);
};

export default AddCard;
