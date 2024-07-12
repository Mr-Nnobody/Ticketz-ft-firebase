// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuGQ9uM4Ga4rD61Z5nQTP-AQcnB_VGPxQ",
  authDomain: "ticketz-backend-cc07d.firebaseapp.com",
  databaseURL: "https://ticketz-backend-cc07d.firebaseio.com",
  projectId: "ticketz-backend-cc07d",
  storageBucket: "ticketz-backend-cc07d.appspot.com",
  messagingSenderId: "608281686411",
  appId: "1:608281686411:web:9d7942624f46ab55557f8e",
  measurementId: "G-XEJX94Y417",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
