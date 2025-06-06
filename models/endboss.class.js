class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    dead = false;
    hurt = false;
    isBoss = true;

    IMAGES_WALKING = [
        "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
    IMAGES_HURT = [
        "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "assets/img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];
    IMAGES_DEAD = [
        "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "assets/img/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2200;
        this.energy = 100;
        this.dead = false;
        this.hurt = false;
        this.animate();
    }

    animate() {
        addGameInterval(() => {
            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.hurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 5);
    }

    hit() {
        if (this.dead) return;
        this.energy -= 25;
        if (this.energy < 0) this.energy = 0;

        this.hurt = true;

        setTimeout(() => {
            this.hurt = false;
        }, 500);

        if (this.energy === 0) {
            this.die();
        }

        console.log("Endboss wurde getroffen!");
    }

    die() {
        this.dead = true;
        this.hurt = false;

        setTimeout(() => {
            showEndScreen(true); // Spieler gewinnt
        }, 1000);
    }

    isDead() {
        return this.dead;
    }

    isHurt() {
        return this.hurt;
    }
}
