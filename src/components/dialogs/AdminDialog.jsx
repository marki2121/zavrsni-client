import {useCookies} from "react-cookie";
import {Box, Button, Dialog, DialogTitle, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {demoteUser, disableUser, enableUser, getUserById, promoteUser} from "../../functions/admin/admin";

const AdminDialog = (props) => {
    const [ cookie, setCookie, removeCookie ] = useCookies(['access_token']);
    const { onClose, userId, open } = props;
    const [user, setUser] = useState([]);

    const Close = () => {
        onClose();
    }

    const enable = () => {
        enableUser(cookie.access_token, userId).then((r) => {
            getUserById(cookie.access_token, userId).then((r) => {
                setUser(r) })
        }).catch((e) => {
            console.log(e)
        })
    }

    const disable = () => {
        disableUser(cookie.access_token, userId).then((r) => {
            getUserById(cookie.access_token, userId).then((r) => {
                setUser(r) })
        }).catch((e) => {
            console.log(e)
        })
    }

    const promote = () => {
        promoteUser(cookie.access_token, userId).then((r) => {
            getUserById(cookie.access_token, userId).then((r) => {
                setUser(r) })
        }).catch((e) => {
            console.log(e)
        })
    }

    const demote = () => {
        demoteUser(cookie.access_token, userId).then((r) => {
            getUserById(cookie.access_token, userId).then((r) => {
                setUser(r) })
        }).catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {
        if(open) {
            getUserById(cookie.access_token, userId).then((r) => {
                setUser(r)
            }).catch((e) => {
                console.log(e)
            })
        }
    }, [open, userId])

    return(
        <Dialog open={open}>
            <DialogTitle mx={20}>User</DialogTitle>
            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "row"}}}>
                <Box m={2}>
                    <Typography mx={1}> Username: {user.username} </Typography>
                    <Typography mx={1}> Full name: {user.firstName} {user.lastName} </Typography>
                    <Typography mx={1}> Email: {user.email === null ? "Not set" : user.email}</Typography>
                    <Typography mx={1}> Phone: {user.phoneNumber === null ? "Not set" : user.phoneNumber}</Typography>
                    <Typography mx={1}> Role: {user.role} </Typography>
                    <Typography mx={1}> Enabled: {user.active}</Typography>
                </Box>
                <Box m={2} sx={{display: 'flex', flexDirection: "column"}}>
                    {user.role === "ADMIN" ?
                        <Button sx={{mb: 1}} variant="contained" disabled={true}>Promote</Button>
                        :
                        <Button sx={{mb: 1}} variant="contained" onClick={() => {promote()}}>Promote</Button>
                    }
                    {user.role === "STUDENT" ?
                        <Button sx={{mb: 1}} variant="contained" disabled={true}>Demote</Button>
                        :
                        <Button sx={{mb: 1}} variant="contained" onClick={() => {demote()}}>Demote</Button>
                    }
                    {user.active === "true" ?
                        <Button sx={{mb: 1}} variant="contained" disabled={true}>Enable</Button>
                        :
                        <Button sx={{mb: 1}} variant="contained" onClick={() => {enable()}}>Enable</Button>
                    }
                    {user.active === "false" ?
                        <Button sx={{mb: 1}} variant="contained" disabled={true}>Disable</Button>
                        :
                        <Button sx={{mb: 1}} variant="contained" onClick={() => {disable()}}>Disable</Button>
                    }
                    <Button sx={{mb: 1}} variant="contained" color={"warning"}>Delete</Button>
                </Box>
            </Box>
            <Button variant="contained" sx={{m: 2}} onClick={() => {Close()}}>
                Close
            </Button>
        </Dialog>
    )
}

export default AdminDialog;