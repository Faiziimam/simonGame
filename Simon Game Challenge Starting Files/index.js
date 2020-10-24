// this is random colors
var buttonColor=["red","blue","green","yellow"]
//this is to store the random color 
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keypress(function () {
  if(!started){
  $("#level-title").text("level"+level); 
  nextSequence();
  started=true;  
}
});

$(".btn").click(function(){
  var userColorChosen=$(this).attr("id");
  userClickedPattern.push(userColorChosen);

  playSound(userColorChosen);
  animatePress(userColorChosen);

  checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
     setTimeout(function () {
       nextSequence();
     }, 1000);  
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press any key to Restart")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
      startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+ level);
 //this is random number Generator
var randomNumber=Math.floor(Math.random()*4);
// here,created one variable while will generate random color from buttonColor array
var randmColorChosen=buttonColor[randomNumber];
//here i am pushing the generated color in an array
gamePattern.push(randmColorChosen);
//to add blinking animation
$("#"+randmColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randmColorChosen);
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout( function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//to add audio
 function playSound(name){
   var audio = new Audio("sounds/"+name+".mp3");
   audio.play();
}

function startOver(){ 
  level=0;
  gamePattern=[];
  started=false;
 }