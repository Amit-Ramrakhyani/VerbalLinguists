import './AudioRecording.css'
import { Paper, Typography} from "@mui/material";
import { useSelector} from "react-redux";

const EnglishOutput = () => {
    const englishAudioState = useSelector(state => state.audio.englishAudio); // Accessing englishAudio from Redux store
    const langCode = useSelector(store => store.audio.langCode)

    return (
        <div className={"put-body"}>
            <Paper elevation={3} className={"paper"}>
                <Typography variant={"h3"} fontSize={"2rem"}>So in English that means....</Typography>

                <audio src={englishAudioState} controls="controls" className={"controls"}/>

                <Typography fontSize={'1rem'}>Regional Language is: <i>{langCode ? langCode : "xy"}</i></Typography>

            </Paper>
        </div>

    );
};

export default EnglishOutput;