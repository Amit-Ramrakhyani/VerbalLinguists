# VERBAL LINGUISTS

Built by- Amit Ramrakhyani, Mit, Vatsal Balasra, Tithi Dangarwala, Bhavya and Varzil Thakkar

Problem Statement: Speech to text transcription for Indian languages. The problem entails transcription in the native script and then translation to English. The languages of interest are Hindi, Indian English, Urdu, Bengali, Punjabi.

Our Approach: Our project focuses on building a user-friendly platform that accommodates the various languages spoken across India, such as Hindi, Urdu, Bengali, Punjabi, and Indian English. Users can input audio content in their chosen language, and our platform will provide an audio output with an English translation. This initiative aims to facilitate communication across language differences within India.

Required Tech Stack:

# Getting Started

## Dependencies

- Clone the repository using the command below:

```
git clone https://github.com/balasravatsal/VerbalLinguists
```

- Install the required libraires using these commands:

```
pip install transformers datasets pyaudio pydub gtts 
```

## Executing the program

- Use the following command in the command prompt to run the code:

```
python3 main.py
```

# Basic Flow

The flow of the execution of program includes following steps:

1. Input of **Native Language Audio**
2. Recognition of the language from the audio
3. Forwarding the audio to the model of the recognized language
4. Trancripting it to **Native Language Text**
5. Translating it to **English Language Text**
6. Transcripting it to **English Language Audio** 

"in steps mein we can include using this or that library"

"flow chart idhar aayega"

# Issues Faced during Runtime

# Issues Faced during Output

Issues can be found during the translation of Urdu Audio. Urdu has a lot of similarities to Hindi which makes it hard for the model to recognize the language.

Also Indian English is not inluded..."iska mein aage likh rahi hu"
















