import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    ListItemAvatar,
    ListItemButton,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FixedSizeList} from "react-window";
import {getAllApplicants, gradeTestApplicant} from "../../functions/test/Test";
import {useCookies} from "react-cookie";

const GradeTestDialog = (props) => {
    const {open, test, onClose} = props;
    const [loading, setLoading] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const [ cookie, ,  ] = useCookies(['access_token']);
    const [graded, setGraded] = useState(false);
    const [arrayIndex, setArrayIndex] = useState(null);
    const [selecting, setSelecting] = useState(null);
    const [grade, setGrade] = useState(0);

    const handleClose = () => {
        onClose();
    }

    const select = (id, index) => {
        setGraded(applicants[index].testGraded);
        setArrayIndex(index);
        setSelecting(id);
    }

    const gradeTest = () => {
        setLoading(false);
        gradeTestApplicant(cookie.access_token, selecting, grade).then(() => {
            setApplicants([]);
            getAllApplicants(cookie.access_token, test).then(res => {
                setApplicants(res);
                setGraded(applicants[arrayIndex].testGraded);
                setLoading(true);
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        })
    }

    const row = ({index, }) => {
        return(
            <>
                {applicants[index].id === selecting ?
                        <ListItemButton
                            key={applicants[index].id}
                            onClick={() => {select(applicants[index].id)}}
                            selected={true}
                        >
                            <ListItemAvatar>
                                <Avatar src={applicants[index].imageUrl} sx={{mr: 2}} />
                            </ListItemAvatar>
                            <Typography>
                                {applicants[index].studentName}
                            </Typography>
                        </ListItemButton>
                :
                        <ListItemButton
                            key={applicants[index].id}
                            onClick={() => select(applicants[index].id, index)}
                        >
                            <ListItemAvatar>
                                <Avatar src={applicants[index].imageUrl} sx={{mr: 2}} />
                            </ListItemAvatar>
                            <Typography>
                                {applicants[index].studentName}
                            </Typography>
                        </ListItemButton>
                }
            </>
        )
    }

    useEffect(() => {
        if(open) {
            getAllApplicants(cookie.access_token, test).then(res => {
                setApplicants(res);
                setLoading(true);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [open, cookie.access_token, test])

    return(
        <Dialog open={open}>
            <DialogTitle>Test application grading</DialogTitle>
            <Box sx={{display: {md: 'flex'}, flexDirection: {md: "row"}}}>
                <Box m={2}>
                    <Typography>
                        Applicants:
                    </Typography>
                    {loading ?
                        <FixedSizeList
                            height={150}
                            itemCount={applicants.length}
                            itemSize={35}
                            style={{margin: 2, border: "1px solid lightgray"}}
                        >
                            {row}
                        </FixedSizeList>
                        :
                        <CircularProgress />
                    }
                </Box>
                <Box m={2} sx={{display: 'flex', flexDirection: "column"}}>
                    {graded ?
                        <>
                            <Typography>
                                Already graded
                            </Typography>
                            <TextField
                                label="Grade"
                                variant="outlined"
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                        max: 100
                                    }
                                }}
                                value={applicants[arrayIndex].grade}
                                sx={{margin: 2}}
                                onChange={(e) => setGrade(e.target.value)}
                            />
                            <Button variant="contained" sx={{margin: 2}} onClick={() => {gradeTest()}}>
                                Update
                            </Button>
                        </>
                    :
                        <>
                            <TextField
                                label="Grade"
                                variant="outlined"
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                        max: 100
                                    }
                                }}
                                sx={{margin: 2}}
                                onChange={(e) => setGrade(e.target.value)}
                            />
                            <Button variant="contained" sx={{margin: 2}} onClick={() => {gradeTest()}}>
                                Submit
                            </Button>
                        </>
                    }
                </Box>
            </Box>
            <Button onClick={() => {handleClose()}} variant="contained" sx={{mx: 4, mb: 2}}>
                Close
            </Button>
        </Dialog>
    )
}

export default GradeTestDialog;