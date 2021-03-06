// debug hitbox markers
export var 
    DEBUG_SHOW_PLAYER_HITBOX  = 0,
    DEBUG_SHOW_ENEMY_HITBOX   = 0,
    DEBUG_SHOW_FRUIT_HITBOX   = 0,
    DEBUG_SHOW_POWERUP_HITBOX = 0,
    DEBUG_SHOW_MAGNET_HITBOX  = 1,
    DEBUG_SHOW_MOUNT_HITBOX   = 0;

// debug marker styling
export var DEBUG_COLOR        = "#fb31fd",  // purple/pink
           DEBUG_STROKE_WIDTH = 3;

// canvas 
export var canvas = <HTMLCanvasElement> document.getElementById('canvas');
export var ctx: CanvasRenderingContext2D = canvas.getContext('2d');

// player animation states
export enum Animation_State {
    ANIM_RUNNING = 0,
    ANIM_JUMPING
}

// background theme/level ID
export var themesCount = 4;
export enum Theme {
    THEME_FORREST           = 0,
    THEME_RIVER,
    THEME_SNOW,
    THEME_BEACH
}

// Lane ID
export enum Lane {
    LANE_LEFT = 0,
    LANE_MIDDLE,
    LANE_RIGHT
}

// X-axis position of lanes which can be grabbed with a Lane ID
export var Lane_Position = [
    510,
    640,
    760
];

// amount of different enemies and enemy ID
export var enemiesAmount = 5;
export enum Enemies {
    ENEMY_HAMBURGER = 1,
    ENEMY_PIZZA,
    ENEMY_PANCAKE,
    ENEMY_DONUT,
    ENEMY_HOTDOG
}

// amount of different fruits and fruit ID
export var fruitAmount = 7;
export enum Fruits {
    FRUIT_BANANA = 1,
    FRUIT_APPLE,
    FRUIT_WATERMELON,
    FRUIT_TANGERINE,
    FRUIT_CHERRY,
    FRUIT_PINEAPPLE,
    FRUIT_STRAWBERRY
}

// points per fruit type
export var FruitPoints: number[] = [
    0,
    10,  // banana
    30,  // apple
    15,  // watermelon
    50,  // tangerine
    5,   // cherry
    100, // ananas
    25,  // strawberry
];

export var powerupAmount = 3;
export enum Powerups {
    POWER_MAGNET = 1,
    POWER_INVULNERABLE,
    POWER_DOUBLE_POINTS
}

// danger level of oil
export enum Cooking_Oil_State {
    STATE_LOW = 0,
    STATE_HIGH
}

export enum Powerup_Flags {
    FLAG_NONE          = 0x0,
    FLAG_DOUBLE_POINTS = 0x1,
    FLAG_MAGNET        = 0x2,
    FLAG_INVULNERABLE  = 0x4
}