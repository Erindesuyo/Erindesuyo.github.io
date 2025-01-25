function setup() {
    createCanvas(700, 300);
  
    frameRate(3);
  
    describe('A White dot moves around randomly on a gray square.');
  }
  
  function draw() {
    background(85, 119, 160);
 
    let x = random(700);
    let y = random(300);
  
    strokeWeight(20);
    point(x, y);
    stroke(255);
  }
// reference from P5.js random()