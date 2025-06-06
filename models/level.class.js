class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    coins;
    bottles;
    endboss;

    constructor() {
        this.enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss()
        ];
        this.clouds = [
            new Cloud()
        ];
        this.backgroundObjects = [
            new BackgroundObject("assets/img/5_background/layers/air.png",-719),
            new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", -719),
            new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png",-719),
            new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png",-719),
            new BackgroundObject("assets/img/5_background/layers/air.png",0),
            new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png",0),
            new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png",0),
            new BackgroundObject("assets/img/5_background/layers/air.png",719),
            new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 719),
            new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png",719),
            new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png",719),
            new BackgroundObject("assets/img/5_background/layers/air.png",1438),
            new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", 1438),
            new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png",1438),
            new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png",1438),
            new BackgroundObject("assets/img/5_background/layers/air.png",2157),
            new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", 2157),
            new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png",2157),
            new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png",2157)
        ];
        this.coins = [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ];
        this.bottles = [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles()
        ];
        this.endboss = this.enemies.find(enemy => enemy instanceof Endboss);
    }
}