import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postAudioDataAsync = createAsyncThunk(
    "audio/postAudioData",
    async (audioData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/audio", {
                audioData: audioData,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchEnglishTranslationAsync = createAsyncThunk(
    "audio/fetchEnglishTranslation",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/result");
            const base64Audio = response.data.translated_audio;
            const blob = base64toBlob(base64Audio, "audio/wav");
            const blobUrl = URL.createObjectURL(blob);

            dispatch(setEnglishAudio(blobUrl));
            dispatch(setEnglishText(response.data.regional_text));
            dispatch(setRegionalText(response.data.english_text));

            // Return response data if needed
            return response.data;
        } catch (error) {
            // Handle error if needed
            return rejectWithValue(error.response.data);
        }
    }
);

const base64toBlob = (base64Data, contentType) => {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}

const audioSlice = createSlice({
    name: "audio",
    initialState: {
        baseAudio: null,
        originalAudio: null,
        englishAudio: null,
        regionalText: null,
        englishText: null,
        status: "idle", // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {
        setBaseAudio: (state, action) => {
            state.baseAudio = action.payload;
        },
        setOriginalAudio: (state, action) => {
            state.originalAudio = action.payload;
        },
        setEnglishAudio: (state, action) => {
            state.englishAudio = action.payload;
        },
        setRegionalText: (state, action) => {
            state.regionalText = action.payload;
        },
        setEnglishText: (state, action) => {
            state.englishText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postAudioDataAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(postAudioDataAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.originalAudio = action.payload.originalAudio; // Set originalAudio here
                // Handle other response data if needed
            })
            .addCase(postAudioDataAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload; // Handle error data if needed
            })
            .addCase(fetchEnglishTranslationAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEnglishTranslationAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Handle other response data if needed
            })
            .addCase(fetchEnglishTranslationAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload; // Handle error data if needed
            });
    },
});

export const {
    setOriginalAudio,
    setEnglishAudio,
    setRegionalText,
    setEnglishText,
    setBaseAudio,
} = audioSlice.actions;

export const selectAudioData = (state) => state.audio;

export default audioSlice.reducer;
