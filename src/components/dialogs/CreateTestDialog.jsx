import {Button, Dialog, DialogTitle, Grid, List, ListItem, TextField,} from "@mui/material";
import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {addTest} from "../../functions/test/Test";

const CreateTestDialog = (props) => {
    const [ cookie, ,  ] = useCookies(['access_token']);
    const { onClose, subject, open } = props;
    const [date, setDate] = useState(null);
    const [note, setNote] = useState(null);


    const handleClose = () => {
        onClose();
    };

    const addTestToSubject = () => {
        addTest(cookie.access_token, subject, date, note).then(r => {
            onClose();
        })
    }

    return(
        <Dialog open={open}>
            <DialogTitle>Add test</DialogTitle>
            <List>
                <ListItem>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="date"
                        fullWidth
                        onChange={(e) => {setDate(e.target.value)}}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="note"
                        type="text"
                        fullWidth
                        onChange={(e) => {setNote(e.target.value)}}
                    />
                </ListItem>
            </List>
            <Grid container columns={16} justify="space-betwean" sx={{mb: 2}}>
                <Grid item xs={8} align="center">
                    <Button variant="contained" onClick={() => {handleClose()}}>Close</Button>
                </Grid>
                <Grid item xs={8} align="center">
                    <Button variant="contained" onClick={() => {addTestToSubject()}}>Add test</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default CreateTestDialog;