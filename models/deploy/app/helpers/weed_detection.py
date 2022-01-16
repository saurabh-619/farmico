import cv2
import numpy as np
import matplotlib.pyplot as plt
import time
import os
import pyrebase

# Firebase
config = {
    "apiKey": "AIzaSyAx9SPkf2w_mmkSG-lXHxaTZx2UBwB87fs",
    "authDomain": "farmico-models.firebaseapp.com",
    "projectId": "farmico-models",
    "storageBucket": "farmico-models.appspot.com",
    "databaseURL":"https://farmico-models-default-rtdb.asia-southeast1.firebasedatabase.app/",
    "messagingSenderId": "46576563369",
    "appId": "1:46576563369:web:1363374f826ccb4cd265b8"
}

firebase = pyrebase.initialize_app(config)
auth = firebase .auth()
user = auth.sign_in_anonymous()
storage = firebase.storage()



# Weed detection  
BASE_PATH = os.path.join(os.getcwd(), "app")
ASSETS_PATH=os.path.join(BASE_PATH, 'assets/weed_detection')  
confi = 0.5
thresh = 0.5 


#import Weed detection model
def import_weed_detection_model():
    #load the class labels our YOLO model was trained on
    labelsPath = os.path.join(ASSETS_PATH, 'obj.names')
    LABELS = open(labelsPath).read().strip().split("\n")

    #load weights and cfg
    weightsPath = os.path.join(ASSETS_PATH, "crop_weed_detection.weights")
    configPath = os.path.join(ASSETS_PATH, "crop_weed.cfg")
    #color selection for drawing bbox
    np.random.seed(42)
    
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)   
    return net, LABELS


#Getting prediction from model
# def predict_weed_crop(image_name, net):
def predict_weed_crop(imgfile, net):
    #load our input image and grab its spatial dimensions
    npimg = np.fromfile(imgfile, np.uint8) 
    image  = cv2.imdecode(npimg, cv2.IMREAD_COLOR) 
    (H, W) = image.shape[:2]

    #determine only the output layer names that we need from YOLO
    ln = net.getLayerNames()
    ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

    #construct a blob from the input image and then perform a forward
    #pass of the YOLO object detector, giving us our bounding boxes and
    #associated probabilities
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (512, 512),swapRB=True, crop=False)

    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    end = time.time()
    #show timing information on YOLO
    print("[INFO] YOLO took {:.6f} seconds".format(end - start))
    return image, layerOutputs, H, W


#Parsing model predictions
def read_weed_crop_model_prediction(layerOutputs, H, W):
    #initialize our lists of detected bounding boxes, confidences, and
    #class IDs, respectively
    boxes = []
    confidences = []
    classIDs = []

    #loop over each of the layer outputs
    for output in layerOutputs:
        #loop over each of the detections
        for detection in output:
            #extract the class ID and confidence (i.e., probability) of
            #the current object detection
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]

            #filter out weak predictions by ensuring the detected
            #probability is greater than the minimum probability
            if confidence > confi:
                #scale the bounding box coordinates back relative to the
                #size of the image, keeping in mind that YOLO actually
                #returns the center (x, y)-coordinates of the bounding
                #box followed by the boxes' width and height
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")

                #use the center (x, y)-coordinates to derive the top and
                #and left corner of the bounding box
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                #update our list of bounding box coordinates, confidences,
                #and class IDs
                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)

    #apply non-maxima suppression to suppress weak, overlapping bounding
    #boxes
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, confi, thresh)

    return boxes,confidences,classIDs, idxs


def construct_bounding_box_save_image(image, imgfile, boxes,confidences,classIDs, LABELS, idxs):
    #ensure at least one detection exists
    COLORS = np.random.randint(0, 255, size=(len(LABELS), 3),dtype="uint8")
    if len(idxs) > 0:
        #loop over the indexes we are keeping
        for i in idxs.flatten():
            #extract the bounding box coordinates
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])

            #draw a bounding box rectangle and label on the image
            color = [int(c) for c in COLORS[classIDs[i]]]
            cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
            
        #Text on bounding box
        #text = "{}: {:.4f}".format(LABELS[classIDs[i]], confidences[i])
            #cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,0.5, color, 2)
    det = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    plt.figure(figsize=(12,8))
    plt.imshow(det)

    #save detected image 
    BASE_PATH = os.path.join(os.getcwd(), "app")
    local_path = os.path.join(BASE_PATH, 'assets/weed_detection/results/new-result.jpeg') 
    det = cv2.cvtColor(det,cv2.COLOR_RGB2BGR)
    cv2.imwrite(local_path,det)

    # Save on cloud
    path_on_firebase = 'weed-detection/results/user-id/'+str(time.time())+'.jpeg'
    storage.child(path_on_firebase).put(local_path);
    url = storage.child(path_on_firebase).get_url(user["idToken"]) 
    text = "{}: {:.4f}".format(LABELS[classIDs[i]], confidences[i])
    return url, text
 
