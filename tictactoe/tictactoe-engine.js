(function(){

	var tictactoe = {
		game: 0,
        eachSquare: [],
        numOfGrids: 0,
		numOfPlayers: 0,
        turn: 0,
		init: function(){
            window.onload = function(){
                tictactoe.cacheDom();
                tictactoe.bindEvents();
            }
        },
		cacheDom: function(){
            this.thisBoard = document.getElementById("tictactoe-board");
            this.gridSelection = document.getElementById("tictactoe-create-grid");
            this.gridSelectDropdown = document.getElementById("tictactoe-grid-selection");
			this.playersParent = document.getElementById("tictactoe-players-select-div");
            this.gridSelectionText = document.getElementById("tictactoe-grid-selection-text");
			this.playerSelection = document.getElementById("tictactoe-choose-number-of-players");
			this.playerSelectDropdown = document.getElementById("tictactoe-players-selection");
			this.playerSelectText = document.getElementById("tictactoe-players-selection-text");
			this.gridParent = document.getElementById("tictactoe-grid-select-div");
			this.playAgainButton;
        },
        bindEvents: function(){
            this.gridSelection.addEventListener("click", this.createGrid.bind(this));
            this.thisBoard.addEventListener("click", this.makeMove.bind(this));
			this.playerSelection.addEventListener("click", this.setNumOfPlayers.bind(this));
        },
		setNumOfPlayers() {
			this.numOfPlayers = this.playerSelectDropdown.value;
			this.gridParent.style.display = "inline";
		},
		createGrid: function(){
            this.numOfGrids = parseInt(this.gridSelectDropdown.value);

            this.squareSize = this.numOfGrids * this.numOfGrids;

            this.gridParent.removeChild(this.gridSelection);
            this.gridParent.removeChild(this.gridSelectDropdown);
			this.playersParent.removeChild(this.playerSelection);
			this.playersParent.removeChild(this.playerSelectDropdown);
			this.playersParent.removeChild(this.playerSelectText);

            this.gridSelectionText.innerHTML = "Play on and enjoy!";

            var i=0;
            while(i < this.squareSize) {
                var thisSquare = '<div id="tictactoe-square-' + i + '" class="tictactoe-squares" align="center" state="not-played"></div>';
                this.thisBoard.innerHTML += thisSquare;
                i++;
            }

            var j=0;
            while(j < this.squareSize){
                this.eachSquare.push(document.getElementById("tictactoe-square-" + j));
                if(this.numOfGrids == 3) {	
                    this.eachSquare[j].style.width = "30%";
                    this.eachSquare[j].style.height = "30%";
                }
                else {
                    this.eachSquare[j].style.width = "23%";
                    this.eachSquare[j].style.height = "23%";
                }
                j++;
            }

            // TODO move the dom manipulation into it's own method'
            this.gridParent.innerHTML += '<button id="tictactoe-play-again">Play again</button><br><br>';
		    this.gridParent.innerHTML += '<a href="./tictactoe.html" id="reset-conditions">Reset conditions</a>';

            this.playAgainButton = document.getElementById("tictactoe-play-again");
            this.playAgainButton.addEventListener("click", this.playAgain.bind(this));
        },
        makeMove(e){
            switch(this.numOfPlayers) {
				case "1":
					document.addEventListener('click', this.onePlayerGame.bind(this));
					break;
				case "2":
					document.addEventListener('click', this.twoPlayerGame.bind(this));
					break;
				default:
					document.addEventListener('click', this.onePlayerGame.bind(this));
					break;
			}
        },
		onePlayerGame(e){
			e = e || window.event;
            var target = e.target;
            if(target.getAttribute("state") == "not-played" && this.game == 0) {	
    			target.setAttribute("state", "played");
    			if(this.turn%2 == 0) {
    				target.innerHTML = "X";
    			}
    			else {
    				target.innerHTML = "O";
    			}
    			this.turn++;
//    			playAI(eachSquare, turn, "X");
				this.checkWin(true); // true because it is a finalCheck and not a temp check
                // Hardcoded 9, not applicable for 4x4 game
				if(this.turn == 9) {
                    // TODO fix bug. When adding extra html to the parent, it removes the event listener on the button click
					// gridParent.innerHTML += "<br>It is a draw."
					this.game = 1;
                    return;
				}
                // TODO refactor the below code
                // checkWin and the full grid check are duplicated
                if(this.turn%2 == 0) {	
                    this.thisIndex = (this.playAI(this.eachSquare, this.turn, "X") + " ").split(" ");
                    this.eachSquare[parseInt(this.thisIndex[1])].innerHTML = "X";
                    this.eachSquare[parseInt(this.thisIndex[1])].setAttribute("state", "played");
                    this.turn++;
                }
                else {
                    this.thisIndex = (this.playAI(this.eachSquare, this.turn, "O") + " ").split(" ");
                    this.eachSquare[parseInt(this.thisIndex[1])].innerHTML = "O";
                    this.eachSquare[parseInt(this.thisIndex[1])].setAttribute("state", "played");
                    this.turn++;
                }
                this.checkWin(true);// true because it is a finalCheck and not a temp check
                // Hardcoded 9, not applicable for 4x4 game
                if(this.turn == 9 && this.game == 0) {
                    // gridParent.innerHTML += "<br>It is a draw."
                    this.game = 1;
                }
    		}
		},
		twoPlayerGame(e) {
			e = e || window.event;
			var target = e.target
			if(target.getAttribute("state") == "not-played" && this.game == 0) {	
				target.setAttribute("state", "played");
				if(this.turn%2 == 0) {
					target.innerHTML = "X";
				}
				else {
					target.innerHTML = "O";
				}
				this.turn++;
				this.checkWin(true); // true because it is the final check (no temp checks required for two player games)
			}		
		},
		playAI(eachSquare, thisMoveNumber, player){
            var tempCheckWin;
            //console.log("This is " + str(thisMoveNumber) + "and player is" + str(player)); str is not defined?
            tempCheckWin = this.checkWin(); // no args because it is a temp check

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
            // Hardcoded 9, not applicable for 4x4 game
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
            // Hardcoded 9, not applicable for 4x4 game
            while(i<9) {
                //console.log(i + "-" + thisMoveNumber + "-" + player);
                if(this.eachSquare[i].getAttribute("state") == "not-played") {
                    var otherPlayer = "O";
                    if(player == "O") {
                        otherPlayer = "X";
                    }

                    this.eachSquare[i].innerHTML = player;
                    this.eachSquare[i].setAttribute("state", "played");
                    tempminimax = this.playAI(this.eachSquare, thisMoveNumber+1, otherPlayer) + " ";
                    tempminimax = tempminimax.split(" ");
                    if((player == "O" && parseInt(tempminimax[0]) < minimax) || (player == "X" && parseInt(tempminimax[0]) > minimax)){
                        minimax = tempminimax[0];
                        returnIndex = i;
                    }
                    this.eachSquare[i].innerHTML = "";
                    this.eachSquare[i].setAttribute("state", "not-played");  
                }
                i++;
            }
            returnString = minimax + " " + returnIndex;
            return(returnString);
        },
		playAgain() {
            var j = 0;
            while(j < this.squareSize){
                this.eachSquare[j].setAttribute("state", "not-played");
                this.eachSquare[j].innerHTML = "";
                this.eachSquare[j].style.backgroundColor = ""; 
                j++;
            }
            this.game = 0;
            this.turn = 0;
        },
        checkWin(finalCheck) {
            var j=0;
            // check rows and columns
            while(j < this.numOfGrids) {
                if(this.checkRow(j)) {
                    if(finalCheck){
                        this.highlightWinningLine(j, 'row');
                        this.game = 1;
                    } 
                    return 1;
                }
                if(this.checkColomn(j)) {
                    if(finalCheck){
                        this.highlightWinningLine(j, 'column');
                        this.game = 1;
                    }
                    return 1;
                }
                j++;
            }
            // check diagonals
            if(this.checkDiagonal(0)) {
                if(finalCheck){
                    this.highlightWinningLine(0, 'diagonal');
                    this.game = 1;
                }
                return 1;
            }
            if(this.checkDiagonal(this.numOfGrids - 1)) {
                if(finalCheck){
                    this.highlightWinningLine(this.numOfGrids - 1, 'diagonal');
                    this.game = 1;
                }
                return 1;
            }
        },
		// TODO maybe consolodate the 3 check functions into 1 because a lot of the code is repeating
        checkRow(row){
            var rowStart = row * this.numOfGrids;
            var rowEnd = rowStart + this.numOfGrids;
            // TODO maybe remove the state attribute. Maybe redundant as the X or O implies it's been played anyway
            if(this.eachSquare[rowStart].getAttribute("state") == "played"){
                for(var i = rowStart; i < rowEnd - 1; i++){
                    if(this.eachSquare[i].innerHTML != this.eachSquare[i+1].innerHTML){
                        return false;
                    }
                }
                return true;
            }    
            return false; 
        },
        checkColomn(column){
            var columnStart = column;
            var columnEnd = columnStart + this.numOfGrids * (this.numOfGrids - 1);
            if(this.eachSquare[columnStart].getAttribute("state") == "played"){
                for(var i = columnStart; i < columnEnd - 1; i = i + this.numOfGrids){
                    if(this.eachSquare[i].innerHTML != this.eachSquare[i + this.numOfGrids].innerHTML){
                        return false;
                    }
                }
                return true;
            }    
            return false; 
        },
        checkDiagonal(start){
            if(start === 0){
                var diagEnd = this.numOfGrids * this.numOfGrids;
                if(this.eachSquare[start].getAttribute("state") == "played"){
                    for(var i = start; i < diagEnd - 1; i = i + this.numOfGrids + 1){
                        if(this.eachSquare[i].innerHTML != this.eachSquare[i + this.numOfGrids + 1].innerHTML){
                            return false;
                        }
                    }
                    return true;
                }
                return false; 
            }else if(start === this.numOfGrids - 1){
                var diagEnd = this.numOfGrids * (this.numOfGrids - 1);
                if(this.eachSquare[start].getAttribute("state") == "played"){
                    for(var i = start; i < diagEnd - 1; i = i + this.numOfGrids - 1){
                        if(this.eachSquare[i].innerHTML != this.eachSquare[i + this.numOfGrids - 1].innerHTML){
                            return false;
                        }
                    }
                    return true;
                }
                return false; 
            }
        },
        highlightWinningLine(start, direction){
            var end, increment;
            if(direction === 'row'){
                end = start + this.numOfGrids;
                increment = 1;
            }else if(direction === 'column'){
                end = start + this.numOfGrids * this.numOfGrids;
                increment = numOfGrids;
            }else if(start === 0){
                end = this.numOfGrids * this.numOfGrids;
                increment = this.numOfGrids + 1;
            }else{
                end = this.numOfGrids * (this.numOfGrids - 1) + 1;
                increment = this.numOfGrids - 1;
            }

            for(var j = start; j < end; j = j + increment){
                this.eachSquare[j].style.backgroundColor = "green"; 
            }
        }
	}

	tictactoe.init();
})();