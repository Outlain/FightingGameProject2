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
    decreaseTimer()
});
fightingCanvas = document.querySelector("#game-canvas");
c = fightingCanvas.getContext('2d');
let framescount = 0
let ravensArray = [];
let OwlsArray = [];
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
        x: 635,
        y: 515,
    },
    ImageSrc: './images/shop.png',
    scale: 1.5,
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
        x: 23,
        // y: -(fightingCanvas.height - 600)
        y: 42
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    displacement: {
        x: 60,
        y: 70
    },
    ImageSrc: './images/Armor/_Idle.png',
    framesMax: 10,
    scale: 3.3,
    offset: {
        x: 155,
        y: 90,
    },
    sprites: {
        idle: {
            ImageSrc: './images/Armor/_Idle.png',
            framesMax: 10,
        },
        run: {
            ImageSrc: './images/Armor/_Run.png',
            framesMax: 10,
        },
        jump: {
            ImageSrc: './images/Armor/_Jump.png',
            framesMax: 3,
        },
        fall: {
            ImageSrc: './images/Armor/_Fall.png',
            framesMax: 3,
        },
        attack1: {
            ImageSrc: './images/Armor/_Attack.png',
            framesMax: 4,
        },
        takehit: {
            ImageSrc: './images/Armor/_Hit.png',
            framesMax: 1,
        },
        death: {
            ImageSrc: './images/Armor/_Death.png',
            framesMax: 10,
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
    ImageSrc: './images/warrior/_Idle.png',
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
// let initialRaven = new ravens()
// setInterval(() => {
//     framescount ++
// }, 2000);
ravensSource = '../images/RavensFix.png'
owlsSource = '../images/owls fix.png'
platformRockImg = '../images/floating-platform-spritesheet.png'
let bottomLeftRock = new PlatformClass(platformRockImg, 4, {
    x: 135,
    y: 490,
})
let bottomMiddleLeftRock = new PlatformClass(platformRockImg, 4, {
    x: 445,
    y: 490,
})
let leftRock = new PlatformClass(platformRockImg, 4, {
    x: 285,
    y: 340,
})
let bottomRightRock = new PlatformClass(platformRockImg, 4, {
    x: 1145,
    y: 490,
})
let bottomMiddleRightRock = new PlatformClass(platformRockImg, 4, {
    x: 835,
    y: 490,
})
let rightRock = new PlatformClass(platformRockImg, 4, {
    x: 985,
    y: 340,
})
let mainRock = new MainPlatform(platformRockImg, 4, {
    x: 425,
    y: 75,
})
function animation() {
    framescount++
    if (framescount % 60 == 0) {
        ravensArray.push(new Ravens(ravensSource, 9))
    }
    if (framescount % 300 == 0) {
        OwlsArray.push(new Owls(owlsSource, 6))
    }
    c.clearRect(0, 0, fightingCanvas.width, fightingCanvas.height)
    c.fillStyle = 'black'
    c.fillRect(0, 0, fightingCanvas.width, fightingCanvas.height)
    background.update();
    mainPlatform.draw();
    mainRock.update();
    bottomLeftPlatform.draw();
    bottomMiddleLeftPlatform.draw();
    leftPlatform.draw();
    bottomRightPlatform.draw();
    bottomMiddleRightPlatform.draw();
    rightPlatform.draw();
    bottomLeftRock.update()
    bottomMiddleLeftRock.update();
    leftRock.update();
    bottomRightRock.update();
    bottomMiddleRightRock.update();
    rightRock.update();
    shop.update();
    // INITIALIZING AND ANIMATING RAVENS
    ravensArray.forEach(object => object.update())
    ravensArray = ravensArray.filter(object => !object.deleted);
    console.log(ravensArray)
    // INITIALIZING AND ANIMATING OWLS
    OwlsArray.forEach(object => object.update())
    OwlsArray = OwlsArray.filter(object => !object.deleted); window.requestAnimationFrame(animation);
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
