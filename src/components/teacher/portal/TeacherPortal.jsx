import React, {useEffect, useState} from "react";
import {Box, Button, Card, CircularProgress, Grid, Typography} from "@mui/material";
import {useCookies} from "react-cookie";
import {getAllSubjects} from "../../../functions/subject/Subject";
import {Link} from "react-router-dom";
import SubjectCard from "../subject/SubjectCard";

const TeacherPortal = () => {
    const [ cookie, ,  ] = useCookies(['access_token']);
    const [ subjects, setSubjects ] = useState([]);

    const [ loading, setLoading ] = useState(true);

    useEffect( () => {

        if (cookie.access_token && loading) {
            getAllSubjects(cookie.access_token).then((r) => {
                        if(r.status !== 200) {
                            setSubjects(r);
                            setLoading(false);
                        } else {
                            setSubjects(null);
                        }
            }).catch((e) => {
                console.log(e);
            });
        }
    });

    return (
        <>
            <Card sx={{my: 1.5}}>
                <Box sx={{display: {md: 'flex'}, flexDirection: {md: "column"}}}>
                    <Box sx={{p: 2, mx: "auto"}}>
                        <Typography variant="h6" sx={{fontSize: 30}}>
                            Teacher Portal
                        </Typography>
                    </Box>
                    { subjects !== [] ?
                        <>
                            <Grid container spacing={3} columnSpacing={{ xs: 1, md: 3}} rows={{ xs: 1, sm: 3, md: 4 }} alignItems="center" justifyContent="center" sx={{p: 2}}>
                                {subjects.map((subject) => (
                                    <SubjectCard key={subject.id} subjects={subject}/>
                                ))}
                            </Grid>
                            <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}}}>
                                <Button variant="contained" sx={{m: 'auto', display: 'flex', mb: 2}} component={Link} to="/teacher/subject/add">
                                    Create New
                                </Button>
                            </Box>
                        </>
                        :
                        <Box justifyContent="center" justifyItems="center" sx={{p: 2}}>
                            <CircularProgress />
                        </Box>
                    }
                </Box>
            </Card>
        </>
    )
}

export default TeacherPortal;