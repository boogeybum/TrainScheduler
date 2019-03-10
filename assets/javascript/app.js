// declare variables
var currentTime = moment().format('dddd MMMM Do YYYY');
// var currentTime = moment().format('dddd MMMM Do YYYY, h:mm:ss a');

var config = {
    apiKey: "AIzaSyCwPl3wdsmMNBeaWVuZ8DUq40tfGZReWcc",
    authDomain: "train-scheduler-62e93.firebaseapp.com",
    databaseURL: "https://train-scheduler-62e93.firebaseio.com",
    projectId: "train-scheduler-62e93",
    storageBucket: "",
    messagingSenderId: "746598168562"
  };
  firebase.initializeApp(config);

// Variable to reference database
var database = firebase.database();

// display current day and time on page updated each second
$('#current').text(currentTime);
