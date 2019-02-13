class Game {
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false
    } 

     /**
     * starts the game
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

      /**
     * Returns active player
     * @return {Object} player - the players who turn it is.
     */
    get activePlayer() {
        return this.players.find(player => player.isTurn);
    }

    /**
     * create 2 players
     * @return {array} An array of the 2 player objects
     */

    createPlayers(){
        const players = [new Player ('player 1', 1, '#e15258', true), 
                        new Player ('player 2', 2, '#e59a13')]
        return players;
    }



    /**
     * keydown handler, branches code depending on what key is press
     * @param {Object} e - keydown event object
     */
	handleKeydown(e) {
        if (this.ready) {
            if (e.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === "ArrowDown") {
                this.playToken();
            }
        }
    }

    playToken() {
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetCol = spaces[activeToken.columnLocation];
        let targetSpace = null;
        let gameState = this;

        for(let space of targetCol){
            if(space.token === null){
                targetSpace = space;
            }
        }
        if (targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace, ()=> {
                gameState.updateGameState(activeToken, targetSpace);
            });
        }
    }
    /**
     * switches active player
     */
    switchPlayers(){
        this.players.forEach(player => {
            if(player.isTurn === false){
                player.isTurn = true;
            } else {
                player.isTurn = false;
            }
        });
    }

    checkForWin(target) {
        const owner = target.token.owner;
        let win = false;

        //vertical
        for (let x =0; x < this.board.columns; x++){
            for(let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x][y + 1].owner === owner &&
                    this.board.spaces[x][y + 2].owner === owner &&
                    this.board.spaces[x][y + 3].owner === owner) {
                        win = true;
                    }
            }
        }
        //horizontal
        for (let x =0; x < this.board.columns -3 ; x++){
            for(let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x + 1][y].owner === owner &&
                    this.board.spaces[x + 2][y].owner === owner &&
                    this.board.spaces[x + 3][y].owner === owner) {
                        win = true;
                    }
            }
        }
        // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x-1][y+1].owner === owner && 
                this.board.spaces[x-2][y+2].owner === owner && 
                this.board.spaces[x-3][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 3; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x-1][y-1].owner === owner && 
                this.board.spaces[x-2][y-2].owner === owner && 
                this.board.spaces[x-3][y-3].owner === owner) {
                    win = true;
            }           
        }
    }

    return win;
}
    /**
     * displays game over
     * @param {string} message - game over message
     */
    gameOver(message){
        const endGame = document.getElementById('game-over');
        endGame.style.display = 'block';
        endGame.textContent = message;
    }
     /** 
    * Updates game state after token is dropped. 
    * @param   {Object}  token  -  The token that's being dropped.
    * @param   {Object}  target -  Targeted space for dropped token.
    */
    updateGameState(token, target) {
        target.mark(token);
        if(!this.checkForWin(target)){
            this.switchPlayers();
            if(this.activePlayer.checkTokens()){
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver("No more tokens");
            }
        } else {
            this.gameOver(`${target.owner.name} wins!`);
        }
    }
}