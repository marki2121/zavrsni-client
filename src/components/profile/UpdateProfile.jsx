import React, {useContext} from 'react'
import {Avatar, Box, Button, Card, TextField, Typography} from "@mui/material";
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
                        <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", my: 1}}>
                            Name:  <TextField label="name" onChange={(e) => {setName(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", my: 1}}>
                            Surname: <TextField label="surname" onChange={(e) => {setSurname(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", my: 1}}>
                            Email: <TextField label="email" onChange={(e) => {setEmail(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", my: 1}}>
                            Address: <TextField label="address" onChange={(e) => {setAddress(e.target.value)}}/>
                        </Typography>
                    </Box>
                    <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: {md: 4}, ml: {xs: 2}, mx: 'auto'}}>
                        <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", my: 1}}>
                            City: <TextField label="city" onChange={(e) => {setCity(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", my: 1}}>
                            Zip code: <TextField label="zip code" onChange={(e) => {setZipCode(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", my: 1}}>
                            Country: <TextField label="country" onChange={(e) => {setCountry(e.target.value)}}/>
                        </Typography>
                        <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", my: 1}}>
                            Phone: <TextField label="phone" onChange={(e) => {setPhone(e.target.value)}}/>
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6" component="h6" sx={{display: "flex", alignItems: "center", m: 2}}>
                        About me: <TextField label="aboutMe" onChange={(e) => {setAboutMe(e.target.value)}}/>
                    </Typography>
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
