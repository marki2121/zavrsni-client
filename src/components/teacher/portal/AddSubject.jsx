import {Box, Button, Card, TextField} from "@mui/material";
import React from "react";
import {addSubjectApi} from "../../../functions/subject/Subject";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const AddSubject = () => {
    const [ cookie, setCookie, removeCookie ] = useCookies(['access_token']);
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [ects, setEcts] = React.useState('');
    const [semester, setSemester] = React.useState('');
    const [year, setYear] = React.useState('');

    const addSubject = async () => {
        await addSubjectApi(cookie.access_token, name, description, ects, semester, year).then((response) => {
            navigate("/teacher")
        }).catch((error) => {
            alert("Error adding subject");
        });
    }

    return (
        <>
            <Card sx={{my: 1.5}}>
                <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'row'}}} >
                    <Box alignItems="center" justifyContent="center" sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: 4, m: "auto"}}>
                        <TextField sx={{m: 2}} label="name" onChange={(e) => {setName(e.target.value)}}/>
                        <TextField sx={{m: 2}} label="description" onChange={(e) => {setDescription(e.target.value)}}/>
                        <TextField sx={{m: 2}} label="ects" type="number" onChange={(e) => {setEcts(e.target.value)}}/>
                    </Box>
                    <Box alignItems="center" justifyContent="center" sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}, height: {md: 'max'}, mt: {md: 4}, m: 'auto'} }>
                        <TextField sx={{m: 2}} label="semester" type="number" onChange={(e) => {setSemester(e.target.value)}}/>
                        <TextField sx={{m: 2}} label="year" type="number" onChange={(e) => {setYear(e.target.value)}}/>
                    </Box>
                </Box>
                <Box sx={{display: {md: 'flex'}, flexDirection: {md: 'column'}}}>
                    <Button variant="contained" sx={{m: 'auto', display: 'flex', mb: 2}} onClick={() => {addSubject()}}>
                        Add subject
                    </Button>
                </Box>
            </Card>
        </>
    )
}

export default AddSubject;