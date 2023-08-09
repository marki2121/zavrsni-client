import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {getSubjectUser} from "../../../functions/subject/Subject";
import {getTestsUser} from "../../../functions/test/Test";
import {Box, Button, Card, CircularProgress, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {FixedSizeList} from "react-window";
import ApplyForTestsDialog from "../../dialogs/ApplyForTestsDialog";
import CancleTestDialog from "../../dialogs/CancleTestDialog";

const MySubject = () => {
    const {id} = useParams();
    const [subject, setSubject] = useState(null);
    const [ cookie, ,  ] = useCookies(['access_token']);
    const [loading, setLoading] = useState(true);
    const [openTests, setOpenTests] = React.useState(false);
    const [testId, setTestId] = useState(null);
    const [openCancleTest, setOpenCancleTest] = React.useState(false);
    const [tests, setTests] = useState([]);
    const [ind, setInd] = useState(null);

    const handleClickOpenTest = ( index ) => {
        setInd(index);
        setOpenTests(true);
    };

    const handleClickOpenCancleTest = ( index ) => {
        setOpenCancleTest(true);
    };

    const handleCloseTest = (value) => {
        getTestsUser( cookie.access_token, id )
            .then((r) => {
                setTests(r);
                setOpenTests(false);
            })
    };

    const handleCloseCancleTest = (value) => {
        if(value) {
            getTestsUser( cookie.access_token, id )
                .then((r) => {
                    setTests(r);
                    setOpenCancleTest(false);
                }).catch((e) => {
            });
        } else {
            setOpenCancleTest(false);
        }
    };

    useEffect(() => {
        if( cookie.access_token && loading){
            getSubjectUser( cookie.access_token, id )
                .then((r) => {
                    setSubject(r);
                }).catch((e) => {
            }).then(() => {
                getTestsUser( cookie.access_token, id )
                    .then((r) => {
                        setTests(r);
                        setLoading(false);
                    }).catch((e) => {
                });
            })
        }
    }, []);

    const rowTest = ({index, style}) => {
        return(
            <>
            {tests[index].testGraded ?
                    <ListItem key={tests[index].id}>
                        <ListItemText primary={"Date: " + tests[index].testDate + " | Note: " + tests[index].testNote + " | Grade: " + tests[index].grade + "%"}  />
                    </ListItem>
                    :
                    <ListItemButton key={tests[index].id} onClick={() => {setTestId(tests[index].id); handleClickOpenCancleTest()}}>
                        <ListItemText primary={"Date: " + tests[index].testDate + " | Note: " + tests[index].testNote} />
                    </ListItemButton>
            }
            </>
        )
    }

    return(
        <Card sx={{my: 1.5}}>
            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "column"}}}>
                { !loading ?
                    <Box sx={{p: 2}}>
                        <Typography variant="h6" align={"center"} sx={{mb: 2, fontSize: 30}}>
                            {subject.Name}
                        </Typography>
                        <Box sx={{display: {md: 'flex'}, flexDirection: {md: "row"}, width: "100%"}}>
                            <Box m={2} sx={{width: "100%"}}>
                                <Typography variant="h6">
                                    Subject description: {subject.Description}
                                </Typography>
                                <Typography variant="h6">
                                    Ects: {subject.Ects}
                                </Typography>
                                <Typography variant="h6">
                                    Semester: {subject.Semester}
                                </Typography>
                                <Typography variant="h6">
                                    Year: {subject.Year}
                                </Typography>
                            </Box>
                            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "column"}, width: "100%"}}>
                                <Box sx={{display: 'flex', flexDirection:  "row", my: 1}}>
                                    <Typography variant={"h6"}>
                                        Applied tests:
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" sx={{width: '80%'}}>
                                        <Button variant="contained" onClick={handleClickOpenTest}>
                                            Apply for test
                                        </Button>
                                        <ApplyForTestsDialog
                                            open={openTests}
                                            subject={subject.id}
                                            onClose={handleCloseTest}
                                        />
                                        <CancleTestDialog
                                            open={openCancleTest}
                                            test={testId}
                                            onClose={handleCloseCancleTest}
                                        />
                                    </Box>
                                </Box>
                                { tests.length < 1 ?
                                    <Typography variant="body1">
                                        No Tests
                                    </Typography>
                                    :
                                    <FixedSizeList
                                        height={150}
                                        itemCount={tests.length}
                                        itemSize={35}
                                        margin={2}
                                        style={{margin: 2, border: "1px solid lightgray"}}
                                    >
                                        {rowTest}
                                    </FixedSizeList>
                                }
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

export default MySubject;