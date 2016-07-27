// Script to run Pong Game

// Canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

setInterval(draw,10);



// Ball
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height -30;
var dx = 2;
var dy = -2;

//Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

//Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks =[];

// Score
var score = 0;

for (c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for (r=0; r<brickRowCount; r++){
        var brickX = c*(brickWidth+brickPadding) + brickOffsetLeft;
        var brickY = r*(brickHeight+brickPadding) + brickOffsetTop;
        bricks[c][r] = { x: brickX, y:brickY, status: 1};
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8,20);
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle =  "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for (c=0;c<brickColumnCount;c++){
        for (r=0;r<brickRowCount;r++){
            if (bricks[c][r].status === 1) {
                ctx.beginPath();
                ctx.rect(bricks[c][r].x,bricks[c][r].y,brickWidth,brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    brickCollisionDet();
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();

    // Move Ball
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius){
        dx = -dx;
    }
    if (y + dy < ballRadius){
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX+paddleWidth){ //Detect Paddle collision
            dy=-dy;
        }
        else
        {
            alert("GAME OVER");
            document.location.reload();
        }

    }

    x += dx;
    y += dy;

    //Move Paddle
    if (rightPressed && paddleX + paddleWidth < canvas.width) {
        paddleX +=7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Check score
    if (score === brickRowCount*brickColumnCount){
        alert(" YOU WON");
        document.location.reload();
    }



}

function brickCollisionDet(){
    //Detect collision with bricks
    var done = false;
    for (c=0;c<brickColumnCount;c++){
        for (r=0;r<brickRowCount;r++){
            if (x + dx > bricks[c][r].x && x + dx < bricks[c][r].x + brickWidth && y + dy > bricks[c][r].y && y + dy < bricks[c][r].y + brickHeight) {
                bricks[c][r].status = 0;
                bricks[c][r].x = -1;
                bricks[c][r].y = -1;
                score += 1;
                dy = -dy;
                done = true;
                break;
            }
        }
        if (done){
            break;
        }
    }

}

function keyDownHandler(e){
    switch (e.keyCode) {
        case 39:
            rightPressed = true;
            break;
        case 37:
            leftPressed = true;
            break;
        default:
            break;
    }
}

function keyUpHandler(e){
    switch (e.keyCode) {
        case 39:
            rightPressed = false;
            break;
        case 37:
            leftPressed = false;
            break;
        default:
            break;
    }
}


