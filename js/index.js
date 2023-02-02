// Game Constants and Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../songs/eat.mp3");
const gameOverSound = new Audio("../songs/no.mp3");
// const moveSound = new Audio();
const musicSound = new Audio("../songs/start.mp3");
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [{ x: 9, y: 9 }];
let food = { x: 7, y: 6 };
let board = document.getElementById("board");
let score = 0;
let scoreBox = document.getElementById("scoreBox");
let PlayerHighScore = document.getElementById("hiScoreBox");
let hiScoreVal;
// Game function

const isCollide = (snake) => {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
};

const gameEngine = () => {
  // part 1 : updating the anake array-----------------------------

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("game over press again play");
    snakeArr = [{ x: 12, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // if your have eaten the food increment the score and regernate foood
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    // yeh fourmula ha  a sa b tak random number genrate karna ha kaha sa kaha tak
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    score += 1;
    if(score>hiScoreVal){
      hiScoreVal = score
  localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
  PlayerHighScore.innerHTML = `High score : ${hiScoreVal}`;
    }
    scoreBox.innerHTML = `score : ${score}`;
  }
  //   snake move time
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part 2 : Render (Display) the snake and foor----------------------------------
  //   Display snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });

  // Display Food Element
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
};

// main function for rendring
const main = (ctime) => {
  
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    // milisecond ha to 1000 sa devided kar diya 1/2 = .5 hota ha to har bar jab .5 second ni hoyta ha yah tab tak paint nahi karega
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
};

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
   hiScoreVal = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
} else {
  hiScoreVal = JSON.parse(hiscore);
  PlayerHighScore.innerHTML = `High score : ${hiscore}`;
}

// -----------------------------------------------------------------
// not use setinterval when we render animation
window.requestAnimationFrame(main);
// requestAnimationFrame frame main ko call karega fir main requestAnimationFrame ko fir sa call kare ga or ya chalta rahe
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      // console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      // console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      // console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      // console.log("ArrowRight");
      break;
    default:
      break;
  }
});
