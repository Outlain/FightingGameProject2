const fightingCanvas = document.querySelector("#game-canvas");
const c = fightingCanvas.getContext('2d');

fightingCanvas.width = 1400;
fightingCanvas.height = 800;
const background = new BackgroundSprite({
    position: {
        x: 0,
        y: 0
    },
    ImageSrc: './images/background.png'
})
const shop = new Sprite({
    position: {
        x: 830,
        y: 360,
    },
    ImageSrc: './images/shop.png',
    scale: 2.5,
    framesMax: 6,
})
const lefthitbox = document.querySelector('.left-side-hp');
const righthitbox = document.querySelector(".right-side-hp");
const timerLocation = document.querySelector('.middle');
const endMessage = document.querySelector('.end-message');

const globalGravity = 1

const player1 = new Fighter({
    position: {
        x: 0,
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
    },
    ImageSrc: './images/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 135,
    },
    sprites: {
        idle: {
            ImageSrc: './images/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            ImageSrc: './images/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            ImageSrc: './images/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            ImageSrc: './images/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            ImageSrc: './images/samuraiMack/Attack1.png',
            framesMax: 6,
        }

    }
})
const player2 = new Fighter({
    position: {
        x: fightingCanvas.width - 300,
        // y: -(fightingCanvas.height - 400)
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    displacement: {
        x: -100,
        y: 0
    },
    ImageSrc: './images/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 135,
    },
    sprites: {
        idle: {
            ImageSrc: './images/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            ImageSrc: './images/samuraiMack/Run.png',
            framesMax: 8,
        },
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
decreaseTimer()
function animation() {
    c.clearRect(0, 0, fightingCanvas.width, fightingCanvas.height)
    c.fillStyle = 'black'
    c.fillRect(0, 0, fightingCanvas.width, fightingCanvas.height)
    background.update();
    shop.update();
    window.requestAnimationFrame(animation);
    // console.log("fighting animation frames running")
    player1.update()
    // player2.update()
    // console.log(player1.position.y)
    // console.log(player2.position.y)

    player1.velocity.x = 0
    player2.velocity.x = 0
    // PLAYER ONE UPDATE MOVEMENT THROUGH BOOLEANS/IF STATEMENTS/EVENTLISTENERS
    if (keybugfix.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -6;
        player1.spriteChange('run')
    } else if (keybugfix.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 6
        player1.spriteChange('run')
    } else {
        player1.spriteChange('idle')
    }
    if (player1.velocity.y < -1) {
        player1.spriteChange('jump')
        console.log(player1)
    } else if (player1.velocity.y > 2) {
        player1.spriteChange('fall')
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
            player1.velocity.y = -25
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
            player2.velocity.y = -25
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
