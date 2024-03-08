(function(){
    'use strict';

    // JS overlay
    const openBtns = document.querySelectorAll('.open');
    const closeBtns = document.querySelectorAll('.close');

    for(const eachOpenBtn of openBtns) {
        eachOpenBtn.addEventListener('click', function(event){
            event.preventDefault();
            
            const thisBtn = event.target.id;
        
            document.querySelector(`#ol-${thisBtn}`).className = 'overlay showing';
        });
    }

    for(const eachCloseBtn of closeBtns) {
        eachCloseBtn.addEventListener('click', function(event){
            event.preventDefault();

            // only one overlay showing at a time
            document.querySelector('.showing').className = 'overlay hidden';
        });
    }

    document.addEventListener('keydown', function(event){
        if(event.key == "Escape"){
            document.querySelector('.showing').className = 'overlay hidden';
        }
    });
    // end of JS overlay 

    // JS for game
    let gameControl = document.querySelector('#game-control1');
    let startGame = document.querySelector('#start-game');
    let game = document.querySelector('#game');
    let pig1Score = document.querySelector('#pig1-score');
    let pig2Score = document.querySelector('#pig2-score');
    let actionArea = document.querySelector('#actions');

    // keeping track of game data
    let gameData = {
        dice: [
            '1die.png', 
            '2die.png', 
            '3die.png', 
            '4die.png', 
            '5die.png', 
            '6die.png'
        ],
        players: ['player 1', 'player 2'],
        score: [0,0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    startGame.addEventListener('click', function(){
        // display game control 2
        document.querySelector('#game-control2').style.display = "flex";

        document.querySelector('#quit-yes').addEventListener('click', function(){
            // refreshes the page
            location.reload();
        });

        // randomly set game index here
        // index will be either 0 or 1
        gameData.index = Math.round(Math.random());
        console.log(gameData.index)

        document.querySelector('#game-play').style.display = "flex";
        gameControl.style.display = "none";

        setUpTurn();
    });

    function setUpTurn() {
        game.innerHTML = `<h2>roll the dice for ${gameData.players[gameData.index]}</h2>`;
        actionArea.innerHTML = '<button id="roll">roll the dice!</button>';

        document.getElementById('roll').addEventListener('click', function(){
            throwDice();
            const rollSound = new Audio('sounds/roll.mp3');
            rollSound.play();
            rollSound.volume = 0.5;
        });

        // play roll dice mp3
        const startSound = new Audio('sounds/start.mp3');
        startSound.play();
        startSound.volume = 0.5;
    }

    function throwDice() {
        // clear out action area
        actionArea.innerHTML = '';
        // using ceil could result in a zero
        // random generates a random value between 0-1 (inclusive to 0 but not inclusive to 1)
        // rounding down and adding a 1 to get random values between 1-6
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        game.innerHTML = `<h2>roll the dice for ${gameData.players[gameData.index]}</h2>`;
        game.innerHTML += `<img src=images/${gameData.dice[gameData.roll1-1]}>
                            <img src=images/${gameData.dice[gameData.roll2-1]}>`;

        console.log(gameData);

        if(gameData.rollSum === 2) {
            // switch player
            game.innerHTML += '<h3 class="message">WOMP WOMP ur dead! switching turns !!</h3>';

            // zero out the score
            gameData.score[gameData.index] = 0;

            // set up turn for the next player
            // ternary operator 
            // evaluate whether gameData.index is true (gameData.index is either 0(false) or 1(true))
            // if it is a 1, set index to 0 and if it is a 0, set index to 1
            // could use an if else statement
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            // show the current score...
            showCurrentScore();
            setTimeout(setUpTurn, 3000);
        }
        else if(gameData.roll1 === 1 || gameData.roll2 === 1) {
            // switch player
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<h3 class="message">sorry :< you rolled a skull! switching to ${gameData.players[gameData.index]}</h3>`;

            // set up turn
            setTimeout(setUpTurn, 3000);
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">roll again</button> <button id="pass">Pass</button>';

            // Add padding to increase the clickable area
            document.getElementById('rollagain').style.padding = '20px';
            document.getElementById('pass').style.padding = '20px';

            document.getElementById('rollagain').addEventListener('click', function() {
                throwDice();
                // play roll dice mp3
                const rollSound = new Audio('sounds/roll.mp3');
                rollSound.play();
                rollSound.volume = 0.5;
            });

            document.getElementById('pass').addEventListener('click', function() {
                // swap player then set up the turn
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            // check to see if the player won
            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            showCurrentScore();
            // play winning sound
            const winSound = new Audio('sounds/win.mp3');
            setTimeout(winSound.play(), 2000);
            winSound.volume = 0.2;

            game.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            
            let quitBtn = document.querySelector('#quit');

            quitBtn.innerHTML = "new game";
            quitBtn.style.animation = "blinker 2s linear infinite";

            quitBtn.addEventListener('click', function(){
                // refreshes the page
                location.reload();
                const startSound = new Audio('sounds/start.mp3');
                setTimeout(startSound.play(), 2000);
                startSound.volume = 0.2;
            });

        }
        else {
            // update the score
            showCurrentScore();
        }
    }

    function showCurrentScore() {
        pig1Score.innerHTML = `Score: ${gameData.score[0]}`;
        pig2Score.innerHTML = `Score: ${gameData.score[1]}`;
    }
})();
