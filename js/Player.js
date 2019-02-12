class Player {
    constructor(name, id, color, isTurn = false){
        this.name = name;
        this.id = id;
        this.color = color;
        this.isTurn = isTurn;
        this.tokens = this.createTokens(21);
    }
    /**
     * Creates token objects for players
     * @param {integer} num - number of token objects to be created
     */

    createTokens(num){
        let tokens = [];
        for (let i = 0; i < num; i++){
            tokens.push(new Token(this, i));
        }
        return tokens;
    }
}