
var colourPicker;
let strokeWeightSlider;
var bgColourPicker;
var shapePickerButton;  // 도형을 선택할 버튼
var currentShape = 'line';

function setup(){
    createCanvas(1000,500);

    colourPicker = createColorPicker('deeppink');
    colourPicker.position(10,10);

    strokeWeightSlider = createSlider (1,10,5,1);
    strokeWeightSlider.position(10,40);

    bgColourPicker = createColorPicker('grey');
    bgColourPicker.position(10,70);

    bgColourButton = createButton('refresh');
    bgColourButton.position(10,100);
    bgColourButton.mousePressed(repaint);

    shapePickerButton = createButton('Shape');
    shapePickerButton.position(10, 130); 
    shapePickerButton.mousePressed(toggleShape); 


}

function draw(){
     // 여기는 넣어도 원 하나만 마우스를 따라다님
    // ellipse(mouseX,mouseY, 10,10);

    //Copied from p5.js.org/reference.mouseispressed
    if(mouseIsPressed){
        strokeWeight(strokeWeightSlider.value());
        stroke(colourPicker.value());

        if(currentShape === 'circle'){
            ellipse(mouseX, mouseY, 50, 50);  // 원 그리기
        } else if(currentShape === 'square'){
            rect(mouseX - 25, mouseY - 25, 50, 50);  // 사각형 그리기
        } else if(currentShape === 'line'){
            line(mouseX, mouseY, pmouseX, pmouseY);  // 선 그리기
        }

    }

    
    // end

}

function repaint(){
    background( bgColourPicker.value());
}
function toggleShape(){
    if(currentShape==='line'){
        currentShape='circle';
    } else if(currentShape==='circle'){
        currentShape = 'square';
    } else if(currentShape==='square'){
        currentShape='line';
    }
}
