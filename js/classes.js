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
    constructor({
        position,
        ImageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
    }) {
        this.position = position;
        this.width = 50;
        this.height = 180;
        this.image = new Image();
        this.image.src = ImageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 3;
        this.offset = offset;
    }
    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }

    framesCalculator() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }
    update() {
        this.draw();
        this.framesElapsed++;
        this.framesCalculator();
    }
}
class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color,
        displacement,
        ImageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites
    }) {
        super({
            position,
            ImageSrc,
            scale,
            framesMax,
            offset,
        });
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
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 3;
        this.sprites = sprites

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].ImageSrc
        }
        console.log(this.sprites)
    }
    update() {
        this.draw();
        this.framesElapsed++;
        this.framesCalculator();
        this.attackBox.position.x = this.position.x + this.attackBox.displacement.x;
        this.attackBox.position.y = this.position.y + this.attackBox.displacement.y;
        c.strokeStyle = "green"
        c.lineWidth = '10'
        c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        c.strokeRect(this.position.x, this.position.y, this.width, this.height)

        this.position.y += this.velocity.y;
        if (this.position.y > fightingCanvas.height - 260) {
            this.velocity.y = 0;
            // this.position.y = fightingCanvas.height - 299;
        } else {
            this.velocity.y += globalGravity;
        }
        this.position.x += this.velocity.x;
        // console.log(this.position.y)
        // console.log(this.velocity.y)
    }
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
        this.spriteChange('attack1')
    }
    spriteChange(sprite) {
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1)
            return;
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image)
                    this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                // this.framesCurrent = 0
                break;
            case 'run':
                if (this.image !== this.sprites.run.image)
                    this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                // this.framesCurrent = 0
                break;
            case 'jump':
                (this.image !== this.sprites.jump.image)
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
                break;
            case 'fall':
                (this.image !== this.sprites.fall.image)
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.framesCurrent = 0
                break;
            case 'attack1':
                (this.image !== this.sprites.attack1.image)
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.framesCurrent = 0
                break;
        }
    }
    // drawattackBox() {
    //     c.strokeStyle = "green"
    //     c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    // }
}
