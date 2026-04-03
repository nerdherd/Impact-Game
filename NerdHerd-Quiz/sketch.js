let bg;
let score = 0;
let logo;
let xWidth;
let yHeight;
let gameState = 0;
let playing = false;

const OPTs = [];

const QUESTIONS = 1;

const sprites = [];

// xxxx0x1x2x3p
//4 6 8 10
//0 1 2 3

const script = [
    ["Hi am the nerd of the herd", 0, false, 1],
    ["We at BirdBird herdnerd do a lot of things but we mainly make robots", 1, false, 2],
    ["Now tell me what is it that we make", 1, true, "Birds", 3, "Diet Coke", 3, "Robots", 4, "idfk", 3, 2],
    ["What no why", 3, false, 5],
    ["Yes correct good job", 0, false, 5],
    ["Thanks for listening", 1, false, 6],
    ["SCORE SHOW", 1, false, 7],
    ["Restart?", 2, false, 0]
]

function preload() {
    sprites.push(loadImage('assets/GExcited.png'));
    sprites.push(loadImage('assets/GHappy.png'));
    sprites.push(loadImage('assets/GSad.png'));
    sprites.push(loadImage('assets/GScared.png'));



    bg = loadImage('assets/Background.png');
    nerd = loadImage('assets/Nerd.png');
    logo = loadImage('assets/Logo.png')
}

function setup() {
    xWidth = windowHeight*(4.0/3.0)*0.9;
    yHeight = windowHeight*0.9;

    OPTs.push([xWidth*(300/800), yHeight*(375/600), xWidth*(1.0/3.0), yHeight*(1.0/12.0)]);
    OPTs.push([xWidth*(550/800), yHeight*(375/600), xWidth*(1.0/3.0), yHeight*(1.0/12.0)]);
    OPTs.push([xWidth*(300/800), yHeight*(475/600), xWidth*(1.0/3.0), yHeight*(1.0/12.0)]);
    OPTs.push([xWidth*(550/800), yHeight*(475/600), xWidth*(1.0/3.0), yHeight*(1.0/12.0)]);

    createCanvas(xWidth, yHeight);
    showGame();
}

function draw() {
    if(windowHeight > windowWidth){
        showRotateMessage();
    }
}

function smthHappen(){
    if(within(xWidth*(3.25/8.0), yHeight*(4.0/6.0), xWidth*0.5, yHeight*(1.0/6.0)) && !playing){
        playing = true;
        runState(gameState);
        //console.log("A");
        //console.log(gameState);
        return
    }

    if(within(xWidth*(3.25/8.0), yHeight*(4.0/6.0), xWidth*0.5, yHeight*(1.0/6.0)) && gameState == 0){
        runState(gameState);
        score = 0;
        return;
    }

    if(within(xWidth*(3.25/8.0), yHeight*(4.0/6.0), xWidth*0.5, yHeight*(1.0/6.0)) && !script[gameState-1][2]){
        runState(gameState);
        //console.log("B");
        return;
    }

    if(script[gameState-1][2]){
        let optChosen = 0;
        for (const coords of OPTs){
            if(within(coords[0],coords[1],coords[2],coords[3])){
                //console.log(gameState); 
                //console.log(gameState); 
                console.log(script[gameState-1][11]);
                console.log(optChosen);
                console.log(optChosen == script[gameState-1][11]);
                if (optChosen == script[gameState-1][11]){
                    score += 1;
                }
                gameState = script[gameState-1][(optChosen*2)+4];
                runState(gameState);
                
            } else {
                optChosen += 1;
            }
            //console.log(within(coords[0],coords[1],coords[2],coords[3]));
            //console.log(coords[0] + " " + coords[1]  + " " + coords[2] + " " + coords[3]);
        }
        //console.log("C");
        //console.log(gameState); 
    }
}

function touchStarted(){
    smthHappen();
}

function mousePressed(){
    smthHappen();
}



function showGame(){
    image(bg, 0, 0, xWidth, yHeight);
    image(logo, xWidth*(3.75/8.0), yHeight*(1.0/6.0));
    image(sprites[0], xWidth*(1.0/16), yHeight*(1/4));
    noStroke();
    fill(37, 58, 107);
    rect(xWidth*(3.25/8.0), yHeight*(4.0/6.0), xWidth*0.5, yHeight*(1.0/6.0));
    textAlign(CENTER, CENTER);
    fill(255,255,255);
    textSize(yHeight * 0.1);
    text("Start", xWidth*(3.25/8.0), yHeight*(4.0/6.0), xWidth*(1.0/2.0), yHeight*(1.0/6.0));
    //console.log("written");
}

function within(x1, y1, x2, y2){
    return (mouseX >= x1 && mouseX <= (x1+x2)) && ( mouseY >= y1 && mouseY <= (y1+y2));
}

function runState(state){
    clear();
    //console.log(script[state]);
    image(bg, 0, 0, xWidth, yHeight);
    fill(255,255,255);
    textAlign(LEFT,TOP);
    textSize(yHeight*0.05);
    if(script[state][0] != "SCORE SHOW"){
        text(script[state][0], xWidth*(3.2/8.0), yHeight*(7.0/60.0), xWidth*(4.1/8.0), yHeight*(2.6/6.0));
    } else {
        text(currentScore(), xWidth*(3.2/8.0), yHeight*(7.0/60.0), xWidth*(4.1/8.0), yHeight*(2.6/6.0));
    }
    image(sprites[script[state][1]], xWidth*(1.0/16), yHeight*(1/4));

    if(script[state][2]){
        fill(37, 58, 107);
        rect(xWidth*(300/800), yHeight*(375/600), xWidth*(200/800), yHeight*(50/600)); 
        rect(xWidth*(550/800), yHeight*(375/600), xWidth*(200/800), yHeight*(50/600)); 
        rect(xWidth*(300/800), yHeight*(475/600), xWidth*(200/800), yHeight*(50/600)); 
        rect(xWidth*(550/800), yHeight*(475/600), xWidth*(200/800), yHeight*(50/600));
        fill(255,255,255);
        text(script[state][3], xWidth*(300/800), yHeight*(375/600), xWidth*(200/800), yHeight*(50/600)) 
        text(script[state][5], xWidth*(550/800), yHeight*(375/600), xWidth*(200/800), yHeight*(50/600)) 
        text(script[state][7], xWidth*(300/800), yHeight*(475/600), xWidth*(200/800), yHeight*(50/600)) 
        text(script[state][9], xWidth*(550/800), yHeight*(475/600), xWidth*(200/800), yHeight*(50/600)) 
        gameState = script[state][4];
    } else {
        fill(37, 58, 107);
        rect(xWidth*(3.25/8.0), yHeight*(4.0/6.0), xWidth*0.5, yHeight*(1.0/6.0));
        textAlign(CENTER, CENTER);
        fill(255,255,255);
        textSize(yHeight * 0.1);
        text("Continue", xWidth*(3.25/8.0), yHeight*(4.0/6.0), xWidth*0.5, yHeight*(1.0/6.0));
        gameState = script[state][3];
    }
}

function currentScore(){
    return `You got ${score} out of ${QUESTIONS} correct!`;
}


function showRotateMessage(){
    push();

    fill(0, 0, 0, 200);
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(height * 0.05);
    text("Please rotate your device", width/2, height/2);

    pop();
}