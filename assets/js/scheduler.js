var scheduleData = {
    "scheduleData9": "",
    "scheduleData10": "",
    "scheduleData11": "",
    "scheduleData12": "",
    "scheduleData13": "",
    "scheduleData14": "",
    "scheduleData15": "",
    "scheduleData16": "",
    "scheduleData17": ""
};

// The localStorageName must be different for each day
var localStorageName = "scheduleData" + moment().format('YYYYMMDD');

init();
function init() {
    setTimeColor();
    setTextInTextarea();
};

// Change color of cell according to time.
function setTimeColor() {
    var currentHour = moment().format('HH');
    for (var targetHour = 9; targetHour < 18; targetHour++) {
        var targetID = "#" + targetHour + "td";
        //console.log("setTimeColor" + targetID);
        if (currentHour > targetHour) {
            $(targetID).addClass("past");
        } else if (currentHour == targetHour) {
            $(targetID).addClass("present");
        } else {
            $(targetID).addClass("future");
        }
    }
};

function setTextInTextarea() {
    // Read localStorage and display values in textarea 
    var scheduleDataStr = localStorage.getItem(localStorageName);
    // check null here as we don't want to change sheduleData to null. it must be in JSON type.
    if (scheduleDataStr != null) {
        scheduleData = JSON.parse(scheduleDataStr);
        for (var i = 9; i < 18; i++) {
            var jsonKey = "scheduleData" + i;
            var jsonValue = scheduleData[jsonKey];
            //console.log("jsonKeyName, jsonValue: ", jsonKey, jsonValue);
            // Set text to textarea
            $("#" + i + "textarea").val(jsonValue);
        }
    }
};

$("button").click(function () {
    //console.log(this);
    var hour = $(this).attr("id");
    var str = $("#" + hour + "textarea").val();
    //console.log("saveLocalStorage(hour, str): " + hour, str);
    saveLocalStorage(hour, str);
    $("#" + hour).removeClass("unsaved");
});

function saveLocalStorage(hour, str) {
    var jsonElementName = "scheduleData" + hour;
    scheduleData[jsonElementName] = str;
    //console.log("scheduleData in saveLocalStorage()" + jsonElementName, scheduleData[jsonElementName]);
    // set it to localStorage
    localStorage.setItem(localStorageName, JSON.stringify(scheduleData));
};

// Change the "SAVE" icon yellow when text entry in textarea has not been saved. 
$('textarea').on('input', function () {
    var textareaID = $(this).attr("id");
    // Remove "textarea" from textareaID
    var hour = textareaID.replace(/textarea/i, "");
    //console.log(hour);
    $("#" + hour).addClass("unsaved");
});

// Hide the NavText (below) when displayed on a mobile phone. 
// "A simple calendar app for scheduling your work day"
function hideNavText(x) {
    //console.log("hideNavText");
    var desc = document.getElementById("appdescription");
    if (x.matches) { // If media query matches
        desc.style.display = "none";
    } else {
        desc.style.display = "block";
    }
}
var x = window.matchMedia("(max-width: 700px)")
hideNavText(x) // Call listener function at run time
x.addListener(hideNavText) // Attach listener function on state changes


setInterval(updateClock, 1000);
function updateClock() {
    var now = moment().format('D/MM/YYYY HH:mm:ss');
    $("#currentDateTime").text("Today: " + now);
}
