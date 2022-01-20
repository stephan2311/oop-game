class Game {
  constructor() {
    this.obstacleArr = [];
    this.timer = 0;
  }

  start() {
    this.player = new Player();
    this.player.domElement = this.createDomElm(this.player);
    this.drawDomElm(this.player);

    this.addEventListeners();

    setInterval(() => {
      this.timer++;

      if (this.timer % 3 === 0) {
        const newObstacle = new Obstacle();
        this.obstacleArr.push(newObstacle);
        newObstacle.domElement = this.createDomElm(newObstacle);
        this.drawDomElm(newObstacle);
      }

      // newObstacle.moveDown();
      // this.drawDomElm(newObstacle);

      this.obstacleArr.forEach((element) => {
        element.moveDown();
        game.drawDomElm(element);
      });
    }, 500);
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (event.key === "ArrowRight") {
        this.player.moveRight();
      }
      this.drawDomElm(this.player);
    });
  }

  createDomElm(instance) {
    const htmlTag = document.createElement("div"); // create html element (not added to the dom yet)
    htmlTag.className = instance.className; // add class (so that we can reuse this function to create different types of elements in the dom, eg. player, obstacles....)
    htmlTag.style.width = instance.width + "vw";
    htmlTag.style.height = instance.height + "vh";
    const board = document.getElementById("board"); // get a reference to the parent container
    board.appendChild(htmlTag);
    return htmlTag; // append the element to the dom
  }

  drawDomElm(instance) {
    instance.domElement.style.left = instance.positionX + "vw";
    instance.domElement.style.bottom = instance.positionY + "vh";
  }
}

class Player {
  constructor() {
    this.className = "player";
    this.positionX = 0;
    this.positionY = 0;
    this.width = 10;
    this.height = 10;
    this.domElement = null;
  }

  moveLeft() {
    this.positionX -= 10;
  }

  moveRight() {
    this.positionX += 10;
  }
}

class Obstacle {
  constructor() {
    this.className = "obstacle";
    this.positionX = 40;
    this.positionY = 90;
    this.width = 5;
    this.height = 5;
    this.domElement = null;
  }

  moveDown() {
    this.positionY -= 10;
  }
}

const game = new Game();
game.start();
