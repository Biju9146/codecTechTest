'use strict';  
// JavaScript code to navigate a robot on Mars plateau

// Define the Plateau grid
let grid = [];

const navigateRobot = (commands, currentPosition) => {
  // Fetch the current roboFacing direction
  let roboFacing = currentPosition[2];

  for (const command of commands) {
    if (command === "L") {
      roboFacing = turnLeft(roboFacing);
    } else if (command === "R") {
      roboFacing = turnRight(roboFacing);
    } else if (command === "F") {
      currentPosition = moveForward(roboFacing, currentPosition);
    }
  }
  return currentPosition;
};

const turnLeft = (roboFacing) => {
  if (roboFacing === "N") {
    return "W";
  } else if (roboFacing === "W") {
    return "S";
  } else if (roboFacing === "S") {
    return "E";
  } else if (roboFacing === "E") {
    return "N";
  }
};

const turnRight = (roboFacing) => {
  if (roboFacing === "N") {
    return "E";
  } else if (roboFacing === "E") {
    return "S";
  } else if (roboFacing === "S") {
    return "W";
  } else if (roboFacing === "W") {
    return "N";
  }
};

const moveForward = (roboFacing, currentPosition) => {
  let x = currentPosition[0];
  let y = currentPosition[1];

  if (roboFacing === "N") {
    y += 1;
  } else if (roboFacing === "E") {
    x += 1;
  } else if (roboFacing === "S") {
    y -= 1;
  } else if (roboFacing === "W") {
    x -= 1;
  }

  // Check if the new position is within the grid
  if (x > 0 && x <= grid[0].length && y > 0 && y <= grid.length) {
    currentPosition = [x, y, roboFacing];
  } else {
    document.getElementById("fianl_position").innerText = "Robo gose out of grid!";
    document.getElementById("fianl_position").style.color = "red";
    return alert("Robo goes out of grid!");
  }
  return currentPosition;
};

const walkRobo = () => {
  const gridSize = prompt("Enter the size of the plateau grid (e.g. 5x5): ");
  const [x, y] = gridSize.split(/[\xX]+/).map(Number);
  grid = Array.from({ length: y }, () => Array.from({ length: x }, () => 0));
  document.getElementById("grid-size").innerText = gridSize;
  const commands = prompt("Enter the commands to navigate the robot: ");
  document.getElementById("command").innerText = commands;
  const currentPosition = [1, 1, "N"];
  document.getElementById("start_position").innerText = currentPosition;
  const result = navigateRobot(commands, currentPosition);
  document.getElementById("fianl_position").innerText = `${result[0]}, ${result[1]}, ${result[2]}`;
  document.getElementById("fianl_position").style.color = "green";

};

walkRobo();
