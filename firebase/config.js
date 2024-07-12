//TODO: swap config files

import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY_HERE_AIzaSyAOWH",
  authDomain: "ticketz-backend-cc07d.firebaseapp.com",
  databaseURL: "https://your-database-name.firebaseio.com",
  projectId: "ticketz-backend-cc07d",
  storageBucket: "ticketz-backend-cc07d.appspot.com",
  messagingSenderId: "608281686411",
  appId: "1:608281686411:android:f0c236940f335f13557f8e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
