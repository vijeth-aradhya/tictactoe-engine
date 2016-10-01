(function(){
	window.onload = main;
	//GLOBAL VARIABLES AND FUNCTION VARIABLES
	var game = 0;
	var eachSquare = [];
	var numOfGrids = 0;
	var numOfPlayers = 0;
	var turn = 0;
	var thisSquare = null;

	function main() {
		var thisIndex;
		var gridParent = document.getElementById("tictactoe-grid-select-div");
		var playersParent = document.getElementById("tictactoe-players-select-div");
		var thisBoard = document.getElementById("tictactoe-board");
		var playersSelection = document.getElementById("tictactoe-choose-number-of-players");
		var gridSelection = document.getElementById("tictactoe-create-grid");

		playersSelection.addEventListener("click", setNumOfPlayers, false);
	
		function setNumOfPlayers() {
			numOfPlayers = document.getElementById("tictactoe-players-selection").value;
			console.log("Players: " + numOfPlayers);
			document.getElementById("tictactoe-grid-select-div").style.display = "inline";
		};
	
		gridSelection.addEventListener("click", function () {
			var i=0;
			numOfGrids = document.getElementById("tictactoe-grid-selection").value;
			
			gridParent.removeChild(document.getElementById("tictactoe-create-grid"));
			gridParent.removeChild(document.getElementById("tictactoe-grid-selection"));
			playersParent.removeChild(document.getElementById("tictactoe-choose-number-of-players"));
			playersParent.removeChild(document.getElementById("tictactoe-players-selection"));
			playersParent.removeChild(document.getElementById("tictactoe-players-selection-text"));

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
			document.getElementById("tictactoe-play-again").addEventListener("click", playAgain); //how to give arguments?
	/*		var k=0;
			eachSquare[0].innerHTML = "X";
			eachSquare[4].innerHTML = "X";
			eachSquare[2].innerHTML = "X";
			eachSquare[1].innerHTML = "O";
			eachSquare[3].innerHTML = "O";
			eachSquare[5].innerHTML = "O";
			eachSquare[6].innerHTML = "O";
			while(k<7) {
				eachSquare[k].setAttribute("state", "played");
				k++;
			}
	*/
		});

		thisBoard.addEventListener("click", function () {	
			switch(numOfPlayers) {
				case "1":
			document.addEventListener('click', onePlayerGame, false );
			console.log("One player event listener added")
			break;
				case "2":
				document.addEventListener('click', twoPlayerGame, false );
			console.log("Two player event listener added")
		break;
				default:
			document.addEventListener('click', onePlayerGame, false );
			console.log("Default, One player event listener added")
			break;
			}
		});
	}

	function onePlayerGame(e) {
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
	//    			playAI(eachSquare, turn, "X");
			checkWin();
			if(turn == 9) {
				gridParent.innerHTML += "<br>It is a draw."
				game = 1;
			}
			if(game == 0) {
				if(turn%2 == 0) {	
					thisIndex = (playAI(eachSquare, turn, "X") + " ").split(" ");
					console.log(thisIndex);
					eachSquare[parseInt(thisIndex[1])].innerHTML = "X";
					eachSquare[parseInt(thisIndex[1])].setAttribute("state", "played");
					turn++;
				}
				else {
					thisIndex = (playAI(eachSquare, turn, "O") + " ").split(" ");
					console.log(thisIndex);
					eachSquare[parseInt(thisIndex[1])].innerHTML = "O";
					eachSquare[parseInt(thisIndex[1])].setAttribute("state", "played");
					turn++;
				}
				checkWin();
				if(turn == 9 && game == 0) {
					gridParent.innerHTML += "<br>It is a draw."
					game = 1;
				}
			}
		}
	};

	function twoPlayerGame(e) {
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
	};

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
		if(game == 1) {
			return(1);
		}
		else {
			return(0);
		}
	}

	function playAI(eachSquare, thisMoveNumber, player) {
		var tempCheckWin;
		//console.log("This is " + str(thisMoveNumber) + "and player is" + str(player)); str is not defined?
		tempCheckWin = tCheckWin();
		if(player == "O") {
			if(tempCheckWin) {
				return(10);
			}
		}
		else {
			if(tempCheckWin) {
				return(-10);
			}
		}
		if(thisMoveNumber == 9) {
			return 0;
		}
		var i=0, minimax, returnString, tempminimax, returnIndex;
		if(player == "O") {
			minimax = 100;
		}
		else {
			minimax = (-100);
		}
		while(i<9) {
			//console.log(i + "-" + thisMoveNumber + "-" + player);
			if(eachSquare[i].getAttribute("state") == "not-played") {
				if(player == "O") {
					eachSquare[i].innerHTML = "O";
					eachSquare[i].setAttribute("state", "played");
					tempminimax = playAI(eachSquare, thisMoveNumber+1, "X") + " ";
					tempminimax = tempminimax.split(" ");
					if(parseInt(tempminimax[0]) < minimax) {
						minimax = tempminimax[0];
						returnIndex = i;
					}
					eachSquare[i].innerHTML = "";
					eachSquare[i].setAttribute("state", "not-played");
				}
				else {
					eachSquare[i].innerHTML = "X";
					eachSquare[i].setAttribute("state", "played");
					tempminimax = playAI(eachSquare, thisMoveNumber+1, "O") + " ";
					tempminimax = tempminimax.split(" ");
					if(parseInt(tempminimax[0]) > minimax) {
						minimax = tempminimax[0];
						returnIndex = i;
					}
					eachSquare[i].innerHTML = "";
					eachSquare[i].setAttribute("state", "not-played");
				}
			}
			i++;
		}
		returnString = minimax + " " + returnIndex;
		return(returnString);
	}

	function tCheckWin() {
		var j=0, game=0;
		if(numOfGrids == 3) {
			while(j<(numOfGrids*numOfGrids)) {
				if(eachSquare[j].getAttribute("state") == "played" && eachSquare[j+1].getAttribute("state") == "played" && eachSquare[j+2].getAttribute("state") == "played") {
					if(eachSquare[j].innerHTML == eachSquare[j+1].innerHTML && eachSquare[j+2].innerHTML == eachSquare[j+1].innerHTML) {
						game = 1;
					}
				}
				j=j+3;
			}
			j=0;
			while(j<numOfGrids) {
				if(eachSquare[j].getAttribute("state") == "played" && eachSquare[j+3].getAttribute("state") == "played" && eachSquare[j+6].getAttribute("state") == "played") {
					if(numOfGrids == 3 && eachSquare[j].innerHTML == eachSquare[j+3].innerHTML && eachSquare[j+6].innerHTML == eachSquare[j+3].innerHTML) {
						game = 1;
					}
				}
				j=j+1;
			}
			if(eachSquare[0].getAttribute("state") == "played" && eachSquare[4].getAttribute("state") == "played" && eachSquare[8].getAttribute("state") == "played") {
				if(eachSquare[0].innerHTML == eachSquare[4].innerHTML && eachSquare[4].innerHTML == eachSquare[8].innerHTML) {
					game = 1;
				}
			}
			if(eachSquare[2].getAttribute("state") == "played" && eachSquare[4].getAttribute("state") == "played" && eachSquare[6].getAttribute("state") == "played") {
				if(eachSquare[2].innerHTML == eachSquare[4].innerHTML && eachSquare[6].innerHTML == eachSquare[4].innerHTML) {
					game = 1;
				}
			}	
		}
		else {
			j=0;
			while(j<(numOfGrids*numOfGrids)) {
				if(eachSquare[j].getAttribute("state") == "played" && eachSquare[j+1].getAttribute("state") == "played" && eachSquare[j+2].getAttribute("state") == "played" && eachSquare[j+3].getAttribute("state") == "played") {	
					if(numOfGrids == 4 && eachSquare[j].innerHTML == eachSquare[j+1].innerHTML && eachSquare[j+2].innerHTML == eachSquare[j+1].innerHTML && eachSquare[j+2].innerHTML == eachSquare[j+3].innerHTML) {
						game = 1;
					}
				}
				j=j+4;
			}
			j=0;
			while(j<numOfGrids) {
				if(eachSquare[j].getAttribute("state") == "played" && eachSquare[j+4].getAttribute("state") == "played" && eachSquare[j+8].getAttribute("state") == "played" && eachSquare[j+12].getAttribute("state") == "played") {
					if(eachSquare[j].innerHTML == eachSquare[j+4].innerHTML && eachSquare[j+8].innerHTML == eachSquare[j+4].innerHTML && eachSquare[j+8].innerHTML == eachSquare[j+12].innerHTML) {
						game = 1;
					}
				}
				j=j+1;
			}
			if(eachSquare[0].getAttribute("state") == "played" && eachSquare[5].getAttribute("state") == "played" && eachSquare[10].getAttribute("state") == "played" && eachSquare[15].getAttribute("state") == "played") {
				if(eachSquare[0].innerHTML == eachSquare[5].innerHTML && eachSquare[5].innerHTML == eachSquare[10].innerHTML && eachSquare[10].innerHTML == eachSquare[15].innerHTML) {
					game = 1;
				}
			}
			if(eachSquare[3].getAttribute("state") == "played" && eachSquare[6].getAttribute("state") == "played" && eachSquare[9].getAttribute("state") == "played" && eachSquare[12].getAttribute("state") == "played") {
				if(eachSquare[3].innerHTML == eachSquare[6].innerHTML && eachSquare[6].innerHTML == eachSquare[9].innerHTML && eachSquare[9].innerHTML == eachSquare[12].innerHTML) {
					game = 1;
				}
			}
		}
		if(game == 1) {
			return(1);
		}
		else {
			return(0);
		}
	}
})();
	