import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { TreeItem, TreeView } from '@mui/lab';
import {
	Box,
	Button,
	Input,
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

	const treeData = [
		{
			id: 1,
			name: 'Directory 1',
			children: [
				{
					id: 2,
					name: 'Sub-directory 1',
					children: [
						{
							id: 3,
							name: 'File 1',
						},
					],
				},
			],
		},
	];

	const FolderItem = {
		id: '',
		name: '',
		children: [],
	};

	const [data, setData] = useState(treeData);
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

	const addDirectory = () => {
		const newDirectory = {
			id: Math.random(),
			name: newDirectoryName,
			children: [],
		};
		setData([...data, newDirectory]);
		uploadTextFile('', newDirectoryName + '/sentinel.txt');
		setNewDirectoryName('');
	};

	const addFile = (directoryId) => {
		const newFile = {
			id: Math.random(),
			name: newFileName,
		};

		setData(
			data.map((item) => {
				if (item.id === directoryId) {
					return { ...item, children: [...item.children, newFile] };
				}
				return item;
			})
		);
		uploadTextFile(newFileContent, newFileName);
		setNewFileName('');
		setNewFileContent('');
		handleClose();
	};

	useEffect(() => {
		listAll(listRef).then((response) => {
			response.items.forEach((item) => {
				const newItem = {
					id: item.name,
					name: item.name,
					children: [],
				};
				setData((prev) => [...prev, newItem]);
			});
		});
	}, []);

	return (
		<div>
			<TreeView
				aria-label="file system navigator"
				defaultCollapseIcon={<FolderOutlinedIcon />}
				defaultExpandIcon={<FolderIcon />}
				defaultEndIcon={<ArticleIcon />}
				sx={{ height: 240, flexGrow: 1, maxWidth: '92%', overflowY: 'auto' }}
			>
				{data.map((item) => (
					<TreeItem key={item.id} nodeId={item.id} label={item.name}>
						{item.children.map((child) => (
							<TreeItem key={child.id} nodeId={child.id} label={child.name} />
						))}

						<a variant="text" onClick={handleOpen}>
							<TreeItem
								icon={<AddIcon />}
								nodeId="90"
								label="Create File/Directory"
							/>
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
								<Button
									variant="contained"
									sx={{ mt: 2 }}
									onClick={() => addFile(item.id)}
								>
									Add File
								</Button>

								<Typography
									id="modal-modal-title"
									variant="h6"
									component="h2"
									sx={{ mt: 4 }}
								>
									Create a Directory
								</Typography>
								<TextField
									value={newDirectoryName}
									onChange={(e) => setNewDirectoryName(e.target.value)}
									fullWidth
									id="modal-modal-description"
									label="Input Directory Name"
									variant="standard"
									sx={{ mt: 2 }}
								/>
								<Button
									variant="contained"
									sx={{ mt: 2 }}
									onClick={addDirectory}
								>
									Add Directory
								</Button>
							</Box>
						</Modal>
					</TreeItem>
				))}
			</TreeView>
		</div>

		/* <TreeItem nodeId="0" label="Directory">
        <TreeItem nodeId="1" label="Sub Directory 1">
          <TreeItem nodeId="2" label="File 1" />
          <a variant="text" onClick={handleOpen}>
            <TreeItem icon={<AddIcon />} nodeId="3" label="Create File" />
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
              <Button variant="contained" sx={{ mt: 2 }}>
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
      </TreeItem> */
	);
};

export default Card;
