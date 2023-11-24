let overlay, timer, btnEndTurn, toBeRendered = true, gameLaunched = true, oldHand = [], uidCardSelected;
let swirlNode, swirlRotation = 0, swirlRotationSpeed = 0.15, swirlRotationMax = 360;

let userMana, userHP, currentMana, userNode, userHand, userField;
let opponentNode, opponentMana, opponentHP;

window.addEventListener("load", () => {
    timer = document.querySelector("#turn-timer");
    opponentMana = document.querySelector("#opponent-mana");
    opponentHP = document.querySelector("#opponent-life");
    userNode = document.querySelector('#user');
    opponentNode = document.querySelector('#opponent');
    userMana = document.querySelector("#user-mana");
    userHP = document.querySelector("#user-life");
    userHand = document.querySelector('#user-hand');
    userField = document.querySelector('#user-field');
    overlay = document.querySelector('.modal-overlay');

    document.querySelector("#end-turn").addEventListener("click", endTurn);
    document.querySelector("#surrender").addEventListener("click", surrender);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape'){
            overlay.classList.toggle('hidden');
        }
    });

    overlay.addEventListener("click", () => {
        overlay.classList.toggle('hidden');
    })

    userField.addEventListener('drop', (e) => {
        e.preventDefault();
        const cardUid = e.dataTransfer.getData('text/plain');
        playCard(cardUid);
    });
      
    userField.addEventListener('dragover', (e) => {
        e.preventDefault();
        userField.classList.add('is-playable');
    });

    setTimeout(() => {
        const waitingOverlay = document.querySelector('.loading');
        waitingOverlay.style.display = 'none';
    }, 3000);
    
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)

    animate();
});

const animate = () => {
    swirlNode = document.querySelector('#halo');

    if (swirlNode) {
        swirlRotation += swirlRotationSpeed;
        if (swirlRotation >= swirlRotationMax) {
            swirlRotation = 0;
        }
        
        swirlNode.style.transform = `translate(-50%, -50%) rotate(${swirlRotation}deg)`;
    }

    window.requestAnimationFrame(animate);
}


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
        userMana.textContent = gameState.mp;

        if (gameLaunched){
            let userHero = new Hero({heroClass: gameState.heroClass, playerType: "user"});
            let opponentHero = new Hero({heroClass: gameState.opponent.heroClass, playerType: "opponent"});

            let userHeroNode = userHero.buildHero();
            let opponentHeroNode = opponentHero.buildHero();

            userHeroNode.addEventListener('click', () => {
                heroPower();
            });

            opponentHeroNode.addEventListener('drop', (e) => {
                e.preventDefault();
                const attackerUid = e.dataTransfer.getData('text/plain');
                attackCard(attackerUid, 0);
            });

            opponentHeroNode.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            userNode.append(userHeroNode);
            opponentNode.append(opponentHeroNode);
            gameLaunched = false;
        }
        
        if(checkHandHasChanged(gameState.hand) || toBeRendered){     
            toBeRendered= false;
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

                newCardNode.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', currentCard.uid);
                });

                newCardNode.addEventListener('dragend', (e) => {
                    userField.classList.remove('is-playable');
                });

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
        toBeRendered = true;
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
        toBeRendered = true;
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
            HP: currentCard.hp,
            mechanics: currentCard.mechanics
        })

        let newCardNode = newCard.buildCard()

        newCardNode.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', currentCard.uid);
        }); 

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

        newCardNode.addEventListener('drop', (e) => {
            e.preventDefault();
            const attackerUid = e.dataTransfer.getData('text/plain');
            attackCard(attackerUid, currentCard.uid);
        });
          
        newCardNode.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        opponentField.append(newCardNode);
    }
}