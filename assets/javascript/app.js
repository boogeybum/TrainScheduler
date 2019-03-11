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


// Submit button for adding trains
$('#submitNewTrain').on('click', function(event) {
    event.preventDefault();

    // variables for holding user input
    var newTrainName = $('#trainName').val().trim();
    var newDestination = $('#destination').val().trim();
    var newTrainTime = moment($('#firstTrainTime').val().trim(), 'h:mm:ss a').format('X');
    var newFrequency = $('#frequency').val().trim();

    // local temporary object to hold user input
    var newTrain = {
        name: newTrainName,
        destination: newDestination,
        time: newTrainTime,
        frequency: newFrequency
    };

    // upload train info to database
    database.ref().push(newTrain);

    // console log verification of values
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // clear form input
    $('#trainName').val('');
    $('#destination').val('');
    $('#firstTrainTime').val('');
    $('#frequency').val('');

});

// Event for retrieving train info from database and displaying in a table on html page
database.ref().on('child_added', function(childSnapshot) {
    console.log(childSnapshot.val());

    // store database info in a variable
    var newTrainName = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var newTrainTime = childSnapshot.val().time;
    var newFrequency = childSnapshot.val().frequency;

    // console log to verify retrieved data is stored in variable
    console.log(newTrainName);
    console.log(newDestination);
    console.log(newTrainTime);
    console.log(newFrequency);

    // human friendly time formatting
    var readableTime = moment.unix(newTrainTime).format('h:mm a');
    console.log(readableTime);

    // calculate time to next train arrival
    var nextArrival = '8:00pm';

    // calculate minutes remaining until next train arrival
    var timeToNext = '7';

    var newRow = $('<tr>').append(
        $('<td>').text(newTrainName),
        $('<td>').text(newDestination),
        $('<td>').text(newFrequency),
        $('<td>').text(nextArrival),
        $('<td>').text(timeToNext)

    );

    // append new train info to the schedule table
    $('#trainTable > tbody').append(newRow);

});