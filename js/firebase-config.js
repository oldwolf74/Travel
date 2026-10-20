import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRQt_Bqw0VNjpBQcF5tm1VP7p7Tts1bM0",
  authDomain: "travel-ca579.firebaseapp.com",
  databaseURL: "https://travel-ca579-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "travel-ca579",
  storageBucket: "travel-ca579.firebasestorage.app",
  messagingSenderId: "751866131260",
  appId: "1:751866131260:web:60a16fa07a4cad55e46439"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
