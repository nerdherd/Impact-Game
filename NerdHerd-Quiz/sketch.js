let bg;
let excite;
let happy;
let sad;
let scared;

function preload() {
    bg = loadImage('/assets/Background.jpg', good, error);
    excite = loadImage('/assets/GExcited.png');
    happy = loadImage('/assets/GHappy.png');
    sad = loadImage('/assets/GSad.png');
    scared = loadImage('/assets/GScared.png');
}

function setup() {
    createCanvas(800, 600);

    background(200);

}

function error(){
    alert("AHAUVAHUFNO");
}

function good(img){
    alert("good");
    
    image(bg, 0, 0);
}