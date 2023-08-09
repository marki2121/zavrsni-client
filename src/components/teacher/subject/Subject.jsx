import {useParams} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getSubject, getSubjectStudents} from "../../../functions/subject/Subject";
import {useCookies} from "react-cookie";
import {FixedSizeList} from "react-window";
import UserSearchDialog from "../../dialogs/UserSearchDialog";
import {blue} from "@mui/material/colors";
import CreateTestDialog from "../../dialogs/CreateTestDialog";
import {getTests} from "../../../functions/test/Test";
import GradeTestDialog from "../../dialogs/GradeTestDialog";

const Subject = () => {
    const {id} = useParams();
    const [subject, setSubject] = useState(null);
    const [ cookie, ,  ] = useCookies(['access_token']);
    const [loading, setLoading] = useState(true);
    const [openUsers, setOpenUsers] = React.useState(false);
    const [openTests, setOpenTests] = React.useState(false);
    const [openTestGrading, setOpenTestGrading] = React.useState(false);
    const [testId, setTestId] = useState(null);
    const [students, setStudents] = useState([]);
    const [tests, setTests] = useState([]);

    const handleClickOpenUsers = () => {
        setOpenUsers(true);
    };

    const handleClickOpenTests = () => {
        setOpenTests(true);
    };

    const handleClickOpenTestGrading = (id) => {
        setTestId(id);
        setOpenTestGrading(true);
    };

    const handleCloseGrading = (value) => {
        setOpenTestGrading(false);
    }

    const handleCloseUsers = (value) => {
        getSubjectStudents( cookie.access_token, id)
            .then((r) => {
                setStudents(r);
                setOpenUsers(false);
            }).catch((e) => {
        })
    };

    const handleCloseTests = (value) => {
        getTests( cookie.access_token, id)
            .then((r) => {
                setTests(r);
                setOpenTests(false);
            }).catch((e) => {
            });
    };

    useEffect(() => {
        if( cookie.access_token && loading){
            getSubject( cookie.access_token, id )
                .then((r) => {
                    setSubject(r);
                }).catch((e) => {
                })

            getTests( cookie.access_token, id )
                .then((r) => {
                    setTests(r);
                }).catch((e) => {
            });

            getSubjectStudents( cookie.access_token, id )
                .then((r) => {
                    setStudents(r);
                    setLoading(false);
                }).catch((e) => {
                    console.log(e);
                })
        }
    });

    const rowStudent = ({index, style}) => {
        return(
            <ListItemButton
                key={students[index].id}
            >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={students[index].imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={students[index].firstName + " " + students[index].lastName} />
            </ListItemButton>
        )
    }

    const rowTest = ({index, style}) => {
        return(
            <>
                <ListItemButton
                    key={tests[index].id}
                    onClick={() => {handleClickOpenTestGrading(tests[index].id)}}
                >
                    <ListItemText primary={"Date: " + tests[index].date + " Note: " + tests[index].note} />
                </ListItemButton>
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
                                    <Typography variant="h6">
                                        Students:
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" width="100%">
                                        <Button variant="contained" onClick={handleClickOpenUsers}>
                                            Add student
                                        </Button>
                                        <UserSearchDialog
                                            open={openUsers}
                                            subject={subject.id}
                                            onClose={handleCloseUsers}
                                        />
                                    </Box>
                                </Box>
                                { students.length < 1 ?
                                    <Typography variant="body1">
                                        No students
                                    </Typography>
                                    :
                                    <FixedSizeList
                                        height={150}
                                        itemCount={students.length}
                                        itemSize={35}
                                        style={{margin: 2, border: "1px solid lightgray"}}
                                    >
                                        {rowStudent}
                                    </FixedSizeList>
                                }
                                <Box sx={{display: 'flex', flexDirection:  "row", my: 1}}>
                                    <Typography variant="h6">
                                        Tests:
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" width="100%">
                                        <Button variant="contained" onClick={handleClickOpenTests}>
                                            Add test
                                        </Button>
                                        <CreateTestDialog
                                            open={openTests}
                                            subject={subject.id}
                                            onClose={handleCloseTests}
                                        />
                                        <GradeTestDialog
                                            open={openTestGrading}
                                            test={testId}
                                            subject={subject.id}
                                            onClose={handleCloseGrading} />
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

export default Subject;