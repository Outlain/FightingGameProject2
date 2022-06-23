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

    // console.log(minutes)
}