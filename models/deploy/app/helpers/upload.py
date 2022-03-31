import pyrebase
import time
import numpy as np
import os
import cv2
import tempfile



# Firebase
config = {
    "apiKey": "AIzaSyAx9SPkf2w_mmkSG-lXHxaTZx2UBwB87fs",
    "authDomain": "farmico-models.firebaseapp.com",
    "projectId": "farmico-models",
    "storageBucket": "farmico-models.appspot.com",
    "databaseURL":"https://farmico-models-default-rtdb.asia-southeast1.firebasedatabase.app/",
    "messagingSenderId": "46576563369",
    "appId": "1:46576563369:web:1363374f826ccb4cd265b8",
    "serviceAccount": f"{os.getcwd()}/app/farmico-models-firebase-adminsdk-dh5ty-78950ec58a.json"
}

firebase = pyrebase.initialize_app(config)
auth = firebase .auth()
user = auth.sign_in_anonymous()
storage = firebase.storage()


def saveImgOnServer(det, isResult = False, type = 0):
    BASE_PATH = os.path.join(os.getcwd(), "app")
    local_path = os.path.join(BASE_PATH, f'assets/{"plant_disease" if type == 0 else "weed_detection"}/{"results" if isResult else "inputs"}/new.jpeg') 
    det = cv2.cvtColor(det,cv2.COLOR_RGB2BGR)
    cv2.imwrite(local_path,det)
    return local_path


def uploadInputToFirebase(imgfile, userId, isResult = False, type = 0): 
    BASE_PATH = os.path.join(os.getcwd(), "app")
    local_path = os.path.join(BASE_PATH, f'assets/{"plant_disease" if type == 0 else "weed_detection"}/{"results" if isResult else "inputs"}')  
     
    imgfile.save(os.path.join(local_path, "image.jpeg")); 

    path_on_firebase = f'{"plant_disease" if type == 0 else "weed_detection"}/{"results" if isResult else "inputs"}/{userId}/'+str(time.time())+'.jpeg'  
    storage.child(path_on_firebase).put(local_path)
    # url = storage.child(path_on_firebase).get_url(user["idToken"]) 
    url = storage.child(path_on_firebase).get_url(user["idToken"]) 
    return url


def uploadToFirebase(local_path, userId, isResult = False, type = 0): 
    # type: plant_disease => 0, weed_detection = 1
    path_on_firebase = f'{"plant_disease" if type == 0 else "weed_detection"}/{"results" if isResult else "inputs"}/{userId}/'+str(time.time())+'.jpeg'
    storage.child(path_on_firebase).put(local_path);
    url = storage.child(path_on_firebase).get_url(user["idToken"]) 
    return url