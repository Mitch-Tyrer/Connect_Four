class Player {
    constructor(name, id, color, isTurn = false){
        this.name = name;
        this.id = id;
        this.color = color;
        this.isTurn = isTurn;
        this.tokens = this.createTokens(21);
    }
   /**
     * Creates token objects for player
     * @param   {integer}   num - Number of token objects to be created
     * @return  {array}     tokens - an arary of new token objects
     */
    createTokens(num) {
        const tokens = [];
        
        for (let i = 0; i < num; i++) {
            let token = new Token(i, this);
            tokens.push(token);
        }
        
        return tokens;
    }
    /**
     * Gets all Tokens that have not been played
     * @return {array} array of unused tokens
     */
    get unusedTokens() {
        return this.tokens.filter(token => !token.played);
    }

    /**
     * Gets the active token from the first element in the unused tokens array
     * @return {Object} first token object in the array of unused tokens
     */
    get activeToken() {
        return this.unusedTokens[0];
    }
    /**
    * Check if a player has any undropped tokens left
    * @return {Boolean} 
    */
    checkTokens() {
        return this.unusedTokens.length === 0 ? false : true;
    }

}