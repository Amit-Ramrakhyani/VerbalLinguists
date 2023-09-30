import './EnglishOutput.css'
import { Paper, Typography} from "@mui/material";
import { useSelector} from "react-redux";

const EnglishOutput = () => {
    const englishAudioState = useSelector(state => state.audio.englishAudio); // Accessing englishAudio from Redux store

    return (
        <div className={"output-body"}>
            <Paper elevation={3} className={"paper"}>
                <Typography variant={"h3"} fontSize={"2rem"}>So in English that means....</Typography>

                <audio src={englishAudioState} controls="controls" className={"controls"}/>

            </Paper>
        </div>

    );
};

export default EnglishOutput;