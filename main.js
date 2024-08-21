
// Train section
const trainSamples = document.querySelector(".train-samples");
const uploadImage = document.querySelector("#image-input-train");
const trainBtn = document.querySelector(".train-images");
const addBtn = document.querySelector(".add-images");
const inputLabel = document.querySelector(".input-label");
const imageSample = document.querySelector(".img-sample");

let imagesLoaded = [];
let classifier;
let featureExtractor;

function loadImageFiles(e) {
    // Clear previous images
    imagesLoaded = [];
    // Load images
    const files = e.target.files;
    if (files.length === 0){
        trainSamples.innerText = "No files selected"
        addBtn.disabled = true;
        trainBtn.disabled = true;
        return;
    } 

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.onload = () => URL.revokeObjectURL(imagesLoaded.src);
        imagesLoaded.push(img);
        imageSample.src = img.src
    }

    trainSamples.innerText = `${files.length} images loaded`
    addBtn.disabled = false;   

}

function loadModel(){
    try{
        featureExtractor = ml5.featureExtractor("MobileNet", trainListeners);
        classifier = featureExtractor.classification();
    }catch(e){
        console.error(e);
        trainSamples.innerText = "Failed to load the model"
        return;
    }
}

function uploadImages(){
    try{
        const label = inputLabel.value;
        if (label.trim() === "") {
            alert("Please enter a label");
            return;
        }
        imagesLoaded.forEach((img) => {
            classifier.addImage(img, label);
        });
        trainSamples.innerText = `Added ${imagesLoaded.length} image(s) with label: ${label}`;
        addBtn.disabled = true;
        trainBtn.disabled = false;
    }catch(e){
        console.error(e);
        trainSamples.innerText = "Failed to upload images";
        return;
    }
}


function trainModel() {
    trainSamples.innerText = "Training model...";
    classifier.train((loss) => {
      if (loss) {
        trainSamples.innerText = `Training... Loss: ${loss}`;
      } else {
        trainSamples.innerText = "Training complete!";
      }
    });
    trainBtn.disabled = false;
  }

function trainListeners(){
    uploadImage.addEventListener("change", loadImageFiles);
    addBtn.addEventListener("click", uploadImages);
    trainBtn.addEventListener("click", trainModel);
}  

loadModel();


// Prediction section
const imageInput = document.querySelector("#image-input");
const predictionText = document.querySelector("#prediction-text");
const image = document.querySelector("#img-predict");
const predictbtn = document.querySelector("#predict-button");

// Prediction
function loadImage(e){
    try{
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        image.src = fileURL;
        predictbtn.disabled = false;
    }catch(e){
        predictionText.innerText = "Error loading image";
        predictionText.style.color = "red";
        console.error(e);
        return;
    }
}

function predictImage(){
    try{
        classifier.classify(image, (error, results) => {
            if (error) {
                console.error("Error during prediction:", error);
                predictionText.innerText = "Model is not ready yet.";
                predictionText.style.color = "red";
                return;
            }
            showPrediction(results);
        });
        showLoading();
    }catch(e){
        predictionText.innerText = "Error predicting image";
        predictionText.style.color = "red";
        console.error(e);
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
predictbtn.addEventListener("click", predictImage);






 

