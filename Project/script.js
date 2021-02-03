const canvas = document.querySelector("canvas");

//>>>> Global variables for spinning ship
let gMouseX = 0;
let gMouseY = 0;
let gShipAngleInRads = 0;
let centerOfShipX = 0;
let centerOfShipY = 0;

//>>>>>>>>>> CHECKS FOR LOCATION OF MOUSE <<<<<<<<
document.addEventListener("mousemove", (e) => {
  gMouseX = e.clientX;
  gMouseY = e.clientY;
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SCORE/GAME CONTROL/INTERFACE

//>>>Makes cursor a crosshair when on canvas
document.getElementById("canvas").style.cursor =
  "url('../images/crosshair.cur'), auto";

//Juan updates
let canvasW = window.innerWidth;
let canvasH = window.innerHeight;

canvas.width = canvasW;
canvas.height = canvasH;

window.onresize = function () {
  canvas.width = canvasW;
  canvas.height = canvasH;
};

//Health and Mana Bars
let health = 100;
let mana = 100;

let healthPct = `${health}%`;
let manaPct = `${mana}%`;

document.getElementById("health-points").innerHTML = healthPct;
document.getElementById("mana-points").innerHTML = manaPct;

document.getElementById("health-fill").style.width = healthPct;
if (health >= 70 && health <= 100) {
  document.getElementById("health-fill").style.backgroundColor = "green";
} else if (health >= 30 && health < 70) {
  document.getElementById("health-fill").style.backgroundColor = "yellow";
} else if (health >= 0 && health < 30) {
  document.getElementById("health-fill").style.backgroundColor = "red";
}

document.getElementById("mana-fill").style.width = manaPct;

//Score and Level Counters
score = 000;
level = 1;

document.getElementById("scoreNum").innerHTML = score;
document.getElementById("levelNum").innerHTML = level;
const context = canvas.getContext("2d");

//Buttons
let startBtn = document.getElementById("start-btn");
startBtn.onclick = function () {
  document.getElementById("start-screen").style.display = "none";
};

let pauseBtn = document.getElementById("pause-btn");
let pauseBtnStatus = "inactive";

pauseBtn.onlick = function () {
  document.getElementById("start-screen").style.display = "flex";
  console.log("Pause/Play button clicked.");
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SPACESHIP
// Ship Image imported
const shipImg = new Image();
shipImg.src = "../images/falconXSpaceship.png";

class gShip {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }
  draw() {
    //>>>>>This code gets the coord of the canvas
    let canvasXY = canvas.getBoundingClientRect();

    //>>>>>This code adjusts the coord of the mouse on the page as it relates to the canvas
    let actualMouseX = gMouseX - canvasXY.x;
    let actualMouseY = gMouseY - canvasXY.y;

    //>>>>>>this code calculates the radian for the angle as the mouse location rates to the center of the ship which is the origin
    gShipAngleInRads = Math.atan2(actualMouseY - this.y, actualMouseX - this.x);
    let centerOfShipX = this.x + 52;
    let centerOfShipY = this.y + 70;
    context.translate(centerOfShipX, centerOfShipY);
    //>>>>>>>This rotates the canvas by the calculated radian + 90 degrees
    context.rotate(gShipAngleInRads + (90 * Math.PI) / 180);

    context.translate(-centerOfShipX, -centerOfShipY); //This moves the 0,0 origin of the canvas to the center of the ship/car

    context.drawImage(this.img, this.x, this.y, this.w, this.h);

    //>>>>>>>returns canvas to prior un-rotated state
    context.setTransform(1, 0, 0, 1, 0, 0);

    //>>>>>> Draw line from ship to mouse for clarification of points while coding
    context.beginPath();
    context.moveTo(centerOfShipX, centerOfShipY);
    context.lineTo(actualMouseX, actualMouseY);
    context.lineWidth = 5;
    context.stroke();
  }
}

//Declare FalconX Ship
const falcon = new gShip(canvasW / 2 - 50, canvasH / 2 - 50, 100, 100, shipImg);

//>>>>>This is the code that moves the ship
window.onkeydown = function (e) {
  switch (e.key) {
    case "ArrowLeft":
      if (falcon.x >= 20) {
        falcon.x -= 10;
      }
      break;
    case "ArrowRight":
      if (falcon.x <= canvas.width - 100) {
        falcon.x += 10;
      }
      break;
    case "ArrowUp":
      if (falcon.y >= 1) {
        falcon.y -= 10;
      }
      break;
    case "ArrowDown":
      if (falcon.y <= canvas.height - 150) {
        falcon.y += 10;
      }
      break;
  }
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Collisions
let explosion = new Image();
explosion.src = "../images/expplosion.png";

let explosion2 = new Image();
explosion2.src = "../images/expplosion2.png";

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Power Up
let powerUp = new Image();
powerUp.src = "../images/powerUp.png";

///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ASTEROIDS
// Aseroid Images Imported
const astSm = new Image();
astSm.src = "../images/asteroidSm.png";

let astLg = new Image();
astLg.src = "../images/asteroidLg.png";

let astMed = new Image();
astMed.src = "../images/asteroidMed.png";

///SM-Asteroids 1
class Sasteroid {
  constructor(x, y, w, h, img, velocity) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.velocity = velocity;
  }
  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

///Asteroid 3
const sasteroids = [];

///SM-Asteroid 2
//First argument of setInterval callback function(code you want to call for each specific interval
//you specify) Then its the time.
function spawnSasteroids() {
  setInterval(() => {
    ///SM-Asteroid 4
    ///SM-Asteroid 6
    // Declare x/y outside so you can reference outside of.
    //Math.random produces anything from 0 to 1.
    //If anything then less 0.5 its going to be 0 minus(a num to push behind screen on left)
    //If greater than 0.5 will add and push off screen on the right
    //If x is spawned of the left. Y should be 0 to canvas height
    //If x spawned on top. Y should be 0 and X should be canvas width
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - 100 : canvas.width + 100;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - 100 : canvas.height + 100;
    }
    const w = 100;
    const h = 100;
    const img = astSm;
    //SM-Asteroid 5
    //canvas.height/width is replaced with the destination when you want to change
    //Once falcon is figured out would go here
    // const velocity = {
    //     x: 1,
    //     y: 1
    // }
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    //SM-Asteroid 5 End
    sasteroids.push(new Sasteroid(x, y, w, h, img, velocity));
    ///SM-Asteroid 4 ended here
  }, 1000);
}

///SM-Asteroids2.5
spawnSasteroids();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  LASERS

let bullet = new Image();
bullet.src = "../images/bullet.png";

let bullet2 = new Image();
bullet2.src = "../images/bullet2.png";

//Laser Weapon 1
class Laser {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
  // Laser Weapon 3
  // Add velocity to each individual laser x and y
  // For each frame set x / y coordinate for each laser
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//Laser Weapon 5
//To get them rendered at the same time need to create array
const lasers = [];

//Laser Weapon 2.1
//Adds a bullet to the laser class everytime the mouse is clicked
addEventListener("click", (event) => {
  //Laser Weapon 8. Distance from mouse and center of the screen
  // 0 to 6.28 is equal to 0 to 360. Get exact angle from right triangle to center
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  //Laser Weapon 9
  // 'velocity is reeally more or less the direction or angle that the bullet is moving
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  //Laser Weapon 7
  //this is where the laser is added to the class
  lasers.push(
    new Laser(canvas.width / 2, canvas.height / 2, 5, "orange", velocity)
  );
});

//STELIAN ADDING MUSIC AND IMAGES //////////// START LINE 170
//*************SOUND*////////////////////

//var audio = new Audio("../sounds/backgroundSound.mp3");
//audio.play();

let audio = new Audio("../sounds/backgroundSound.mp3");
function play() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

document.querySelector("#buttonSound").onclick = play;

document.querySelector("#sound-btn").onclick = play;

let explosionAsteroid = new Audio("../sounds/Explosion+3.mp3");
let explosionSapaceShip = new Audio("../sounds/Explosion+4.mp3");
let gameOver = new Audio("../sounds/gameOver.mp3");
let gameStart = new Audio("../sounds/gameStart.mp3");
let gunSound = new Audio("../sounds/GunSound.mp3");

// ENDGAME
function endGame() {
  $("#canvasArea").hide();
  $("#score").text(score);
  $(".FinishScreen").show();
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Laser Weapon 7
  //Calls laser update funtion for every active laser
  lasers.forEach((laser) => {
    laser.update();
  });

  ///SM-Asteroid 5
  //calls the asteroid update function for every asteroid
  sasteroids.forEach((sasteroid) => {
    sasteroid.update();

    //calls falcon draw funtion - which is where it moves and spins
    falcon.draw();

    //Collisions code in progress
    ////Blow stuff Up 1
    //Removing the distance from the laser to the asteroid
    // lasers.forEach((laser) => {
    //     const dist = Math.hypot(laser.x - sasteroid.x, laser.y - sasteroid.y)
    //     if (dist - sasteroid.x - laser.x < 1)
    //     {
    //         console.log(`remove`);
    //     }
    // })
  });
}

animate();
