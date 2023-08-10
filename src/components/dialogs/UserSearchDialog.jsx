import {
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
} from "@mui/material";
import React, {useState} from "react";
import {blue} from "@mui/material/colors";
import {searchUsers} from "../../functions/user/User";
import {useCookies} from "react-cookie";
import {addSubjectStudent} from "../../functions/subject/Subject";

const UserSearchDialog = (props) => {
    const [ cookie, , ] = useCookies(['access_token']);
    const { onClose, subject, open } = props;
    const [users, setUsers] = useState([]);

    const handleListItemClick = (value) => {
        addUser(value).then(() => {
            onClose(value);
        });
    };

    const handleClose = () => {
        onClose();
    };

    const searchBar = async (e) => {
        if(e.target.value === "") {
            setUsers([]);
        } else {
            const res = await searchUsers(cookie.access_token, e.target.value);

            if(res.status === 200) {
                setUsers(res.data)
            } else {
                console.log(res.data);
            }
        }
    }

    const addUser = async (user) => {
        console.log(user);
        addSubjectStudent( cookie.access_token, subject, user.id);
    }

    return(
        <Dialog open={open}>
            <DialogTitle>Search users</DialogTitle>
            <TextField lable="users" sx={{mx: 2}} onChange={(e) => {searchBar(e)}}/>
            <List>
                {users.map((user) => (
                    <ListItemButton
                        onClick={() => handleListItemClick(user)}
                        key={user.id}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={user.imageUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={user.firstName + " " + user.lastName} />
                    </ListItemButton>
                ))}
            </List>
            <Button variant="contained" sx={{m: 1}} onClick={() => handleClose()}>Close</Button>
        </Dialog>
    )
}

export default UserSearchDialog;