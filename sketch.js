let noiseOffsetX = 0.0;
let noiseOffsetY = 0.0;
let buildingHeights = [];


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

  randomSeed(59); 

  // Create a purple square
  createBlock(windowWidth * 0.1, windowHeight * 0.16, windowWidth * 0.06, windowHeight * 0.06, color(150, 150, 220));
  createBlock(windowWidth * 0.1, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(150, 150, 220));
  createBlock(windowWidth * 0.32, windowHeight * 0.52, windowWidth * 0.06, windowHeight * 0.1, color(150, 150, 220));
  createBlock(windowWidth * 0.76, windowHeight * 0.32, windowWidth * 0.1, windowHeight * 0.2, color(150, 150, 220));
  createBlock(windowWidth * 0.82, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(150, 150, 220));
  // Create a red square
  createBlock(windowWidth * 0.16, windowHeight * 0.04, windowWidth * 0.04, windowHeight * 0.18, color(255, 70, 70));
  createBlock(windowWidth * 0.26, windowHeight * 0.04, windowWidth * 0.08, windowHeight * 0.12, color(255, 70, 70));
  createBlock(windowWidth * 0.16, windowHeight * 0.54, windowWidth * 0.12, windowHeight * 0.08, color(255, 70, 70));
  createBlock(windowWidth * 0.58, windowHeight * 0.4, windowWidth * 0.12, windowHeight * 0.1, color(255, 70, 70));
  createBlock(windowWidth * 0.68, windowHeight * 0.6, windowWidth * 0.1, windowHeight * 0.14, color(255, 70, 70));
  // Create a gray box
  createBlock(windowWidth * 0.28, windowHeight * 0.08, windowWidth * 0.06, windowHeight * 0.06, color(169));
  createBlock(windowWidth * 0.46, windowHeight * 0.22, windowWidth * 0.1, windowHeight * 0.14, color(169));
  createBlock(windowWidth * 0.46, windowHeight * 0.74, windowWidth * 0.06, windowHeight * 0.1, color(169));
  createBlock(windowWidth * 0.74, windowHeight * 0.62, windowWidth * 0.08, windowHeight * 0.04, color(169));
  createBlock(windowWidth * 0.8, windowHeight * 0.04, windowWidth * 0.1, windowHeight * 0.06, color(169));

  for (let i = 0; i < 10; i++) {
    buildingHeights.push(random(100, 300));
  }

}

function draw() {
  // Traverse the building height array
  for (let i = 0; i < buildingHeights.length; i++) {
    // Random variation of building height using noise function
    buildingHeights[i] += map(noise(i * 0.9, frameCount * 0.01), 0, 1, -1, 1);
    buildingHeights[i] = constrain(buildingHeights[i], 400, 900);
  }

  // Translate the origin of the coordinates to the center of the canvas
  translate(width / 2, height / 2);
  // Rotate based on the number of frames
  rotate(frameCount * 0.01);
  
 // Walk through the building height array again
  for (let i = 0; i < buildingHeights.length; i++) {
    buildingHeights[i] += map(noise(i * 0.09, frameCount * 0.01), 0, 1, -1, 1);
    buildingHeights[i] = constrain(buildingHeights[i], 400, 900);
  }
  horizontalStreets(buildingHeights);
}

function toggleColorMode() {
  // Switch the color mode of the flag variable to reverse
  useRandomColors = !useRandomColors;
}

function horizontalStreets(heights) {
  for (let i = 0; i < heights.length; i++) {
    let yPos = map(i, 0, heights.length, windowHeight * 0.1, windowHeight * 0.9);
    let buildingHeight = heights[i];
    createBlock(windowWidth * 0.1, yPos, windowWidth * 0.05, buildingHeight, color(150, 150, 220));
  }
}

//Computer location
function calculatePositions(positionArray, canvasSize) {
  // Adjust the original position to the new canvas size
  let adjustedPositions = [];
  for (let pos of positionArray) {
  adjustedPositions.push((pos / 500) * canvasSize);
  }
  return adjustedPositions;
}

// Create a block
function createBlock(x, y, w, h, c) {
  fill(c);
  rect(x, y, w, h);
}

// Horizontal street
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

// Vertical street
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

// Color mapping
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