import {useState, useEffect} from "react";
import MicRecorder from "mic-recorder-to-mp3";
import './AudioRecording.css';
import {Button, ButtonGroup, Paper, Typography} from "@mui/material";
import { setBaseAudio, setOriginalAudio} from "../../features/audioSlice";
import { useDispatch } from 'react-redux';

const Mp3Recorder = new MicRecorder({bitRate: 128});

const AudioRecording = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobURL] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);
    // const [audioDataState, setAudioDataState] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({audio: true})
            .then(() => {
                console.log("Permission granted");
                setIsBlocked(false);
            })
            .catch(() => {
                console.log("Permission Denied");
                setIsBlocked(true);
            });
    }, []);

    const start = () => {
        if (isBlocked) {
            console.log("Permission Denied");
        } else {
            Mp3Recorder.start()
                .then(() => {
                    setIsRecording(true);
                })
                .catch((e) => console.error(e));
        }
    };

    const stop = () => {
        Mp3Recorder.stop()
            .getMp3()
            .then(async ([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                dispatch(setOriginalAudio(blobURL));
                const file = new File(buffer, 'audio.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });

                let baseAudio = await audioToBase64(file);
                // Ensure proper base64 encoding
                baseAudio = baseAudio.replace(/^data:audio\/mp3;base64,/, ''); // Remove the data URI prefix if present

                // setAudioDataState(baseAudio)
                dispatch(setBaseAudio(baseAudio));
                // Post the correctly encoded audio data to the server
                // postAudioData(baseAudio);

                setBlobURL(blobURL);
                setIsRecording(false);
            })
            .catch((e) => console.log(e));
    };

    const audioToBase64 = async (audioFile) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onerror = reject;
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(audioFile);
        });
    };

    return (
        <div className={"put-body"}>
            <Paper elevation={3} className={"paper"}>
                <Typography variant={"h3"} fontSize={"2rem"}>Speak Up!</Typography>
                <audio src={blobURL} controls="controls" className={"controls"}/>
                <div className={"control-button"}>

                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button variant="contained" onClick={isRecording ? stop : start}>
                            {isRecording ? "Stop" : "Record"}
                        </Button>
                    </ButtonGroup>

                </div>
            </Paper>
        </div>
    );
}

export default AudioRecording;
