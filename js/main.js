window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload()
    {   
        game.load.image('darkness', 'assets/pics/darkness.jpg');
        game.load.image('raindrop', 'assets/pics/raindrop.png');
        
        game.load.audio('theme', 'assets/audio/Here We Are.mp3');
    }
    
    var player;
    var background;
    var rain;
    var raindrop1;
    var raindrop2;
    var raindrop3;
    
    var theme
    
    function create()
    {
        // Background
        background = game.add.image(0, 0, 'darkness');
        
        // Enable Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Rain
        rain = game.add.group();
        
        // Rain Physics Enable
        rain.enableBody = true;
        
        // Raindrop
        raindrop1 = rain.create(60, 0, 'raindrop');
        raindrop1.body.gravity.y = 2000;
        raindrop2 = rain.create(660, 0, 'raindrop');
        raindrop2.body.gravity.y = 1000;
        raindrop3 = rain.create(420, 0, 'raindrop');
        raindrop3.body.gravity.y = 500;
        
        // Music
        theme = game.add.audio('theme');
        theme.play();
    }
    
    function update()
    {
        var randNum = game.rnd.realInRange(0, 14);
        
        // Adds Rain    
        if (raindrop1.y > game.world.centerY)
        {
            raindrop1 = rain.create(randNum * 60, 0, 'raindrop');
            raindrop1.body.gravity.y = 2000;
        }
        if (raindrop2.y > game.world.centerY)
        {
            raindrop2 = rain.create(randNum * 60, 0, 'raindrop');
            raindrop2.body.gravity.y = 1000;
        }
        if (raindrop3.y > game.world.centerY)
        {
            raindrop3 = rain.create(randNum * 60, 0, 'raindrop');
            raindrop3.body.gravity.y = 500;
        }
    }
};
