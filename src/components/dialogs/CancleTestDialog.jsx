import {Box, Button, Dialog, DialogTitle} from "@mui/material";
import React from "react";
import {cancelTestApplication} from "../../functions/test/Test";
import {useCookies} from "react-cookie";

const CancleTestDialog = (props) => {
    const {open, test, onClose} = props;
    const [ cookie, ,  ] = useCookies(['access_token']);
    const cancelTest = () => {
        cancelTestApplication(cookie.access_token, test).then((response) => {
                onClose(true);
            }
        )
    }

    const handleClose = () => {
        onClose(false);
    }

    return(
        <Dialog open={open}>
            <DialogTitle>Test application grading</DialogTitle>
            <Box>
                <Button onClick={() => {handleClose()}} variant="contained" sx={{mx: 4, mb: 2}}>Close</Button>
                <Button onClick={() => {cancelTest()}} variant="contained" sx={{mx: 4, mb: 2}} color={"warning"}>Cancel</Button>
            </Box>
        </Dialog>
    )
}

export default CancleTestDialog;