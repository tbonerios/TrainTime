
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAcmukHL-VntL3G6vkhVVbqDFjdX4iocs8",
    authDomain: "traintime-ed63a.firebaseapp.com",
    databaseURL: "https://traintime-ed63a.firebaseio.com",
    projectId: "traintime-ed63a",
    storageBucket: "traintime-ed63a.appspot.com",
    messagingSenderId: "206957434291"
  };
  firebase.initializeApp(config);


    // Create a variable to reference the database.
    var database = firebase.database();

    var trainName = "";
    var destination = "";

    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

 // Capture Button Click
    $("#submit-bid").on("click", function(event) {
      event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#first-time").val().trim();
    tFrequency = $("#frequency-input").val().trim();

		database.ref().push({
		  trainName: trainName,
		  destination: destination,
		  firstTime: firstTime,
		  tFrequency: tFrequency,
          nextTrain: nextTrain,
          tMinutesTillTrain: tMinutesTillTrain
		});
});


database.ref().on('child_added', function(childSnapshot){

	// var next = nextArrival(childSnapshot.val().tFrequency, childSnapshot.val().firstTime)

	// var mins = minutesAway(nextArrival, moment())

	$("#output").append("<tr><td>" + childSnapshot.val().trainName +            "</td><td>" + childSnapshot.val().destination +            "</td><td>" + childSnapshot.val().tFrequency +            "</td><td>" + childSnapshot.val().nextTrain + 
		            "</td><td>" + childSnapshot.val().tMinutesTillTrain + "</td><td></td></tr>");
});


// function nextArrival(frequency, startTime){
	
// 	return 0;
// }
	

// function minutesAway(nextArrival, currentTime){

// 	return 0;

// }

   
