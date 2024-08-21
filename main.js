
document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.querySelector("#image-input");
    const predictionText = document.querySelector("#prediction-text");
    const image = document.querySelector("#img-predict");

    const model = ml5.imageClassifier("MobileNet");

    // Prediction
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
            showLoading();
        }catch(e){
            predictionText.innerText = "Error predicting image";
            predictionText.style.color = "red";
            return;
        }
    }

    async function showPrediction(prediction){
        console.log(prediction);
        predictionText.innerText = await prediction[0].label;
        predictionText.style.color = await prediction[0].confidence > 0.7? "green" : "yellow";
    }

    function showLoading () {
        predictionText.innerText = "Prediction...";
    }

    imageInput.addEventListener("change", loadImage);
    image.addEventListener("load", predictImage);


    // Open training div
    const selectPosTrain = document.querySelector(".select-pos-train");
    const selectPosClass = document.querySelector(".select-pos-class");
    const indexShow = document.querySelector(".index-show");
    const trainingShow = document.querySelector(".training-show");

    selectPosTrain.addEventListener("click", () => {
        selectPosTrain.style.visibility = "hidden";
        selectPosClass.style.visibility = "visible";
        selectPosClass.style.display = "block";
        selectPosTrain.style.display = "none";

        // Show training
        trainingShow.style.display = "block";
        trainingShow.style.visibility = "visible";
        indexShow.style.display = "none";
        indexShow.style.visibility = "hidden";
    });

    selectPosClass.addEventListener("click", () => {
        selectPosClass.style.visibility = "hidden";
        selectPosTrain.style.visibility = "visible";
        selectPosTrain.style.display = "block";
        selectPosClass.style.display = "none";

        // Show index
        indexShow.style.display = "block";
        indexShow.style.visibility = "visible";
        trainingShow.style.display = "none";
        trainingShow.style.visibility = "hidden";
    });
    
})




 

