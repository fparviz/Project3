var playerX = 200;
var playerY = 400;
var enemyX = 10;
var enemyY = [60,150,200];
var enemyCount = 3;
var enemySpeed = [120,130,140,150];
var canvasX = 500;
var width = 101;
var height = 83;

function randomNum(num) {
    return Math.floor(Math.random() * num);
}

// Enemies our player must avoid
var Enemy = function() {
    this.x = enemyX;
    this.y = enemyY[randomNum(enemyY.length)];
    this.speed = enemySpeed[randomNum(enemySpeed.length)];
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

//Enemy reset
Enemy.prototype.reset = function() {
    this.x = enemyX;
    this.y = enemyY[randomNum(enemyY.length)];
    this.speed = enemySpeed[randomNum(enemySpeed.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
     if (this.x > canvasX) {
        this.reset();
    }
    if ((Math.abs(this.x - Player.x) < 90) && (Math.abs(this.y - Player.y) < 70)) {
        Player.reset();

    }
    //Enemy collision detector
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 80;
    this.bottom = this.y + 80;

    this.collisionsCheck(this, player);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Enemy.prototype.collision = function(enemy, player) {
    return !(player.left > enemy.right ||
        player.right < enemy.left ||
        player.top > enemy.bottom ||
        player.bottom < enemy.top);
}
Enemy.prototype.collisionsCheck = function(enemy, player) {
    if (this.collision(enemy, player)) {
        player.reset();
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function(dt) {
    if (this.x >= canvasX) {
        this.x = (this.x - width);
    }
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.y >= playerY) {
        this.y = playerY;
    }
    if (this.y <= 0) {
        this.reset();
    }

    //Player collision detector
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 80;
    this.bottom = this.y + 80;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
        case 'left':
            this.x -= width;
            break;
        case 'right':
            this.x += width;
            break;
        case 'up':
            this.y -= height;
            break;
        case 'down':
            this.y += height;
            break;
        default:
            break;
    }
};

Player.prototype.reset = function() {
    this.x = playerX;
    this.y = playerY;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
for (var i = 0; i < enemyCount; i++) {
    allEnemies.push(new Enemy());
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
