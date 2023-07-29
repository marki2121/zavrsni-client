import {useParams} from "react-router-dom";
import {Box, Button, Card, CircularProgress, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getSubject} from "../../../functions/subject/Subject";
import {useCookies} from "react-cookie";
import {FixedSizeList} from "react-window";
import UserSearchDialog from "../../dialogs/UserSearchDialog";

const Subject = () => {
    const {id} = useParams();
    const [subject, setSubject] = useState(null);
    const [ cookie, setCookie, removeCookie ] = useCookies(['access_token']);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    useEffect(() => {
        console.log("useEffect");
        if( cookie.access_token && loading){
            console.log("get subject");
            getSubject( cookie.access_token, id)
                .then((r) => {
                    setSubject(r);
                    setLoading(false);
                }).catch((e) => {
                    console.log(e);
                })
        }
    }, []);

    const row = ({index, style}) => {
        return(
            <div style={style}>
                {index}
            </div>
        )
    }

    return(
        <Card sx={{my: 1.5}}>
            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "column"}}}>
                { !loading ?
                    <Box sx={{p: 2, mx: "auto"}}>
                        <Typography variant="h6">
                            {subject.Name}
                        </Typography>
                        <Box sx={{display: {md: 'flex'}, flexDirection: {md: "row"}}}>
                            <Box m={2}>
                                <Typography variant="body1">
                                    Subject description: {subject.Description}
                                </Typography>
                            </Box>
                            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "column"}}}>
                                <Box sx={{display: 'flex', flexDirection:  "row", my: 1}}>
                                    <Typography variant="h6">
                                        Students:
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" width="100%">
                                        <Button variant="contained" onClick={handleClickOpen}>
                                            Add student
                                        </Button>
                                        <UserSearchDialog
                                            open={open}
                                            onClose={handleClose}
                                        />
                                    </Box>
                                </Box>
                                <FixedSizeList
                                    height={150}
                                    itemCount={1000}
                                    itemSize={35}
                                    width={330}
                                    style={{margin: 2, border: "1px solid lightgray"}}
                                    >
                                    {row}
                                </FixedSizeList>
                                <Box sx={{display: 'flex', flexDirection:  "row", my: 1}}>
                                    <Typography variant="h6">
                                        Tests:
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" width="100%">
                                        <Button variant="contained">
                                            Add test
                                        </Button>
                                    </Box>
                                </Box>
                                <FixedSizeList
                                    height={150}
                                    itemCount={1000}
                                    itemSize={35}
                                    width={330}
                                    margin={2}
                                    style={{margin: 2, border: "1px solid lightgray"}}
                                >
                                    {row}
                                </FixedSizeList>
                            </Box>
                        </Box>
                    </Box>
                :
                    <Box sx={{p: 2, mx: "auto"}}>
                        <CircularProgress />
                    </Box>
                }
            </Box>
        </Card>
    )
}

export default Subject;