
    var score = 0;

    var world = [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,2,2,2,1,2,1,1,1,1,2,2,2,2,1,2],
        [2,1,1,1,2,2,1,2,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,2,0,0,0,2,1,2,2,2,1,2],
        [2,2,2,2,1,1,0,2,2,2,2,2,1,2,2,2,1,2],
        [2,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,2],
        [2,1,2,2,1,2,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,2,1,1,1,2,2,1,1,2,2,1,1,2],
        [2,1,2,2,1,1,1,1,1,2,2,1,1,2,2,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    ];

    var pacman = {
        x: 6,
        y: 5,
        life_count: 1
    };
    var blinky = {
        x: 9,
        y: 4
    }
    var cherries = {
        x: 10,
        y: 4
    }
    var pacmanUnit = document.getElementById('pacman');
    var blinkyUnit = document.getElementById('blinky');

    function displayWorld(){
        var output = '';
        for(i = 0; i<world.length; i++){  //each row
            output += '\n<div class="row">\n';
            for(j = 0; j<world[i].length;j++){  //each space within row
                if(world[i][j] == 2){
                    output += '<div class="brick"></div>';
                }
                else if(world[i][j] == 1){
                    output += '<div class="coin"></div>';
                }
                else if(world[i][j] == 1.5){
                    output += '<div class="cherries"></div>';
                }
                if(world[i][j] == 0){
                    output += '<div class="empty"></div>';
                }
                // output = output + world[i][j];
            }
            output += '\n</div>'
        }
        document.getElementById('world').innerHTML = output;
    }

    function displayPacman(){
        document.getElementById('pacman').style.top = pacman.y * 20 + 'px';
        document.getElementById('pacman').style.left = pacman.x * 20 + 'px';
    };
    function displayBlinky(){
        document.getElementById('blinky').style.top = blinky.y * 20 + 'px';
        document.getElementById('blinky').style.left = blinky.x * 20 + 'px';
    };
    function displayCherries(){
        document.getElementById('cherries').style.visibility = 'visible';
        document.getElementById('cherries').style.top = cherries.y * 20 + 'px';
        document.getElementById('cherries').style.left = cherries.x * 20 + 'px';
        if(world[cherries.y][cherries.x] == 0){
            world[cherries.y][cherries.x] = 1.5;
            console.log(world[cherries.y][cherries.x]);
        };
    };
    function displayScore(){
        document.getElementById('score').innerHTML = score;
    };
    function dead(){
        if(!alert('Your Pacman has perished!')){window.location.reload();}
    }

    displayWorld();
    displayPacman();    // initial pacman display - keep in mind that it needs to be displayed AGAIN for each onkeydown
    displayBlinky();
    // displayCherries();
    displayScore();



    document.onkeydown = function(e){
        if(e.keyCode == 37 && world[pacman.y][pacman.x-1] < 2){
            // reference:  document.getElementById('pacman').style.left = 50 + 'px';   below is the more better technique
            pacman.x --;
            pacmanUnit.style.webkitTransform = "rotate(180deg)";
        }
        else if(e.keyCode == 39 && world[pacman.y][pacman.x+1] < 2){  //  ** remember '==' is a getter
            pacman.x ++;
            pacmanUnit.style.webkitTransform = "rotate(0deg)";
        }
        else if(e.keyCode == 38 && world[pacman.y-1][pacman.x] < 2){  //  ** remember '==' is a getter
            pacman.y --;
            pacmanUnit.style.webkitTransform = "rotate(-90deg)";
        }
        else if(e.keyCode == 40 && world[pacman.y+1][pacman.x] < 2){  //  ** remember '==' is a getter
            pacman.y ++;
            pacmanUnit.style.webkitTransform = "rotate(90deg)";
        }
        if(world[pacman.y][pacman.x] == 1){
            world[pacman.y][pacman.x] = 0;
            displayWorld();
            score += 10;
            displayScore();
        };
        if(world[pacman.y][pacman.x] == 1.5){
            world[pacman.y][pacman.x] = 0;
            document.getElementById('cherries').style.background = 'none';
            displayWorld();
            score += 50;
            displayScore();
        };
        var pacloc = pacman.y + "," + pacman.x;
        var blinkyloc = blinky.y + "," + blinky.x;
        if(pacloc == blinkyloc){
            document.getElementById('life_count').innerHTML = '0';
            document.getElementById('pacman').style.background = 'none';
            setTimeout(dead, 400);
        }
        displayPacman();
    };

    setTimeout(displayCherries, 6000);

// *********   Start ghost testing  *************
    // function startTimer(){};

    setInterval(BlinkyMove, 1000);

    // setTimeout(BlinkyMove, 1000);
    //
    function BlinkyMove(){
        // for(bi = 0; bi < 2; bi++){
            if(world[blinky.y][blinky.x-1] < 2){
                blinky.x--;
                displayBlinky();
            };
    //         if(world[blinky.y][blinky.x-1] == 2){
    //             // BlinkyMoveUP();
    //             console.log('collision: to my left');
    //             // blinky.y--;
    //             displayBlinky();
    //         };
    //         if(world[blinky.y-1][blinky.x] < 2){
    //             // BlinkyMoveUP();
    //             console.log('collision: above');
    //             blinky.y--;
    //             displayBlinky();
    //         };
        // };
    };





// var x = Math.floor((Math.random() * 4) + 1);
