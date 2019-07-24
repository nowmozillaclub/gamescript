var cvs = document.getElementById("canvas"); // initializing the canvas to draw graphics
var ctx = cvs.getContext("2d");

var gap = 80; // the gap between the two pipes
var constant; // this is the position from where pipeUp starts
var bX = 10; // bird x position
var bY = 150; // bird y position
var gravity = 1.5; // how fast the bird falls
var score = 0; // initial score has to be 0!
var pipe = []; // array containing each pipe
var lost = false // set to true if the bird crashes

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

document.addEventListener("keydown", moveUp); // bird should fly when key is pressed

pipe[0] = {
    x: cvs.width,
    y: 0
}; // pipe coordinates

function moveUp() {
    woosh.play();
    bY -= 25; // how high should the bird fly
}

function main() {
    ctx.drawImage(background, 0, 0); // params: file, x position, y position

    for (var i = 0; i < pipe.length; i++) {
        constant = pipeDown.height + gap; // from top till starting of lower pipe
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--; // scrolls

        if (pipe[i].x == 125) { // if pipe reaches middle position
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeDown.height) - pipeDown.height
                // calculates random height between 0 and 1, and rounds off to lower bound
            });
        } // once the whole width is crossed, new pipes will be generated

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeDown.width || bY + bird.height >= cvs.height - foreground.height) {
            if (bY <= pipe[i].y + pipeDown.height || bY + bird.height >= pipe[i].y + constant) { // detects a collision
                lost = true
                crash.play();
                setTimeout(function() {
                    location.reload()
                }, 750); // reloads page after 750ms to play the sound    
            }
        }

        // bird.x

        if (pipe[i].x == 5) {
            tading.play();
            score++;
        } // once the bird safely crosses the gap
    }

    ctx.drawImage(foreground, 0, cvs.height - foreground.height); // sky, clouds and trees
    ctx.drawImage(bird, bX, bY);
    bY += gravity;

    ctx.font = "22px Verdana";
    if (lost == true) {
        ctx.fillText("You crashed!", 10, cvs.height - 20);
    } else {
        ctx.fillText("Score: " + score, 10, cvs.height - 20);
    }

    requestAnimationFrame(main); // repaints/updates the screen gui
}

main();