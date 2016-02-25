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
        game.load.image( 'logo', 'assets/phaser.png' );
        
        game.load.image('darkness', 'assets/pics/darkness.jpg');
        game.load.image('raindrop', 'assets/pics/raindrop.png');
        
        game.load.audio('theme', 'assets/audio/Here We Are.mp3');
    }
    
    var player;
    var background;
    var rain;
    
    var theme
    
    function create()
    {
        // Background
        background = game.add.image(0, 0, 'darkness');
        
        // Enable Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Player
        player = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        player.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;
        
        // Rain
        rain = game.add.group();
        game.physics.enable(rain, Phaser.Physics.ARCADE);
        
        // Adds Rain
        for (var i = 0; i < 7; i++)
        {
            // Adds Raindrop
            var raindrop = rain.create(i * 50, 0, 'raindrop');
            
            // Raindrop falls
            raindrop.body.gravity.y = 300;
        }
        
        // Music
        theme = game.add.audio('theme');
        theme.play();
    }
    
    function update()
    {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        player.rotation = game.physics.arcade.accelerateToPointer( player, this.game.input.activePointer, 500, 500, 500 );
    }
};
