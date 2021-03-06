// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellet = 4;
var dots = 240;


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

ghosts = [inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\nDots Remaining: ' + dots);
  console.log('\nPower-Pellets: ' + powerPellet);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(e) Eat 100 Dots');
  console.log('(a) Eat ALL Dots');
  if (powerPellet > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  console.log("\n------------------");
  for (var i = 0; i < ghosts.length; i++) {
    if (ghosts[i].edible === true) {
      console.log('(' + (i + 1) + ')' + ' Eat ' + ghosts[i].name + ' (edible)');
    } else {
      console.log('(' + (i + 1) + ')' + ' Eat ' + ghosts[i].name + ' (inedible)');
    }
  }

  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka \(\'< '); // ('< is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dots -= 1;
}

function eatOneHundredDots() {
  console.log('\nCHOOOOOOMP!');
  score += 1000;
  dots -= 100;
}

function eatAllDots() {
  console.log('\nCHOOOOOOOOOMMMMMMMMMPPPPPPPPPPP!!!!!!!!');
  score += 10000;
  dots = 0;
}

function eatPowerPellet() {
  console.log('\nYummy!');
  score += 50;
  powerPellet -= 1;
  ghosts.forEach(function(currentGhost) {
    currentGhost.edible = true;
  })
}

function eatGhost(ghost) {
  if(ghost.edible === true) {
    score += 200;
    ghost.edible = false;
    console.log('\nThe ' + ghost.character + ' ghost ' + ghost.name + ' was eaten!');
  } else {
    lives -= 1;
    console.log('\nThe ' + ghost.colour + " ghost " + ghost.name + ' got you!');
    if (lives < 0) {
      process.exit();
    }
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      if (dots > 0) {
        eatDot();
      } else {
        console.log ('\nNo more dots!')
      }
      break;
    case 'e':
      if (dots > 100) {
        eatOneHundredDots();
      } else {
        console.log ('\nNot enough dots!')
      }
      break;
    case 'a':
      if (dots > 0) {
        eatAllDots();
      } else {
        console.log ('\nNo more dots!')
      }
      break;
    case 'p':
      if (powerPellet > 0) {
        eatPowerPellet();
      } else {
        console.log('\nOut of Power-Pellets!')
      }
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\nFinal Score: ' + score + '\n');
});
