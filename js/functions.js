function boxCollision({ box1, box2 }) {
    return (
        box1.attackBox.position.x + box1.attackBox.width >= box2.position.x && box1.attackBox.position.x <= box2.position.x + box2.width && box1.attackBox.position.y + box1.attackBox.height >= box2.position.y && box1.attackBox.position.y <= box2.position.y + box2.height
    )
}

function determinWhoWins({ player1, player2, timerID }) {
    clearTimeout(timerID)
    if (player1.health === player2.health) {
        console.log("tie")
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

let timer = 10000
timerID = '';
function decreaseTimer() {
    timerID = setTimeout(decreaseTimer, 100)
    if (timer > 0) {
        timer--
        timerLocation.innerHTML = timer
    }
    if (timer === 0) {
        determinWhoWins({ player1, player2, timerID })
    }
}