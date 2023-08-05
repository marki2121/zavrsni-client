import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../App";
import {useCookies} from "react-cookie";
import {Box, Card, CircularProgress, Grid, Typography} from "@mui/material";
import SubjectCard from "../teacher/subject/SubjectCard";
import {getUserSubjects} from "../../functions/subject/Subject";

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const [ cookie, , ] = useCookies(['access_token']);
    const [ subjects, setSubjects ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getUserSubjects( cookie.access_token )
            .then((r) => {
                setSubjects(r);
                setLoading(false);
            }).catch((e) => {
                console.log(e);
            });
    }, [])

    return(
        <>
            <Card sx={{my: 1.5}}>
                <Box sx={{display: {md: 'flex'}, flexDirection: {md: "column"}}}>
                    <Box sx={{p: 2, mx: "auto"}}>
                        <Typography variant="h6" sx={{fontSize: 30}}>
                            Hello {user.firstName}
                        </Typography>
                    </Box>
                    { !loading ?
                        <>
                            <Grid container spacing={3} columnSpacing={{ xs: 1, md: 3}} rows={{ xs: 1, sm: 3, md: 4 }} alignItems="center" justifyContent="center" sx={{p: 2}}>
                                {subjects.map((subject) => (
                                    <SubjectCard key={subject.id} subjects={subject} home={true}/>
                                ))}
                            </Grid>
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

export default Home;
