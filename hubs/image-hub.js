/**
 * Sprite and UI image paths used across the game.
 * @readonly
 */
const IMAGES = {
    START_SCREEN: "assets/img/9_intro_outro_screens/start/startscreen_1.png",
    END_SCREEN_BG: "assets/img/5_background/first_half_background.png",
    END_WIN: "assets/img/You won, you lost/You win B.png",
    END_LOSE: "assets/img/You won, you lost/You lost b.png",

    BG_AIR: "assets/img/5_background/layers/air.png",
    BG_THIRD_1: "assets/img/5_background/layers/3_third_layer/1.png",
    BG_THIRD_2: "assets/img/5_background/layers/3_third_layer/2.png",
    BG_SECOND_1: "assets/img/5_background/layers/2_second_layer/1.png",
    BG_SECOND_2: "assets/img/5_background/layers/2_second_layer/2.png",
    BG_FIRST_1: "assets/img/5_background/layers/1_first_layer/1.png",
    BG_FIRST_2: "assets/img/5_background/layers/1_first_layer/2.png",
    CLOUD_1: "assets/img/5_background/layers/4_clouds/1.png",

    CHARACTER_WALKING: [
        "assets/img/2_character_pepe/2_walk/W-21.png",
        "assets/img/2_character_pepe/2_walk/W-22.png",
        "assets/img/2_character_pepe/2_walk/W-23.png",
        "assets/img/2_character_pepe/2_walk/W-24.png",
        "assets/img/2_character_pepe/2_walk/W-25.png",
        "assets/img/2_character_pepe/2_walk/W-26.png",
    ],
    CHARACTER_JUMPING: [
        "assets/img/2_character_pepe/3_jump/J-31.png",
        "assets/img/2_character_pepe/3_jump/J-32.png",
        "assets/img/2_character_pepe/3_jump/J-33.png",
        "assets/img/2_character_pepe/3_jump/J-34.png",
        "assets/img/2_character_pepe/3_jump/J-35.png",
        "assets/img/2_character_pepe/3_jump/J-36.png",
        "assets/img/2_character_pepe/3_jump/J-37.png",
        "assets/img/2_character_pepe/3_jump/J-38.png",
        "assets/img/2_character_pepe/3_jump/J-39.png",
    ],
    CHARACTER_DEAD: [
        "assets/img/2_character_pepe/5_dead/D-51.png",
        "assets/img/2_character_pepe/5_dead/D-52.png",
        "assets/img/2_character_pepe/5_dead/D-53.png",
        "assets/img/2_character_pepe/5_dead/D-54.png",
        "assets/img/2_character_pepe/5_dead/D-55.png",
        "assets/img/2_character_pepe/5_dead/D-56.png",
        "assets/img/2_character_pepe/5_dead/D-57.png",
    ],
    CHARACTER_HURT: [
        "assets/img/2_character_pepe/4_hurt/H-41.png",
        "assets/img/2_character_pepe/4_hurt/H-42.png",
        "assets/img/2_character_pepe/4_hurt/H-43.png",
    ],
    CHARACTER_IDLE: [
        "assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ],
    CHARACTER_SLEEPING: [
        "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ],

    CHICKEN_NORMAL_WALKING: [
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ],
    CHICKEN_NORMAL_DEAD:
        "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",

    CHICKEN_SMALL_WALKING: [
        "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ],
    CHICKEN_SMALL_DEAD:
        "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png",

    BOTTLE_ON_GROUND: [
        "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ],

    COIN: [
        "assets/img/8_coin/coin_1.png",
        "assets/img/8_coin/coin_2.png",
    ],

    ICON_SALSA_BOTTLE:
        "assets/img/7_statusbars/3_icons/icon_salsa_bottle.png",

    STATUS_BAR_HEALTH: [
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ],
    STATUS_BAR_COIN: [
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ],
    STATUS_BAR_BOTTLE: [
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    ],
    STATUS_BAR_BOSS: [
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ],

    ENDBOSS_ALERT: [
        "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ],
    ENDBOSS_HURT: [
        "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ],
    ENDBOSS_DEAD: [
        "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ],
};
