let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userPattern = [];
let gameStarted = false;
let level = 0;
let playerTurn = false;

//press button
$(".start-btn").click(function() {
    if(!gameStarted) {
        gameStarted = true;
        $("h1").html("Level " + level);
        nextSequence();
        playerTurn = true;
        $(".start-btn").hide();
    }
});

//click
$(".btn").on("click", function() {
    if(gameStarted && playerTurn){
        let userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);
        
        animatePress(userChosenColor);
        if(!checkAnswer(userPattern.length - 1)){
            let wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            $("h1").html("Game Over! Press start to play again");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            restart();
            $(".start-btn").show();
            return;
        }
        playSound(userChosenColor);
        if(userPattern.length === level){
            playerTurn = false;
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userPattern = [];
        }
    }

});

function restart(){
    gameStarted = false;
    userPattern = [];
    gamePattern = [];
    level = 0;
    playerTurn = false;
}
function checkAnswer(index){
    if(gamePattern[index] === userPattern[index]){
        return true;
    }
    return false;
}

function nextSequence() {
    randomNum = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").html("Level " + level);
    playerTurn = true;
}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}