//canvas variables
var canvas;
var context;
var backgroundColor = "#FFFFFF";

//snake variables
var snake = [];
var initSnakeX = 150;
var initSnakeY = 150;
var snakeDirection = "still";
var snakeWidth = 10;
var snakeHeight = 10;
var snakeColor = "green";
var snakeLength = 3;
var lastDirection = "right";

//food variables
var foodPosX;
var foodPosY;
var foodColor = "red";
var foodWidth = 10;
var foodHeight = 10;

//time variables
var interval = 50;
var step;
var score = 0;

//key bindings
var upKey = 119; //W
var downKey = 115; //A
var leftKey = 97; //S
var rightKey = 100; //D



function initial() {
	//set up canvas
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	//initialize food and snake objects
	newFood();

	for (var i = 0; i < snakeLength; i++) {
		snake[i] = {};
		snake[i].x = initSnakeX - (snakeWidth * i);
		snake[i].y = initSnakeY;
	}

	//set interval
  step = setInterval("draw()", interval);

	//initialize key press event listener
  document.addEventListener("keypress", keyPress, false);
}

function draw() {
	//draw canvas
	context.fillStyle = backgroundColor;
	context.fillRect(0, 0, canvas.width, canvas.height);

	//move snake and eat food
  intersection();
  animateSnake();

	for (var i = 0; i < snakeLength; i++) {
		context.fillStyle = snakeColor;
		context.fillRect(snake[i].x, snake[i].y, snakeWidth, snakeHeight);
	}

	context.fillStyle = foodColor;
	context.fillRect(foodPosX, foodPosY, foodWidth, foodHeight);

	//draw score
	context.fillStyle = "black";
	context.fillText("Score: " + score, canvas.width - 50, 20) ;

	//check for end conditions
  checkWalls();
  checkSelfHit();
}


function animateSnake() {
	//move snake in appropriate direction
	if (snakeDirection != "still") {
	    for (var i = snakeLength - 1; i > 0; i--) {
	        snake[i].x = snake[i-1].x;
	        snake[i].y = snake[i-1].y;
	    }
	}
	if(snakeDirection === "up") {
	    snake[0].y -= snakeHeight;
	    lastDirection = "up";
	}
	else if(snakeDirection === "down") {
	    snake[0].y += snakeHeight;
	    lastDirection = "down";
	}
	else if(snakeDirection === "right") {
	    snake[0].x += snakeWidth;
	    lastDirection = "right";
	}
	else if(snakeDirection === "left") {
	    snake[0].x -= snakeWidth;
	    lastDirection = "left";
	}
}

function newFood() {
	//place food at random place on canvas
	foodPosX = Math.floor(Math.random() * (canvas.width - foodWidth));
	foodPosY = Math.floor(Math.random() * (canvas.height - foodHeight));
}

function checkSelfHit() {
	//check if snake runs into itself
	for (var i = 0; i < snakeLength; i++) {
	    for (var j = 0; j < snakeLength; j++) {
	        if(snake[i].x == snake[j].x  && snake[j].y == snake[i].y && i != j) {
							//reset the game
	            alert("You died! Score: " + score);
	            snakeDirection = "still";
	            clearInterval(step);
	            snakeLength = 3;
	            score = 0;
	            initial();
	        }
	    }
	}
}

function intersection() {
	//check if snake ate food
	if(snake[0].x < foodPosX + foodWidth &&
		 foodPosX < snake[0].x + snakeWidth &&
		 snake[0].y < foodPosY + foodHeight &&
		 foodPosY < snake[0].y + snakeHeight) {
		snakeLength++;
    snake[snakeLength - 1] = {};
    snake[snakeLength - 1].x = snake[snakeLength-2].x;
    snake[snakeLength - 1].y = snake[snakeLength-2].y;

    newFood();
    score++;
	}
}

function checkWalls() {
	//check if snake hit wall
	if (snake[0].x < 0 || snake[0].x > canvas.width - snakeWidth || snake[0].y < 0 || snake[0].y > canvas.height - snakeHeight) {
		alert("You died! Score: " + score);
    snakeDirection = "still";
		clearInterval(step);
		snakeLength = 3;
    score = 0;
		initial();
	}
}


function keyPress(evt) {
	//check if key is pressed and update direction
  if (evt.keyCode == upKey && lastDirection != "down") {
      snakeDirection = "up";
  }
  else if (evt.keyCode == downKey && lastDirection != "up") {
      snakeDirection = "down";
  }
  else if (evt.keyCode == leftKey && lastDirection != "right" ) {
      snakeDirection = "left";
  }
  else if (evt.keyCode == rightKey && lastDirection != "left") {
      snakeDirection = "right";
  }
}
