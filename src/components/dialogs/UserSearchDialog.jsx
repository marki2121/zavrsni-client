import {
    Avatar,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
} from "@mui/material";
import React, {useState} from "react";
import {blue} from "@mui/material/colors";
import {Add} from "@mui/icons-material";

const UserSearchDialog = (props) => {
    const { onClose, open } = props;
    const [search, setSearch] = useState("");

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const searchBar = (e) => {
        setSearch(e.target.value)
    }
    const emails = ['mmaruna'];

    return(
        <Dialog open={open}>
            <DialogTitle>Search users</DialogTitle>
            <TextField lable="users" mx={2} onChange={(e) => {searchBar(e)}}/>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                    // eslint-disable-next-line react/jsx-no-undef
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('addAccount')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <Add />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    )
}

export default UserSearchDialog;