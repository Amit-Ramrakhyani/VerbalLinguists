# VERBAL LINGUISTS

Built by - Amit Ramrakhyani, Mit Kumar Patel, Vatsal Balasra, Tithi Dangarwala, Bhavya Shah, and Varzil Thakkar

Problem Statement: Speech to text transcription for Indian languages. The problem entails transcription in the native script and then translation to English. The languages of interest are Hindi, Indian English, Urdu, Bengali, Punjabi.

Our Approach: Our project focuses on building a user-friendly platform that accommodates the various languages spoken across India, such as Hindi, Urdu, Bengali, Punjabi, and Indian English. Users can input audio content in their chosen language, and our platform will provide an audio output with an English translation. This initiative aims to facilitate communication across language differences within India.

Required Tech Stack:
1. Python
2. Node
3. VS Code (or any other editor)

# Getting Started

## Dependencies

* Clone the repository using the command below:

```
git clone https://github.com/balasravatsal/VerbalLinguists
```

* Move into the directory where we have the project files :
  
```
cd VerbalLinguists
```

* Create a virtual environment :
  
```bash
# Let's install virtualenv first
pip install virtualenv

# Then we create our virtual environment
virtualenv venv

```

* Activate the virtual environment :
```bash
source envname\scripts\activate

```

* Install the requirements :
```bash
pip install -r requirements.txt

```

## Executing the program

- Run the following command to add the fairseq folder to path variables:
```
python3 run.py
```

- Use the following command in the command prompt to run the code:

```
python3 main.py
```

# Basic Flow

The flow of the execution of program includes following steps:

1. Input of **Native Language Audio**
2. Pre-processing of the data - **Noise reduction and voice enhancement**
3. Language Recognition - outputs language code (hi, bn, pu,...)
4. Forwarding the audio to the model of the recognized language
5. Trancripting it to **Native Language Text**
6. Translating it to **English Language Text**
7. Transcripting it to **English Language Audio** 

![Working_SIH drawio (1)](https://github.com/user-attachments/assets/ff903dc9-15cc-40bf-8df0-4d732147e4e4)

# Fine-tuning

## Installation 

- Install essential development libraries and dependencies:
```
apt install -y liblzma-dev libbz2-dev libzstd-dev libsndfile1-dev libopenblas-dev li
```

- Remove existing directories (IndicWav2Vec, fairseq, kenlm, flashlight) and clone fresh copies of these repositories from their respective GitHub URLs
```
rm -rf IndicWav2Vec fairseq kenlm flashlight
git clone https://github.com/AI4Bharat/IndicWav2Vec.git
git clone https://github.com/pytorch/fairseq.git
git clone https://github.com/kpu/kenlm.git
git clone https://github.com/flashlight/flashlight.git
```

- Install Python Packages
```
pip install packaging soundfile swifter -r w2v_inference/requirements.txt
```

- Navigate to the 'kenlm' source directory, create a 'build' directory for compilation, configure the build using CMake, build the project with 16 parallel processes using 'make,' and return to the '/content' directory
```
cd kenlm
mkdir -p build
cd build
cmake .. 
make -j 16
cd /
```

- Change to the '/flashlight/bindings/python' directory, switch to a specific Git commit, set environment variables ('USE_MKL' and 'KENLM_ROOT'), and install the 'flashlight' Python package with the specified configuration.
```
cd /flashlight/bindings/python
git checkout 06ddb51857ab1780d793c52948a0759f0ccc6ddb
export USE_MKL=0 && export KENLM_ROOT="/kenlm/" && python setup.py install
cd /
```

- Change directory to IndicWav2Vec
```
cd /IndicWav2Vec
```

- Install the 'tree' command, and use 'tree' to display the directory structure of 'workshop-2022/asr_data/noa_training_1hr' in a tree-like format, showing subdirectories and files.
```
apt-get -y install tree && tree -dC workshop-2022/asr_data/noa_training_1hr
```

## Start Finetuning

- Navigate to the '/IndicWav2Vec/workshop-2022' directory, create a 'models' directory if it doesn't exist, remove existing files matching patterns 'hi_mucs_dc.pt*' and 'checkpoint_ft.pt*' from the 'models' directory, and download two pre-trained model files ('hi_mucs_dc.pt' and 'checkpoint_ft.pt') from specified URLs into 'models' for further project use.
```
cd IndicWav2Vec/workshop-2022
mkdir models
cd models && rm -rf hi_mucs_dc.pt* && wget https://storage.googleapis.com/ai4b-speech/TTS/KENLM/hi_mucs_dc.pt
cd models && rm -rf checkpoint_ft.pt* && wget https://storage.googleapis.com/ai4b-speech/TTS/KENLM/checkpoint_ft.pt
cd ..
```

- Run finetuning
```
fairseq-hydra-train task.data=${PWD}"/workshop-2022/asr_data/noa_training_1hr/manifest/hindi" \
    dataset.max_tokens=200000 \
    common.log_interval=20 \
    model.freeze_finetune_updates=1000 \
    model.w2v_path=${PWD}"/workshop-2022/models/checkpoint_ft.pt" \
    checkpoint.save_dir=${PWD}"/workshop-2022/models/indicwav2vec_noa" \
    checkpoint.restore_file=${PWD}"/workshop-2022/models/hi_mucs_dc.pt" \
    distributed_training.distributed_world_size=1 \
    +optimization.update_freq='[1]' \
    +optimization.lr=[0.0001] \
    optimization.max_update=100000 \
    checkpoint.save_interval_updates=10000 \
    --config-dir ${PWD}"/finetune_configs" \
    --config-name ai4b_xlsr 

```

# Issues Faced during Runtime



# Issues Faced during Output

Issues can be found during the translation of Urdu Audio. Urdu has a lot of similarities to Hindi which makes it hard for the model to recognize the language.
















