p5.disableFriendlyErrors = true; // disables FES

flowers = [];

toggle = false;
active = 200;

/*function setup() {
createCanvas(windowWidth, windowHeight);
  background('#FFF');
  noFill();
  noLoop();
  wind = [random(-40, 40), random(-40, 10)];
  frameRate(10);
}

function draw() {
  //leaf();
}

function mousePressed() {
  wind = [random(-40, 40), random(-40, 10)];
  flower(random(.9, 1.3));
  loop();
}
function mouseReleased() {
  noLoop();
}*/

function setup() {
createCanvas(windowWidth, windowHeight);
  background('#FFF');
  noFill();
  wind = [random(-40, 40), random(-40, 10)];
  frameRate(30);
}

function draw() {
  //leaf();
  if (active < 200) {
    background('white');
    for (let i=0; i<flowers.length; i++) {
        flowers[i].draw();
    }
    active++;
  } else {
    noLoop();
  }
}

function mousePressed() {
  wind = [random(-40, 40), random(-40, 10)];
  flowers.push(new Flower(random(.9, 1.3)));
  active = 0;
  loop();
}
function mouseReleased() {
}

function keyPressed() {
  if (toggle == true) {
    background('white');
    toggle = false;
  } else {
    for (let i=0; i<flowers.length; i++) {
      flowers[i].draw();
    }
    toggle = true;
  }
}