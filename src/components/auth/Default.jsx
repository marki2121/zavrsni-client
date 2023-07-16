import React from 'react'
import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Default = () => {
    const navigate = useNavigate();

    return (
        <>
            <Stack spacing={2} direction="column">
                <Button variant="contained" onClick={() => {navigate("/auth/login/")}}>
                    Login
                </Button>
                <Button variant="outlined" onClick={() => {navigate("/auth/register/")}}>
                    Register
                </Button>
            </Stack>
        </>
    )
}
export default Default
