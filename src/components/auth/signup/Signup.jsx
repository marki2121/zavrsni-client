import React from 'react'
import {useNavigate} from "react-router-dom";
import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {AppRegistrationRounded} from "@mui/icons-material";

const Signup = () => {
    const navigate = useNavigate();

    return (
        <>
            <Grid direction="column" justifyContent="center" justifyItems="center" spacing={2} margin={2}>
                <Grid item margin={2}>
                    <TextField label="username"/>
                </Grid>
                <Grid item margin={2}>
                    <TextField label="password"/>
                </Grid>
                <Grid item margin={2}>
                    <TextField label="confirm password"/>
                </Grid>
                <Grid item margin={2} textAlign="center">
                    <Button variant="contained">
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
