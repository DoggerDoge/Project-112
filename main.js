Webcam.set({
    height: 400,
    width: 400,
    image_format: 'png',
    png_quality: 100

});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lb2V5gTGA/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function predict() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing")
        {
            document.getElementById("emojiIcon").innerHTML = "&#128076;";
        }
        if(results[0].label == "Best")
        {
            document.getElementById("emojiIcon").innerHTML = "&#128077;";
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("emojiIcon").innerHTML = "&#9996;";
        }
        if(results[0].label == "Rock")
        {
            document.getElementById("emojiIcon").innerHTML = "&#129304;";
        }
        if(results[0].label == "Vulcan Salute")
        {
            document.getElementById("emojiIcon").innerHTML = "&#128406;";
        }
        if(results[0].label == "Vulcan Salute")
        {
            document.getElementById("emojiIcon").innerHTML = "&#9994;";
        }
    }
}