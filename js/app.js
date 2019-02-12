const gameStart = document.getElementById('begin-game');

new Game();

gameStart.addEventListener('click', () =>{
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
    startGame();
});