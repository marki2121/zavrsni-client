import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import React from "react";

const SubjectCard = (subject) => {
    console.log(subject)
    return(
        <Grid item >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Kolegij
                    </Typography>
                    <Typography variant="h5" component="div">
                        {subject.subjects.Name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {subject.subjects.Year}
                    </Typography>
                    <Typography variant="body2">
                        {subject.subjects.Description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained">Open</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default SubjectCard;