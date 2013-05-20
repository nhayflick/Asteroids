function Asteroid() {
  this.position = [Math.random()*50 , Math.random()*50 ];
  this.velocity = [Math.random()- 0.5 , Math.random()-0.5 ];
  this.radius = Math.random() + 1;
}

Asteroid.prototype.update = function() {
  this.position[0] += this.velocity[0];
  this.position[1] += this.velocity[1];
  this.position[0] = (this.position[0] + 50) % 50;
  this.position[1] = (this.position[1] + 50) % 50;
}

function Bullet(position, velocity){
  this.position = position;
  this.velocity = velocity;
}

Bullet.prototype.updateBullet = function() {
  this.position[0] += this.velocity[0]
  this.position[1] += this.velocity[1]
}

function Ship(){
  this.position = [25, 25];
  this.velocity = [0, 0];
  this.speed = 0;
  this.direction = Math.PI / 2;
  this.bullets = []
}


var pythagorean = function(array){
  return Math.sqrt(array[0]*array[0] + array[1]*array[1])
}

Ship.prototype.takeInput = function(keyInput){
  console.log("direction: " + this.direction)
  switch (keyInput) {
      // RIGHT
      case 39:
         this.direction += 0.005;
         break;
      //UP
      case 38:
          this.velocity[0] += 0.001 * Math.cos(this.direction);
          this.velocity[1] += 0.001 * Math.sin(this.direction);
        // console.log("speed: " + this.speed)
        // console.log("velocity" + this.velocity)
        // console.log("direction" + this.direction)
        break;
       // LEFT
       case 37:
          this.direction -= 0.005
          break;
       //DOWN
      case 40:
        this.velocity[0] += 0.001 * Math.cos(this.direction);
        this.velocity[1] += 0.001 * Math.sin(this.direction);
        // console.log("speed: " + this.speed)
        // console.log("velocity" + this.velocity)
        // console.log("direction" + this.direction)
        break;
      case 32:
        this.fire();
        break;
  };
}

Ship.prototype.update = function() {

  this.position[0] += this.velocity[0]
  this.position[1] += this.velocity[1]
  this.position[0] = (this.position[0] + 50) % 50
  this.position[1] = (this.position[1] + 50) % 50

}

Ship.prototype.fire = function() {
  bulletVelocityX = 0.4 * Math.cos(this.direction);
  bulletVelocityY = 0.4 * Math.sin(this.direction);
  this.bullets.push(new Bullet([this.position[0],this.position[1]], [bulletVelocityX, bulletVelocityY]));
  if (this.bullets.count() > 30) {
    this.bullets.shift()
  }
}

function Game() {
  this.asteroids = this.makeAsteroids();
  this.ship = new Ship();
}

Game.prototype.makeAsteroids = function(){
  var output_array = []
  for (i=1; i<8; i++){
    output_array.push(new Asteroid());
  }
  return output_array;
}

Game.prototype.update = function(){
  for(var i in this.asteroids) {
    this.asteroids[i].update();
  };
  this.ship.update();
  for(var i in this.ship.bullets) {
    var bullet = this.ship.bullets[i]
    bullet.updateBullet();
  };
  this.checkBulletCollisions()
}

Game.prototype.checkCollisions = function(){
 for(var i in this.asteroids) {
    if (this.checkCollision(this.asteroids[i], this.ship)){
      return true;
    }
  }
  return false;
}

Game.prototype.checkCollision = function(asteroid, ship){
    if ((asteroid.position[0] - asteroid.radius - .2 <= ship.position[0] && ship.position[0] <= asteroid.position[0] + asteroid.radius + .2) && (asteroid.position[1] - asteroid.radius - .2 <= ship.position[1] && ship.position[1] <= asteroid.position[1] + asteroid.radius + .2) && asteroid.radius != 0){
      //alert("asteroid position:" + asteroid.position + "asteroid radius:" + asteroid.radius + "ship position:" + ship.position);
      return true;
    } else {
      return false;
    }
}

Game.prototype.checkBulletCollisions = function(){
 for(var a in this.asteroids) {
    for(var b in this.ship.bullets) {
      this.checkBulletCollision(this.asteroids[a], this.ship.bullets[b])
    }
  }
}

Game.prototype.checkBulletCollision = function(asteroid, bullet){
    if ((asteroid.position[0] - asteroid.radius - .2 <= bullet.position[0] && bullet.position[0] <= asteroid.position[0] + asteroid.radius + .2) && (asteroid.position[1] - asteroid.radius - .2 <= bullet.position[1] && bullet.position[1] <= asteroid.position[1] + asteroid.radius + .2)){
      asteroid.radius = 0
    }
}