import React from 'react'
import {Container, Typography} from "@mui/material";
import {ErrorSharp} from "@mui/icons-material";

const Error = () => {
    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                <ErrorSharp/> 404 ERROR <ErrorSharp/>
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                The page you are looking for does not exist
            </Typography>
        </Container>
    )
}
export default Error;
