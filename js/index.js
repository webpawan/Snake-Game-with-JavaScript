// Game Constants and Variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio();
const gameOverSound = new Audio();
const moveSound = new Audio();
const musicSound = new Audio();
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [{ x: 7, y: 5 }];
let food = { x: 7, y: 6 };
let board = document.getElementById("board");
// Game function

const gameEngine = () => {
  // part 1 : updating the anake array-----------------------------

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

// main function for resnding
const main = (ctime) => {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  gameEngine();
};

// -----------------------------------------------------------------
// not use setinterval when we render animation
window.requestAnimationFrame(main);
// requestAnimationFrame frame main ko call karega fir main requestAnimationFrame ko fir sa call kare ga or ya chalta rahe
window.addEventListener("keydown",e =>{
    
})