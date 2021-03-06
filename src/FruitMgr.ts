import {fruitAmount, Theme} from './Defines'
import {getRandomInt} from './Globals'
import FruitGroup from './FruitGroup'
import ObjectsMgr from "./ObjectsMgr";
import GameScene from "./GameScene";

export default class FruitMgr extends ObjectsMgr
{
    private _fruitGroups: FruitGroup[];     // save all fruit groups we are keeping track of
    
    constructor(gameScene: GameScene)
    {
        var time = Date.now(),
            timeDiffMin = 1000,
            timeDiffMax = 2000;
        super(time, timeDiffMin, timeDiffMax, gameScene);
        
        this._fruitGroups = [];
    }
    
    public getFruitGroups():FruitGroup[] { return this._fruitGroups; }
    
    private spawn(forceSpawn:boolean = false):void
    {
        var curTime = Date.now(),
            diff    = curTime - this._time;

        // check if it is time to spawn a new group
        if (diff > this.getNextSpawnTime() || forceSpawn) {
            var playfield = this._gameScene.getPlayfield();
            var isBeach   = playfield.getSpriteTheme(0) == Theme.THEME_BEACH ||
                            playfield.getSpriteTheme(1) == Theme.THEME_BEACH;

            // get a random fruit and lane ID
            var randFruit = getRandomInt(1, fruitAmount),
                randLane  = (isBeach) ? getRandomInt(1, 2) : getRandomInt(0, 2);

            var group = new FruitGroup(randFruit, randLane, this._gameScene),
                fruit = group.getFruitSprites()[0];

            // check if we are not colliding with anything, delay spawning otherwise
            if (!this._gameScene.collisionCheck(fruit)) {
                this._fruitGroups.push(group);

                this.generateRandomSpawnTime();
                this._time = curTime;
            }
        }
    }

    // remove groups from out fruits array if they have no more fruits in them
    private remove(index):void
    {
        var length = this._fruitGroups.length - 1;

        // count down because we are removing array indexes while iterating through this array
        for(var i = length; i >= 0; i -= 1) {
            if(i === index) { this._fruitGroups.splice(i, 1); }
        }
    }
    
    private updateGroups():void
    {
        var length = this._fruitGroups.length - 1;
        
        // count down because we are removing array indexes while iterating through this array
        for(var i = length; i >= 0; i -= 1) {
            var group = this._fruitGroups[i];
            
            // remove groups that have no more fruits in them
            if (group.getGroupSize() <= 0) {
                this.remove(i);
                continue;
            }

            group.update(this._gameScene._gameOver);
        }
    }

    public update():void
    {
        if (!this._gameScene._gameOver)
            this.spawn();
        
        this.updateGroups();
    }
}