function Controller(){

  this.ctx = $('#canvas')[0].getContext("2d");
  this.game = new Game()


}

Controller.prototype.render = function(){
  this.ctx.clearRect (0,0,500,500);
  for (var i in this.game.asteroids){
    this.renderCircle(this.game.asteroids[i].position, this.game.asteroids[i].radius);
  }
  this.renderTriangle(this.game.ship.position, this.game.ship.direction);
  for (var i in this.game.ship.bullets){
    var bullet = this.game.ship.bullets[i]
    this.renderCircle(bullet.position, .2)
    console.log(bullet.position)
  }
}

Controller.prototype.startGame = function(){
  this.render();
  STEP_TIME_MILLIS = 35;
  var interval;

  that = this

  var runStep = function(){
    $('html').keydown(function (event) {
      // console.log("You pressed keycode: " + event.keyCode);
      that.game.ship.takeInput(event.keyCode);
    });
    that.game.update();
    that.render();
        if (that.game.checkCollisions()) {
      alert("In space no one can hear you scream...");
      clearInterval(interval)
    }

  //   if (b.checkKill()) {
  //     alert("Game Over!");
  //     clearInterval(interval);
  //   }
     };

  function runLoop() {
    interval = window.setInterval(runStep, STEP_TIME_MILLIS);
  }

  runLoop();
}

Controller.prototype.renderCircle = function(coord, radius){
  this.ctx.fillStyle = "#999999"
  this.ctx.beginPath();
  this.ctx.arc(coord[0] * 10, coord[1] * 10, radius * 10, 0, Math.PI*2, true);
  this.ctx.closePath();
  this.ctx.fill();
}

Controller.prototype.renderTriangle = function(coord, direction) {
  var tip = [Math.cos(direction)*10 + coord[0]*10, Math.sin(direction)*10 + coord[1]*10];
  var l_direction = direction + Math.PI / 2;
  var r_direction = direction - Math.PI / 2;
  var left_wing = [Math.cos(l_direction)*10 + coord[0]*10, Math.sin(l_direction)*10 + coord[1]*10];
  var right_wing = [Math.cos(r_direction)*10 + coord[0]*10, Math.sin(r_direction)*10 + coord[1]*10];
  // console.log("left_wing: " + left_wing)
  // console.log("right_wing: " + right_wing)
  // console.log("tip: " + tip)
  this.ctx.fillStyle = "#CC0000"
  this.ctx.beginPath();
  this.ctx.moveTo(left_wing[0],left_wing[1]);
  this.ctx.lineTo(tip[0], tip[1]);
  this.ctx.lineTo(right_wing[0],right_wing[1]);
  this.ctx.lineTo(left_wing[0],left_wing[1]);
  this.ctx.closePath();
  this.ctx.fill();
}

$(function(){
  c = new Controller()
  c.startGame()
})




// var render = function(b){
//   var ctx = $('#canvas')[0].getContext("2d");
//   ctx.clearRect (0,0,500,500);
//   renderCircle(b.snakeHead, ctx)
//   for(var i in b.snakeBody) {
//     renderCircle(b.snakeBody[i], ctx);
//   }
//   renderCircle(b.food, ctx);
// }
//
// var renderCircle = function(coord, ctx){
//   ctx.beginPath();
//   ctx.arc((coord[0] * 10) + 5, (coord[1] * 10) + 5, 5, 0, Math.PI*2, true);
//   ctx.closePath();
//   ctx.fill();
// }








//
// $(function () {
//   var b = new Board()
//   STEP_TIME_MILLIS = 100;
//   var interval;
//
//   var runStep = function(){
//     $('html').keydown(function (event) {
//       console.log("You pressed keycode: " + event.keyCode);
//       b.snake.turn(event.keyCode);
//     });
//     b.step();
//     render(b)
//     if (b.checkKill()) {
//       alert("Game Over!");
//       clearInterval(interval);
//     }
//   };
//
//   function runLoop() {
//     interval = window.setInterval(runStep, STEP_TIME_MILLIS);
//   }
//   runLoop(b);
//   // render(b)
//   // b.step();
//   // b.step();
//   // b.step();
//   // render(b)
// });
//
//
// var render = function(b){
//   var ctx = $('#canvas')[0].getContext("2d");
//   ctx.clearRect (0,0,500,500);
//   renderCircle(b.snakeHead, ctx)
//   for(var i in b.snakeBody) {
//     renderCircle(b.snakeBody[i], ctx);
//   }
//   renderCircle(b.food, ctx);
// }
//
// var renderCircle = function(coord, ctx){
//   ctx.beginPath();
//   ctx.arc((coord[0] * 10) + 5, (coord[1] * 10) + 5, 5, 0, Math.PI*2, true);
//   ctx.closePath();
//   ctx.fill();
// }
//
//
