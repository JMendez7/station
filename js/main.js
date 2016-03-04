window.onload = function()
{
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    // Load Resources
    function preload()
    {
        // Background
        game.load.image('darkness', 'assets/pics/darkness.jpg');
        
        // Enviorment
        game.load.image('cloud', 'assets/pics/cloud.png');
        game.load.image('raindrop', 'assets/pics/raindrop.png');
        game.load.image('door', 'assets/pics/door.jpg');
        
        // Characters
        game.load.image('ground', 'assets/pics/ground.png');
        game.load.image('box', 'assets/pics/box.png');
        
        game.load.spritesheet('chara', 'assets/sprites/chara.png', 56, 75);
        game.load.spritesheet('zombie', 'assets/sprites/zombie.png', 90, 105, 5);

        // Music
        game.load.audio('theme', 'assets/audio/Here We Are.mp3');
        game.load.audio('gotcha', 'assets/audio/Nyeh Heh Heh!.mp3');
    }
    
    // Player Attributes
    var controls;
    var player;
    var lastDirection;
    
    // Zombie Attributes
    var zombie;
    var zombieText;
    
    // Zombie/Player Reltionships
    var spawn = 0;
    
    // Dice
    var box;
    var boxDown = 0;
    
    // Enviorment
    var surface;
    var surface;
    var rain;
    var raindrop1;
    var raindrop2;
    var raindrop3;
    var raindrop4;
    var raindrop5;
    var raindrop6;
    
    // Sound
    var theme;
    var gotcha;
    
    // Creates Game
    function create()
    {   
        // Size of World
        game.world.resize(1600, 900);
        
        // Enable Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Background
        var background = game.add.image(0, 0, 'darkness');        
                
        // Surface
        surface()
        
        // Storm Enviorment
        stormSetup();
        
        // Door Setup
        door();
        
        // Player Setup
        playerSetup();        
        
        // Keyboard controls
        controls = game.input.keyboard.createCursorKeys();

        
        // Music
        theme = game.add.audio('theme');
        theme.play();
    }
    
    // Updates Game
    function update()
    {
        game.physics.arcade.collide(player, surface);
        
        // Zombie Interactions
        game.physics.arcade.collide(zombie, surface);
        
        // Box Interactions
        game.physics.arcade.collide(box, surface);
        game.physics.arcade.collide(player, box);
        
        rainEffects();
        playerMovements();
        zombieMovements();
        escape();
    }
    
    // Surface
    function surface()
    {
        surface = game.add.group();
        surface.enableBody = true;        
        
        var floor;
        floor = surface.create(0, game.world.height - 100, 'ground');
        floor.body.immovable = true;
        floor = surface.create(885, game.world.height - 100, 'ground');
        floor.body.immovable = true;
    }
    
    // Rain Enviorment
    function stormSetup()
    {   
        // Clouds
        var clouds = game.add.group();
        for (var i = 0; i < 4; i++)
            var cloud = clouds.create(i * 600, 0, 'cloud');
        
        // Rain
        rain = game.add.group();
        
        // Rain Physics Enable
        rain.enableBody = true;
        
        // Raindrops
        var rainY = 218;
        
        raindrop1 = rain.create(10, rainY, 'raindrop');
        raindrop1.body.gravity.y = 1000;
        raindrop2 = rain.create(320, rainY, 'raindrop');
        raindrop2.body.gravity.y = 1000;
        raindrop3 = rain.create(640, rainY, 'raindrop');
        raindrop3.body.gravity.y = 1000;
        raindrop4 = rain.create(960, rainY, 'raindrop');
        raindrop4.body.gravity.y = 1000;
        raindrop5 = rain.create(1280, rainY, 'raindrop');
        raindrop5.body.gravity.y = 1000;
        raindrop6 = rain.create(1590, rainY, 'raindrop');
        raindrop6.body.gravity.y = 1000;
        
    }
    
    // Rain Effects
    function rainEffects()
    {   
        var randNum = 0;
        var rainY = 218;
        
        if (raindrop1.y > (game.world.centerY)/2)
        {
            randNum = game.rnd.realInRange(0, 10); 
            raindrop1 = rain.create((randNum * 30) + 10, rainY, 'raindrop');
            raindrop1.body.gravity.y = 1000;
        }
        if (raindrop2.y > (game.world.centerY)/2)
        {
            randNum = game.rnd.realInRange(0, 10); 
            raindrop2 = rain.create((randNum * 30) + 300, rainY, 'raindrop');
            raindrop2.body.gravity.y = 1000;
        }
        if (raindrop3.y > (game.world.centerY)/2)
        {
            randNum = game.rnd.realInRange(0, 10); 
            raindrop3 = rain.create((randNum * 30) + 600, rainY, 'raindrop');
            raindrop3.body.gravity.y = 1000;
        }
        if (raindrop4.y > (game.world.centerY)/2)
        {
            randNum = game.rnd.realInRange(0, 10); 
            raindrop4 = rain.create((randNum * 30) + 900, rainY, 'raindrop');
            raindrop4.body.gravity.y = 1000;
        }
        if (raindrop5.y > (game.world.centerY)/2)
        {
            randNum = game.rnd.realInRange(0, 10); 
            raindrop5 = rain.create((randNum * 30) + 1200, rainY, 'raindrop');
            raindrop5.body.gravity.y = 1000;
        if (raindrop6.y > (game.world.centerY)/2)
        {
            randNum = game.rnd.realInRange(0, 13); 
            raindrop6 = rain.create((randNum * 30) + 1500, rainY, 'raindrop');
            raindrop6.body.gravity.y = 1000;
        }
        }
    }
    
    // Door Spawn
    function door()
    {
        // Doors
        var doors = game.add.group();
        var door = doors.create(game.world.width - 100, 300, 'door');
    }
    
    // Player Setup
    function playerSetup()
    {
        // Creates the player
        player = game.add.sprite(0, game.world.height - 171, 'chara', 1);
        
        // Player's Physics
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 250;
        
        // Player's Movements
        player.animations.add('left', [11, 10, 9, 8]);
        player.animations.add('right', [4, 5, 6, 7]);
        
        game.camera.follow(player);
    }
    
    // Player's Movement Control
    function playerMovements()
    {   
        // Initial Velocity
        player.body.velocity.x = 0;
        
        // Horizontal Movements
        if (controls.left.isDown)
        {
            player.body.velocity.x = -200;  
            player.animations.play('left', 5, true);            
            game.camera.x -= 4;
            
            lastDirection = 1;
        }
        else if (controls.right.isDown)
        {
            player.body.velocity.x = 200;            
            player.animations.play('right', 5, true);            
            game.camera.x +- 4;
            
            lastDirection = 2;
        }        
        // Vertical Movements
        else if (controls.down.isDown)
        {
            player.frame = 1;
            
            lastDirection = 3;
        }
        else
        {
            player.animations.stop();
            if (lastDirection == 1)
                player.frame = 10;
            else if (lastDirection == 2)
                player.frame = 5;
            else if (lastDirection == 3)
                player.frame = 1;
        }
        
        if (controls.up.isDown && player.body.touching.down)
        {
            if (lastDirection == 1)
                player.frame = 10;
            else if (lastDirection == 2)
                player.frame = 5;
            else if (lastDirection == 3)
                player.frame = 1;
            
            player.body.velocity.y = -350;
        }
    }
    
    // Zombie Setup
    function zombieSetup()
    {
        // Creates the player
        zombie = game.add.sprite(1500, game.world.height - 550, 'zombie', 15);
        
        // Player's Physics
        game.physics.arcade.enable(zombie);
        zombie.body.gravity.y = 250;
        
        // Player's Movements
        zombie.animations.add('left', [1, 2, 3]);
    }
    
    // Zombie Movement
    function zombieMovements()
    {
        // Spawn Zombie
        if (player.x > 1200 && spawn == 0)
        {
            zombieSetup();
            
            // Die Text
            var text = "Die!";
            var style = { font: "55px Arial", fill: "#16882c", align: "center" };
            zombieText = game.add.text(1150, 300, text, style);
            
            spawn = 1;
        }
        else if (spawn == 1)
        {
            // Zombie walks after touching the ground.
            if(zombie.body.touching.down)
            {                
                zombieText.destroy();
                
                zombie.body.velocity.x = -150;
                zombie.animations.play('left', 5, true);
            }
            // Disables wall boundaries once the player and zombie are close to the begging of game.
            else if(zombie.x < 0 && player.x > 10 && player.x < 100)
            {
                player.body.collideWorldBounds = false;
                spawn = 2;
            }
        }
        // Enables Walls if player decides to not follow zombie.
        if (player.x > 200 && spawn == 2 && boxDown == 0)
        {
            player.body.collideWorldBounds = true;
            zombie.kill();
            spawn = 2;
        }
        // Teleports player and spawns dice if he decides to follow the zombie.
        else if(player.x < 0 && boxDown == 0 && spawn == 2)
        {
            player.x = 585;
            player.y = 0;
            
            boxSpawn();
            player.body.collideWorldBounds = true;
            boxDown = 1;
            
            theme.pause();
            
            gotcha = game.add.audio('gotcha');
            gotcha.play();
        }
        else if(spawn == 2 && boxDown == 1)
        {
            if(box.x < 200)
            {
                box.body.collideWorldBounds = false;
                spawn = 0;
                boxDown = 0;
                
                gotcha.destroy();
                theme.restart();
            }
        }
        // Resets Everything.
        else if(game.physics.arcade.collide(player, zombie))
        {
            zombie.kill();
            zombieText.destroy();
            theme.restart();
            player.x = 0;
            player.y = game.world.height - 185;
            spawn = 0;
            boxDown = 0;
        }
    }
    
    // Spawns Box
    function boxSpawn()
    {
        // Creates the box
        box = game.add.sprite(585, 110, 'box');
        
        // Box's Physics
        game.physics.arcade.enable(box);
        box.body.collideWorldBounds = true;
        box.body.gravity.y = 100;
    }
    
    // Escpae
    function escape()
    {
        if(player.x > 1500 && player.y < 400 && box.body.touching.down)
        {
            var text = "You did it!";
            var style = { font: "55px Arial", fill: "#16882c", align: "center" };
            zombieText = game.add.text(1150, 300, text, style);
            
            text = "Die. Get it?";
            zombieText = game.add.text(1150, 400, text, style);
            
            text = "I'll see myself out.";
            zombieText = game.add.text(1150, 500, text, style);
            
            player.kill();
        }
    }
};
