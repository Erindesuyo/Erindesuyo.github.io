let viruses = [];
let cells = [];
let zoomLevel = 1;
let offsetX = 0;
let offsetY = 0;
let score = 0;
let gameOver = false;
const moveLimit = 500;
let virusCleared = false;
let cellImgs = [], virusImg;
let gameStarted = false;
let particles = [];
let startTime;


function preload() {
  virusImg = loadImage("virus.png");
  for (let i = 1; i <= 4; i++) {
    cellImgs.push(loadImage(`cell${i}.png`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setTimeout(() => {
    document.getElementById("intro").classList.add("fade-out");
    gameStarted = true;
    startTime = millis();
    generateEntities();
  }, 2000);
}

function draw() {
  if (!gameStarted) return;

  background("#d4a871");

  resetMatrix();
  const ctx = drawingContext;
  ctx.save();
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 250, 0, Math.PI * 2);
  ctx.clip();

  translate(width / 2, height / 2);
  scale(zoomLevel);
  translate(-width / 2 + offsetX, -height / 2 + offsetY);

  for (let cell of cells) {
    cell.update();
    cell.display();
  }

  for (let virus of viruses) {
    virus.update();
    virus.display();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }

  let elapsed = (millis() - startTime) / 1000;
  document.getElementById("time-counter").textContent = `Time: ${elapsed.toFixed(1)}s`;

  
  ctx.restore();

  resetMatrix();
  noFill();
  stroke(255);
  strokeWeight(2);
  ellipse(width / 2, height / 2, 500);

  if (gameOver) {
    displayGameOver();
    noLoop();
    return;
  }

  document.getElementById("virus-counter").textContent = `Left Virus 🦠 ${viruses.length}`;
  
  if (!gameOver && viruses.length === 0 && !virusCleared) {
    virusCleared = true;
  
    const finalTime = ((millis() - startTime) / 1000).toFixed(1);  
  
    setTimeout(() => {
      document.getElementById("outro").classList.remove("hidden");
      document.getElementById("outro").classList.add("show");
      document.getElementById("time-result").textContent = `Time: ${finalTime}s`; 
      noLoop();
    }, 1000);
  }
  
}

function generateEntities() {
  for (let i = 0; i < 20; i++) {
    const img = random(cellImgs);
    cells.push(new Cell(random(width / 2 - moveLimit, width / 2 + moveLimit), random(height / 2 - moveLimit, height / 2 + moveLimit), img));
  }
  for (let i = 0; i < 10; i++) {
    viruses.push(new Virus(random(width / 2 - moveLimit, width / 2 + moveLimit), random(height / 2 - moveLimit, height / 2 + moveLimit)));
  }
}

function mouseDragged() {
  offsetX -= movedX / zoomLevel;
  offsetY -= movedY / zoomLevel;
  offsetX = constrain(offsetX, -moveLimit, moveLimit);
  offsetY = constrain(offsetY, -moveLimit, moveLimit);
}

function mouseWheel(event) {
  zoomLevel -= event.delta * 0.001;
  zoomLevel = constrain(zoomLevel, 1, 3);
}

function mousePressed() {
  let mx = (mouseX - width / 2) / zoomLevel + width / 2 - offsetX;
  let my = (mouseY - height / 2) / zoomLevel + height / 2 - offsetY;

  let clickedVirus = null;
  for (let virus of viruses) {
    if (virus.contains(mx, my)) {
      clickedVirus = virus;
      break;
    }
  }

  if (clickedVirus) {
    viruses.splice(viruses.indexOf(clickedVirus), 1);
    score++;
    // 파티클 Particle
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle(clickedVirus.x, clickedVirus.y));
    }
  } else {
    for (let cell of cells) {
      let distToCenter = dist(mouseX, mouseY, width / 2, height / 2);
      if (distToCenter <= 250 && cell.contains(mx, my)) {
        gameOver = true;
        break;
      }
    }
  }
}

function displayGameOver() {
  const gameOverEl = document.getElementById("game-over");
  gameOverEl.style.display = "flex";
  const btn = document.getElementById("restart-btn");
  btn.addEventListener("click", () => {
    location.reload();
  });
}


document.getElementById("restart-btn-outro").addEventListener("click", () => {
  location.reload();
});




class Cell {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.size = random(150, 180);
    this.vx = random(-1.0, 1.0);
    this.vy = random(-1.0, 1.0);
    this.img = img;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x <= width / 2 - moveLimit || this.x >= width / 2 + moveLimit) this.vx *= -1;
    if (this.y <= height / 2 - moveLimit || this.y >= height / 2 + moveLimit) this.vy *= -1;
    this.x = constrain(this.x, width / 2 - moveLimit, width / 2 + moveLimit);
    this.y = constrain(this.y, height / 2 - moveLimit, height / 2 + moveLimit);
    if (this.x <= width / 2 - moveLimit || this.x >= width / 2 + moveLimit) this.vx *= -1;
    if (this.y <= height / 2 - moveLimit || this.y >= height / 2 + moveLimit) this.vy *= -1;
    this.x = constrain(this.x, width / 2 - moveLimit, width / 2 + moveLimit);
    this.y = constrain(this.y, height / 2 - moveLimit, height / 2 + moveLimit);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= width / 2 - moveLimit || this.x >= width / 2 + moveLimit) this.vx *= -1;
    if (this.y <= height / 2 - moveLimit || this.y >= height / 2 + moveLimit) this.vy *= -1;

    this.x = constrain(this.x, width / 2 - moveLimit, width / 2 + moveLimit);
    this.y = constrain(this.y, height / 2 - moveLimit, height / 2 + moveLimit);
  }

  display() {
    if (this.img) {
      image(this.img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else {
      fill(0, 255, 255);
      noStroke();
      ellipse(this.x, this.y, this.size);
    }
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }
}

// Virus 
class Virus {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(50, 70);
    this.visibleZoom = random(0.8, 1.5);
    this.vx = random(-1.0, 1.0);
    this.vy = random(-1.0, 1.0);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x <= width / 2 - moveLimit || this.x >= width / 2 + moveLimit) this.vx *= -1;
    if (this.y <= height / 2 - moveLimit || this.y >= height / 2 + moveLimit) this.vy *= -1;
    this.x = constrain(this.x, width / 2 - moveLimit, width / 2 + moveLimit);
    this.y = constrain(this.y, height / 2 - moveLimit, height / 2 + moveLimit);
  }

  display() {
    if (zoomLevel >= this.visibleZoom) {
      if (virusImg) {
        image(virusImg, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      } else {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.x, this.y, this.size);
      }
    }
  }

  contains(px, py) {
    if (zoomLevel < this.visibleZoom) return false;
    let d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
    this.size = random(4, 8);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(255, 100, 100, this.alpha);
    ellipse(this.x, this.y, this.size);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}
