const { initializeApp } = require("firebase/app")

const firebaseConfig = {
    apiKey: "AIzaSyCLOzCAT8C7ZdUqCeYiojbkq28YQa8xLTA",
    authDomain: "loginplataformaescolar.firebaseapp.com",
    projectId: "loginplataformaescolar",
    storageBucket: "loginplataformaescolar.appspot.com",
    messagingSenderId: "938673088942",
    appId: "1:938673088942:web:64bdfe05ab073d674fc03f"
};
const firebase = initializeApp(firebaseConfig);

module.exports.firebase
