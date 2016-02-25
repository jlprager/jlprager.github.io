var startTime = 5;
var breakTime = 1;
var pause = false;
var startSec;
var breakSec;
setSession();
setBreak();
$("#sessionInput").html(startTime);
$("#breakInput").html(breakTime);
$("#headerTag").html("Session");
$("#time").html(convertNum(startSec));

function setSession(){
	startSec = (startTime * 60);
	$("#time").html(convertNum(startSec));
};

function setBreak(){
	breakSec = (breakTime * 60);
};

function convertNum(num){
	var minutes = Math.floor(num/60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var seconds = Math.floor(num%60);
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var retStr = minutes + ":" + seconds;

	return retStr;
};

function startTimer() {
    if (document.getElementById("headerTag").innerHTML === "Break") {
        pause = false;
        startBreak();
    } else {
        pause = false;
        startWork();
    }
};

function startWork() {
    console.log(pause)
    if (!pause) {
        if (startSec > -1) {
            $("#headerTag").html("Session");
            $("#time").html(convertNum(startSec));
            $("#pause").html("<button class='btn inline' id='pause' onclick='pauseTimer()'>Pause</button>");
            $("#resume").html("");
            $("#start").hide();
            $("#secondaryBackground").css("height", (startSec / (startTime * 60))*100 + "%")
            setTimeout(startWork, 1000);
            startSec--;
        } else {
        	$("#secondaryBackground").css("background-color", "#FFF1D6");
        	$("#secondaryBackground").css("height", "100%");
        	$("#mainBackground").css("background-color", "#BDC7DD")
            setTimeout(startBreak, 0);

            startSec = $("#sessionInput").html();
        }
    }
};

function startBreak() {
    if (!pause) {
        if (breakSec > -1) {
            $("#headerTag").html("Break");
            $("#time").html(convertNum(breakSec));
            $("#secondaryBackground").css("height", (breakSec / (breakTime * 60))*100 + "%")
            setTimeout(startBreak, 1000);
            breakSec--;
        } else {
        	$("#secondaryBackground").css("background-color", "#BDC7DD");
        	$("#secondaryBackground").css("height", "100%");
        	$("#mainBackground").css("background-color", "#FFF1D6")
            setTimeout(startWork, 0);
            breakSec = $("#breakInput").html();
        }
    }
};

function pauseTimer() {
	$("#pause").html("");
	$("#resume").html("<button class='btn inline' id='resume' onclick='startTimer()'>Resume</button>");
    pause = true;
};


function sessUp(){
	startTime++;
	setSession();
	$("#sessionInput").html(startTime);
};


function sessDown(){
	if(startTime > 0){
		startTime--;
		setSession();
	}	
	$("#sessionInput").html(startTime);
};

function brUp(){
	breakTime++;
	setBreak();
	$("#breakInput").html(breakTime);
};

function brDown(){
	if(breakTime > 0){
		breakTime--;
		setBreak();
	}	
	$("#breakInput").html(breakTime);
};

//CANCEL
function cancel(){
	pause = true;
	setSession();
	setBreak();
}

