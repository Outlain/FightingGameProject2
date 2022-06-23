class Fighter {
    constructor({ position, velocity, color, displacement }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 180;
        this.lastKey = "";
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            displacement: displacement,
            width: 150,
            height: 50,
        };
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.isAttacking) {
            c.strokeStyle = "green";
            c.lineWidth = 8;
            c.strokeRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
    }
    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.displacement.x;
        this.attackBox.position.y = this.position.y;
        this.position.y += this.velocity.y;
        if (this.position.y > fightingCanvas.height - 300) {
            this.velocity.y = 0;
            this.position.y = fightingCanvas.height - 300;
        } else {
            this.velocity.y += globalGravity;
        }
        this.position.x += this.velocity.x;
    }
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
    // drawattackBox() {
    //     c.strokeStyle = "green"
    //     c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    // }
}
class BackgroundSprite {
    constructor({ position, ImageSrc }) {
        this.position = position;
        this.width = 50;
        this.height = 180;
        this.image = new Image();
        this.image.src = ImageSrc;
    }
    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            fightingCanvas.width,
            fightingCanvas.height
        );
    }
    update() {
        this.draw();
    }
}
class Sprite {
    constructor({ position, ImageSrc, scale = 1, framesMax = 1 }) {
        this.position = position;
        this.width = 50;
        this.height = 180;
        this.image = new Image();
        this.image.src = ImageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 3
    }
    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }
    update() {
        this.draw();
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
}
