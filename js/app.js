const game = new Game();
const gameStart = document.getElementById('begin-game');


gameStart.addEventListener('click', () =>{
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
    startGame();
});