import {useCookies} from "react-cookie";
import {Box, Card, CircularProgress, ListItemButton, ListItemText, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getAllUser} from "../../functions/admin/admin";
import {FixedSizeList} from "react-window";
import AdminDialog from "../dialogs/AdminDialog";

const AdminPanel = () => {
    const [cookies, , ] = useCookies(['access_token']);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        getAllUser(cookies.access_token)
            .then(res => {
                setUsers(res);
                setUser(null);
                setOpen(false);
            });
    }

    useEffect(() => {
        getAllUser(cookies.access_token)
            .then(res => {
                setUsers(res);
                setLoading(true);
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    const row = ({index, style}) => {
        return(
            <ListItemButton
                key={users[index].id}
                onClick={() => { setUser(users[index].id); handleOpen()}}
            >
                <ListItemText primary={"Full name: " + users[index].firstName + " " + users[index].lastName + " | Role: " + users[index].role} />
            </ListItemButton>
        )
    }

    return(
        <Card sx={{my: 1.5}}>
            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "column"}}}>
                <Box sx={{p: 2, mx: "auto"}}>
                    <Typography variant="h6" sx={{fontSize: 30}}>
                        Admin Portal
                    </Typography>
                </Box>
                    <Box width={1} m={2}>
                        {loading ?
                            <>
                                <Typography variant="h5">
                                    Users:
                                </Typography>
                            { users.length < 1 ?
                                    <Typography variant="body1">
                                        No users found
                                    </Typography>
                                    :
                                <>
                                    <FixedSizeList
                                        height={500}
                                        width={"90%"}
                                        itemCount={users.length}
                                        itemSize={35}
                                        style={{margin: 2, border: "1px solid lightgray"}}
                                    >
                                        {row}
                                    </FixedSizeList>
                                    <AdminDialog
                                        open={open}
                                        userId={user}
                                        onClose={handleClose}
                                        />
                                </>
                            }
                            </>
                        :
                            <CircularProgress />
                        }
                    </Box>
            </Box>
        </Card>
    )
}

export default AdminPanel;