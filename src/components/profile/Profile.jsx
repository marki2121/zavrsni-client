import React, {useContext} from 'react'
import {Avatar, Box, Button, Card, Typography} from "@mui/material";
import {UserContext} from "../../App";
import {useNavigate} from "react-router-dom";

export const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate("/profile/update");
    }

    return (
        <>
            <Card sx={{my: 1.5}}>
                <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'row'}}}>
                    <Box sx={{height: {md: 'max'}, m: 4}}>
                        <Avatar sx={{ width: 136, height: 136 }} src={user.imageUrl} alt="Avatar"/>
                    </Box>
                    <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: 4, ml: {xs: 2}, mx: 'auto'}}>
                        <Typography variant="h6" component="h6">
                            Username: {user.username}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Name: {user.firstName ? user.firstName : 'Not set'}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Surname: {user.lastName ? user.lastName : 'Not set'}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Email: {user.email ? user.email : 'Not set'}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Address: {user.address ? user.address : 'Not set'}
                        </Typography>
                    </Box>
                    <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: {md: 4}, ml: {xs: 2}, mx: 'auto'}}>
                        <Typography variant="h6" component="h6">
                            City: {user.city ? user.city : 'Not set'}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Zip code: {user.zipCode ? user.zipCode : 'Not set'}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Country: {user.country ? user.country : 'Not set'}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Phone: {user.phone ? user.phone : 'Not set'}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Role: {user.role}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6" component="h6" sx={{m: 2}}>
                        About me: {user.about ? user.about : 'Not set'}
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" sx={{m: 'auto', display: 'flex', mb: 2}} onClick={() => {handleUpdate()}}>
                        Update
                    </Button>
                </Box>
            </Card>
        </>
    )
}
