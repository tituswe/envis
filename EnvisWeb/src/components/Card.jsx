import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import { tokens } from "../theme";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ArticleIcon from '@mui/icons-material/Article';

const Card = ({ description }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<FolderOutlinedIcon />}
      defaultExpandIcon={<FolderIcon />}
      defaultEndIcon={<ArticleIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <TreeItem nodeId="0" label="Directory">
        <TreeItem nodeId="1" label="Sub Directory 1">
          <TreeItem nodeId="2" label="File 1" />
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
