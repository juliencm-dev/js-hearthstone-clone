let timer, opponentMana, opponentHP, userMana, currentMana, userHP, btnEndTurn, btnSurrender, btnHeroPower, toBeRederend = true, oldHand = [], uidCardSelected;

window.addEventListener("load", () => {
    timer = document.querySelector("#turn-timer");
    opponentMana = document.querySelector("#opponent-mana");
    opponentHP = document.querySelector("#opponent-life");
    userMana = document.querySelector("#user-mana");
    userHP = document.querySelector("#user-life");
    userHand = document.querySelector('#user-hand');

    document.querySelector("#end-turn").addEventListener("click", endTurn);
    document.querySelector("#surrender").addEventListener("click", surrender);
    document.querySelector("#hero-power").addEventListener("click", heroPower);
    document.querySelector("#opponent-hero").addEventListener("click", () => {
        attackCard(uidCardSelected, 0);
        uidCardSelected = null;
    })

    
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

        if (data != "LAST_GAME_LOST")
            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        else
            window.location.href = "/lobby.php";
        }     
    )
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
        for (let i = 0 ; i < gameState.mp ; i++){
            currentTotalMana = document.createElement('div')
            currentTotalMana.classList.add('mana-count');
            userMana.append(currentTotalMana);
        }
        
        if(checkHandHasChanged(gameState.hand)){     
            toBeRederended= false;
            userHand.innerHTML = "";
            for (let i = 0 ; i < gameState.hand.length ; i++){
                let currentCard = gameState.hand[i];

                let newCard = new Card({
                    id: currentCard.id,
                    uid: currentCard.uid,
                    atk: currentCard.atk,
                    cost: currentCard.cost,
                    baseHP: currentCard.hp,
                    mechanics: currentCard.mechanics
                })

                let newCardNode = newCard.buildCard();

                if(newCard.cost <= gameState.mp){
                    newCardNode.classList.add('is-useable');
                }

                newCardNode.addEventListener('click', () => {
                    playCard(currentCard.uid);
                })

                userHand.append(newCardNode);
            }

            oldHand = gameState.hand.map(card => ({ ...card }));
        }

        renderBattlefieldState(gameState);
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
        toBeRederended = true;
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

const attackCard = (uid, targetuid) => {
    formData = new FormData();
    formData.append("type", "ATTACK");
    formData.append("uid", uid);
    formData.append("targetuid", targetuid);

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateUI(data);
    })
}

const heroPower = () => {
    formData = new FormData();
    formData.append("type", "HERO_POWER");

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
        toBeRederended = true;
        updateUI(data);
    })
}

const renderBattlefieldState = (gameState) => {

    const userField = document.querySelector('#user-field');
    const opponentField = document.querySelector('#opponent-field');

    userField.innerHTML = "";
    opponentField.innerHTML = "";

    for (let i = 0 ; i < gameState.board.length ; i++){
        let currentCard = gameState.board[i];

        let newCard = new Card({
            id: currentCard.id,
            uid: currentCard.uid,
            atk: currentCard.atk,
            cost: currentCard.cost,
            baseHP: currentCard.hp,
            mechanics: currentCard.mechanics
        })

        let newCardNode = newCard.buildCard()

        newCardNode.addEventListener('click', () => {
            uidCardSelected = currentCard.uid;
        }) 

        userField.append(newCardNode);
    }

    for (let i = 0 ; i < gameState.opponent.board.length ; i++){
        let currentCard = gameState.opponent.board[i];

        let newCard = new Card({
            id: currentCard.id,
            uid: currentCard.uid,
            atk: currentCard.atk,
            cost: currentCard.cost,
            baseHP: currentCard.hp,
            mechanics: currentCard.mechanics
        })

        let newCardNode = newCard.buildCard()

        newCardNode.addEventListener('click', () => {
            attackCard(uidCardSelected, currentCard.uid);
            uidCardSelected = null;
        })

        opponentField.append(newCardNode);
    }
}