var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var headerOne = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();


function init() {
	//mode button event listeners
	setupModeButtons();
	setupSquareClicks();
	setupResetButton();
	reset();
}


function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		})
	}
}

function setupResetButton() {
	resetButton.addEventListener("click", function(){
		//generate all new colors
		colors = generateRandomColors(numSquares);
		//pick a new random color from array
		pickedColor = pickColor();
		//change colorDisplay to match picked Color
		colorDisplay.textContent = pickedColor;

		//change colors of squares
		for(var i =0; i < squares.length; i++) {
			squares[i].style.backgroundColor = colors[i];
		}
		resetButton.textContent = "New Colors";
		headerOne.style.backgroundColor = "steelblue";
		messageDisplay.textContent = "";
	});	
}

function setupSquareClicks() {
	for(var i = 0; i < squares.length; i++) {
		//add click listeneres to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				headerOne.style.backgroundColor = clickedColor;
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again"; 
			}
		})
	}
}


function reset() {
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;

	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";

	//change colors of squares
	for(var i =0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}

	headerOne.style.backgroundColor = "steelblue";
}

function changeColors(color) {
	//loop trhough all squares
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to arr
	for(var i = 0; i < num; i++) {
		//get random color and push into arr
		arr.push(randomColor());
	}

	//return the array
	return arr;
}

function randomColor() {
	//pick a red 0-255
	var r = Math.floor(Math.random() * 256);

	//pick a green 0-255
	var g = Math.floor(Math.random() * 256);

	//pick a blue 0-255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}