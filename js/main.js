
document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.querySelector("#image-input");
    const predictionText = document.querySelector("#prediction-text");
    const image = document.querySelector("#img-predict");

    const model = ml5.imageClassifier("MobileNet", showLoading);

    function loadImage(e){
        try{
            const file = e.target.files[0];
            const fileURL = URL.createObjectURL(file);
            image.src = fileURL;
        }catch(e){
            predictionText.innerText = "Error loading image";
            predictionText.style.color = "red";
            return;
        }
        

    }

    function predictImage(){
        try{
            model.classify(image, showPrediction)
        }catch(e){
            predictionText.innerText = "Error predicting image";
            predictionText.style.color = "red";
            return;
        }
    }

    function showPrediction(prediction){
        console.log(prediction);
        predictionText.innerText = prediction[0].label;
        predictionText.style.color = prediction[0].confidence > 0.7? "green" : "yellow";
    }

    function showLoading () {
        predictionText.innerText = "Prediction...";
    }

    imageInput.addEventListener("change", loadImage);
    image.addEventListener("load", predictImage);
})




 

