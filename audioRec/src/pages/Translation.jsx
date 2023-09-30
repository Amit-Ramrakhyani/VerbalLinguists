import AudioRecording from "../Components/Audio/AudioRecording";
import EnglishOutput from "../Components/Audio/EnglishOutput";
import { Grid, Button, useMediaQuery, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchEnglishTranslationAsync, postAudioDataAsync} from "../features/audioSlice";

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
            <Typography variant="h2" sx={{ marginBottom: "2rem" }}>
                Verbal Linguists
            </Typography>

            <div style={{ padding: "1rem" }}>
                {isScreenSmall ? (
                    <div>
                        <Grid container justifyContent="center" >
                            <Grid item sm={12} mb={6} width={"100%"}>
                                <AudioRecording />
                            </Grid>
                        </Grid>
                        <Button sx={{ marginBottom: "4rem" }} size="large" variant="contained" onClick={postAudioData}>
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
                        <Button sx={{ marginY: "3rem" }} size="large" variant="contained" onClick={postAudioData}>
                            Translate
                        </Button>
                    </div>
                )}
            </div>


            {/*<Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda autem beatae commodi cum, cumque debitis dolor doloribus expedita facilis harum incidunt ipsam ipsum, iste libero maxime nisi nobis quaerat quas quod quos ratione repellat sed sunt suscipit velit veniam! Deleniti distinctio doloremque dolorum ducimus explicabo in laborum minus molestias nobis nostrum perspiciatis provident sed sit, tempora voluptate voluptatem voluptatum.</Typography>*/}
        </>

    );
};

export default Translation;

