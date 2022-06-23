const fightingCanvas = document.querySelector("#game-canvas");
const c = fightingCanvas.getContext('2d');

fightingCanvas.width = 1400;
fightingCanvas.height = 800;

const lefthitbox = document.querySelector('.left-side-hp');
const righthitbox = document.querySelector(".right-side-hp");
const timerLocation = document.querySelector('.middle');
const endMessage = document.querySelector('.end-message');
// function left() {
//     // lefthitbox.style.width = '90%'
//     // righthitbox.style.width = '50%'

// }
// left();

const globalGravity = 2
function boxCollision({ box1, box2 }) {
    return (
        box1.attackBox.position.x + box1.attackBox.width >= box2.position.x && box1.attackBox.position.x <= box2.position.x + box2.width && box1.attackBox.position.y + box1.attackBox.height >= box2.position.y && box1.attackBox.position.y <= box2.position.y + box2.height
    )
}
class FutureSpriteAnimation {
    constructor({ position, velocity, color, displacement }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50
        this.height = 180
        this.lastKey = '';
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            displacement: displacement,
            width: 150,
            height: 50,
        }
        this.color = color
        this.isAttacking = false;
        this.health = 100
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (this.isAttacking) {
            c.strokeStyle = "green"
            c.lineWidth = 8;
            c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.displacement.x
        this.attackBox.position.y = this.position.y
        this.position.y += this.velocity.y
        if (this.position.y > fightingCanvas.height - 200) {
            this.velocity.y = 0
            this.position.y = fightingCanvas.height - this.height
        } else {
            this.velocity.y += globalGravity
        }
        this.position.x += this.velocity.x
    }
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
    // drawattackBox() {
    //     c.strokeStyle = "green"
    //     c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    // }
}
const player1 = new FutureSpriteAnimation({
    position: {
        x: 500,
        // y: -(fightingCanvas.height - 600)
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    displacement: {
        x: 0,
        y: 0
    }
})
const player2 = new FutureSpriteAnimation({
    position: {
        x: fightingCanvas.width - 500,
        // y: -(fightingCanvas.height - 400)
        y: 40
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    displacement: {
        x: -100,
        y: 0
    }

})
const keybugfix = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
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
let timer = 100
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

decreaseTimer()
function animation() {
    c.clearRect(0, 0, fightingCanvas.width, fightingCanvas.height)
    c.fillStyle = 'black'
    c.fillRect(0, 0, fightingCanvas.width, fightingCanvas.height)
    window.requestAnimationFrame(animation);
    // console.log("fighting animation frames running")
    player1.update()
    player2.update()
    // console.log(player1.position.y)
    // console.log(player2.position.y)

    player1.velocity.x = 0
    player2.velocity.x = 0
    // PLAYER ONE UPDATE MOVEMENT THROUGH BOOLEANS/IF STATEMENTS/EVENTLISTENERS
    if (keybugfix.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -6
    } else if (keybugfix.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 6
    }
    // PLAYER TWO UPDATE MOVEMENT THROUGH BOOLEANS/IF STATEMENTS/EVENTLISTENERS
    if (keybugfix.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -6
    } else if (keybugfix.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 6
    }
    // COLLISION DETECTION // COLLISION DETECTION // COLLISION DETECTION 
    if (boxCollision({
        box1: player1,
        box2: player2
    }) && player1.isAttacking) {
        console.log('Beginning to understand collision detection')
        player1.isAttacking = false;
        player2.health -= 2
        righthitbox.style.width = player2.health + '%'
    }
    if (boxCollision({
        box1: player1,
        box2: player2
    }) && player2.isAttacking) {
        console.log('Player 2 attack detection')
        player2.isAttacking = false;
        player1.health -= 2
        lefthitbox.style.width = player1.health + '%'
    }
    // END GAME // END GAME // END GAME // END GAME
    if (player1.health <= 0 || player2.health <= 0) {
        determinWhoWins({ player1, player2, timerID })
    }
}

animation()

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'd':
            keybugfix.d.pressed = true
            player1.lastKey = 'd'
            break;
        case 'a':
            keybugfix.a.pressed = true
            player1.lastKey = 'a'
            break;
        case 'w':
            player1.velocity.y = -30
            break;
        case ' ':
            player1.attack();
            break;
        case 'ArrowRight':
            keybugfix.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keybugfix.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            player2.velocity.y = -30
            break;
        case 'ArrowDown':
            player2.attack();
            // player2.isAttacking = true
            break;
    }
})
window.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'd':
            keybugfix.d.pressed = false
            break;
        case 'a':
            keybugfix.a.pressed = false
            break;
        case 'w':
            keybugfix.w.pressed = false
            break;
        case 'ArrowRight':
            keybugfix.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keybugfix.ArrowLeft.pressed = false
            break;
        case 'ArrowUp':
            keybugfix.ArrowUp.pressed = false
            break;
    }
})