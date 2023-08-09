import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {AppRegistrationRounded} from "@mui/icons-material";
import {register} from "../../../functions/auth/Auth";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const callSignup = async () => {
        const response = await register(username, password, confirmPassword);

        if(response.status === 200) {
            navigate("/auth/login/");
        };
    };

    return (
        <>
            <Grid direction="column" justifyContent="center" justifyItems="center" spacing={2} marginX={5}>
                <Grid item margin={2}>
                    <TextField label="username" onChange={(e) => {setUsername(e.target.value)}}/>
                </Grid>
                <Grid item margin={2}>
                    <TextField type="password" label="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </Grid>
                <Grid item margin={2}>
                    <TextField type="password" label="confirm password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </Grid>
                <Grid item margin={2} textAlign="center">
                    <Button variant="contained" onClick={() => {callSignup()}}>
                        Register  <AppRegistrationRounded />
                    </Button>
                </Grid>
                <Grid item margine={2}>
                    <Divider  />
                </Grid>
                <Grid item margine={2} paddingTop={2} textAlign="center">
                    <Button onClick={() => {navigate("/auth/login/")}}>
                        <Typography>
                            I already have an account
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
export default Signup;
