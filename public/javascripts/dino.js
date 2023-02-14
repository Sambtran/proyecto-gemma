let title = $("h1");

title.css("text-transform", "uppercase");

// let canvas = $("#canvas");
// canvas.css("width", "70vw");
// canvas.width = $("#canvas").css("width");
// canvas.height = $("#canvas").css("height");
// console.log(canvas.width);
// console.log(canvas.height);

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let score;
let highScore;
let scoreText;
let higScoreText;
let player;
let gravity;
let enemies = [];
let gameSpeed;
let keys = {};
let end = false;
let endText = "";

// let canvasWidth = Math.round(canvas.width.replace("px", ""));
// let canvasHeight = Math.round(canvas.height.replace("px", ""))-10;

// let playerPosition = parseInt((5 * canvasWidth) / 100);
// let playerSize = parseInt((3 * canvasWidth) / 100);

function Player(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;

  this.speed = 0;
  this.jumpForce = 4.5;
  this.originalHeight = height;
  this.grounded = false;
  this.jumpTimer = 0;

  this.Draw = () => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  };
  //   console.log(this.y);
  //   console.log(this.height);
  //   console.log(canvasHeight);
  this.Animate = () => {
    if (keys["Space"] || keys["ArrowUp"]) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    if (keys["Shift"] || keys["ArrowDown"]) {
      this.height = this.originalHeight / 2;
    } else {
      this.height = this.originalHeight;
    }

    this.y += this.speed;

    if (this.y + this.height < canvas.height) {
      this.speed += gravity;
      this.grounded = false;
    } else {
      this.speed = 0;
      this.grounded = true;
      this.y = canvas.height - this.height;
    }

    this.Draw();
  };
  this.Jump = () => {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.speed = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.speed = -this.jumpForce - this.jumpTimer / 50;
    }
  };
}

function Enemy(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;

  this.speed = -gameSpeed;

  this.Update = () => {
    this.x += this.speed;
    this.Draw();
    this.speed = -gameSpeed;
  };
  this.Draw = () => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  };
}
function Text(text, x, y, align, color, size) {
  this.text = text;
  this.x = x;
  this.y = y;
  this.align = align;
  this.color = color;
  this.size = size;

  this.Draw = () => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = this.size + "px sans-serif";
    ctx.textAlign = this.align;
    ctx.fillText(this.text, this.x, this.y);
    ctx.closePath();
  };
}

function SpawnEnemy() {
  let size = numRandom(20, 70);
  let type = numRandom(0, 1);

  let enemy = new Enemy(
    canvas.width + size,
    canvas.height - size,
    size,
    size,
    "blue"
  );

  if (type == 1) {
    enemy.y -= player.originalHeight - 10;
  }
  enemies.push(enemy);
}
function numRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function Start() {
  canvas.width = window.innerWidth - window.innerWidth * 0.2;
  canvas.height = 300;
  ctx.font = "20px sans-serif";
  gameSpeed = 1.5;
  gravity = 0.1;

  //console.log(gameSpeed)

  score = 0;
  highScore = 0;
  if (localStorage.getItem("highscore")) {
    highScore = parseInt(localStorage.getItem("highscore"));
  }
  player = new Player(30, canvas.height - 250, 40, 40, "red");

  scoreText = new Text("Score: " + score, 50, 50, "left", "black", "20");
  higScoreText = new Text(
    "Highscore: " + highScore,
    canvas.width - 50,
    50,
    "right",
    "black",
    "20"
  );
  requestAnimationFrame(Playing);
}

let initialSpawnTime = 400;
let spawnTimer = initialSpawnTime;
function Playing() {  
  requestAnimationFrame(Playing);
//   if (end == false) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  spawnTimer--;
  if (spawnTimer <= 0) {
    SpawnEnemy();
    console.log(enemies);
    spawnTimer = initialSpawnTime - gameSpeed * 4;
    if (spawnTimer < 120) {
      spawnTimer = 120;
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    let en = enemies[i];

    if (en.x + en.width < 0) {
      enemies.splice(i, 1);
    }

    if (
      player.x < en.x + en.width &&
      player.x + player.width > en.x &&
      player.y < en.y + en.height &&
      player.y + player.height > en.y
    ) {
      enemies = [];
      score = 0;
      spawnTimer = initialSpawnTime;
      gameSpeed = 1.5;
      window.localStorage.setItem("highscore", highScore);
      //cancelAnimationFrame(Playing);
      //requestAnimationFrame(Stop)
    //   end = true;
    //   Stop();
    }

    en.Update();
  }

  player.Animate();
  score += 0.1;
  scoreText.text = "Score: " + parseInt(score);
  scoreText.Draw();

  if (score > highScore) {
    highScore = score;
    higScoreText.text = "Highscore: " + parseInt(highScore);
  }
  higScoreText.Draw();
  gameSpeed += 0.0003;
    // } else {
    //   enemies = [];
    //   score = 0;
    //   spawnTimer = initialSpawnTime;
    //   gameSpeed = 1.5;
    //   spawnTimer = initialSpawnTime;
    //   //cancelAnimationFrame(Playing);

    // }
}
// function Restart(ev) {
//   //console.log(ev.code)
//   if ((ev.code = "Enter")) {

//     end = false;
//     console.log(1)
//     requestAnimationFrame(Playing);

//     document.removeEventListener("keydown",Restart())
//     //requestAnimationFrame(Playing);
//   }
// }
// function Stop() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.beginPath();
//   ctx.fillStyle = "black";
//   ctx.font = "50px sans-serif";
//   ctx.textAlign = "center";
//   ctx.fillText("End", canvas.width / 2, canvas.height / 2);
//   ctx.closePath();
//   canvas.replaceWith(canvas.cloneNode(true));
//   document.addEventListener("keydown", (ev) => {
//     if (ev.code == "Enter") {
      
//       Start();
//       document.addEventListener("keydown", (ev) => {
//         keys[ev.code] = true;
//       });
  
//       document.addEventListener("keyup", (ev) => {
//         keys[ev.code] = false;
//       });
//     }
//   });
//   //document.addEventListener("keydown", (ev) => Restart(ev));
// }
document.addEventListener("keydown", (ev) => {
  if (ev.code == "Enter") {
    
    Start();
    document.addEventListener("keydown", (ev) => {
      keys[ev.code] = true;
    });

    document.addEventListener("keyup", (ev) => {
      keys[ev.code] = false;
    });
  }
});