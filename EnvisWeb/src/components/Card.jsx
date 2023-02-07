import ArticleIcon from '@mui/icons-material/Article';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { TreeItem, TreeView } from '@mui/lab';
import {
	Box,
	Button,
	Modal,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { tokens } from '../theme';

const Card = ({ description }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	return (
		<TreeView
			aria-label="file system navigator"
			defaultCollapseIcon={<FolderOutlinedIcon />}
			defaultExpandIcon={<FolderIcon />}
			defaultEndIcon={<ArticleIcon />}
			sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
		>
			<TreeItem nodeId="0" label="Directory">
				<TreeItem nodeId="1" label="Sub Directory 1">
					<TreeItem nodeId="2" label="File 1" />
					<a variant="text" onClick={handleOpen}>
						<TreeItem nodeId="3" label="Create File" />
					</a>

					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Create a File
							</Typography>
							<TextField
								fullWidth
								id="modal-modal-description"
								label="Input File Name"
								variant="standard"
								sx={{ mt: 2 }}
							></TextField>
							<Button
								variant="contained"
								sx={{ mt: 2 }}
								style={{
									color: colors.blueAccent[100],
								}}
							>
								Create
							</Button>
						</Box>
					</Modal>
				</TreeItem>
				<TreeItem nodeId="5" label="Sub Directory 2">
					<TreeItem nodeId="10" label="File 2" />
					<TreeItem nodeId="6" label="Sub Sub Directory 1">
						<TreeItem nodeId="8" label="File 3" />
					</TreeItem>
				</TreeItem>
			</TreeItem>
		</TreeView>
	);
};

export default Card;
