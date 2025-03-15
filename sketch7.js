// fireworks upgrade version! (colour change)


let particles = []; 
let colorList =["red", "blue", "yellow", "purple", "green", "white"];
let currentColorIndex =0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  clear(); 

  let button = select("#colorChangeButton");
  button.mousePressed(changeFireworkColor);
}


//According to week 8class code
function draw() {
  clear(); 

  for (let i =particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();


    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }
} //end


function mousePressed() {
  createExplosion(mouseX, mouseY); }



//firework
//Copied from P5.js/Reference.Push
function createExplosion(x, y) {
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
} //end


function changeFireworkColor() {
  currentColorIndex = (currentColorIndex + 1) % colorList.length; 
}


//Copied from P5.js/Reference.Array (and adjusted)
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed= random(-3, 3);
    this.ySpeed = random(-2, 2);
    this.alpha =255; 
    this.size =random(3, 10);
    this.color= color(colorList[currentColorIndex]); 
  }

  update() {
    this.x += this.xSpeed;
    this.y +=this.ySpeed;
    this.alpha -= 3; 
  }

  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.x, this.y, this.size);
  }
} //end



