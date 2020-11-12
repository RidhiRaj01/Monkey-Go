var PLAY=1;
var END=0
var gameState=PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var ground,invisibleGround;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,200);
  
  
  ground=createSprite(200,180,800,20);
  
  invisibleGround=createSprite(200,180,800,1);
  invisibleGround.visible = false;
  
  monkey=createSprite(50,160,20,50);
  monkey.addAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey.scale=0.1
  
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  
  score=0;
  
  //monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 // monkey.debug=true;
}


function draw() {
 background(255);
  text("score:"+ score,500,50);
  
  if(gameState === PLAY){
    
    if(keyDown("space")) {
      monkey.velocityY = -12;
      
    }
    
    if (obstaclesGroup.isTouching(monkey)){
      gameState=END;
      
    }    
    
    if (bananaGroup.isTouching(monkey)){
      banana.destroyEach();
    }
    
   monkey.velocityY = monkey.velocityY + 0.8;
    
   //ground.velocityX=-4;
    score=score + Math.round(frameCount/60);
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
    spawnBanana();
    
    spawnObstacles();
  }
  
  if(gameState === END){
    ground.velocityX=0;
    monkey.velocityY=0;
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
   // monkey.changeImage("sprite_7.png");
    text("Game Over!",300,300);
  }
  
 monkey.collide(invisibleGround);

  
  drawSprites();
}

function spawnBanana(){
  if (frameCount % 90 === 0){
    var banana = createSprite(600,120,40,10);
    banana.y=Math.round(random(50,120));
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-3;
    banana.lifetime=210;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle=createSprite(600,165,10,40);
    obstacle.velocityX=-4;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.1;
    obstaclesGroup.add(obstacle);
  }
  
}






