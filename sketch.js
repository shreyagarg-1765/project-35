//Create variables here
var dog, dogImg,happyDogImg,database,foodS,foodStock;

function preload()
{
	//load images here
  dogImg= loadImage("images/dogImg.png")
  happyDogImg= loadImage("images/happydogimg.png")
}

function setup() {
	createCanvas(800, 700);
  database= firebase.database();
  foodStock= database.ref("FOOD");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog= createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale=0.2;
  
}


function draw() {  
  background("green");
  
   
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }


    if(keyWentUp(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImg);
    }

    /*if(foodS ===0){
      foodS=20;
    }*/
    textSize(20);
    fill(255);
    text("Note : Press UP ARROW To Feed FUDGE Milk",50,50);
    text("Food Remaining : "+foodS, 150,150);



  
  drawSprites();
  }
  //add styles here



function writeStock(x){
  if(x<=0){
    x=20;
  }
  else{
    x=x-1;
    foodS=x;
  }
  database.ref("/").update({
    Food:x
  });
}
  
function readStock(data){
  foodS=data.val();
}


