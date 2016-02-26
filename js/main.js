window.onload = function()
{
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    // Load Resources
    function preload()
    {
        game.load.image('darkness', 'assets/pics/darkness.jpg');
        game.load.image('cloud', 'assets/pics/cloud.png');
        game.load.image('raindrop', 'assets/pics/raindrop.png');
        
        game.load.spritesheet('chara', 'assets/sprites/chara.png', 56, 75);

        
        game.load.audio('theme', 'assets/audio/Here We Are.mp3');
    }
    
    // Player Attributes
    var controls;
    var player;
    var lastDirection;
    
    // Enviorment
    var rain;
    var raindrop1;
    var raindrop2;
    var raindrop3;
    var raindrop4;
    var raindrop5;
    var raindrop6;
    
    // Sound
    var theme
    
    // Creates Game
    function create()
    {
        // Size of World
        game.world.resize(1600, 900);
        
        // Enable Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Background
        var background = game.add.image(0, 0, 'darkness');
        
        // Storm Enviorment
        stormSetup();
        
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
        rainEffects();
        playerMovements();
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
    
    // Player Setup
    function playerSetup()
    {
        // Creates the player
        player = game.add.sprite(0, game.world.height, 'chara', 1);
        
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
        else if (controls.up.isDown)
            player.body.velocity.y = -150;
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
    }
};
