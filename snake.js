//Canvas
var canvas;
var context;
var backgroundColor = "#ADADAD";

//Snake
var snake = [];
var initSnakeX = 150;
var initSnakeY = 150;
var snakeDirection = "still";
var snakeWidth = 10;
var snakeHeight = 10;
var snakeColor = "green";
var snakeLength = 3;
var lastDirection = "right";

//Food
var foodPosX;
var foodPosY;
var foodColor = "red";
var foodWidth = 10;
var foodHeight = 10;

//Time
var interval = 50;
var step;
var score = 0;

//Movement
var upKey = 119;
var downKey = 115;
var leftKey = 97;
var rightKey = 100;



function initial() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	newFood();

	for (var i = 0; i < snakeLength; i++) {
		snake[i] = {};
		snake[i].x = initSnakeX - (snakeWidth * i);
		snake[i].y = initSnakeY;
	}

    step = setInterval("draw()", interval);

    document.addEventListener("keypress", keyPress, false);
}

function draw() {
	context.fillStyle = backgroundColor;
	context.fillRect(0, 0, canvas.width, canvas.height);

    intersection();
    animateSnake();

	for (var i = 0; i < snakeLength; i++) {
		context.fillStyle = snakeColor;
		context.fillRect(snake[i].x, snake[i].y, snakeWidth, snakeHeight);
	}

	context.fillStyle = foodColor;
	context.fillRect(foodPosX, foodPosY, foodWidth, foodHeight);

    context.fillStyle = "black";
	context.fillText("Score: " + score, canvas.width - 50, 20) ;

    checkWalls();
    checkSelfHit();
}


function animateSnake() {
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
	foodPosX = Math.floor(Math.random() * (canvas.width - foodWidth));
	foodPosY = Math.floor(Math.random() * (canvas.height - foodHeight));
}

function checkSelfHit() {
    for (var i = 0; i < snakeLength; i++) {
        for (var j = 0; j < snakeLength; j++) {
            if(snake[i].x == snake[j].x  && snake[j].y == snake[i].y && i != j) {
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
		if( snake[0].x < foodPosX + foodWidth && foodPosX < snake[0].x + snakeWidth && snake[0].y < foodPosY + foodHeight && foodPosY < snake[0].y + snakeHeight) {
    		snakeLength++;
            snake[snakeLength - 1] = {};
            snake[snakeLength - 1].x = snake[snakeLength-2].x;
            snake[snakeLength - 1].y = snake[snakeLength-2].y;

            newFood();
            score++;
    	}
}

function checkWalls() {
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


//function getDimensions() {
//    var dim = document.getElementById("dimensions");
//    console.log( dim.options[dim.selectedIndex].value);
//}
                  
