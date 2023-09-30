import './EnglishOutput.css'
import {Button, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setEnglishAudio, setEnglishText, setRegionalText} from "../features/audioSlice";

const EnglishOutput = () => {
    const englishAudioState = useSelector(state => state.audio.englishAudio); // Accessing englishAudio from Redux store

    return (
        <div className={"output-body"}>
            <Paper elevation={3} className={"paper"}>
                <Typography variant={"h3"} fontSize={"2rem"}>So in English that means....</Typography>

                <audio src={englishAudioState} controls="controls" className={"controls"}/>

                {/*<Button onClick={getEnglishTranslation}>Get Translation</Button>*/}
            </Paper>
        </div>

    );
};

export default EnglishOutput;