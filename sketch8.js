let img;
let example_media;
let showBtn;

function setup() {
  createCanvas(500, 400);
  textSize(20);

  example_media = createVideo("aquarium.mp4");
  example_media.size(500, 300);
  example_media.position(20, 100);
  example_media.play();


  img = createImg("falls.png");
  img.position(130, 420);
  img.size(300, 300);
  img.hide(); 

  showBtn = createButton("Show");
  showBtn.position(230, 40);
  showBtn.mousePressed(show);
}

function show() {

  example_media.showControls();
  img.show();
}




