var allthekitties = [];
var currentkitty = 0;
var kittyposition = {x: 100, y: 100, w: 100, h: 100};
var bgColor;
var clickCount = 0; 

function preload(){
    let url = 'https://api.thecatapi.com/v1/images/search?limit=15&category_ids=5';
    loadJSON(url, successCallback);
}

function successCallback(data){
    for(let item of data){
        let kitty = createImg(item.url);
        kitty.hide();  
        allthekitties.push(kitty);
    }
}

function setup(){
    createCanvas(600, 350);
    bgColor = color('skyblue');
}

function draw() {
    background(bgColor);
  
    if (allthekitties.length > 0) {
      image(
        allthekitties[currentkitty],
        kittyposition.x,
        kittyposition.y,
        kittyposition.w,
        kittyposition.h
      );
    }
  

    fill(0);
    textSize(16);
    text("Kitty 🐱 " + clickCount, 10, 30);
  }

function mousePressed(){
    if (mouseX > kittyposition.x && mouseX < kittyposition.x + kittyposition.w &&
        mouseY > kittyposition.y && mouseY < kittyposition.y + kittyposition.h) {
        
        clickCount++;
        currentkitty = (currentkitty + 1) % allthekitties.length;


        kittyposition.x = random(width - kittyposition.w);
        kittyposition.y = random(height - kittyposition.h);

        if (clickCount >= 15) {
            clickCount = 0;
            kittyposition.w = 100;
            kittyposition.h = 100;
          } else {
   
            kittyposition.w += 20;
            kittyposition.h += 20;
          }


        bgColor = color(random(255), random(255), random(255));
    }
}

