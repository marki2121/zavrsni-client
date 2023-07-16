import React from 'react'
import {Box, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";

const Auth = () => {
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Box maxWidth="xs" borderRadius="30px" border="1px solid black" paddingY={5}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Authentication
                    </Typography>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Auth;
