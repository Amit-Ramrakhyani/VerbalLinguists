import React, {useState, useEffect} from "react";
import AudioRecording from "./Audio/AudioRecording";
import './styles.css'
import EnglishOutput from "./Audio/EnglishOutput";
import {Typography} from "@mui/material";
import Translation from "./pages/Translation";

const App = () => {
    return (
        <div style={{textAlign: '-webkit-center'}}>
            <div className={'App'}>
                <Translation/>
            </div>
        </div>
    );
};

export default App;
