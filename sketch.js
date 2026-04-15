//A NYC Night
//The city hum plays the whole time
//Click everything else to hear it play
//Everything but the hum should end when you click something else

//used images for light, taxi, and crosswalk sign 
let streetlightImg, crosswalkImg, taxiImg;

//sounds
let humSound, subwaySound, sirenSound, beepSound, hornSound, talkSound;

//Using so that I can make the objects glow when you click
let hornFlash = 0;
let sirenGlow = 0;
let beepPulse = 0;
let talkGlow = 0;
let subwayGlow = 0;

function preload() {
  //my preloaded images
  streetlightImg = loadImage("light.png");
  crosswalkImg = loadImage("walksign.png");
  taxiImg = loadImage("taxi.png");

  //sounds from Freesound.org exported as mp3s
  humSound = loadSound("hum.mp3");
  subwaySound = loadSound("subway.mp3");
  sirenSound = loadSound("siren.mp3");
  beepSound = loadSound("wait.mp3");
  hornSound = loadSound("horn.mp3");
  talkSound = loadSound("talk.mp3");
}

function setup() {
  createCanvas(700, 450);

  //super quiet loop that plays for the hum of the city
  humSound.setVolume(0.05);
  humSound.loop();

  //the volume of all the sounds
  subwaySound.setVolume(0.30);
  sirenSound.setVolume(0.20);
  beepSound.setVolume(0.20);
  hornSound.setVolume(0.30);
  talkSound.setVolume(0.10);
}

function draw() {
  drawBackground();
  drawStreet();
  drawBuildingAndWindow();
  drawCrosswalkSign();
  drawSubwayEntrance();
  drawTaxi();
  drawStreetlight();
  drawFeedbackOverlays();
  drawClickLabels();
  drawInstructionSign();
}

function stopAllSamples() {
  //everything stops when you click something new besides hum
  subwaySound.stop();
  sirenSound.stop();
  beepSound.stop();
  hornSound.stop();
  talkSound.stop();
}

function drawBackground() {
  //sky
  background("#121a3a");
  noStroke();
  fill(30, 40, 90, 70);
  rect(0, 0, width, height);
}

function drawStreet() {
  noStroke();

  //sidewalk
  fill("#727171");
  rect(0, 230, width, 35);

  //road 
  fill("#1f1f1f");
  rect(0, 265, width, 120);

  //the front sidewalk
  fill("#929191");
  rect(0, 385, width, 65);

  // lane lines
  stroke("#F5E197");
  strokeWeight(4);
  line(0, 320, width, 320);
  line(0, 345, width, 345);
}

function drawBuildingAndWindow() {
  noStroke();

  // building across street
  fill("#A5A5A5");
  rect(430, 70, 240, 160);

  // window with light on
  let glow = talkGlow > 0 ? 255 : 210;
  fill(glow, 190, 110);
  rect(520, 120, 70, 55);

  if (talkGlow > 0) talkGlow -= 3;
}

function drawCrosswalkSign() {
  //pole for walk sign
  noStroke();
  fill("#919090");
  rect(210, 150, 12, 140);

  //sign image
  image(crosswalkImg, 170, 120, 100, 100);

  //circle light from behind the sign
  if (beepPulse > 0) {
    noStroke();
    fill(120, 255, 160, beepPulse);
    ellipse(220, 170, 120, 120);
    beepPulse -= 6;
  }
}

function drawSubwayEntrance() {
  //light from subway
  if (subwayGlow > 0) {
    noStroke();
    fill(180, 255, 200, subwayGlow);
    rect(215, 235, 160, 135, 12);
    subwayGlow -= 6;
  }

  //entrance to subway
  stroke("#D8CECE");
  strokeWeight(6);
  line(230, 245, 230, 330);
  line(350, 245, 350, 330);
  line(230, 245, 350, 245);

  //stairs into the subway
  noStroke();
  fill("#666464");
  rect(240, 265, 100, 15);
  rect(245, 285, 95, 15);
  rect(250, 305, 90, 15);
  rect(255, 325, 85, 15);

  //subway sign
  fill(230);
  textSize(12);
  text("SUBWAY", 260, 238);
}

function drawTaxi() {
  //taxi image
  image(taxiImg, 430, 275, 220, 110);
}

function drawStreetlight() {
  image(streetlightImg, 10, 60, 190, 300);
}

function drawFeedbackOverlays() {
  //light from taxi when clicked
  if (hornFlash > 0) {
    noStroke();
    fill(255, 230, 160, hornFlash);
    rect(0, 265, width, 120);
    hornFlash -= 10;
  }

  //red and blue glow that is supposed to look like sirens 
  if (sirenGlow > 0) {
    noStroke();
    fill(255, 80, 80, sirenGlow);
    rect(0, 0, width, 265);
    fill(80, 120, 255, sirenGlow);
    rect(0, 0, width, 265);
    sirenGlow -= 5;
  }
}

function drawClickLabels() {
  textSize(12);
  noStroke();
  fill(255);

//I wanted to make sure the objects to click are obvious
  text("CLICK", 520, 405); //taxi 
  text("CLICK", 195, 115); //crosswalk sign
  text("CLICK", 270, 360); //subway stairs
  text("CLICK", 60, 55);   //streetlight
  text("CLICK", 535, 110); //window
}

//instruction sign for clicking
function drawInstructionSign() {
  noStroke();
  fill(0, 0, 0, 120);
  rect(170, 30, 360, 38, 10);

  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Click the objects to hear the city at night", 350, 49);

  //alignment
  textAlign(LEFT, BASELINE);
}

function mouseClicked() {
  //window
  if (mouseX > 520 && mouseX < 590 && mouseY > 120 && mouseY < 175) {
    stopAllSamples();
    talkSound.play();
    talkGlow = 80;
    return;
  }

  //Taxi
  if (mouseX > 430 && mouseX < 650 && mouseY > 275 && mouseY < 385) {
    stopAllSamples();
    hornSound.play();
    hornFlash = 90;
    return;
  }

  //Crosswalk sign
  if (mouseX > 170 && mouseX < 270 && mouseY > 120 && mouseY < 290) {
    stopAllSamples();
    beepSound.play();
    beepPulse = 80;
    return;
  }

  //Subway entrance. Had to use AI to get it to glow 
  if (mouseX > 220 && mouseX < 370 && mouseY > 230 && mouseY < 355) {
    stopAllSamples();
    subwaySound.play();
    subwayGlow = 90;
    return;
  }

  //Streetlight 
  if (mouseX > 10 && mouseX < 200 && mouseY > 60 && mouseY < 360) {
    stopAllSamples();
    sirenSound.play();
    sirenGlow = 55;
    return;
  }
}