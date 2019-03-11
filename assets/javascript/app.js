// declare variables
// var currentTime = moment().format('dddd MMMM Do YYYY');
var currentTime = moment().format('dddd MMMM Do YYYY, h:mm:ss a');

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

    // setup to calculate time of next train arrival and number of minutes remaining until next train arrival
    var newTrainTimeConverted = moment(newTrainTime, 'HH:mm').subtract(1, 'years');
    console.log(newTrainTimeConverted);

    var timeNow = moment();
    console.log('CURRENT TIME: ' + moment(timeNow).format('hh:mm a'));

    var diffTime = moment().diff(moment(newTrainTimeConverted), 'minutes');
    console.log('DIFFERENCE IN TIME: ' + diffTime);

    var timeRemain = diffTime % newFrequency;
    console.log(timeRemain);

    // calculate minutes remaining until next train arrival
    var timeToNext = newFrequency - timeRemain;
    console.log('MINUTES TILL TRAIN: ' + timeToNext);

    // calculate time of next train arrival
    var nextArrival = moment().add(timeToNext, 'minutes');
    var nextTrain = moment(nextArrival).format('HH:mm');
    console.log('ARRIVAL TIME: ' + moment(nextArrival).format('hh:mm a'));

    var newRow = $('<tr>').append(
        $('<td>').text(newTrainName),
        $('<td>').text(newDestination),
        $('<td>').text(newFrequency),
        $('<td>').text(nextTrain),
        $('<td>').text(timeToNext)

    );

    // append new train info to the schedule table
    $('#trainTable > tbody').append(newRow);

});