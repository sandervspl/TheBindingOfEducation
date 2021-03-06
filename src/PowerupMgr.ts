import {Powerups, powerupAmount, canvas, Powerup_Flags, Theme} from "./Defines";
import {getRandomInt} from "./Globals";
import ObjectsMgr from "./ObjectsMgr";
import Powerup from "./Powerup";
import LilypadsMgr from "./LilypadsMgr";
import GameScene from "./GameScene";

export default class PowerupMgr extends ObjectsMgr
{
    private _powerupSprites: Powerup[];     // save all powerups we are keeping track of
    private _lilypadsMgr: LilypadsMgr;      // keeps track of and controls lilypads
    
    constructor(gameScene: GameScene)
    {
        var time        = Date.now(),
            timeDiffMin = 5000,         // spawn powerup between 5 and 30 seconds
            timeDiffMax = 30000;
        super(time, timeDiffMin, timeDiffMax, gameScene);
        
        this._powerupSprites = [];
        this._lilypadsMgr = null;
    }

    public getPowerupSprites():Powerup[] { return this._powerupSprites; }

    private spawn():void
    {
        var curTime = Date.now(),
            diff    = curTime - this._time;

        if (diff > this._timeDiff.min) 
        {
            var playfield = this._gameScene.getPlayfield();
            var isBeach   = playfield.getSpriteTheme(0) == Theme.THEME_BEACH ||
                            playfield.getSpriteTheme(1) == Theme.THEME_BEACH;
            
            // get a random powerup and lane ID
            var randPower = getRandomInt(1, powerupAmount),
                randLane  = (isBeach) ? getRandomInt(1, 2) : getRandomInt(0, 2);
            
            // power up information
            var sprite    = "",
                flag      = 0x0,
                duration  = 0;

            switch(randPower)
            {
                case Powerups.POWER_MAGNET:
                    sprite   = "images/box.png";
                    flag     = Powerup_Flags.FLAG_MAGNET;
                    duration = 10000;
                    break;

                case Powerups.POWER_INVULNERABLE:
                    sprite   = "images/box.png";
                    flag     = Powerup_Flags.FLAG_INVULNERABLE;
                    duration = 5000;
                    break;

                case Powerups.POWER_DOUBLE_POINTS:
                    sprite   = "images/box.png";
                    flag     = Powerup_Flags.FLAG_DOUBLE_POINTS;
                    duration = 10000;
                    break;
                
                default:
                    console.log('ERROR: randPower defaulted');
            }
            
            // create powerup
            var power = new Powerup(sprite, duration, randLane, flag);
            
            // check if we are not colliding with anything, delay spawning otherwise
            if (!this._gameScene.collisionCheck(power)) {

                // check if it needs a lilypad
                if (this._lilypadsMgr == null)
                    this._lilypadsMgr = new LilypadsMgr(this._gameScene);

                this._lilypadsMgr.spawnLilypads(power, "powerup");

                // add to array
                this._powerupSprites.push(power);

                // generate new spawn time
                this.generateRandomSpawnTime();
                this._time = curTime;
            }
        }
    }

    private updatePosition(isGameOver: boolean):void
    {
        for (var i = 0; i < this._powerupSprites.length; i += 1) {
            var p = this._powerupSprites[i];

            // update each powerup on screen
            p.update(isGameOver, this._gameScene._gameSpeed);

            // remove if we are out of screen
            if (p.getPositionY() > canvas.height) this.remove(i);
        }
    }

    // remove powerup from our array that are off screen
    private remove(index: number):void
    {
        var length = this._powerupSprites.length - 1;

        // count down because we are removing array indexes while iterating through this array
        for(var i = length; i >= 0; i -= 1) {
            if(i === index) this._powerupSprites.splice(i, 1);
        }
    }

    // set startTime to current time before we remove this object so we are able to pass it to player
    private addDespawnInfo(index: number):void
    {
        var power = this._powerupSprites[index];
        power.setStartTime();
    }

    // collision
    public collided(index: number):void
    {
        if (this._powerupSprites[index].getFlag() & Powerup_Flags.FLAG_DOUBLE_POINTS)
            this._gameScene.getFloatingScoreMgr().addFloatingScore("Dubbele Punten!");

        if (this._powerupSprites[index].getFlag() & Powerup_Flags.FLAG_INVULNERABLE)
            this._gameScene.getFloatingScoreMgr().addFloatingScore("Onsterfelijk!");

        if (this._powerupSprites[index].getFlag() & Powerup_Flags.FLAG_MAGNET)
            this._gameScene.getFloatingScoreMgr().addFloatingScore("Fruit Magneet!");
        
        this.addDespawnInfo(index);
        this.remove(index);
    }
    
    public update():void
    {
        if (!this._gameScene._gameOver)
            this.spawn();

        if (this._lilypadsMgr != null)
            this._lilypadsMgr.update(this._gameScene._gameOver);

        this.updatePosition(this._gameScene._gameOver);
    }
}