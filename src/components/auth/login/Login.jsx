import React, {useState} from 'react'
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {LoginRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {login} from "../../../functions/auth/Auth";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Grid direction="column" justifyContent="center" justifyItems="center" spacing={2} marginX={5}>
                <Grid item margin={2}>
                    <TextField label="username" onChange={(e) => {setUsername(e.target.value)}}/>
                </Grid>
                <Grid item margin={2}>
                    <TextField label="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </Grid>
                <Grid item margin={2} textAlign="center">
                    <Button variant="contained" onClick={() => {login(username, password).then(r => console.log(r))}}>
                        Login  <LoginRounded />
                    </Button>
                </Grid>
                <Grid item margine={2}>
                    <Divider  />
                </Grid>
                <Grid item margine={2} paddingTop={2} textAlign="center">
                    <Button onClick={() => {navigate("/auth/register/")}}>
                        <Typography>
                            I don't have an account
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
export default Login;
