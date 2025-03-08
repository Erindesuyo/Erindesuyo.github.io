let words = [];
let targetWord = '';
let score = 0;
let gameActive = false;
let startTime;
let gameDuration = 30000; 
let button;
let targetColor;

function setup() {
  createCanvas(800, 600);
  textSize(24);
  textAlign(CENTER, CENTER);
  
  button = createButton('Start');
  button.mousePressed(startGame);
  button.style('background-color', '#ff9800');
  button.style('color', 'white');
  button.style('border', 'none');
  button.style('padding', '10px 20px');
  button.style('border-radius', '5px');
  button.style('cursor', 'pointer');
  

  button.position((windowWidth - button.width) / 2, (windowHeight - button.height) / 2);
}

function windowResized() {
  button.position((windowWidth - button.width) / 2, (windowHeight - button.height) / 2);
}

function startGame() {
  score = 0;
  startTime = millis();
  gameActive = true;
  button.hide();  
  generateWords(); 
}

function generateWords() {
  words = [];
  let possibleWords = ['APPLE', 'BANANA', 'CHERRY', 'GRAPE', 'LEMON', 'MANGO', 'ORANGE'];
  
  targetWord = random(possibleWords);
  targetColor = color(random(255), random(255), random(255));
  
  let targetPlaced = false;  
  
  for (let i = 0; i < 50; i++) {
    let x, y, word, col;
    let overlap = false;
    
    do {
      x = random(50, width - 50);
      y = random(50, height - 100); 
      overlap = false;
      
      for (let w of words) {
        if (dist(x, y, w.x, w.y) < 60) { 
          overlap = true;
          break;
        }
      }
    } while (overlap);
    
    if (!targetPlaced) {
      word = targetWord;
      col = targetColor;
      targetPlaced = true;
    } else {
      word = random(possibleWords);
      col = color(random(255), random(255), random(255));
    }
    
    words.push({ word, x, y, col });
  }
}

function draw() {
  background(30);
  
  fill(255);
  textSize(20);
  text("Score: " + score, 70, 30);
  
  if (gameActive) {
    let currentTime = millis();
    
    if (currentTime - startTime < gameDuration) {
      for (let w of words) {
        fill(w.col);
        text(w.word, w.x, w.y);
      }
      
      fill(targetColor);
      textSize(30);
      text("Find: " + targetWord, width / 2, height - 50);
      
      fill(255);
      textSize(20);
      text("Time: " + Math.ceil((gameDuration - (currentTime - startTime)) / 1000), width - 70, 30);
      
    } else {
      gameActive = false;
      startTime = millis();  
    }
  } else {
    let endTime = millis();
    
    if (endTime - startTime >= 3000) {
      background(30);
      fill(255);
      textSize(36);
      text("Game Over!\nYour Score: " + score, width / 2, height / 2);
      
      button.show();
      button.html('Restart')
      button.position((windowWidth - button.width) / 2, (windowHeight - button.height) / 2);
    }
  }
}

function mousePressed() {
  if (gameActive) {
    for (let i = words.length - 1; i >= 0; i--) {
      let w = words[i];
      
      if (dist(mouseX, mouseY, w.x, w.y) < 50 && w.word === targetWord && w.col.levels.toString() === targetColor.levels.toString()) {
        score++;
        generateWords(); 
        break;
      }
    }
  }
}



