import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

const SubjectCard = (props) => {
    const navigate = useNavigate();

    const openSubject = () => {
        if(props.home === undefined) navigate(`subject/${props.subjects.id}`);
        else navigate(`mysubject/${props.subjects.id}`);
    }

    return(
        <Grid item >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Kolegij
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.subjects.Name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.subjects.Year}
                    </Typography>
                    <Typography variant="body2">
                        {props.subjects.Description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" onClick={() => {openSubject()}}>Open</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default SubjectCard;