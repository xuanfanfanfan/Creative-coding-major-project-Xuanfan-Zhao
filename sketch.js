let noiseOffsetX = 0.0;
let noiseOffsetY = 0.0;
let snowflakes = [];

function windowResized() {
  //Handle when the browser window size changes
  resizeCanvas(windowWidth, windowHeight);
  setup(); // Recreate and draw the graph
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(229, 228, 240); 
  
  // Recalculate the location based on the browser window size
  let yPosArray = calculatePositions([10, 50, 120, 150, 220, 250, 280, 340, 440], windowHeight);
  let xPosArray = calculatePositions([10, 30, 70, 140, 300, 330, 420, 440, 480, 500], windowWidth);
  
  horizontalStreets(yPosArray);
  verticalStreets(xPosArray);
  
  // Create a purple square
  createBlock(windowWidth * 0.1, windowHeight * 0.16, windowWidth * 0.06, windowHeight * 0.06, color(150, 150, 220));
  createBlock(windowWidth * 0.1, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(150, 150, 220));
  createBlock(windowWidth * 0.32, windowHeight * 0.52, windowWidth * 0.06, windowHeight * 0.1, color(150, 150, 220));
  createBlock(windowWidth * 0.76, windowHeight * 0.32, windowWidth * 0.1, windowHeight * 0.2, color(150, 150, 220));
  createBlock(windowWidth * 0.82, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(150, 150, 220));
  
  // Create a red square
  createBlock(windowWidth * 0.16, windowHeight * 0.04, windowWidth * 0.04, windowHeight * 0.18, color(255, 70, 70));
  createBlock(windowWidth * 0.26, windowHeight * 0.04, windowWidth * 0.08, windowHeight * 0.12, color(255, 70, 70));
  createBlock(windowWidth * 0.16, windowHeight * 0.54, windowWidth * 0.12, windowHeight * 0.08, color(2255, 70, 70));
  createBlock(windowWidth * 0.58, windowHeight * 0.4, windowWidth * 0.12, windowHeight * 0.1, color(255, 70, 70));
  createBlock(windowWidth * 0.68, windowHeight * 0.6, windowWidth * 0.1, windowHeight * 0.14, color(255, 70, 70));
  
  // Create a gray box
  createBlock(windowWidth * 0.28, windowHeight * 0.08, windowWidth * 0.06, windowHeight * 0.06, color(169));
  createBlock(windowWidth * 0.46, windowHeight * 0.22, windowWidth * 0.1, windowHeight * 0.14, color(169));
  createBlock(windowWidth * 0.46, windowHeight * 0.74, windowWidth * 0.06, windowHeight * 0.1, color(169));
  createBlock(windowWidth * 0.74, windowHeight * 0.62, windowWidth * 0.08, windowHeight * 0.04, color(169));
  createBlock(windowWidth * 0.8, windowHeight * 0.04, windowWidth * 0.1, windowHeight * 0.06, color(169));

  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    snowflakes.push({x: x, y: y, radius: random(2, 8)});
  }
}


function draw() {
  for (let flake of snowflakes) {
    fill(255);
    noStroke();
    ellipse(flake.x, flake.y, flake.radius*2, flake.radius*2);

    // Move snowflake down
    if (flake.y < height * 0.1) { 
      flake.y += random(1, 3);
    }

    // Reset snowflake position if it goes off-screen
    if (flake.y > height) {
      flake.y = random(-10, -100);
      flake.x = random(width);
    }
  }
}

function calculatePositions(positionArray, canvasSize) {
  // Adjust the original position to the new canvas size
  let adjustedPositions = [];
  for (let pos of positionArray) {
    adjustedPositions.push((pos / 500) * canvasSize);
  }
  return adjustedPositions;
}

function createBlock(x, y, w, h, c) {
  fill(c);
  rect(x, y, w, h);
}

function horizontalStreets(yPosArray) {
  for (let yPos of yPosArray) {
    for (let i = 0; i < width; i += 20) {
      let num = floor(map(noise(noiseOffsetX), 0, 1, 0, 101)); // Use noise for randomization
      noiseOffsetX += 0.1; // Adjust this value to control the randomness
      
      let c = colourMap(num);
      createBlock(i, yPos, 20, 20, c);
    }
  }
}

function verticalStreets(xPosArray) {
  for (let xPos of xPosArray) {
    for (let i = 0; i < height; i += 20) {
      let num = floor(map(noise(noiseOffsetY), 0, 1, 0, 101)); // Use noise for randomization
      noiseOffsetY += 0.1; // Adjust this value to control the randomness
      
      let c = colourMap(num);
      createBlock(xPos, i, 20, 20, c);
    }
  }
}

function colourMap(num) {
  if (num >= 0 && num <= 65) {
    return color(255, 255, 0); // green
  } else if (num >= 66 && num <= 80) {
    return color(0); // Black
  } else if (num >= 81 && num <= 85) {
    return color(255, 0, 0); // blue
  } else if (num >= 86 && num <= 100) {
    return color(255,0,255); // pink
  }else if (num >= 76 && num <= 100) {
    return color(255, 165, 0); // orange
      
  }
}

