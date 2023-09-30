import AudioRecording from "../Components/Audio/AudioRecording";
import EnglishOutput from "../Components/Audio/EnglishOutput";
import { Grid, Button, useMediaQuery, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchEnglishTranslationAsync, postAudioDataAsync} from "../features/audioSlice";
import OgAndTranslated from "../Components/Text/OgAndTranslated";

const Translation = () => {
    const baseAudioState = useSelector(state => state.audio.baseAudio)
    const isScreenSmall = useMediaQuery("(max-width:600px)");
    const dispatch = useDispatch()

    const postAudioData = () => {
        dispatch(postAudioDataAsync(baseAudioState))
            .unwrap()
            .then((data) => {
                console.log("Audio data posted successfully:");

                // Dispatch fetchEnglishTranslationAsync after posting audio data
                dispatch(fetchEnglishTranslationAsync())
                    .unwrap()
                    .then((englishTranslationData) => {
                        console.log("English translation fetched successfully:");
                        // Handle fetched English translation data if needed
                    })
                    .catch((error) => {
                        console.error("Error fetching English translation:", error);
                    });
            })
            .catch((error) => {
                console.error("Error posting audio data:", error);
            });
    };

    return (
        <>
            <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
                Verbal Linguists
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "1rem" }} px={{sm: "1rem", md: "3rem"}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequuntur ex neque repudiandae! Est facilis in saepe sunt? Autem consequatur cum, cumque delectus dolore earum et ipsam ipsum obcaecati odit omnis quod recusandae repellat sit totam ut vero voluptate voluptatum!
            </Typography>

            <div style={{ padding: "1rem" }}>
                {isScreenSmall ? (
                    <div>
                        <Grid container justifyContent="center" >
                            <Grid item sm={12} mb={6} width={"100%"}>
                                <AudioRecording />
                            </Grid>
                        </Grid>
                        <Button sx={{ marginBottom: "3rem" }} size="large" variant="contained" onClick={postAudioData}>
                            Translate
                        </Button>
                        <Grid container justifyContent="center" >
                            <Grid item sm={12} mb={6} width={"100%"}>
                                <EnglishOutput />
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <div>
                        <Grid container justifyContent="center" width={"80vw"}>
                            <Grid item sm={6} px={4}>
                                <AudioRecording />
                            </Grid>
                            <Grid item sm={6} px={4}>
                                <EnglishOutput />
                            </Grid>
                        </Grid>
                        <Button sx={{ marginY: "2rem" }} size="large" variant="contained" onClick={postAudioData}>
                            Translate
                        </Button>
                    </div>
                )}
            </div>

            <OgAndTranslated/>

        </>

    );
};

export default Translation;

