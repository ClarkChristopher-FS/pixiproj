// Create the PixiJS application
const app = new PIXI.Application();
await app.init({
  backgroundColor: "skyblue",
  width: 800,
  height: 800,
});
document.getElementById("game").appendChild(app.canvas);

// Draw the ball in the center
const circle = new PIXI.Graphics();
const radius = 10;
circle.beginFill("yellow");
circle.drawCircle(0, 0, radius);
circle.endFill();
circle.x = 400;
circle.y = 400;
app.stage.addChild(circle);

// Set ball speed/velocity
let xv = 3;
let yv = 2;

// Create the four borders
const borderThickness = 10;
const borders = {
  top: new PIXI.Graphics(),
  bottom: new PIXI.Graphics(),
  left: new PIXI.Graphics(),
  right: new PIXI.Graphics(),
};

//  arrow function to draw a border
const drawBorder = (g, x, y, w, h) => {
  g.beginFill("red");
  g.drawRect(x, y, w, h);
  g.endFill();
  app.stage.addChild(g);
};

// Positioning borders
drawBorder(borders.top, 0, 0, 800, borderThickness);
drawBorder(borders.bottom, 0, 790, 800, borderThickness);
drawBorder(borders.left, 0, 0, borderThickness, 800);
drawBorder(borders.right, 790, 0, borderThickness, 800);

// a booleen to track whether each wall has been hit
let hits = { top: false, bottom: false, left: false, right: false };

// Main game loop that returns a Promise
const playGame = () => {
  return new Promise((resolve) => {
    app.ticker.add(() => {
      // Move the ball each frame
      circle.x += xv;
      circle.y += yv;

      // Bounce off left wall
      if (circle.x - radius <= borderThickness) {
        xv = -xv;
        hits.left = true;
        borders.left
          .clear()
          .beginFill("white")
          .drawRect(0, 0, borderThickness, 800)
          .endFill();
      }

      // Bounce off right wall
      if (circle.x + radius >= 800 - borderThickness) {
        xv = -xv;
        hits.right = true;
        borders.right
          .clear()
          .beginFill("white")
          .drawRect(790, 0, borderThickness, 800)
          .endFill();
      }

      // Bounce off top wall
      if (circle.y - radius <= borderThickness) {
        yv = -yv;
        hits.top = true;
        borders.top
          .clear()
          .beginFill("white")
          .drawRect(0, 0, 800, borderThickness)
          .endFill();
      }

      // Bounce off bottom wall
      if (circle.y + radius >= 800 - borderThickness) {
        yv = -yv;
        hits.bottom = true;
        borders.bottom
          .clear()
          .beginFill("white")
          .drawRect(0, 790, 800, borderThickness)
          .endFill();
      }

      // End game when all walls are hit
      if (hits.top && hits.bottom && hits.left && hits.right) {
        resolve("Game Over, All corners hit!");
        app.ticker.stop();
      }
    });
  });
};

// Start the game
playGame().then((msg) => {
  alert(msg);
});
