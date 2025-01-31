

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background(10,60,100, 50 ); 
    // 자릿수 대로 r,g,b,a 색상과 마지막자리 투명도 0은 완전 투명, 255 완전 불투명

    fill ('skyblue');
    stroke ('black');
    for(var i = 0; i <10000; i+=20){
        ellipse((i*10)%width,(i*10)%height,20,10);
    }
    

    fill('blue');
    stroke ('black');
    
    if(mouseX < 500){
        rect(mouseX, mouseY,100,100,50);
    }else{
        fill('yellow');
        rect(mouseX, mouseY, 50,50);
        
    }
}
