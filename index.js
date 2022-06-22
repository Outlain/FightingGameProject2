const fightingCanvas = document.querySelector("#game-canvas");
const c = fightingCanvas.getContext('2d')

fightingCanvas.width = 1200;
fightingCanvas.height = 800;

c.fillRect(0,0,fightingCanvas.width, fightingCanvas.height)

class Sprite {
    constructor(position){
        this.position = position;
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50,150)
    }
}

const player = new Sprite({
    x:0,
    y:0
})
player.draw()
console.log(player)