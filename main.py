from inference.engine import Model
import sys
from fairseq import checkpoint_utils, distributed_utils, options, tasks, utils
from transformers import AutoModelForCTC, Wav2Vec2Processor, Wav2Vec2ProcessorWithLM, pipeline
import torchaudio
import torch
from datasets import load_dataset
import torchaudio
import soundfile as sf
from IPython.display import Audio, display
import sys
from speechbrain.pretrained import EncoderClassifier
import numpy as np
from gtts import gTTS


def load_audio_from_file(file_path):
    waveform, sample_rate = torchaudio.load(file_path)
    num_channels, _ = waveform.shape
    if num_channels == 2:
        return waveform[0], sample_rate
    else:
        raise ValueError("Waveform with more than 1 channels are not supported.")

def classification(audio):
    # Save the audio file
    sf.write("raw.wav", audio[1], audio[0])
    
    # Load the audio file
    signal = language_id.load_audio("raw.wav")
    
    # Classify the audio file
    prediction =  language_id.classify_batch(signal)
    
    # Get the language
    lang = prediction[3]
    lang = lang[0][0:2]

    # Correct the datatypes
    sr, y = audio
    y = y.astype(np.float32)
    y /= np.max(np.abs(y))
    y_tensor = torch.tensor(y)

    # Using the model of the detected model to make predictions
    if (lang == 'hi'):
        text = hindi_model(y_tensor, sr)
        return text

    elif (lang == 'bn'):
        text = bengali_model(y_tensor, sr)
        return text

    else:
        text = gujarati_model(y_tensor, sr)
        return text

def bengali_model(waveform, sample_rate):
    
    global output_str
    
    #Resample
    resampled_audio = torchaudio.functional.resample(waveform, sample_rate, TARGET_SAMPLE_RATE)

    # Specify the Hugging Face Model Id
    MODEL_ID = "ai4bharat/indicwav2vec_v1_bengali"

    # Specify the Device Id on where to put the model
    DEVICE_ID = "cuda" if torch.cuda.is_available() else "cpu"

    # Specify Decoder Type:
    DECODER_TYPE = "greedy" # Choose "LM" decoding or "greedy" decoding

    # Load Model
    model_instance = AutoModelForCTC.from_pretrained(MODEL_ID).to(DEVICE_ID)

    if DECODER_TYPE == "greedy":
        # Load Processor without language model
        processor = Wav2Vec2Processor.from_pretrained(MODEL_ID)
    else:
        # Load Processor with language model
        processor = Wav2Vec2ProcessorWithLM.from_pretrained(MODEL_ID)

    # Process audio data
    input_tensor = processor(resampled_audio, return_tensors="pt", sampling_rate=TARGET_SAMPLE_RATE).input_values

    # Run forward pass
    with torch.no_grad():
        logits = model_instance(input_tensor.to(DEVICE_ID)).logits.cpu()

    # Decode
    if DECODER_TYPE == "greedy":
        # Take argmax and decode
        prediction_ids = torch.argmax(logits, dim=-1)
        output_str = processor.batch_decode(prediction_ids)[0]
        
        # Translate to English
        english_text = indic2en_model.translate_paragraph(output_str, 'bn', 'en')
        
        return english_text
    
    else:
        output_str = processor.batch_decode(logits.numpy()).text[0]
        english_text = indic2en_model.translate_paragraph(output_str, 'bn', 'en')
        return english_text
    
def hindi_model(waveform, sample_rate):
    
    global output_str
    
    #Resample
    resampled_audio = torchaudio.functional.resample(waveform, sample_rate, TARGET_SAMPLE_RATE)

    # Specify the Hugging Face Model Id
    MODEL_ID = "ai4bharat/indicwav2vec-hindi"

    # Specify the Device Id on where to put the model
    DEVICE_ID = "cuda" if torch.cuda.is_available() else "cpu"

    # Specify Decoder Type:
    DECODER_TYPE = "greedy" # Choose "LM" decoding or "greedy" decoding

    # Load Model
    model_instance = AutoModelForCTC.from_pretrained(MODEL_ID).to(DEVICE_ID)

    if DECODER_TYPE == "greedy":
        # Load Processor without language model
        processor = Wav2Vec2Processor.from_pretrained(MODEL_ID)
    else:
        # Load Processor with language model
        processor = Wav2Vec2ProcessorWithLM.from_pretrained(MODEL_ID)

    # Process audio data
    input_tensor = processor(resampled_audio, return_tensors="pt", sampling_rate=TARGET_SAMPLE_RATE).input_values

    # Run forward pass
    with torch.no_grad():
        logits = model_instance(input_tensor.to(DEVICE_ID)).logits.cpu()

    # Decode
    if DECODER_TYPE == "greedy":
        # Take argmax and decode
        prediction_ids = torch.argmax(logits, dim=-1)
        output_str = processor.batch_decode(prediction_ids)[0]
        
        # Translate to English
        english_text = indic2en_model.translate_paragraph(output_str, 'bn', 'en')
        
        return english_text
    
    else:
        output_str = processor.batch_decode(logits.numpy()).text[0]
        english_text = indic2en_model.translate_paragraph(output_str, 'bn', 'en')
        return english_text
    
def gujarati_model(waveform, sample_rate):
    
    global output_str
    
    #Resample
    resampled_audio = torchaudio.functional.resample(waveform, sample_rate, TARGET_SAMPLE_RATE)

    # Specify the Hugging Face Model Id
    MODEL_ID = "ai4bharat/indicwav2vec_v1_gujarati"

    # Specify the Device Id on where to put the model
    DEVICE_ID = "cuda" if torch.cuda.is_available() else "cpu"

    # Specify Decoder Type:
    DECODER_TYPE = "greedy" # Choose "LM" decoding or "greedy" decoding

    # Load Model
    model_instance = AutoModelForCTC.from_pretrained(MODEL_ID).to(DEVICE_ID)

    if DECODER_TYPE == "greedy":
        # Load Processor without language model
        processor = Wav2Vec2Processor.from_pretrained(MODEL_ID)
    else:
        # Load Processor with language model
        processor = Wav2Vec2ProcessorWithLM.from_pretrained(MODEL_ID)

    # Process audio data
    input_tensor = processor(resampled_audio, return_tensors="pt", sampling_rate=TARGET_SAMPLE_RATE).input_values

    # Run forward pass
    with torch.no_grad():
        logits = model_instance(input_tensor.to(DEVICE_ID)).logits.cpu()

    # Decode
    if DECODER_TYPE == "greedy":
        # Take argmax and decode
        prediction_ids = torch.argmax(logits, dim=-1)
        output_str = processor.batch_decode(prediction_ids)[0]
        
        # Translate to English
        english_text = indic2en_model.translate_paragraph(output_str, 'bn', 'en')
        
        return english_text
    
    else:
        output_str = processor.batch_decode(logits.numpy()).text[0]
        english_text = indic2en_model.translate_paragraph(output_str, 'bn', 'en')
        return english_text
    
text = ""

def transcribe_english(audio):
    
    global text

    text = classification(audio)

    return text

def english_audio(text):
    
    # Specify the language
    language="en"

    # Convert the text to speech
    speech = gTTS(text = text, lang = language, slow = False, tld = "com.au")
    speech.save("english_audio.mp3")
    
    TARGET_SAMPLE_RATE = 16000
    SAMPLE_AUDIO_PATH = "english_audio.mp3"
    
    waveform, sample_rate = load_audio_from_file(SAMPLE_AUDIO_PATH)
    
    resampled_audio = torchaudio.functional.resample(waveform, sample_rate, TARGET_SAMPLE_RATE)
    
    display(Audio(resampled_audio.numpy(), rate=TARGET_SAMPLE_RATE))
    
    
if __name__ == '__main__':
    
    indic2en_model = Model('../indic-en')

    output_str = ""

    language_id = EncoderClassifier.from_hparams(source="speechbrain/lang-id-voxlingua107-ecapa", savedir="tmp")
    
    audio = "Yaha jo frontend se aa raha vo daal dena VATSAL"

    english_audio(transcribe_english(audio))