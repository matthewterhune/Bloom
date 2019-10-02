function polar(x) {
  return [x[0] * cos(x[1]), x[0] * sin(x[1])];
}

function Leaf(scale, pg, tscale) {
  this.drawing = pg;
  this.ts = tscale;
  colorMode(HSB);
  this.strokec = color(random(70,80), random(100, 150), random(80, 100));
  colorMode(RGB);
  this.fillc = color(random(200,240), 255, random(200,240));
  let t = random(6.28);
  let r = random(50, 70) * scale;
  this.x2 = polar([r,t])[0];
  this.y2 = polar([r,t])[1];
  let curve = random(-.2, .2);
  this.cx2 = polar([r*.9,t+curve])[0];
  this.cy2 = polar([r*.9,t+curve])[1];
  let veins = 5;
  this.controls = [];
  let size = random(1.2, 1.6);
  let left = t - size;
  let inc = size*2 / (veins-1);
  for (i=0; i<veins; i++) {
    this.controls.push(polar([r/2, left+(inc*i)]));
  }

  this.draw = function() {
    if (this.ts < 1) {
      this.ts += (1-this.ts)/14 + .005;
    }
    if (this.ts > 0) {
      this.drawing.stroke(this.strokec);
      this.drawing.fill(this.fillc);
      this.drawing.beginShape();
      this.drawing.vertex(imageSize, imageSize);
      this.drawing.bezierVertex(this.controls[0][0]*this.ts+imageSize, this.controls[0][1]*this.ts+imageSize,
        this.cx2*this.ts+imageSize, this.cy2*this.ts+imageSize,
        this.x2*this.ts+imageSize, this.y2*this.ts+imageSize);
      this.drawing.bezierVertex(this.cx2*this.ts+imageSize, this.cy2*this.ts+imageSize,
        this.controls[veins-1][0]*this.ts+imageSize, this.controls[veins-1][1]*this.ts+imageSize,
        imageSize, imageSize);
      this.drawing.endShape();
      this.drawing.noFill();
      for (let i=1; i<(veins-1); i++) {
        this.drawing.bezier(imageSize, imageSize,
          this.controls[i][0]*this.ts+imageSize, this.controls[i][1]*this.ts+imageSize,
          this.cx2*this.ts+imageSize, this.cy2*this.ts+imageSize,
          this.x2*this.ts+imageSize, this.y2*this.ts+imageSize);
      }
    }
  }

}

function Stamen(scale, pg, tscale) {
  this.drawing = pg;
  this.ts = tscale;
  if (check) {
    this.bscale = 2;
  } else {
    this.bscale = 1;
  }
  colorMode(HSB);
  this.strokec = color(random(40,60), random(20, 100), random(100, 150));
  colorMode(RGB);
  this.ballc = color(80, random(160,240), random(230, 255));
  let r = random(50) * scale;
  let t = random(6.28);
  let cr = random(r);
  let ct = random(t-.5, t+.5);
  this.x2 = polar([r,t])[0] + wind[0];
  this.y2 = polar([r,t])[1] + wind[1];
  this.cx2 = polar([cr,ct])[0] + wind[0];
  this.cy2 = polar([cr,ct])[1] + wind[1];

  this.draw = function() {
    if (this.ts < 1) {
      this.ts += (1-this.ts)/14 + .005;
    }
    if (this.ts > 0) {
      this.drawing.stroke(this.strokec);
      this.drawing.noFill();
      this.drawing.bezier(imageSize, imageSize, imageSize, imageSize,
       this.cx2*this.ts+imageSize, this.cy2*this.ts+imageSize,
       this.x2*this.ts+imageSize, this.y2*this.ts+imageSize);
      this.drawing.fill(this.ballc);
      this.drawing.circle(this.x2*this.ts+imageSize, this.y2*this.ts+imageSize, 5*this.bscale*this.ts);
    }
  }
}

function Petal(scale, pg, tscale) {
  this.drawing = pg;
  colorMode(HSB);
  this.strokec = color(0+colorshift, 70, random(100, 200));
  this.fillc = color(random(320-colorshift, 390-colorshift), 60, random(150, 255), .6);
  this.ts = tscale;
  let veins = 7;
  this.tips = [];
  let t = random(6.28);
  let angle = random(1, 2);
  let tip, r, cv, i;
  for (i=0; i<veins; i++) {
    r = random(30,50) * scale;
    cv = random(.7, 1.3);
    tip = [polar([r, t])[0], polar([r, t])[1], polar([r/cv, t])[0], polar([r/cv, t])[1]];
    this.tips.push([tip[0], tip[1], tip[2], tip[3]]);
    t += random(.3,.5)/angle;
  }

  this.draw = function() {
    if (this.ts < 1) {
      this.ts += (1-this.ts)/14 + .005;
    }
    if (this.ts > 0) {
      this.drawing.stroke(this.strokec);
      this.drawing.fill(this.fillc);
      this.drawing.beginShape();
      this.drawing.vertex(imageSize, imageSize);
      this.drawing.vertex(this.tips[0][0]*this.ts+imageSize, this.tips[0][1]*this.ts+imageSize);
      for (i=1; i<(veins-1); i++) {
        this.drawing.bezierVertex(this.tips[i-1][2]*this.ts+imageSize, this.tips[i-1][3]*this.ts+imageSize,
         this.tips[i][2]*this.ts+imageSize, this.tips[i][3]*this.ts+imageSize, 
         this.tips[i][0]*this.ts+imageSize, this.tips[i][1]*this.ts+imageSize);
      }
      this.drawing.vertex(imageSize, imageSize);
      this.drawing.endShape();
      for (i=0; i<(veins-1); i++) {
        this.drawing.line(imageSize, imageSize, this.tips[i][0]*this.ts+imageSize, this.tips[i][1]*this.ts+imageSize);
      }
    }
  }
}

function Flower(scale) {
  this.x = mouseX;
  this.y = mouseY;
  this.counter = 0;
  let pg = createGraphics(imageSize*2, imageSize*2);
  if (check) {
    pg.strokeWeight(2);
  }
  let i;

  let dc = 0
  this.leaves = []
  for (i=0; i<3; i++) {
    this.leaves.push(new Leaf(scale, pg, dc));
    dc -= random(.6);
  }
  this.petals = []
  dc = 0
  for (i=0; i<5; i++) {
    this.petals.push(new Petal(scale, pg, dc));
    dc -= random(1.6);
  }
  dc = 0;
  this.stamens = []
  for (i=0; i<20; i++) {
    this.stamens.push(new Stamen(scale, pg, dc));
    dc -= random(.2);
  }

  this.draw = function() {
    if (this.counter < steps) {
      pg.clear();
      for (let i=0; i<3; i++) {
        this.leaves[i].draw();
      }
      for (let i=0; i<5; i++) {
        this.petals[i].draw();
      }
      for (i=0; i<20; i++) {
        this.stamens[i].draw();
      }
      image(pg, this.x-imageSize, this.y-imageSize);
      this.counter++;
      if (this.counter == steps) {
        fscache.image(pg, this.x-imageSize, this.y-imageSize);
        pg.remove();
      }
    }
  }

  this.die = function() {
    pg.remove();
  }

}