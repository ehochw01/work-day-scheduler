/* 
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
*/

// get the saved scheduled from local storage
var scheduleArray = JSON.parse(localStorage.getItem("schedule"));

// if there is no schedule in localStorage, create an empty schedule array
if(scheduleArray == null) {
    var scheduleArray = ["", "", "", "", "", "", "", "", "", "", "", ""];
}

console.log(scheduleArray);

displayTodaysDate();
renderTimeBlockColors();
renderTimeBlockContent();

// get current time and display it on the page
function displayTodaysDate() {
    console.log("displayTodaysDate()");
    var today = moment().format("dddd, MMMM Do");
    $('#currentDay').text(today);

}

// render time blocks colors 

function renderTimeBlockColors() {
    console.log("renderTimeBlockColors()");
    var hourLog = $('#hour-log');
    // return current hour in military time
    var currentHour = moment().hour();

    for(var i = 0; i < hourLog.children().length; i++) {
        var hourEl = hourLog.children().eq(i);
        var hourElId = hourEl.attr('id');
        if (hourElId >= 1 && hourElId <= 5) {
            var hour = parseInt(hourElId) + 12;
        } else {
            var hour = parseInt(hourElId);
        }

        createSaveButtonEventListener(hourEl, hourElId);
        // get the input field element for the given hour
        var hourElinput = hourEl.children().eq(1)
        if (currentHour > hour) {
            // make background color grey if past
            hourEl.css('background-color','#d3d3d3');
            hourElinput.css('background-color','#d3d3d3');
        } else if (currentHour == hour) {
            // make background color red if present
            hourEl.css('background-color','#ff6961');
            hourElinput.css('background-color','#ff6961');
        } else if (currentHour < hour) {
            // make background color green if future
            hourEl.css('background-color','#77dd77');
            hourElinput.css('background-color','#77dd77');
        }
    }
}

function createSaveButtonEventListener(hourEl, hourElId) {
    // get the button element for which we will add a listener
    var buttonId = "#" + hourElId + "-save"
    var buttonEl = $(buttonId)

    buttonEl.on('click', function(event){
        // validate user input
        if (hourEl.children().eq(1).val() == "") {
            alert("You are trying to save an empty field");
            return;
        } else {
            // save the input to local instorage
            var text = hourEl.children().eq(1).val();
            scheduleArray[parseInt(hourElId)-1] = text;
            console.log(scheduleArray);
            localStorage.setItem("schedule", JSON.stringify(scheduleArray));
        }
    });
}

function renderTimeBlockContent() {

}