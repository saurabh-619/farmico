import os
from sys import path
import cv2
import numpy as np  
# import tensorflow as tf
import tflite_runtime.interpreter as tflite

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
    BASE_PATH = os.path.join(os.getcwd(), "app")
    MODEL_PATH = os.path.join(BASE_PATH,'assets/plant_disease/diseaseModel.tflite') 
    print(MODEL_PATH)
    # interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
    interpreter = tflite.Interpreter(model_path=MODEL_PATH)
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    input_shape = input_details[0]['shape']

    img = load_image(imgfile)
    img = [img.astype('float32')]
    interpreter.set_tensor(input_details[0]['index'], img)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])  
    maxConfi = np.argmax(output_data[0])
    confidence = output_data[0][maxConfi]
    label = get_label(maxConfi)
    print(f"label : {label}, Confidence : {confidence}")

    return confidence, label 