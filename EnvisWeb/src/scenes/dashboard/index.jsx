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
import Divider from '@mui/material/Divider';
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	setDoc,
	where,
} from 'firebase/firestore';
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
import { auth, db, provider, userId } from '../../firebase/firebase-config';
import { tokens } from '../../theme';

const style = {
	position: 'absolute',
	top: '100%',
	left: '57%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	background: 'linear-gradient(225deg, #cacaca, #f0f0f0)',
	borderRadius: '25px',
	boxShadow: 24,
	p: 4,
	outline: 'none',
	width: '70%',
	height: '100%',
};

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [data, setData] = useState([]);
	const [newFileName, setNewFileName] = useState('');
	const [newFileContent, setNewFileContent] = useState('');

	const storage = getStorage();
	const listRef = ref(storage);

	const uploadTextFile = (content, fileName) => {
		const userRef = doc(db, userId, fileName);
		setDoc(userRef, { content: content });
	};

	const addFile = () => {
		uploadTextFile(newFileContent, newFileName);
		setNewFileName('');
		setNewFileContent('');
		handleClose();
	};

	const deleteTextFile = async (fileName) => {
		console.log('Deleting file: ', fileName);
		await deleteDoc(doc(db, userId, fileName));
	};

	const q = query(collection(db, userId), where('content', '!=', ''));
	useEffect(() => {
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const newData = [];
			querySnapshot.forEach((doc) => {
				const item = { header: doc.id, description: doc.data().content };
				newData.push(item);
			});
			console.log(newData);
			console.log('Files in data: ', newData.join(', '));
			setData(newData);
		});

		return () => unsubscribe();
	}, []);

	return (
		<Box>
			<Typography variant="h1" fontWeight="bold" mx="50px" my="25px" pl="10px">
				Dashboard
			</Typography>
			<Divider
				sx={{ backgroundColor: colors.primary[100], borderBottomWidth: 2 }}
			/>
			<Box
				sx={{
					display: 'grid',
					gap: 5,
					gridTemplateColumns: 'repeat(3, 320px)',
					gridAutoRows: 'minmax(200px, auto)',
					mx: '50px',
					my: '50px',
					width: '92%',
				}}
			>
				{data.map((item) => {
					return (
						<BasicCard
							header={item.header}
							description={item.description}
							deleteTextFile={deleteTextFile}
						/>
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
						<Typography
							id="modal-modal-title"
							variant="h3"
							component="h2"
							fontWeight="bold"
						>
							Create a File
						</Typography>
						<Divider
							sx={{
								mt: 4,
								backgroundColor: colors.primary[100],
								borderBottomWidth: 1,
							}}
						/>
						<TextField
							required
							fullWidth
							id="outlined-required"
							label="Required"
							defaultValue="Name"
							sx={{ mt: 4 }}
							value={newFileName}
							onChange={(e) => setNewFileName(e.target.value)}
						/>
						<TextField
							id="outlined-multiline-static"
							label="Content"
							multiline
							rows={4}
							defaultValue="Default Value"
							fullWidth
							sx={{ mt: 2 }}
							value={newFileContent}
							onChange={(e) => setNewFileContent(e.target.value)}
						/>
						<Button
							variant="contained"
							sx={{
								mt: 2,
								background: 'linear-gradient(145deg, #0f172c, #121c34)',
							}}
							borderRadius="25px"
							onClick={() => addFile()}
						>
							Add File
						</Button>
					</Box>
				</Modal>
			</Box>
		</Box>
	);
};

export default Dashboard;
