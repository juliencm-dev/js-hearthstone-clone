class Hero{
    constructor({heroClass, playerType}){
        this.heroClass = heroClass;
        this.playerType = playerType;
        this.heroImage = `./img/heroes/hero-${this.heroClass}.png`;

        this.taunts = ["I will crush you !", "You are not prepared !", "I will be your death !", "I will hunt you"];	

    }

    buildHero(){
        const newHeroNode = document.createElement('img');

        newHeroNode.id = (this.playerType === "user" ? "user-hero" : "opponent-hero");
        newHeroNode.src = this.heroImage;

        return newHeroNode;
    }

    taunt(){
        let randomTaunt = Math.floor(Math.random() * this.taunts.length);
        return this.taunts[randomTaunt];
    }
}