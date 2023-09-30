import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import store from "../../store";


export default function OgAndTranslated() {

    const regionalText = useSelector(store => store.audio.regionalText)
    const englishText = useSelector(store => store.audio.englishText)
    const languageName = useSelector(store => store.audio.languageName)



    return (
        <Grid container px={{sm: "1rem", md: "8rem"}} pb={"4rem"}>

            <Grid item sm={6} px={{sm: "3rem"}}>
                <Paper sx={{paddingY:"3rem", paddingX: "3rem",  marginTop: "1rem"}} elevation={9} mx={{sm: "3rem"}}>
                    <Typography variant={'h4'} textAlign={"left"} pb={2}>{languageName ? languageName : "Native"} Script</Typography>
                    <Typography variant="body1" textAlign={"left"}>{regionalText ? regionalText : "Here will be the Script in Native Language"}</Typography>
                </Paper>
            </Grid>
            <Grid item sm={6} px={{sm: "3rem"}}>
                <Paper sx={{paddingY:"3rem", paddingX: "3rem", marginTop: "1rem"}} elevation={9}>
                    <Typography variant={'h4'} textAlign={"left"} pb={2}>English Script</Typography>
                    <Typography variant="body1" textAlign={"left"}>{englishText ? englishText : "Here will be the Script Translated to English"}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}