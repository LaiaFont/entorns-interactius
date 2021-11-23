let number = 100;

let circles = [];
let lines = [];

let posX;
let posY;
let circleSize;

let col;

let value = 0;

function setup() {
  sketch = createCanvas(1920, 1000);

  //creació de handsfree per poder utilitzar la llibreria
  handsfree = new Handsfree({
    showDebug: true, // Comment this out to hide the default webcam feed with landmarks
    hands: true,
  });

  //Colors per la punta dels dits adaptat a la paleta de colors
  colorMap = [
    //Dits mà esquerra
    [
      color(75, 140, 255),
      color(120, 150, 255),
      color(20, 100, 255),
      color(30, 200, 255),
    ],
    //Dits mà dreta
    [color(10, 255, 255), color(45, 37, 255), color(20, 120, 255), color(120, 20, 255)],
  ];

  handsfree.start();

  noSmooth();
}

function draw() {
  background(0);

  //afegeix el dibuix de la mà a la pantalla
  drawHands();
  
  //detecció dels estats (pinch)
  fingerPaint();

  //creació d'un "fake" background
  if (value == 1 || value == 2) {
    fill(0, 16);
    rect(0, 0, width, height);
  }
  
  //crido update pos per actualitzar la posició dels cercles
  updatePos();
}

function updatePos() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].collide();
    circles[i].move();
    if (value == 0 || value == 2) {
      circles[i].display();
    } else if (value == 1) {
      circles[i].hide();
    }
  }
  for (let i = 0; i < lines.length; i++) {
    if (value == 0) {
      lines[i].hide();
    } else if (value == 1 || value == 2) {
      lines[i].growLine();
      lines[i].display();
    }
  }
}

//Canvi de mode de visió amb les tecles
/*function keyPressed() {
  if (key == "a") {
    value = 0;
  } else if (key == "s") {
    value = 1;
  } else if (key == "d") {
    value = 2;
  }
}*/

function drawHands() {
  const hands = handsfree.data?.hands;

  // Bail if we don't have anything to draw
  if (!hands?.landmarks) return;

  // Draw keypoints
  hands.landmarks.forEach((hand, handIndex) => {
    hand.forEach((landmark, landmarkIndex) => {
      // Set color
      // @see https://handsfree.js.org/ref/model/hands.html#data
      if (colorMap[handIndex]) {
        switch (landmarkIndex) {
          case 8:
            fill(colorMap[handIndex][0]);
            break;
          case 12:
            fill(colorMap[handIndex][1]);
            break;
          case 16:
            fill(colorMap[handIndex][2]);
            break;
          case 20:
            fill(colorMap[handIndex][3]);
            break;
          default:
            fill(color(255, 255, 255));
        }
      }

      // Set stroke
      if (handIndex === 0 && landmarkIndex === 8) {
        stroke(color(255, 255, 255));
        strokeWeight(0);
        circleSize = 10;
      } else {
        stroke(color(0, 0, 0));
        strokeWeight(0);
        circleSize = 10;
      }

      circle(
        // Flip horizontally
        sketch.width - landmark.x * sketch.width,
        landmark.y * sketch.height,
        circleSize
      );
    });
  });
}

function fingerPaint() {
  //Check for pinches and create dots if something is pinched
  const hands = handsfree.data?.hands;

  //Quan detecta el pinch, crea els cercles i els afegeix a l'array
  if (hands?.pinchState && hands.pinchState[0][0] === "released") {
    if (circles.length <= number) {
      circleSize = random(10, 50);
      let col = color(random(255), random(255), 255);

      posX = width - hands.curPinch[0][0].x * width;
      posY = hands.curPinch[0][0].y * height;
      circles.push(
        new Rodona(posX, posY, circleSize, col, random(-2, 2), circles)
      );
    }
  }
  
  //Detecta si el pinch està fet a la posició d'una rodona, si és així la borra de l'array
  if (hands?.pinchState && hands.pinchState[0][2] === "released") {
    for (let i = 0; i < circles.length; i++) {
      let posH = createVector(
        width - hands.curPinch[0][2].x * width,
        hands.curPinch[0][2].y * height
      );
      let d = posH.sub(circles[i].getPos());
      if (d.mag() < circles[i].getRadius()) {
        circles.splice(i, 1);
      }
    }
  }
  
  //Borra tot el que hi ha creat, bàsicament com començar de 0
  if (hands?.pinchState && hands.pinchState[0][3] === "released") {
    circles.splice(0, circles.length);
    lines.splice(0, lines.length);
  }
  
  //Canvi de mode de visió equivalent a la lletra A del teclat
  if (hands?.pinchState && hands.pinchState[1][0] === "released") {
    value = 0;
  }
  
  //Canvi de mode de visió equivalent a la lletra S del teclat
  if (hands?.pinchState && hands.pinchState[1][1] === "released") {
    value = 1;
  }
  
  //Canvi de mode de visió equivalent a la lletra D del teclat
  if (hands?.pinchState && hands.pinchState[1][2] === "released") {
    value = 2;
  }
}
