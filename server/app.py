from flask import Flask, request, jsonify, send_file  # Import send_file
from flask_cors import CORS
import pybase64 as base64

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    print("hello")
    return "<p>Hello!</p>"


@app.route('/audio', methods=['POST'])
def create_audio():
    data = request.json
    print(data)

    # Check if 'audioData' is in the request JSON
    if 'audioData' in data:
        base_audio = data['audioData']
        
        # Decode the base64 audio data
        audio_bytes = base64.b64decode(base_audio)  # Use the imported base64 module

        # Save the audio data to an MP3 file
        # file path may need to be changed depending on terminal path
        with open('D:\\SIH\\untitled3\\server\\output.mp3', 'wb') as audio_file:
            audio_file.write(audio_bytes)

        # Respond with a success message
        return jsonify({"message": "Audio data received and saved successfully"}), 201

    return jsonify({"message": "No audio data found in the request"})


@app.route('/result', methods=['GET'])
def send_result():
    # Read audio file as binary data
    # file path may need to be changed depending on terminal path
    with open('D:\\SIH\\untitled3\\server\\output.mp3', 'rb') as audio_file:
        audio_binary_data = audio_file.read()

    # Encode binary data to base64
    base64_audio = base64.b64encode(audio_binary_data).decode('utf-8')

    # Print or use the base64_audio variable as needed
    # print(base64_audio)

    result = {
        'translated_audio' : base64_audio,
        'regional_text' : "बलसरा वत्सल नाम याद रखना",
        'english_text' :  "Balasra Vatsal, remember efff ffContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.f, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Ri Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32. name"
    }
    return result



if __name__ == "__main__":
    app.run(debug=True)
