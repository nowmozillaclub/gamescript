var cvs = document.getElementById("canvas"); // initializing the canvas
var ctx = cvs.getContext("2d");

var gap = 80; // the gap between the two pipes
var constant;
var bX = 10; // the distance till when a pipe is crossed
var bY = 150;
var gravity = 1.5; // how fast the bird falls
var score = 0; // initial score has to be 0!
var pipe = [];

// initializing all the variables as media files
var bird = new Image();
var background = new Image();
var foreground = new Image();
var pipeDown = new Image();
var pipeUp = new Image();
var woosh = new Audio();
var tading = new Audio();
var crash = new Audio();

// linking the variables to media files
bird.src = "./images/bird.png";
background.src = "./images/background.png";
foreground.src = "./images/foreground.png";
pipeDown.src = "./images/pipe_down.png";
pipeUp.src = "./images/pipe_up.png";
woosh.src = "./sounds/woosh.mp3";
tading.src = "./sounds/tading.mp3";
crash.src = "./sounds/crash.mp3"

document.addEventListener("keydown", moveUp); // when any key is pressed, the bird should fly

pipe[0] = {
    x: cvs.width,
    y: 0
}; // pipe coordinates

function moveUp() {
    woosh.play();
    bY -= 25; // how high should the bird fly
}

function main() {
    ctx.drawImage(background, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        constant = pipeDown.height + gap;
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeDown.height) - pipeDown.height
                // calculates height and rounds off to lower bound
            });
        } // once the whole width is crossed, new pipes should be generated

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeDown.width && (bY <= pipe[i].y + pipeDown.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - foreground.height) { // detects a collision
            crash.play();
            setTimeout(function() {
                location.reload()
            }, 750);
        }

        if (pipe[i].x == 5) {
            tading.play();
            score++;
        } // once the bird safely crosses the gap
    }

    ctx.drawImage(foreground, 0, cvs.height - foreground.height);
    ctx.drawImage(bird, bX, bY);
    bY += gravity;

    ctx.font = "22px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(main); // for making scrolling animation
}

main();
