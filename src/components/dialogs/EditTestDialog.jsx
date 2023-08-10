import {Button, Dialog, DialogTitle, Grid, List, ListItem, TextField} from "@mui/material";
import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {deleteTest, updateTest} from "../../functions/test/Test";

const EditTestDialog = (props) => {
    const {open, test, onClose} = props;
    const [date, setDate] = useState(null);
    const [note, setNote] = useState(null);
    const [ cookie, ,  ] = useCookies(['access_token']);

    const handleClose = () => {
        onClose();
    }

    const deleteTes = () => {
        deleteTest(cookie.access_token, test.id).then(() => {
            handleClose();
        }).catch((error) => {
            console.log(error);
        });
    }

    const update = () => {
        updateTest(cookie.access_token, test.id, date, note)
            .then(() => {
                handleClose();
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Add test</DialogTitle>
            <List>
                <ListItem>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="date"
                        fullWidth
                        placeholder={test.date}
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
                        placeholder={test.note}
                        onChange={(e) => {setNote(e.target.value)}}
                    />
                </ListItem>
            </List>
            <Grid container columns={16} align="center" alignContent="center" sx={{mb: 2, display: "flex", flexDirection: "column", mx: "auto"}}>
                <Grid item xs={8} align="center" m={1}>
                    <Button variant="contained" onClick={() => {handleClose()}}>Close</Button>
                </Grid>
                <Grid item xs={8} align="center" m={1}>
                    <Button variant="contained" onClick={() => {update()}}>Update</Button>
                </Grid>
                <Grid item xs={8} align="center" m={1}>
                    <Button variant="contained" color="warning" onClick={() => {deleteTes()}}>Delete</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default EditTestDialog;