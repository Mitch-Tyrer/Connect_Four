class Game {
    constructor(){
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false
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

        for(let space of targetCol){
            if(space.token === null){
                targetSpace = space;
            }
        }
        if (targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace);
        }
    }
  
    /**
     * starts the game
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }
}