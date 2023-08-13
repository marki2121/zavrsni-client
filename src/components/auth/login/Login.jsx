import React, {useState} from 'react'
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {LoginRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {login} from "../../../functions/auth/Auth";
import {useCookies} from "react-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, setCookies] = useCookies(['access_token']);

    const callLogin = async () => {
        const response = await login(username, password);

        if(response.status === 200) {
            setCookies(
                "access_token",
                response.data,
                []);

            navigate("/")
        } else {
            console.log(response.status);
        }
    }

    return (
        <>
            <Grid direction="column" justifyContent="center" justifyItems="center" spacing={2} marginX={5}>
                <Grid item margin={2}>
                    <TextField label="username" onChange={(e) => {setUsername(e.target.value)}}/>
                </Grid>
                <Grid item margin={2}>
                    <TextField type="password" label="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </Grid>
                <Grid item margin={2} textAlign="center">
                    <Button variant="contained" onClick={() => {callLogin()}}>
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
