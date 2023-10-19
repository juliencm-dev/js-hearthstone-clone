let timer, opponentMana, opponentHP, userMana, userHP, btnEndTurn, btnSurrender, oldHand = [];

window.addEventListener("load", () => {
    timer = document.querySelector("#turn-timer");
    opponentMana = document.querySelector("#opponent-mana");
    opponentHP = document.querySelector("#opponent-life");
    userMana = document.querySelector("#user-mana");
    userHP = document.querySelector("#user-life");
    userHand = document.querySelector('#user-hand')

    document.querySelector("#end-turn").addEventListener("click", endTurn);
    document.querySelector("#surrender").addEventListener("click", surrender);
    
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
            method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // contient les cartes/état du jeu.

        updateUI(data);

        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}

const updateUI = (gameState) => {

    if (typeof gameState !== "object") {
        if (gameState == "GAME_NOT_FOUND") {
        }
    }
    else {
        timer.textContent = gameState.remainingTurnTime;
        opponentHP.textContent = gameState.opponent.hp;
        opponentMana.textContent = gameState.opponent.mp;
        userHP.textContent = gameState.hp;

        userMana.innerHTML = "";
        for (let i = 0 ; i < gameState.maxMp ; i++){
            currentTotalMana = document.createElement('div')
            currentTotalMana.classList.add('mana-count');
            userMana.append(currentTotalMana);
        }
        
        if(checkHandHasChanged(gameState.hand)){     
            userHand.innerHTML = "";
            for (let i = 0 ; i < gameState.hand.length ; i++){
                let currentCard = gameState.hand[i];

                let newCard = new Card({
                    id: currentCard.id,
                    uid: currentCard.uid,
                    atk: currentCard.atk,
                    cost: currentCard.cost,
                    baseHP: currentCard.baseHP,
                    mechanics: currentCard.mechanics
                })

                let newCardNode = newCard.buildCard()

                newCardNode.addEventListener('click', () => {
                    playCard(currentCard.uid);
                })

                userHand.append(newCardNode);
            }

            oldHand = gameState.hand.map(card => ({ ...card }));
        }
    }
}

const checkHandHasChanged = (newHand) => {
    if (newHand.length !== oldHand.length) { return true }

    for (let i = 0; i < newHand.length; i++) {
        if (newHand[i].uid !== oldHand[i].uid) { return true }
    }
    
    return false;
}

const endTurn = () => {
    formData = new FormData();
    formData.append("type", "END_TURN");

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
        updateUI(data);
    })
}

const surrender = () => {
    formData = new FormData();
    formData.append("type", "SURRENDER");

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
        location.href = "/lobby.php"
    })
}

const playCard = (uid) => {
    formData = new FormData();
    formData.append("type", "PLAY");
    formData.append("uid", uid);

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
        updateUI(data);
    })
}

