import React, {useContext} from 'react'
import {Avatar, Box, Button, Card, TextField} from "@mui/material";
import {UserContext} from "../../App";
import {useCookies} from "react-cookie";
import {getSelf, updateSelf} from "../../functions/user/User";
import {useNavigate} from "react-router-dom";

export const UpdateProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const [ cookie, setCookie, removeCookie ] = useCookies(['access_token']);
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [aboutMe, setAboutMe] = React.useState('');
    const [image, setImage] = React.useState(null);

    const callUpdate = async () => {
        const response = await updateSelf(cookie.access_token, name, surname, email, phone, address, city, zipCode, country, aboutMe);

        if (response.status === 202) {
            await getSelf(cookie.access_token)
                .then((response) => {
                    setUser(response.data);

                    navigate('/profile');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log(response);
        }
    };

    const uploadImage = async (e) => {
        setImage(e.target.files[0]);
    }

    return (
        <>
            <Card sx={{my: 1.5}}>
                <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'row'}}}>
                    <Box sx={{height: {md: 'max'}, m: 4}}>
                        <Avatar sx={{ width: 136, height: 136 }} src="/static/images/avatar/2.jpg" alt={user.firstName}/>
                    </Box>
                    <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: 4, ml: {xs: 2}, mx: 'auto'}}>
                        <TextField sx={{m: 1}} label="name" onChange={(e) => {setName(e.target.value)}}/>
                        <TextField sx={{m: 1}} label="surname" onChange={(e) => {setSurname(e.target.value)}}/>
                        <TextField sx={{m: 1}} label="email" onChange={(e) => {setEmail(e.target.value)}}/>
                        <TextField sx={{m: 1}} label="address" onChange={(e) => {setAddress(e.target.value)}}/>
                    </Box>
                    <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: {md: 4}, ml: {xs: 2}, mx: 'auto'}}>
                        <TextField sx={{m: 1}} label="city" onChange={(e) => {setCity(e.target.value)}}/>
                        <TextField sx={{m: 1}} label="zip code" onChange={(e) => {setZipCode(e.target.value)}}/>
                        <TextField sx={{m: 1}} label="country" onChange={(e) => {setCountry(e.target.value)}}/>
                        <TextField sx={{m: 1}} label="phone" onChange={(e) => {setPhone(e.target.value)}}/>
                    </Box>
                </Box>
                <Box>
                    <TextField sx={{m: 1}} label="aboutMe" onChange={(e) => {setAboutMe(e.target.value)}}/>
                </Box>
                <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}}}>
                    <Button variant="contained" sx={{m: 'auto', display: 'flex', mb: 2}} onClick={() => {callUpdate()}}>
                        Update
                    </Button>
                    <Button sx={{m: 'auto', display: 'flex', mb: 2}} variant="contained" component="label">
                        Upload Image <input onChange={(e) => {uploadImage(e)}} type="file" hidden/>
                    </Button>
                </Box>
            </Card>
        </>
    )
}
