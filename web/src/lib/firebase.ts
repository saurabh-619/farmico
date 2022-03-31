import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx9SPkf2w_mmkSG-lXHxaTZx2UBwB87fs",
  authDomain: "farmico-models.firebaseapp.com",
  databaseURL:
    "https://farmico-models-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "farmico-models",
  storageBucket: "farmico-models.appspot.com",
  messagingSenderId: "46576563369",
  appId: "1:46576563369:web:1363374f826ccb4cd265b8",
};

const firebaseApp = initializeApp(firebaseConfig);
export const fStorage = getStorage(firebaseApp);
