// Adds functionality for creating and logging into the application

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDm-MuMfMTfLEon_tUB4Vw2Hy6unaE6-I",
    authDomain: "safebike-15d63.firebaseapp.com",
    databaseURL: "https://safebike-15d63.firebaseio.com",
    projectId: "safebike-15d63",
    storageBucket: "",
    messagingSenderId: "832976793088",
    appId: "1:832976793088:web:04ae41016c6474f65d32e5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const txtEmail = document.getElementById("emailField");
const txtPassword = document.getElementById("passwordField");
const btnLogin = document.getElementById("loginButton");
const btnSignUp = document.getElementById("signUpButton");
const btnLogOut = document.getElementById("logOutButton");
const btnCreateAccount = document.getElementById("createAccount");

// Add Login Event
btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.catch(e => console.log(e.message));
});

// Go to sign up page
btnSignUp.addEventListener('click', e => {
    window.location = 'signup.html';
});

// Add Create Account Event
btnCreateAccount.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email,password);
    promise.catch(e => console.log(e.message));
});

// Add Logout Function
btnLogOut.addEventListener('click', e => {
    firebase.auth().signOut();
});

// Realtime Listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogOut.style.display = "inline";
        btnLogin.style.display = 'none';
        btnSignUp.style.display = 'none';
    } else {
        btnLogOut.style.display = "none";
        btnLogin.style.display = 'inline';
        btnSignUp.style.display = 'inline';
        console.log("Not logged in")
    }
});

<<<<<<< HEAD
console.log("Firebase loaded");
=======
  console.log("Firebase loaded");
>>>>>>> 23eb90acb56097262dbb15c66dc3770c37d5d47d
