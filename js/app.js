const game = new Game();
const gameStart = document.getElementById('begin-game');


gameStart.addEventListener('click', (e) => {
    game.startGame();
    e.target.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
    
});