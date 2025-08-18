// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuNxOaPc-LOr_85reFy_EbKKD1jdcZ3YI",
  authDomain: "drive-clone-808fa.firebaseapp.com",
  projectId: "drive-clone-808fa",
  storageBucket: "drive-clone-808fa.appspot.com",
  messagingSenderId: "393869899304",
  appId: "1:393869899304:web:e0fc59b0644bfbb8ada71d",
  measurementId: "G-Y93BC62NHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only on client side)
let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log("Analytics not available:", error);
  }
}
export { analytics };

export default app;
