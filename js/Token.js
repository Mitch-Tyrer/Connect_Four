class Token {
    constructor(index, owner) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.played = false;
        this.columnLocation = 0;
    }

    /** 
    * Gets associated htmlToken.
    * @return  {element}   Html element associated with token object.
    */
    get htmlToken() {
        return document.getElementById(this.id);
    }

    drawHTMLToken() {
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    /**
     * gets left offset of html element
     * @return {string} left offset of token object
     */
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }
    /**
     * Moves token one column left
     */
    moveLeft() {
        if (this.columnLocation > 0) {
           this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        }
    }
    /** 
    * Moves html token one column to right.
    * @param   {number}    columns - number of columns in the game board
    */
    moveRight(columns) {
        if(this.columnLocation < columns - 1){
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }
    /**
     * drops the token into the targeted board space
     * @param {object} target - Targeted space for dropped token
     * @param {function} reset - reset callback after the drop animation
     */
    drop(target, reset) {
        this.played = true;
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}