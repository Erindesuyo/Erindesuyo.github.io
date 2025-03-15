let rounds = [];
let currentTab = ""; 

//Copied from W3C Schools/How to. Tab headers
function openShape(shapeName, elment, color) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(shapeName).style.display = "block";

    let canvas = document.querySelector("#Circle canvas");
    if (canvas) canvas.remove();
// end



    if (shapeName === "Ripple") {
        setupRipple();
        currentTab = "Ripple";
    } else if (shapeName === "Circle") {
        setupCircle();
        currentTab = "Circle"; 
    } else if (shapeName="WOW"){
        setupWOW();
        currentTab="WOW";
    }
}


//Copied from W3C Schools/How to. Tab headers
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("defaultOpen").click();
});
// end



// ----- Ripple Tab ------

//Copied from p5.js.org tutorial/happycoding.mouse ripple
let circleX, circleY, circleSize;

function setupRipple() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('Ripple'); // 'Ripple' div 안에 캔버스를 추가
    noFill();
    strokeWeight(5);
    circleX = width / 2;
    circleY = height / 2;
    circleSize = 0;
}

function draw() {
    if (currentTab === "Ripple") {
        background(242, 167, 218); // changed background color
        circleSize += 10;
        stroke(242, 250, 250); // Stroke also adjusted
        circle(circleX, circleY, circleSize);
        circle(circleX, circleY, circleSize * .75);
        circle(circleX, circleY, circleSize * .5);
    } 

    if (currentTab === "Circle") {
        background(154, 221, 237);  
        for (let i = 0; i < rounds.length; i++) {
            rounds[i].move();
            rounds[i].display();
        }
    } // end




    if (currentTab === "WOW") {
        background(0);

        //Copied from p5.js.org/example.aim
        let leftX = width / 2 - 50;
        let leftY = height / 2;
        let leftAngle = atan2(mouseY - leftY, mouseX - leftX);

        push();
        translate(leftX, leftY);
        fill(255);
        ellipse(0,0, 50,50);
        rotate(leftAngle);
        fill(0);
        ellipse(12.5, 0, 25,25);
        pop();

        // right eye
        let rightX = width / 2+50;
        let rightY = height / 2;
        let rightAngle = atan2(mouseY - rightY, mouseX - rightX);

        push();
        translate(rightX, rightY);
        fill(255);
        ellipse(0, 0, 50, 50);
        rotate(rightAngle);
        fill(0);
        ellipse(12.5, 0, 25, 25);
        pop();
    } // end

}

function mousePressed() {
    if (currentTab === "Ripple") {
        circleX =mouseX;
        circleY = mouseY;
        circleSize =0;
    }
}



// ----- Circle  -----
//Copied from p5.js.org tutorial/happycoding.P5vector
function setupCircle() {
    let circleDiv = document.getElementById("Circle");

    let canvas = document.querySelector("#Circle canvas");
    if (canvas) canvas.remove();

    let newCanvas = createCanvas(windowWidth, windowHeight);
    newCanvas.parent(circleDiv);  

    rounds = [];
    for (let i = 0; i < 10; i++) {
        rounds[i] = new Round(random(width), random(height), random(-3, 3), random(-3, 3));
    }
}

class Round {
    constructor(x, y, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    move() {
        this.x += this.xSpeed;
        if (this.x < 0 || this.x > width) {
            this.xSpeed *= -1;
        }

        this.y += this.ySpeed;
        if (this.y < 0 || this.y > height) {
            this.ySpeed *= -1;
        }
    }

    display() {
        fill(255);
        circle(this.x, this.y, 50);
    }
} //end





//------ eyes tab ----//

//Copied from p5.js.org/example.aim
function setupWOW() {
    let wowDiv = document.getElementById("WOW");
    let canvas = document.querySelector("#WOW canvas");
    if (canvas) canvas.remove();

    let newCanvas = createCanvas(windowWidth, windowHeight);
    newCanvas.parent(wowDiv);

} // end


document.addEventListener("DOMContentLoaded", function() {
    openShape("Ripple", document.getElementById("defaultOpen"), "rgb(242, 167, 218)"); 
});





// ------ First messsage ---------
//I just added the message div to the js file at once without dividing it into html css. //
document.addEventListener("DOMContentLoaded", function () {
    let message = document.createElement("div");
    message.id = "message";
    message.innerText = "Click the menu!";
    message.style.position = "absolute";
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.fontSize = "30px";
    message.style.color = "white";
    message.style.zIndex = "10";
    document.body.appendChild(message);
}); //end



//Copied from W3C Schools/How to. Tab headers
function openShape(shapeName, elmnt, color) {
    let message = document.getElementById("message");
    if (message) {
        message.style.display = "none"; 
    }

    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }


    document.getElementById(shapeName).style.display = "block";


    let tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    } //end


    elmnt.style.backgroundColor = color;

    let canvas = document.querySelector("canvas");
    if (canvas) canvas.remove();



// According to week 1 ~ 5 class code

    if (shapeName === "Ripple") {
        setupRipple();
        currentTab = "Ripple";
    } else if (shapeName === "Circle") {
        setupCircle();
        currentTab = "Circle";
    } else if (shapeName === "WOW") {
        setupWOW();
        currentTab = "WOW"; 
    }
} //end





