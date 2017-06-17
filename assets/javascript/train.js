
// var currentTime = moment().format('HH:mm');
// console.log(currentTime);
// var currentTime = moment().subract();
// currentTime.fromNow();
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

	// variable to hold the user input
	var userInputName = $("<td>");
	var userInputDestination = $("<td>");
	var userInputfrequency = $("<td>");
	var userInputTrainTime = $("<td>");
	// moment.js part
	var userTrainMinutesAway = $("<td>") 
	
	// append all the user inputs into the created table slots
	userInputName.append(trainNameInput);
	userInputDestination.append(trainDestinationInput);
	userInputfrequency.append(frequencyInput);
	userInputTrainTime.append(firstTrainTimeInput);
	
	// append all the created table slots to the table's html
	$(".currentTrainTable").append(userInputName, userInputDestination, userInputfrequency, userInputTrainTime, userTrainMinutesAway)
	// add this info to the firebase database
	database.ref().set({trainName: userInputName});
	database.ref().set({trainDestination: userInputDestination});
	database.ref().set({trainFrequency: userInputfrequency});
	database.ref().set({trainTime: userInputTrainTime});
	database.ref().on("value", function (snapshot){
  	console.log(snapshot.val());
  });
})