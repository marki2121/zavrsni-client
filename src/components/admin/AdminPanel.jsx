import {useCookies} from "react-cookie";
import {
    Avatar,
    Box,
    Card,
    CircularProgress,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getAllUser} from "../../functions/admin/admin";
import {FixedSizeList} from "react-window";
import {blue} from "@mui/material/colors";

const AdminPanel = () => {
    const [cookies, , ] = useCookies(['access_token']);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

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
            >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>

                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={users[index].firstName + " " + users[index].lastName + " " + users[index].role} />
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
                                    <FixedSizeList
                                        height={500}
                                        width={"90%"}
                                        itemCount={users.length}
                                        itemSize={35}
                                        style={{margin: 2, border: "1px solid lightgray"}}
                                    >
                                        {row}
                                    </FixedSizeList>
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