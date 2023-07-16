import React from 'react'
import {Grid, TextField} from "@mui/material";

const Login = () => {
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item>
                    <TextField label="email"/>
                </Grid>
                <Grid item>
                    <TextField label="password"/>
                </Grid>
            </Grid>
        </>
    )
}
export default Login;
