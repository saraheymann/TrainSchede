
var database = firebase.database();

// onclick that submits data to the table
// create a variable that holds the new submits
$("#addTrain").on("click", function(event){
	event.preventDefault();

	// create a variable that gets the value from the train name input
	var trainNameInput = $(".trainName").val().trim();
	// create a variable that gets the value from the add destination input
	var trainDestinationInput = $(".destination").val().trim();
	// create a variable that gets the value from the add first train time
	var firstTrainTimeInput = $(".firstTrainTime").val().trim();
	// creat a variable that gets the value from the add frequency
	var frequencyInput = $(".frequencyInput").val().trim();
	
	// moments.js section
	// user input pushed back a year so that it comes before time
	var firstTimeConverted = moment(firstTrainTimeInput, "hh:mm").subtract(1, "years");
	// now
	var now = moment();
	// difference between the times in minutes
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	// multiplying the remainder by the frequency
	var tRemainder = diffTime % frequencyInput;
	// the frequency minus the last time the train came
	var tMinutesTillTrain = frequencyInput - tRemainder;
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainFormatted = moment(nextTrain).format("hh:mm");

  
	// variable to hold the user input
	var emptyTr = $("<tr>");
	var userInputName = $("<td>");
	var userInputDestination = $("<td>");
	var userInputfrequency = $("<td>");
	var userInputTrainTime = $("<td>");
	var userTrainMinutesAway = $("<td>") 
	
	// // append all the user inputs into the created table slots
	userInputName.append(trainNameInput);
	userInputDestination.append(trainDestinationInput);
	userInputfrequency.append(frequencyInput);
	userInputTrainTime.append(nextTrainFormatted);
	userTrainMinutesAway.append(tMinutesTillTrain);

	emptyTr.append(userInputName, userInputDestination, userInputfrequency, userInputTrainTime, userTrainMinutesAway)
	
	// append all the created table slots to the table's html
	$(".currentTrainTable").append(emptyTr)

	// add this info to the firebase database
	database.ref().push({
		TrainName: trainNameInput,
		TrainDestination: trainDestinationInput,
		TrainTime: nextTrainFormatted,
		Frequency: frequencyInput,
		MinutesAwayData: tMinutesTillTrain
	});
	database.ref().on("child_added", function (snapshot){
  	console.log(snapshot.val());
  });
})

