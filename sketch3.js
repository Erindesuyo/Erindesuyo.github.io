var redBrick={
    x: 0,
    y: 0,
    w: 30,
    h: 30, 
    xSpeed: 2,
    ySpeed: 2,

    colour: 'yellow',

    draw: function(){
        fill (this.colour);
        rect (this.x, this.y, this.w, this.h);
    },

    move : function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x>width - this.w ){
            this.xSpeed *= -1;
        }

        if(this.y > height- this.h || this.y<0){
            this.ySpeed *= -1;
        }

    } 
};


var blueBrick={
    x: 40,
    y: 50,
    w: 30,
    h: 30, 
    xSpeed: 3,
    ySpeed: 3,

    colour: 'orange',

    draw: function(){
        fill (this.colour);
        rect (this.x, this.y, this.w, this.h);
    },

    move : function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x>width - this.w ){
            this.xSpeed *= -1;
        }

        if(this.y > height-this.h || this.y<0 ){
            this.ySpeed *= -1;
        }

    } 
};

var pinkBall = {
    x: 100,
    y: 100,
    r: 50, 
    xSpeed: 4,
    ySpeed: 5, 

    colour: 'pink',

    draw: function() {
        fill(this.colour);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    },

    move: function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x - this.r < 0 || this.x + this.r > width) {
            this.xSpeed *= -1;
        }

        if (this.y - this.r < 0 || this.y + this.r > height) {
            this.ySpeed *= -1;
        }
    }
};





// redBrick.x++ returns current value then increments
// ++redBrick.x increments value and then returens



function setup(){
    createCanvas(720,480);
}

function draw(){
    background('skyblue');
    redBrick.draw();
    redBrick.move();
    blueBrick.draw();
    blueBrick.move();
    pinkBall.draw();
    pinkBall.move();

}

