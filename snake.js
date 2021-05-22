const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.width / scale;
const cols = canvas.height / scale ;


let Score = document.querySelector(".score");
let Lives = document.querySelector(".lives");
let Level = document.querySelector(".level");
let arrow = document.querySelector(".arrow")
let speed = 1;
var snake;
let score=0;
let Scoretotal=0;
let level=1;
let lives =10;
let snakespeed = 4;
function loop() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  fruit.draw();  
  snake.update();
  snake.draw();
  if (snake.eat(fruit)){
    fruit.randlocation();
  }
  snake.levelup();
  snake.collision();
  setTimeout(loop,1000/snakespeed)
}
(function Start(){
  snake = new Snake();
  fruit = new Fruit();

  fruit.randlocation();
  console.log(fruit);
  snake.draw();
  loop();
  
    
}());

window.addEventListener('keydown' , function(s){
  const direction = s.key.slice(4);
  snake.changeDirection(direction);
  
});

function Fruit(){
  this.x;
  this.y;
  this.randlocation = function(){
    snakespeed +=0.7;
  this.x = (Math.floor(Math.random() * rows -1)+1)*scale;
  this.y = (Math.floor(Math.random() * cols -1)+1)*scale;
  
  this.draw  = function(){
    ctx.fillStyle = "#55D6AA";
    ctx.fillRect(this.x, this.y , scale , scale );
  }

  } 
}
function Snake(){
  this.x = (canvas.width / scale)*10;
  this.y = (canvas.height / scale)*9;
  this.xSpeed = 0;
  this.ySpeed = 0 ;
  this.total = 0 ;
  this.tail = [];

  this.draw = function(){
    ctx.fillStyle = "#FFFFFF";
    for(let i=0; i<this.tail.length; i++){
      ctx.fillRect(this.tail[i].x, this.tail[i].y , scale , scale );
    }
    ctx.fillRect(this.x, this.y , scale , scale );

  }
  this.levelup =function(){
    if( score >= 3){
      ctx.fillRect((canvas.width / scale)*4, (canvas.height / scale)*4, scale , scale );
      ctx.fillRect((canvas.width / scale)*14, (canvas.height / scale)*4, scale , scale );
      } 
    if( score >= 6){
    ctx.fillRect((canvas.width / scale)*4, (canvas.height / scale)*14, scale, scale );
    ctx.fillRect((canvas.width / scale)*14, (canvas.height / scale)*14, scale , scale );
  
    }
  }
  this.update= function(){
    for (let i= 0; i < this.tail.length -1; i++) {
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.total -1] = {x: this.x , y: this.y }; 
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if( (this.x > canvas.width || this.y < 0 || this.x < 0 || this.y > canvas.height) && lives !=1){
      lives--;
      Lives.innerHTML = "lives: " + lives;
      ctx.clearRect(0,0, canvas.width, canvas.height);
      this.x = (canvas.width / scale)*10;
      this.y = (canvas.height / scale)*9;
      this.xSpeed = 0;
      this.ySpeed = 0 ;
      arrow.innerHTML = "Press any arrow key to start"
      snake.total = 0;
      score =0;
      snakespeed=4;
      snake.tail = [];
      level =1;
      Level.innerHTML = "level: " + level;
    }
    else if( (this.x > canvas.width || this.y < 0 || this.x < 0 || this.y > canvas.height) && lives ==1 ){
      lives--;
      level =1;
      snakespeed=4;
      Level.innerHTML = "level: " + level;
      Lives.innerHTML = "lives: " + lives;
      if(confirm('you lost, press ok to restart')){
        window.location = '/';
      }
      return
    }

  }
  this.changeDirection= function(direction){
    switch(direction){
      case 'wUp' : 
        if( this.ySpeed != 0){
          break;
        }
        arrow.innerHTML="";
        this.xSpeed=0;
        this.ySpeed= -scale *speed;

      break;
      case 'wDown' : 
      if( this.ySpeed != 0){
        break;
      }
      arrow.innerHTML="";
        this.xSpeed=0;
        this.ySpeed= scale *speed;
      break;
      case 'wLeft' : 
      if( this.xSpeed != 0){
        break;
      }
      arrow.innerHTML="";
        this.xSpeed=  -scale *speed;
        this.ySpeed= 0;
      break;
      case 'r': 
      alert("paused");
      break;
      case 'wRight' : 
      if( this.xSpeed != 0){
        break;
      }
      arrow.innerHTML="";
        this.xSpeed=scale *speed;
        this.ySpeed=0;
      break;
    }
  }
  this.eat = function(fruit){

    if (this.x === fruit.x && this.y === fruit.y){
      this.total++;
      score++;
      Scoretotal++;
      Score.innerHTML = "score: " + Scoretotal;
      if(score == 3){
        level++;
        Level.innerHTML = "level: " + level;
      }
      if(score == 6){
        level++;
        Level.innerHTML = "level: " + level;
      }
      return true;
    }
    return false;
  }
  this.collision = function(){
    for(let i=0; i<this.tail.length;i++){
      if(this.x ===this.tail[i].x && this.y === this.tail[i].y && lives !=1){
        lives--;
        Lives.innerHTML = "lives: " + lives;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        this.x = (canvas.width / scale)*10;
        this.y = (canvas.height / scale)*9;
        this.xSpeed = 0;
        this.ySpeed = 0 ;
        arrow.innerHTML = "Press any arrow key to start"
        snake.total = 0;
        score =0;
        level =1;
        snakespeed=4;
        Level.innerHTML = "level: " + level;
        snake.tail = [];}
      else if (this.x ===this.tail[i].x && this.y === this.tail[i].y && lives ==1){
        lives--;
        level =1;
        snakespeed=4;
        Level.innerHTML = "level: " + level;
      Lives.innerHTML = "lives: " + lives;
      if(confirm('you lost, press ok to restart')){
        window.location = '/';
        }
      
        return
        
      }
      
    }
    if(score >= 3){
    if( (this.x ===(canvas.width / scale)*4 && this.y === (canvas.height / scale)*4 && lives !=1) ||  (this.x ===(canvas.width / scale)*14 && this.y === (canvas.height / scale)*4 && lives !=1)   ){
      lives--;
      Lives.innerHTML = "lives: " + lives;
      ctx.clearRect(0,0, canvas.width, canvas.height);
      this.x = (canvas.width / scale)*10;
      this.y = (canvas.height / scale)*9;
      this.xSpeed = 0;
      this.ySpeed = 0 ;
      snakespeed=4;
      arrow.innerHTML = "Press any arrow key to start"
      snake.total = 0;
      score =0;
      snake.tail = [];
      level =1;
      Level.innerHTML = "level: " + level;
    }
    else if ((this.x ===(canvas.width / scale)*4 && this.y === (canvas.height / scale)*4 && lives ==1) ||  (this.x ===(canvas.width / scale)*14 && this.y === (canvas.height / scale)*4 && lives ==1)  ){
      lives--;
      level =1;
      snakespeed=4;
      Lives.innerHTML = "lives: " + lives;
      if(confirm('you lost, press ok to restart')){
        window.location = '/';}
    }
  }
  if(score >=6){
    if( (this.x ===(canvas.width / scale)*4 && this.y === (canvas.height / scale)*14 && lives !=1) ||  (this.x ===(canvas.width / scale)*14 && this.y === (canvas.height / scale)*14 && lives !=1) ){
      lives--;
      snakespeed=4;
      Lives.innerHTML = "lives: " + lives;
      ctx.clearRect(0,0, canvas.width, canvas.height);
      this.x = (canvas.width / scale)*10;
      this.y = (canvas.height / scale)*9;
      this.xSpeed = 0;
      this.ySpeed = 0 ;
      arrow.innerHTML = "Press any arrow key to start"
      snake.total = 0;
      score =0;
      snake.tail = [];
      level =1;
      Level.innerHTML = "level: " + level;
    }
    else if ( (this.x ===(canvas.width / scale)*4 && this.y === (canvas.height / scale)*14 && lives ==1) ||  (this.x ===(canvas.width / scale)*14 && this.y === (canvas.height / scale)*14 && lives ==1)){
      level =1;
      snakespeed=4;
      Level.innerHTML = "level: " + level;
      lives--;
      Lives.innerHTML = "lives: " + lives;
      if(confirm('you lost, press ok to restart')){
        window.location = '/';}
    }
  }
  }

}

 