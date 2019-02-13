class Space {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `space-${x}-${y}`;
        this.token = null;
        this.diameter = 76;
        this.radius = this.diameter / 2;
        
    }

    drawSVGSpace() {
        const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svgSpace.setAttributeNS(null, "id", this.id);
        svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "r", this.radius - 8);
        svgSpace.setAttributeNS(null, "fill", "black");
        svgSpace.setAttributeNS(null, "stroke", "none");
        document.getElementById("mask").appendChild(svgSpace);   

    }

    /**
     * Updates space to show a token has been dropped in it
     * @param {Object} token - the dropped token
     */
    mark(token) {
        this.token = token;
    }
    /**
     * checks if space for owner of the token in it
     * @return {(null|Object)} returns null or the owner object
     */
    get owner () {
        if(this.token !== null){
            return this.token.owner;
        } else {
            return null;
        }
    }

    

}
