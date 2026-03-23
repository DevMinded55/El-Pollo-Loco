class Character extends MovableObject {
    height = 280;
    y = 155;
    speed = 10;
    world;

    IMAGES_WALKING = IMAGES.CHARACTER_WALKING;
    IMAGES_JUMPING = IMAGES.CHARACTER_JUMPING;
    IMAGES_DEAD = IMAGES.CHARACTER_DEAD;
    IMAGES_HURT = IMAGES.CHARACTER_HURT;
    IMAGES_IDLE = IMAGES.CHARACTER_IDLE;
    IMAGES_SLEEPING = IMAGES.CHARACTER_SLEEPING;

    lastActionTime = Date.now();

    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        addGameInterval(() => {
            if (this.world?.keyboard?.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.lastActionTime = Date.now();
            }

            if (this.world?.keyboard?.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.lastActionTime = Date.now();
            }

            if ((this.world?.keyboard?.UP || this.world?.keyboard?.SPACE) && !this.isAboveGround()) {
                this.jump();
                playSound("CHARACTER_JUMP");
                this.lastActionTime = Date.now();
            }

            if (this.isWalking() && !this.isAboveGround()) {
                playSound("CHARACTER_RUN");
            } else {
                stopSound("CHARACTER_RUN");
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        addGameInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.lastActionTime = Date.now();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.isWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
                stopSound("CHARACTER_SNORING");
            } else if (this.isSleeping()) {
                this.playAnimation(this.IMAGES_SLEEPING);
                playSound("CHARACTER_SNORING");
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                stopSound("CHARACTER_SNORING");
            }
        }, 150);
    }

    isWalking() {
        return this.world?.keyboard?.RIGHT || this.world?.keyboard?.LEFT;
    }

    isSleeping() {
        return (Date.now() - this.lastActionTime) > 15000;
    }

    die() {
        this.energy = 0;
        this.playAnimation(this.IMAGES_DEAD);
        stopSound("CHARACTER_RUN");
        stopSound("CHARACTER_SNORING");
        playSound("CHARACTER_DEAD");

        setTimeout(() => {
            showEndScreen(false);
        }, 1000);
    }
}
