import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {deleteSubject, getSubject, getSubjectStudents, updateSubject} from "../../../functions/subject/Subject";
import {getTests} from "../../../functions/test/Test";
import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {blue} from "@mui/material/colors";
import {FixedSizeList} from "react-window";
import RemoveStudentDialog from "../../dialogs/RemoveStudentDialog";
import EditTestDialog from "../../dialogs/EditTestDialog";

const UpdateSubject = () => {
    const {id} = useParams();
    const [subject, setSubject] = useState(null);
    const [ cookie, ,  ] = useCookies(['access_token']);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [ects, setEcts] = useState(null);
    const [semester, setSemester] = useState(null);
    const [year, setYear] = useState(null);
    const [openUsers, setOpenUsers] = useState(false);
    const [openTests, setOpenTests] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [test, setTest] = useState({id: null, date: null, note: null});

    const handleClickOpenUsers = (id) => {
        setStudentId(id);
        setOpenUsers(true);
    };

    const handleClickOpenTests = (test1) => {
        setTest(test1);
        setOpenTests(true);
    };

    const handleCloseUser = () => {
        setLoading(true);
        setStudents([]);
        getSubjectStudents( cookie.access_token, id )
            .then((r) => {
                setStudents(r);
                setOpenUsers(false);
                setLoading(false);
            }).catch((e) => {
            console.log(e);
        })
    };

    const handleCloseTest = () => {
        setLoading(true);
        setTests([]);
        getTests(cookie.access_token, id)
            .then((r) => {
                setTests(r);
                setOpenTests(false);
                setLoading(false);
            }).catch((e) => {
            console.log(e);
        })
    }

    const update = () => {
        updateSubject(cookie.access_token, id, name, description, ects, semester, year)
            .then(() => {
                navigate("/teacher/subject/" + id);
            }).catch(() => {
        });
    }

    const deleteSub = () => {
        deleteSubject(cookie.access_token, id).then(() => {
            navigate("/teacher");
        }).catch(() => {
        });
    }


    useEffect(() => {
        if( cookie.access_token && loading){
            getSubject( cookie.access_token, id )
                .then((r) => {
                    setSubject(r);
                }).catch(() => {
            })

            getTests( cookie.access_token, id )
                .then((r) => {
                    setTests(r);
                }).catch(() => {
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

    const rowStudent = ({index, }) => {
        return(
            <ListItemButton
                key={students[index].id}
                onClick={() => {handleClickOpenUsers(students[index].id)}}
            >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={students[index].imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={students[index].firstName + " " + students[index].lastName} />
            </ListItemButton>
        )
    }

    const rowTest = ({index, }) => {
        return(
            <>
                <ListItemButton
                    key={tests[index].id}
                    onClick={() => {handleClickOpenTests(tests[index])}}
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
                            Update subject
                        </Typography>
                        <Box sx={{display: {md: 'flex'}, flexDirection: {md: "row"}, width: "100%"}}>
                            <Box m={2} sx={{width: "100%"}} display="flex" flexDirection="column" >
                                <TextField sx={{margin: 2}} label="Subject name" placeholder={subject.Name} onChange={(e) => {setName(e.target.value)}}/>
                                <TextField sx={{margin: 2}} label="Subject description" placeholder={subject.Description} onChange={(e) => {setDescription(e.target.value)}}/>
                                <TextField sx={{margin: 2}} label="Ects" placeholder={subject.Ects} type="number" onChange={(e) => {setEcts(e.target.value)}}/>
                                <TextField sx={{margin: 2}} label="Semester" placeholder={subject.Semester} type="number" onChange={(e) => {setSemester(e.target.value)}}/>
                                <TextField sx={{margin: 2}} label="Year" placeholder={subject.Year} type="number" onChange={(e) => {setYear(e.target.value)}}/>
                            </Box>
                            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "column"}, width: "100%"}}>
                                <Box sx={{display: 'flex', flexDirection:  "row", my: 1}}>
                                    <Typography variant="h6">
                                        Students:
                                    </Typography>
                                </Box>
                                { students.length < 1 ?
                                    <Typography variant="body1">
                                        No students
                                    </Typography>
                                    :
                                    <>
                                        <FixedSizeList
                                            height={150}
                                            itemCount={students.length}
                                            itemSize={35}
                                            style={{margin: 2, border: "1px solid lightgray"}}
                                        >
                                            {rowStudent}
                                        </FixedSizeList>
                                        <RemoveStudentDialog
                                            open={openUsers}
                                            subject={id}
                                            student={studentId}
                                            onClose={handleCloseUser}
                                        />
                                    </>
                                }
                                <Box sx={{display: 'flex', flexDirection:  "row", my: 1}}>
                                    <Typography variant="h6">
                                        Tests:
                                    </Typography>
                                </Box>
                                { tests.length < 1 ?
                                    <Typography variant="body1">
                                        No Tests
                                    </Typography>
                                    :
                                    <>
                                        <FixedSizeList
                                            height={150}
                                            itemCount={tests.length}
                                            itemSize={35}
                                            margin={2}
                                            style={{margin: 2, border: "1px solid lightgray"}}
                                        >
                                            {rowTest}
                                        </FixedSizeList>
                                        <EditTestDialog
                                            open={openTests}
                                            test={test}
                                            onClose={handleCloseTest}
                                        />
                                    </>
                                }
                                <Box justifyContent="center" justifyItems="center" display="flex" sx={{flexDirection: {m: "row"}, my: 2}}>
                                    <Box m={2}>
                                        <Button variant="contained" onClick={() => {update()}}>
                                            Update
                                        </Button>
                                    </Box>
                                    <Box m={2}>
                                        <Button variant="contained" color="warning" onClick={() => {deleteSub()}}>
                                            Delete
                                        </Button>
                                    </Box>
                                    <Box m={2}>
                                        <Button variant="contained" component={Link} to={"/teacher/subject/" + id}>
                                            Close
                                        </Button>
                                    </Box>
                                </Box>
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

export default UpdateSubject;