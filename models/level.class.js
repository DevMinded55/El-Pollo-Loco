/**
 * Level data: backgrounds, enemies, coins, bottles, end position.
 */
class Level {
    enemies = Level.createEnemies();
    clouds  = [
            new Cloud()
        ];
    backgroundObjects  = [
            new BackgroundObject(IMAGES.BG_AIR,-719),
            new BackgroundObject(IMAGES.BG_THIRD_2, -719),
            new BackgroundObject(IMAGES.BG_SECOND_2,-719),
            new BackgroundObject(IMAGES.BG_FIRST_2,-719),
            new BackgroundObject(IMAGES.BG_AIR,0),
            new BackgroundObject(IMAGES.BG_THIRD_1, 0),
            new BackgroundObject(IMAGES.BG_SECOND_1,0),
            new BackgroundObject(IMAGES.BG_FIRST_1,0),
            new BackgroundObject(IMAGES.BG_AIR,719),
            new BackgroundObject(IMAGES.BG_THIRD_2, 719),
            new BackgroundObject(IMAGES.BG_SECOND_2,719),
            new BackgroundObject(IMAGES.BG_FIRST_2,719),
            new BackgroundObject(IMAGES.BG_AIR,1438),
            new BackgroundObject(IMAGES.BG_THIRD_1, 1438),
            new BackgroundObject(IMAGES.BG_SECOND_1,1438),
            new BackgroundObject(IMAGES.BG_FIRST_1,1438),
            new BackgroundObject(IMAGES.BG_AIR,2157),
            new BackgroundObject(IMAGES.BG_THIRD_2, 2157),
            new BackgroundObject(IMAGES.BG_SECOND_2,2157),
            new BackgroundObject(IMAGES.BG_FIRST_2,2157)
        ];
    level_end_x = 2200;
    coins  = Level.spread(5, 400, 1900).map(x => new Coins(x));
    bottles = Level.spread(4, 300, 1800).map(x => new Bottles(x));
    endboss;

    /**
     * @returns {MovableObject[]}
     */
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

    /**
     * @param {number} count
     * @param {number} min
     * @param {number} max
     * @returns {number[]}
     */
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