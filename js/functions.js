function boxCollision({ box1, box2 }) {
    return (
        box1.attackBox.position.x + box1.attackBox.width >= box2.position.x && box1.attackBox.position.x <= box2.position.x + box2.width && box1.attackBox.position.y + box1.attackBox.height >= box2.position.y && box1.attackBox.position.y <= box2.position.y + box2.height
    )
}

function determinWhoWins({ player1, player2, timerID }) {
    clearTimeout(timerID)
    if (player1.health === player2.health) {
        endMessage.innerHTML = "Tie"
        endMessage.style.display = 'flex'
    } else if (player1.health > player2.health) {
        endMessage.innerHTML = "Player1 Wins!"
        endMessage.style.display = 'flex'
    } else if (player1.health < player2.health) {
        endMessage.innerHTML = "Player2 Wins!"
        endMessage.style.display = 'flex'
    }
}
let timer = 300
let minutes = 0;
let seconds = 0;
timerID = '';
function decreaseTimer() {
    minutes = Math.floor(timer / 60);
    seconds = timer - (minutes * 60);
    timerID = setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--
        timerLocation.innerHTML = `${minutes}:${(seconds)}`
    }
    if (timer === 0) {
        determinWhoWins({ player1, player2, timerID })
    }
}
function platform(player, platform) {
    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x &&player.position.x < platform.position.x + platform.dimension.width) {
        player.velocity.y = 0 
    }
}

function platformRendering() {
    mainPlatform = new Platform({
        position: {
            x: fightingCanvas.width/2 - 225,
            y: 250,
        },
        dimension: {
            width: 500,
            height: 20,
        }
    })
    bottomLeftPlatform = new Platform({
        position: {
            x: fightingCanvas.width/4 -200,
            y: 575,
        },
        dimension: {
            width: 100,
            height: 13,
        }
    })
    bottomMiddleLeftPlatform = new Platform({
        position: {
            x: fightingCanvas.width/4 + 100,
            y: 575,
        },
        dimension: {
            width: 100,
            height: 13,
        }
    })
    leftPlatform = new Platform({
        position: {
            x: fightingCanvas.width/4 -50,
            y: 425,
        },
        dimension: {
            width: 100,
            height: 13,
        }
    })
    bottomRightPlatform = new Platform({
        position: {
            x: ((fightingCanvas.width/4) * 3) + 100,
            y: 575,
        },
        dimension: {
            width: 100,
            height: 13,
        }
    })
    bottomMiddleRightPlatform = new Platform({
        position: {
            x: ((fightingCanvas.width/4) * 3) - 200,
            y: 575,
        },
        dimension: {
            width: 100,
            height: 13,
        }
    })
    rightPlatform = new Platform({
        position: {
            x: ((fightingCanvas.width/4) * 3) - 50,
            y: 425,
        },
        dimension: {
            width: 100,
            height: 13,
        }
    })
}