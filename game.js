let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    // console.log(userClickedPattern);
    // console.log(gamePattern);
    // console.log(currentLevel);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    let id = "#" + currentColour;
    $(id).addClass("pressed");
    setTimeout(() => {
        $(id).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    //console.log(randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    //console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);

    //animatePress(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
}

$(document).keypress(() => {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click((e) => {
    let userChosenColor = e.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    //console.log(index);

    let index = buttonColours.indexOf(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    //console.log(e.currentTarget.class);
    //console.log(e.currentTarget);
});

// console.log(gamePattern);
// nextSequence();
// console.log(gamePattern);
// nextSequence();
// console.log(gamePattern);
// nextSequence();
// console.log(gamePattern);
// nextSequence();
// console.log(gamePattern);
