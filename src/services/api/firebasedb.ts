import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_5QuZA6LPR8-hnKqPYcLYzXunb5IhDhM",
  authDomain: "test-imgs-bdd05.firebaseapp.com",
  databaseURL: "https://test-imgs-bdd05-default-rtdb.firebaseio.com",
  projectId: "test-imgs-bdd05",
  storageBucket: "test-imgs-bdd05.firebasestorage.app",
  messagingSenderId: "46170130899",
  appId: "1:46170130899:web:c1badfda4806d172e3c726",
  measurementId: "G-97H2X5L4J1",
};

const medicalApp = initializeApp(firebaseConfig, "medical-data");

export const realtimeDb = getDatabase(medicalApp);
