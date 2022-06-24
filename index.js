const gameArea = {
    button: document.querySelector('#initializer'),
    initial: document.querySelector('.starting'),
    game: document.querySelector('.hidden'),
    startFightingGame: function () {
        this.game.classList.toggle('hidden')
        this.initial.classList.add('to-hidden')
    }
}
// console.log(Gamearea.initial)
gameArea.button.addEventListener("click", function () {
    gameArea.startFightingGame()
    // console.log(gameArea)
    decreaseTimer()
});
fightingCanvas = document.querySelector("#game-canvas");
c = fightingCanvas.getContext('2d');

fightingCanvas.width = 1400;
fightingCanvas.height = 800;
const background = new BackgroundSprite({
    position: {
        x: 0,
        y: 0
    },
    ImageSrc: './images/BackgroundNew.png'
})
const shop = new Sprite({
    position: {
        x: 555,
        y: 410,
    },
    ImageSrc: './images/shop.png',
    scale: 2.5,
    framesMax: 6,
})

let mainPlatform = '';
let bottomLeftPlatform = '';
let bottomMiddleLeftPlatform = '';
let leftPlatform = '';
let bottomRightPlatform = '';
let bottomMiddleRightPlatform = '';
let rightPlatform = '';

platformRendering()
const lefthitbox = document.querySelector('.left-side-hp');
const righthitbox = document.querySelector(".right-side-hp");
const timerLocation = document.querySelector('.middle');
const endMessage = document.querySelector('.end-message');

const globalGravity = 1

const player1 = new Fighter({
    position: {
        x: 40,
        // y: -(fightingCanvas.height - 600)
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    displacement: {
        x: 75,
        y: 70
    },
    ImageSrc: './images/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 220,
        y: 129,
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
        },
        takehit: {
            ImageSrc: './images/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4,
        },
        death: {
            ImageSrc: './images/samuraiMack/Death.png',
            framesMax: 6,
        }
    }
})
const player2 = new Fighter({
    position: {
        x: fightingCanvas.width - 80,
        // y: -(fightingCanvas.height - 400)
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    displacement: {
        x: -160,
        y: 70
    },
    ImageSrc: './images/warrior/Idle.png',
    framesMax: 10,
    scale: 3.5,
    offset: {
        x: 208,
        y: 129,
    },
    sprites: {
        idle: {
            ImageSrc: './images/warrior/Idle.png',
            framesMax: 10,
        },
        run: {
            ImageSrc: './images/warrior/Run.png',
            framesMax: 6,
        },
        jump: {
            ImageSrc: './images/warrior/Jump.png',
            framesMax: 2,
        },
        fall: {
            ImageSrc: './images/warrior/Fall.png',
            framesMax: 2,
        },
        attack1: {
            ImageSrc: './images/warrior/Attack1.png',
            framesMax: 4,
        },
        takehit: {
            ImageSrc: './images/warrior/GetHit.png',
            framesMax: 3,
        },
        death: {
            ImageSrc: './images/warrior/Death.png',
            framesMax: 9,
        }
    }

})
console.log(mainPlatform)
console.log(player1)

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
function animation() {
    c.clearRect(0, 0, fightingCanvas.width, fightingCanvas.height)
    c.fillStyle = 'black'
    c.fillRect(0, 0, fightingCanvas.width, fightingCanvas.height)
    background.update();
    mainPlatform.draw();
    bottomLeftPlatform.draw();
    bottomMiddleLeftPlatform.draw();
    leftPlatform.draw();
    bottomRightPlatform.draw();
    bottomMiddleRightPlatform.draw();
    rightPlatform.draw();
    shop.update();
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
        player1.velocity.x = -6;
        player1.spriteChange('run')
    } else if (keybugfix.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 6
        player1.spriteChange('run')
    } else {
        player1.spriteChange('idle')
    }
    // PLAYER1 JUMPING // PLAYER1 JUMPING // PLAYER1 JUMPING
    if (player1.velocity.y < -5) {
        player1.spriteChange('jump')
        // console.log(player1)
    } else if (player1.velocity.y > 2) {
        player1.spriteChange('fall')
    }
    // PLAYER TWO UPDATE MOVEMENT THROUGH BOOLEANS/IF STATEMENTS/EVENTLISTENERS
    if (keybugfix.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -6
        player2.spriteChange('run')
    } else if (keybugfix.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 6
        player2.spriteChange('run')
    } else {
        player2.spriteChange('idle')
    }
    // PLAYER1 JUMPING // PLAYER1 JUMPING // PLAYER1 JUMPING
    if (player2.velocity.y < -5) {
        player2.spriteChange('jump')
        // console.log(player1)
    } else if (player2.velocity.y > 5) {
        player2.spriteChange('fall')
    }
    // PLATFORM COLLISION
    platform(player2, mainPlatform)
    platform(player1, mainPlatform)
    platform(player1, bottomLeftPlatform)
    platform(player2, bottomLeftPlatform)
    platform(player1, bottomMiddleLeftPlatform)
    platform(player2, bottomMiddleLeftPlatform)
    platform(player1, leftPlatform)
    platform(player2, leftPlatform)
    platform(player1, bottomRightPlatform)
    platform(player2, bottomRightPlatform)
    platform(player1, rightPlatform)
    platform(player2, rightPlatform)
    platform(player1, bottomMiddleRightPlatform)
    platform(player2, bottomMiddleRightPlatform)
    // console.log(player1.position.y)
    // COLLISION DETECTION // COLLISION DETECTION // COLLISION DETECTION 
    if (boxCollision({
        box1: player1,
        box2: player2
    }) && player1.isAttacking) {
        player2.takehit()
        console.log('Beginning to understand collision detection')
        player1.isAttacking = false;
        righthitbox.style.width = player2.health + '%'
    }
    if (boxCollision({
        box1: player1,
        box2: player2
    }) && player2.isAttacking) {
        console.log('Player 2 attack detection')
        player2.isAttacking = false;
        player1.takehit()
        lefthitbox.style.width = player1.health + '%'
    }
    // END GAME // END GAME // END GAME // END GAME
    if (player1.health <= 0 || player2.health <= 0) {
        determinWhoWins({ player1, player2, timerID })
    }
    // console.log(player2.velocity.y)
    // console.log(player1)
}

animation()

window.addEventListener('keydown', function (event) {
    if (!player1.dead) {
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
                player1.velocity.y = -20
                break;
            case ' ':
                player1.attack();
                break;
        }
    }
    if (!player2.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keybugfix.ArrowRight.pressed = true
                player2.lastKey = 'ArrowRight'
                break;
            case 'ArrowLeft':
                keybugfix.ArrowLeft.pressed = true
                player2.lastKey = 'ArrowLeft'
                break;
            case 'ArrowUp':
                player2.velocity.y = -20
                break;
            case 'k':
                player2.attack();
                // player2.isAttacking = true
                break;
        }
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
