var bgImg,bg;
var topGround, bottomGround;
var balloon, balloonImg;
var obstacle;
var obsTop, obsTop1, obsTop2;
var obsBottom, obsBottom1, obsBottom2,obsBottom3;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImg,restart,restartImg;
var obsTopGroup;
var score=0;

function preload(){
  bgImg=loadImage("assets/bg.png");
  balloonImg=loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
  obsTop1=loadImage("assets/obsTop1.png");
  obsTop2=loadImage("assets/obsTop2.png");
  obsBottom1=loadImage("assets/obsBottom1.png");
  obsBottom2=loadImage("assets/obsBottom2.png");
  obsBottom3=loadImage("assets/obsBottom3.png");
  gameOverImg=loadImage("assets/gameOver.png");
  restartImg=loadImage("assets/restart.png");

}

function setup(){
  createCanvas(1200,600);
  bg=createSprite(600,350,1,1);
  bg.addImage(bgImg);

  bottomGround=createSprite(600,740,2000,20);
  bottomGround.visible=false;

  topGround=createSprite(600,10,2000,20);
  topGround.visible=false;

  balloon=createSprite(100,200,20,300);
  balloon.addAnimation("Balloon",balloonImg);
  balloon.scale=0.5;

  obsTopGroup=new Group();

  gameOver=createSprite(600,250,20,20);
  gameOver.addImage("collided",gameOverImg);
  gameOver.visible=false;
  restart=createSprite(600,300,20,20);
  restart.addImage("Restart",restartImg);
  restart.visible=false;
  

}


function draw(){
  background(0);
  //bg.depth=bg.depth+1;



if(gameState===PLAY){

score=score+Math.round(getFrameRate()/60);

  balloon.collide(topGround);
  balloon.collide(bottomGround);
  balloon.setCollider("Circle",0,0,250);


  if(keyDown("space")){
    balloon.velocityY=-5;
  }

  balloon.velocityY=balloon.velocityY+1;

  spawnObstaclesTop();


  if(obsTopGroup.isTouching(balloon)){
gameState=END;
  }
}else if(gameState===END){
  gameOver.visible=true;
  restart.visible=true;
  balloon.velocityY=0;
  obsTopGroup.setVelocityXEach(0);
  

  if(mousePressedOver(restart)){
    reset();
  }

}
fill("black");
text("Score: "+score,500,50);


  drawSprites();
}


function spawnObstaclesTop(){
  if(frameCount%100===0){
    obsTop=createSprite(1400,100,40,50);
    obsTop.velocityX=-4;
    obsTop.scale=0.2;
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1 : obsTop.addImage(obsTop1);
      break;
      case 2 : obsTop.addImage(obsTop2);
      break;
      default: break;
    }
    obsTop.lifetime=2000;
    obsTopGroup.add(obsTop);
  }
}


function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obsTopGroup.destroyEach();
  score=0;
}