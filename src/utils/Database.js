import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAqRK83c-FGuGDPJD-7Zlp1WQfjwpQmL2s",
    authDomain: "software-quality-rendin.firebaseapp.com",
    databaseURL: "https://software-quality-rendin.firebaseio.com",
    projectId: "software-quality-rendin",
    storageBucket: "software-quality-rendin.appspot.com",
    messagingSenderId: "382150948068",
    appId: "1:382150948068:web:13f1c62e8c22beed4f28f1",
    measurementId: "G-YK02BZN88L"
};




const database = firebase.initializeApp(firebaseConfig);
export default database;