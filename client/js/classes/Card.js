class Card{

    constructor({id, uid, atk, baseHP, cost, mechanics}){

        this.id = id;
        this.uid = uid;
     
        this.cardFrame = "url(./img/card-assets/card-frame.png)";
        this.minionImage = `./img/card-assets/minions/minion-img-${((this.id % 34) + 1)}.png`;
        
        this.cost = cost;
        this.atk = atk;
        this.baseHP = baseHP;
        this.hp = this.baseHP;
        this.mechanics = mechanics;

    }

    buildCard(fieldType){

        const newCardNode = document.createElement('div');
        const newCardFrameNode = document.createElement('div');
        const newAtkNode = document.createElement('div');
        const newHpNode = document.createElement('div');
        const newCostNode = document.createElement('div');
        const newTextNode = document.createElement('div');
        const newAttributeNode = document.createElement('div');
        const newCardTextNode = document.createElement('div');
        const newCardImageNode = document.createElement('img');

        newCardNode.className = "carte-wrapper";

        newCardFrameNode.className = "carte-frame";
        newCardFrameNode.style.backgroundImage = this.cardFrame;

        newCardImageNode.className = "minion-image";
        newCardImageNode.src = this.minionImage;

        newAtkNode.className = "attack";
        newAtkNode.textContent = this.atk;

        newHpNode.className = "card-hp";
        newHpNode.textContent = this.baseHP;

        newCostNode.className = "card-cost";
        newCostNode.textContent = this.cost;

        newTextNode.className = "card-text-wrapper";

        let cardAttribute = ""
        let cardText = ""

        for (let i = 0 ; i < this.mechanics.length ; i++){
            let currentMechanic = this.mechanics[i];

            if (currentMechanic === "Taunt" || currentMechanic === "Charge" || currentMechanic === "Stealth"){
                cardAttribute += (cardAttribute == "" ? "" : ", ") + currentMechanic;
            }else{
                cardText = currentMechanic;
                cardText = cardText.replace(/^(Deathrattle|Battlecry)/, '<b>$1</b>')
            }
        }

        newAttributeNode.className = "card-attributes";
        newAttributeNode.textContent = cardAttribute;

        newCardTextNode.className = "card-text";
        newCardTextNode.innerHTML = cardText;

        newTextNode.append(newAttributeNode, newCardTextNode);
        newCardNode.append(newAtkNode, newHpNode, newCostNode, newCardImageNode, newTextNode, newCardFrameNode);
        newCardNode.setAttribute('draggable', 'true');

        return newCardNode;
    }


}