import React from 'react'
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {LoginRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <>
            <Grid direction="column" justifyContent="center" justifyItems="center" spacing={2} marginX={5}>
                <Grid item margin={2}>
                    <TextField label="username"/>
                </Grid>
                <Grid item margin={2}>
                    <TextField label="password"/>
                </Grid>
                <Grid item margin={2} textAlign="center">
                    <Button variant="contained">
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
