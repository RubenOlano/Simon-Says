let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []
let gameStarted = false;
let level = 0;

$(document).on("keydown", function(){
    if (!gameStarted){
        gameStarted = true;
        $("h1").text("Level 0")
        nextSequence()
    }
})

function nextSequence(){
    userPattern = []
    level++;
    $("h1").text(`Level ${level}`)
    let randomColor = buttonColors[Math.floor(Math.random() * 4)]
    playSound(randomColor)
    gamePattern.push(randomColor)
    animatePress(randomColor)
}

function playSound(name) {
    let colorSound = new Audio(`sounds/${name}.mp3`)
    colorSound.play();
}

$(".btn").on('click', function (){
    let userColor = $(this).attr("id")
    playSound(userColor)
    animatePress(userColor)
    userPattern.push(userColor)
    checkAnswer(userPattern.length - 1)
})

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if (userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    } else{
        let wrong = new Audio("sounds/wrong.mp3")
        wrong.play()
        $("body").addClass("game-over")
        setTimeout(function (){
            $("body").removeClass("game-over");
    }, 200)
        $("h1").text("Game Over. Press any key to restart")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = []
    gameStarted = false
}