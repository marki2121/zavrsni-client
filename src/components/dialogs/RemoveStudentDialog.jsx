import {Box, Button, Dialog, DialogTitle} from "@mui/material";
import React from "react";
import {useCookies} from "react-cookie";
import {deleteSutdentFromSubject} from "../../functions/subject/Subject";

const RemoveStudentDialog = (props) => {
    const {open, subject, student, onClose} = props;
    const [ cookie, ,  ] = useCookies(['access_token']);
    const removeStudent = () => {
        deleteSutdentFromSubject(cookie.access_token, subject, student).then(() => {
            handleClose();
        })
    }

    const handleClose = () => {
        onClose(false);
    }

    return(
        <Dialog open={open}>
            <DialogTitle>Remove student</DialogTitle>
            <Box>
                <Button onClick={() => {handleClose()}} variant="contained" sx={{mx: 4, mb: 2}}>Close</Button>
                <Button onClick={() => {removeStudent()}} variant="contained" sx={{mx: 4, mb: 2}} color={"warning"}>Remove</Button>
            </Box>
        </Dialog>
    )
}

export default RemoveStudentDialog;