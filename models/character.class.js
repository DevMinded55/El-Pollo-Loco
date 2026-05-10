/**
 * @class Character
 * Playable entity: movement, gravity, animation state, camera coupling.
 */
class Character extends MovableObject {
    height = 280;
    y = 155;
    speed = 10;
    world;
    offsetX = 20;
    offsetY = 100;
    offsetWidth = 30;
    offsetHeight = 15;

    IMAGES_WALKING = IMAGES.CHARACTER_WALKING;
    IMAGES_JUMPING = IMAGES.CHARACTER_JUMPING;
    IMAGES_DEAD = IMAGES.CHARACTER_DEAD;
    IMAGES_HURT = IMAGES.CHARACTER_HURT;
    IMAGES_IDLE = IMAGES.CHARACTER_IDLE;
    IMAGES_SLEEPING = IMAGES.CHARACTER_SLEEPING;

    lastActionTime = Date.now();

    /** Loads sprite strips, gravity, and animation loops. */
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

    /** Registers movement and animation {@link addGameInterval} ticks. */
    animate() {
        addGameInterval(() => this.movementTick(), 1000 / 60);
        addGameInterval(() => this.animationTick(), 150);
    }

    /** Input, sounds, camera per simulation step. */
    movementTick() {
        this.applyHorizontalMovement();
        this.applyJumpIfGrounded();
        this.updateRunSoundState();
        this.world.camera_x = -this.x + 100;
    }

    /** Arrow keys: move within level bounds and update facing. */
    applyHorizontalMovement() {
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
    }

    /** Space/up jump from ground; plays jump sound. */
    applyJumpIfGrounded() {
        const wantsJump = this.world?.keyboard?.UP || this.world?.keyboard?.SPACE;
        if (!wantsJump || this.isAboveGround()) return;
        this.jump();
        playSound("CHARACTER_JUMP");
        this.lastActionTime = Date.now();
    }

    /** Looped run sound only when walking on the ground. */
    updateRunSoundState() {
        if (this.isWalking() && !this.isAboveGround()) {
            playSound("CHARACTER_RUN");
        } else {
            stopSound("CHARACTER_RUN");
        }
    }

    /** Chooses sprite strip from life / hurt / air / ground state. */
    animationTick() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.lastActionTime = Date.now();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.pickIdleOrWalkAnimation();
        }
    }

    /** Idle, walk, or long-sleep animation when grounded and not hurt. */
    pickIdleOrWalkAnimation() {
        if (this.isWalking()) {
            this.playAnimation(this.IMAGES_WALKING);
            stopSound("CHARACTER_SNORING");
            return;
        }
        if (this.isSleeping()) {
            this.playAnimation(this.IMAGES_SLEEPING);
            playSound("CHARACTER_SNORING");
            return;
        }
        this.playAnimation(this.IMAGES_IDLE);
        stopSound("CHARACTER_SNORING");
    }

    /** @returns {boolean} left or right key held */
    isWalking() {
        return this.world?.keyboard?.RIGHT || this.world?.keyboard?.LEFT;
    }

    /** @returns {boolean} inactive long enough for long-idle / snore */
    isSleeping() {
        return Date.now() - this.lastActionTime > 15000;
    }

    /** Zero energy, death anim/sounds, then lose screen. */
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
