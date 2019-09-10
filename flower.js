function polar(x) {
  return [x[0] * cos(x[1]), x[0] * sin(x[1])];
}

function stamen(repeats, scale) {
  for (i=0; i<repeats; i++) {
    colorMode(HSB);
    stroke(random(40,60), random(20, 100), random(100, 150));
    r = random(50) * scale;
    t = random(6.28);
    cr = random(r);
    ct = random(t-.5, t+.5);
    direction = [mouseX + polar([r,t])[0] + wind[0], mouseY + polar([r,t])[1] + wind[1]];
    cdirection = [mouseX + polar([cr,ct])[0] + wind[0], mouseY + polar([cr,ct])[1] + wind[1]];
    noFill();
    bezier(mouseX, mouseY, mouseX, mouseY, cdirection[0], cdirection[1], direction[0], direction[1]);
    colorMode(RGB);
    ballcolor = color(80, random(160,240), random(230, 255))
    fill(ballcolor);
    circle(direction[0], direction[1], 5);
  }
}

function petal(repeats, scale) {
  for (blah=0; blah<repeats; blah++) {
    colorMode(HSB);
    stroke(0, 70, random(100, 200));
    fill(random(320, 390), 60, random(150, 255), .6);
    veins = 7;
    tips = [];
    t = random(6.28);
    angle = random(1, 2);
    for (i=0; i<veins; i++) {
      r = random(30,50) * scale;
      cv = random(.7, 1.3);
      tip = [polar([r, t])[0], polar([r, t])[1], polar([r/cv, t])[0], polar([r/cv, t])[1]];
      tips.push([mouseX + tip[0], mouseY + tip[1], mouseX + tip[2], mouseY + tip[3]]);
      t += random(.3,.5)/angle;
    }
    beginShape();
    vertex(mouseX, mouseY);
    vertex(tips[0][0], tips[0][1]);
    for (i=1; i<(veins-1); i++) {
      bezierVertex(tips[i-1][2], tips[i-1][3], tips[i][2], tips[i][3], tips[i][0], tips[i][1]);
    }
    vertex(mouseX, mouseY);
    endShape();
    for (i=0; i<(veins-1); i++) {
      line(mouseX, mouseY, tips[i][0], tips[i][1]);
    }
  }
}

function flower(scale) {
  petal(5, scale);
  stamen(20, scale);
}