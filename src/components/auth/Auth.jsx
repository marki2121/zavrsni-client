import React from 'react'
import {Box, Container, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";

const Auth = () => {
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Container maxWidth="xs">
                    <Typography variant="h5" align="center" gutterBottom>
                        Authntication
                    </Typography>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Outlet />
                    </Box>
                </Container>
            </Box>
        </>
    )
}
export default Auth;
