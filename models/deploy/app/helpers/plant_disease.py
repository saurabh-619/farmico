from keras.models import load_model   
import tensorflow_hub as hub
import cv2
import numpy as np 

plantDiseaseModel = load_model('./app/assets/plant_disease/diseaseDetection.h5', custom_objects={
                               'KerasLayer': hub.KerasLayer})

def load_image(imgfile):
    npimg = np.fromfile(imgfile, np.uint8) 
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (224, 224))
    img = img / 255
    return img


def get_label(index):
    classes = ['Pepper bell Bacterial spot', 'Pepper bell healthy',
               'Potato Early blight', 'Potato Late blight', 'Potato healthy',
               'Tomato Bacterial spot', 'Tomato Early blight', 'Tomato Late blight',
               'Tomato Leaf Mold', 'Tomato Septoria leaf spot',
               'Tomato Spider mites Two spotted spider mite', 'Tomato Target Spot',
               'Tomato Tomato YellowLeaf Curl Virus', 'Tomato Tomato mosaic virus',
               'Tomato healthy']
    return classes[index]

def get_predictions(imgfile):
    img = load_image(imgfile)
    probabilities = plantDiseaseModel.predict(np.asarray([img]))[0]
    maxConfi = np.argmax(probabilities) 
    confidence = probabilities[maxConfi]
    label = get_label(maxConfi)
    return confidence, label