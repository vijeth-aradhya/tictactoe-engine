window.onload = main;
//GLOBAL VARIABLES AND FUNCTION VARIABLES
var game = 0;
var eachSquare = [];
var numOfGrids = 0;
var turn = 0;

function main() {
	var thisBoard = document.getElementById("tictactoe-board");
	var gridSelection = document.getElementById("tictactoe-create-grid");

	gridSelection.addEventListener("click", function () {
		var i=0;
		numOfGrids = document.getElementById("tictactoe-grid-selection").value;
		var gridParent = document.getElementById("tictactoe-info");
		gridParent.removeChild(gridSelection);
		gridParent.removeChild(document.getElementById("tictactoe-grid-selection"));
		document.getElementById("tictactoe-grid-selection-text").innerHTML = "Play on and enjoy!";
		while(i<(numOfGrids*numOfGrids)) {
			thisSquare = '<div id="tictactoe-square-' + i + '" class="tictactoe-squares" align="center" state="not-played"></div>';
			thisBoard.innerHTML += thisSquare;
			i=i+1;
		}
		var j=0;
		while(j<(numOfGrids*numOfGrids)){
			eachSquare.push(document.getElementById("tictactoe-square-" + j));
			if(numOfGrids == 3) {	
				eachSquare[j].style.width = "30%";
				eachSquare[j].style.height = "30%";
			}
			else {
				eachSquare[j].style.width = "23%";
				eachSquare[j].style.height = "23%";
			}
			j=j+1;
		}
		gridParent.innerHTML += '<button id="tictactoe-play-again">Play again</button><br><br>';
		gridParent.innerHTML += '<a href="./tictactoe.html" id="reset-conditions">Reset conditions</a>';
		document.getElementById("tictactoe-play-again").addEventListener("click", playAgain);
	});

	thisBoard.addEventListener("click", function () {	
		document.addEventListener('click', function(e) {
    		e = e || window.event;
    		var target = e.target
    		if(target.getAttribute("state") == "not-played" && game == 0) {	
    			target.setAttribute("state", "played");
    			if(turn%2 == 0) {
    				target.innerHTML = "X";
    			}
    			else {
    				target.innerHTML = "O";
    			}
    			turn++;
    			checkWin();
    		}
		}, false);
	});
}

function playAgain() {
	var j=0;
	while(j<(numOfGrids*numOfGrids)){
		eachSquare[j].setAttribute("state", "not-played");
		eachSquare[j].innerHTML = "";
		eachSquare[j].style.backgroundColor = ""; 
		j=j+1;
	}
	game = 0;
	turn = 0;
}

function checkWin() {
	var j=0;
	if(numOfGrids == 3) {
		while(j<(numOfGrids*numOfGrids)) {
			if(eachSquare[j].getAttribute("state") == "played" && eachSquare[j+1].getAttribute("state") == "played" && eachSquare[j+2].getAttribute("state") == "played") {
				if(eachSquare[j].innerHTML == eachSquare[j+1].innerHTML && eachSquare[j+2].innerHTML == eachSquare[j+1].innerHTML) {
					eachSquare[j].style.backgroundColor = "green"; 
					eachSquare[j+1].style.backgroundColor = "green"; 
					eachSquare[j+2].style.backgroundColor = "green"; 
					game = 1;
				}
			}
			j=j+3;
		}
		j=0;
		while(j<numOfGrids) {
			if(eachSquare[j].getAttribute("state") == "played" && eachSquare[j+3].getAttribute("state") == "played" && eachSquare[j+6].getAttribute("state") == "played") {
				if(numOfGrids == 3 && eachSquare[j].innerHTML == eachSquare[j+3].innerHTML && eachSquare[j+6].innerHTML == eachSquare[j+3].innerHTML) {
					eachSquare[j].style.backgroundColor = "green"; 
					eachSquare[j+3].style.backgroundColor = "green"; 
					eachSquare[j+6].style.backgroundColor = "green"; 
					game = 1;
				}
			}
			j=j+1;
		}
		if(eachSquare[0].getAttribute("state") == "played" && eachSquare[4].getAttribute("state") == "played" && eachSquare[8].getAttribute("state") == "played") {
			if(eachSquare[0].innerHTML == eachSquare[4].innerHTML && eachSquare[4].innerHTML == eachSquare[8].innerHTML) {
				eachSquare[0].style.backgroundColor = "green"; 
				eachSquare[4].style.backgroundColor = "green"; 
				eachSquare[8].style.backgroundColor = "green"; 
				game = 1;
			}
		}
		if(eachSquare[2].getAttribute("state") == "played" && eachSquare[4].getAttribute("state") == "played" && eachSquare[6].getAttribute("state") == "played") {
			if(eachSquare[2].innerHTML == eachSquare[4].innerHTML && eachSquare[6].innerHTML == eachSquare[4].innerHTML) {
				eachSquare[2].style.backgroundColor = "green"; 
				eachSquare[4].style.backgroundColor = "green"; 
				eachSquare[6].style.backgroundColor = "green"; 
				game = 1;
			}
		}	
	}
	else {
		j=0;
		while(j<(numOfGrids*numOfGrids)) {
			if(eachSquare[j].getAttribute("state") == "played" && eachSquare[j+1].getAttribute("state") == "played" && eachSquare[j+2].getAttribute("state") == "played" && eachSquare[j+3].getAttribute("state") == "played") {	
				if(numOfGrids == 4 && eachSquare[j].innerHTML == eachSquare[j+1].innerHTML && eachSquare[j+2].innerHTML == eachSquare[j+1].innerHTML && eachSquare[j+2].innerHTML == eachSquare[j+3].innerHTML) {
					eachSquare[j].style.backgroundColor = "green"; 
					eachSquare[j+1].style.backgroundColor = "green"; 
					eachSquare[j+2].style.backgroundColor = "green"; 
					eachSquare[j+3].style.backgroundColor = "green"; 
					game = 1;
				}
			}
			j=j+4;
		}
		j=0;
		while(j<numOfGrids) {
			if(eachSquare[j].getAttribute("state") == "played" && eachSquare[j+4].getAttribute("state") == "played" && eachSquare[j+8].getAttribute("state") == "played" && eachSquare[j+12].getAttribute("state") == "played") {
				if(eachSquare[j].innerHTML == eachSquare[j+4].innerHTML && eachSquare[j+8].innerHTML == eachSquare[j+4].innerHTML && eachSquare[j+8].innerHTML == eachSquare[j+12].innerHTML) {
					eachSquare[j].style.backgroundColor = "green"; 
					eachSquare[j+4].style.backgroundColor = "green"; 
					eachSquare[j+8].style.backgroundColor = "green"; 
					eachSquare[j+12].style.backgroundColor = "green"; 
					game = 1;
				}
			}
			j=j+1;
		}
		if(eachSquare[0].getAttribute("state") == "played" && eachSquare[5].getAttribute("state") == "played" && eachSquare[10].getAttribute("state") == "played" && eachSquare[15].getAttribute("state") == "played") {
			if(eachSquare[0].innerHTML == eachSquare[5].innerHTML && eachSquare[5].innerHTML == eachSquare[10].innerHTML && eachSquare[10].innerHTML == eachSquare[15].innerHTML) {
				eachSquare[0].style.backgroundColor = "green"; 
				eachSquare[5].style.backgroundColor = "green"; 
				eachSquare[10].style.backgroundColor = "green"; 
				eachSquare[15].style.backgroundColor = "green"; 
				game = 1;
			}
		}
		if(eachSquare[3].getAttribute("state") == "played" && eachSquare[6].getAttribute("state") == "played" && eachSquare[9].getAttribute("state") == "played" && eachSquare[12].getAttribute("state") == "played") {
			if(eachSquare[3].innerHTML == eachSquare[6].innerHTML && eachSquare[6].innerHTML == eachSquare[9].innerHTML && eachSquare[9].innerHTML == eachSquare[12].innerHTML) {
				eachSquare[3].style.backgroundColor = "green"; 
				eachSquare[6].style.backgroundColor = "green"; 
				eachSquare[9].style.backgroundColor = "green"; 
				eachSquare[12].style.backgroundColor = "green"; 
				game = 1;
			}
		}
	}
}