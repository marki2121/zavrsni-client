import React, {useContext} from 'react'
import {Avatar, Box, Button, Card, TextField, Typography} from "@mui/material";
import {UserContext} from "../../App";

export const UpdateProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [aboutMe, setAboutMe] = React.useState('');

    return (
        <>
            <Card sx={{my: 1.5}}>
                <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'row'}}}>
                    <Box sx={{height: {md: 'max'}, m: 4}}>
                        <Avatar sx={{ width: 136, height: 136 }} src="/static/images/avatar/2.jpg" alt="Avatar"/>
                    </Box>
                    <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: 4, ml: {xs: 2}, mx: 'auto'}}>
                        <Typography variant="h6" component="h6">
                            Name: <TextField label="name" onChange={(e) => {setName(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Surname: <TextField label="surname" onChange={(e) => {setSurname(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Email: <TextField label="email" onChange={(e) => {setEmail(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Address: <TextField label="address" onChange={(e) => {setAddress(e.target.value)}}/>
                        </Typography>
                    </Box>
                    <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: {md: 4}, ml: {xs: 2}, mx: 'auto'}}>
                        <Typography variant="h6" component="h6">
                            City: <TextField label="city" onChange={(e) => {setCity(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Zip code: <TextField label="zip code" onChange={(e) => {setZipCode(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Country: <TextField label="country" onChange={(e) => {setCountry(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Phone: <TextField label="phone" onChange={(e) => {setPhone(e.target.value)}}/>
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6" component="h6" sx={{m: 2}}>
                        About me: <TextField label="aboutMe" onChange={(e) => {setAboutMe(e.target.value)}}/>
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" sx={{m: 'auto', display: 'flex', mb: 2}}>
                        Update
                    </Button>
                </Box>
            </Card>
        </>
    )
}
