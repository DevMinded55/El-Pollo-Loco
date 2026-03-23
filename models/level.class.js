class Level {
    enemies = Level.createEnemies();
    clouds  = [
            new Cloud()
        ];
    backgroundObjects  = [
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
    level_end_x = 2200;
    coins  = Level.spread(5, 400, 1900).map(x => new Coins(x));
    bottles = Level.spread(4, 300, 1800).map(x => new Bottles(x));
    endboss;

    static createEnemies() {
        const positions = Level.spread(6, 400, 1900);
        const enemies = [
            new Chicken(positions[0]),
            new Chicken(positions[1]),
            new Chicken(positions[2]),
            new SmallChicken(positions[3]),
            new SmallChicken(positions[4]),
            new SmallChicken(positions[5]),
            new Endboss()
        ];
        return enemies;
    }

    static spread(count, min, max) {
        const gap = (max - min) / (count - 1);
        const jitter = gap * 0.3;
        const positions = [];
        for (let i = 0; i < count; i++) {
            const base = min + i * gap;
            const offset = (Math.random() - 0.5) * 2 * jitter;
            positions.push(Math.round(base + offset));
        }
        return positions;
    }
}