var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "media/bird.png";
bg.src = "media/bg.png";
fg.src = "media/fg.png";
pipeUp.src = "media/pipeUp.png";
pipeBottom.src = "media/pipeBottom.png";

// Sound effects
var fly = new Audio();
var scoreAudio = new Audio();

fly.src = "media/fly.mp3";
scoreAudio.src = "media/score.mp3";

var gap = 130;

// Click
document.addEventListener("keydown", moveUp);
document.addEventListener("touchstart", moveUp);

function moveUp() {
    yPos -= 40;
    fly.play();
}

// Blocks making
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

var score = 0;

// Bird position 
var xPos = 10;
var yPos = 150;
var grav = 1.5;
var bestScore = localStorage.getItem('best');

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + 
            pipeUp.height + gap);

            pipe[i].x--;

            if(pipe[i].x == 125) {
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random() * pipeUp.height) -
                    pipeUp.height
                });
            }

        //Touch check
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + 
                gap) || yPos + bird.height >= cvs.height - fg.height) {
                    if (score > bestScore) {
                        localStorage.removeItem('best');
                        localStorage.setItem('best', score);
                    }
                    location.reload(); // page reload
                }

            if(pipe[i].x == 5) {
                score++;
                scoreAudio.play();
            }

    }
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#fff";
    ctx.font = "50px FlappyBirdy";
    ctx.fillText("Count:" + score, 10, cvs.height - 20);
    ctx.fillText("Best:" + bestScore, 150, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;