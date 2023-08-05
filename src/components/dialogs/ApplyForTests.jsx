import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Dialog, DialogTitle, List, ListItemButton, ListItemText} from "@mui/material";
import {applyForTest, getTestsSubject} from "../../functions/test/Test";

const ApplyForTests = (props) => {
    const [ cookie, setCookie, removeCookie ] = useCookies(['access_token']);
    const { onClose, subject, open } = props;
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        onClose();
    };

    const buttonClick = (testId) => {
        applyForTest(cookie.access_token, testId).then((r) => {
            onClose();
        })
    }

    useEffect(() => {
        getTestsSubject( cookie.access_token, subject)
            .then((r) => {
                setTests(r);
                setLoading(false);
            }).catch(
            (e) => {
                console.log(e);
            }
        )
    }, []);

    return(
        <Dialog open={open}>
            <DialogTitle mx={20}>Tests</DialogTitle>
            <List>
                {!loading ?
                    <>
                {tests.map((test) => (
                    <ListItemButton key={test.id} onClick={() => {buttonClick(test.id)}}>
                        <ListItemText primary={"Date: " + test.date} secondary={"Note: " + test.note} />
                    </ListItemButton>

                ))}
                    </>
                    :
                    <CircularProgress />
                }
            <Button variant="contained" sx={{m: 1}} onClick={() => handleClose()}>Close</Button>
            </List>
        </Dialog>
    )
}

export default ApplyForTests;