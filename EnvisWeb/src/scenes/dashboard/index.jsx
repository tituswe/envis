import AddIcon from '@mui/icons-material/Add';
import {
	Box,
	Button,
	IconButton,
	Modal,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import {
	getDownloadURL,
	getStorage,
	listAll,
	ref,
	uploadBytes,
} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import AddCard from '../../components/AddCard';
import BasicCard from '../../components/BasicCard';

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

const Dashboard = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [data, setData] = useState([]);
	const [newDirectoryName, setNewDirectoryName] = useState('');
	const [newFileName, setNewFileName] = useState('');
	const [newFileContent, setNewFileContent] = useState('');

	const storage = getStorage();
	const listRef = ref(storage);

	const uploadTextFile = (content, fileName) => {
		const textFile = new Blob([content], { type: 'text/plain' });
		const storageRef = ref(storage, fileName);
		uploadBytes(storageRef, textFile).then((snapshot) => {
			console.log('Uploaded a blob or file!');
		});
	};

	const addFile = () => {
		const newFile = {
			id: Math.random(),
			name: newFileName,
		};

		uploadTextFile(newFileContent, newFileName);
		setNewFileName('');
		setNewFileContent('');
		handleClose();
	};

	useEffect(() => {
		listAll(listRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					const newItem = { header: item.name, description: url };
					setData((data) => [...data, newItem]);
				});
			});
		});
	}, []);

	return (
		<Box
			sx={{
				display: 'grid',
				gap: 6,
				gridTemplateColumns: 'repeat(4, 350px)',
				gridAutoRows: 'minmax(200px, auto)',
				m: '50px',
				width: '92%',
			}}
		>
			{data.map((item) => {
				return (
					<BasicCard header={item.header} description={item.description} />
				);
			})}
			<AddCard handleOpen={handleOpen} />
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
						value={newFileName}
						onChange={(e) => setNewFileName(e.target.value)}
					/>
					<TextField
						fullWidth
						id="modal-modal-description"
						label="Input File Content"
						variant="standard"
						sx={{ mt: 2 }}
						value={newFileContent}
						onChange={(e) => setNewFileContent(e.target.value)}
					/>
					<Button variant="contained" sx={{ mt: 2 }} onClick={() => addFile()}>
						Add File
					</Button>
				</Box>
			</Modal>
		</Box>
	);
};

export default Dashboard;
