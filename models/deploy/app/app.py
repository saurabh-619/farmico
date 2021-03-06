import os
from flask import Flask, request 
from flask_cors import CORS, cross_origin

# from app.helpers.plant_disease import *
from app.helpers.plant_disease_tflite import *
from app.helpers.weed_detection import * 

app = Flask(__name__)
CORS(app)
  

@app.route("/")
@cross_origin(supports_credentials=True)
def home_view():
    return {
        "success":"true",
        "msg":"Welcome to Farmico's AI Api" 
    }


@app.route("/user")
@cross_origin(supports_credentials=True)
def index():
    return {
        "name": "Saurabh",
        "email": "saurabh@gmail.com",
    }

 
@app.route("/plant-disease", methods=['POST'])
@cross_origin(supports_credentials=True)
def plantDisease():
    imgfile = request.files.get("image", "")
    confidence, label = get_predictions(imgfile)
    return {
        "success": "true",
        "confidence": str(confidence),
        "label": label
    }

    



@app.route("/weed-detection", methods=["POST"])
@cross_origin(supports_credentials=True)
def weedDetection():
    # init_weed_model() 
    imgfile = request.files.get("image", "")
    net, LABELS = import_weed_detection_model()
    # image, layerOutputs, H, W = predict_weed_crop('weed_2.jpeg', net)
    image, layerOutputs, H, W = predict_weed_crop(imgfile, net)
    boxes,confidences,classIDs, idxs = read_weed_crop_model_prediction(layerOutputs, H, W)
    imgURL, text = construct_bounding_box_save_image(image, imgfile, boxes, confidences, classIDs, LABELS, idxs)

    [specie_name, confidence] = text.split(": ")
    return {
        "hasWeed": specie_name == "weed",
        "confidence":confidence,
        "imgURL": imgURL
    }