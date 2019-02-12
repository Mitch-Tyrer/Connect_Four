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
     * starts the game
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }
}