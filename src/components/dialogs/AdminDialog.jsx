import {useCookies} from "react-cookie";
import {Box, Button, Dialog, DialogTitle, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getUserById} from "../../functions/admin/admin";

const AdminDialog = (props) => {
    const [ cookie, setCookie, removeCookie ] = useCookies(['access_token']);
    const { onClose, userId, open } = props;
    const [user, setUser] = useState([]);

    useEffect(() => {
        if(open) {
            getUserById(cookie.access_token, userId).then((r) => {
                setUser(r)
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [])

    return(
        <Dialog open={open}>
            <DialogTitle mx={20}>User</DialogTitle>
            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "row"}}}>
                <Box m={2}>
                    <Typography mx={1}> Username: {user.username} </Typography>
                    <Typography mx={1}> Full name: {user.firstName} {user.lastName} </Typography>
                    <Typography mx={1}> Role: {user.role} </Typography>
                </Box>
                <Box m={2} sx={{display: 'flex', flexDirection: "column"}}>
                    <Button sx={{mb: 1}} variant="contained">Promote</Button>
                    <Button sx={{mb: 1}} variant="contained">Demote</Button>
                    <Button sx={{mb: 1}} variant="contained">Enable</Button>
                    <Button sx={{mb: 1}} variant="contained">Disable</Button>
                    <Button sx={{mb: 1}} variant="contained" color={"warning"}>Delete</Button>
                </Box>
            </Box>
            <Button variant="contained" m={2}>
                Close
            </Button>
        </Dialog>
    )
}

export default AdminDialog;