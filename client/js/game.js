/**
 * @fileoverview Fichier JavaScript contenant la logique du jeu.
 * Ce fichier gère l'affichage et les interactions du jeu de cartes.
 * Il utilise des requêtes AJAX pour mettre à jour l'état du jeu et effectuer des actions.
 * Le fichier contient également des fonctions pour manipuler les cartes, les héros et les éléments du jeu.
 * 
 * @author [Julien Coulombe-Morency]
 * @version 1.0
 */

'use strict';

let overlay, timer, btnEndTurn, toBeRendered = true, gameLaunched = true, oldHand = [], uidCardSelected;
let swirlNode, swirlRotation = 0, swirlRotationSpeed = 0.15, swirlRotationMax = 360;

let userHeroNode, userMana, userHP, currentMana, userNode, userHand, userField;
let opponentName = "", opponentNode, opponentMana, opponentHP;
let waitingOverlay, endOfGameOverlay, btnQuitGame, chatMenu;

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
    overlay = document.querySelector('#surrender-overlay');
    waitingOverlay = document.querySelector('#waiting');
    endOfGameOverlay = document.querySelector('#end-of-game');
    btnEndTurn = document.querySelector("#end-turn");
    chatMenu = document.querySelector(".in-game");

    btnEndTurn.addEventListener("click", endTurn);
    document.querySelector("#surrender").addEventListener("click", surrender);
    document.querySelector("#btn-leave").addEventListener("click", () => location.href = "/lobby.php");

    window.addEventListener('keydown', (e) => {

        const keysToPrevent = ['Enter'];

        if (keysToPrevent.includes(e.key)){
            e.preventDefault();
            
            if (e.key === 'Enter') {
                toggleChat();   
            }
    
        }
    });

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
        const cardUid = e.dataTransfer.getData('text/uid');
        const cardId = e.dataTransfer.getData('text/id');
        playCard(cardUid, cardId);
    });
      
    userField.addEventListener('dragover', (e) => {
        e.preventDefault();
        userField.classList.add('is-playable');
    });
    
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)

    animate();
});

const applyStyles = iframe => {
	let styles = {
		fontGoogleName : "Roboto",
		fontSize : "16px",
		hideIcons : false,
        hideScrollBar : true,
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}, 100);
}

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

const toggleChat = () => {
    if (chatMenu.classList.contains('fade-in')) {
        chatMenu.classList.toggle('fade-in');
        chatMenu.classList.toggle('hidden');
    } else {
        chatMenu.classList.toggle('fade-in');

        setTimeout(()=>{
            chatMenu.classList.toggle('hidden');
        }, 500)
    }
}

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
            method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
        updateUI(data);

        if (data == "LAST_GAME_LOST" || data == "LAST_GAME_WON"){
            setEndOfGameOverlay(data);
            endOfGameOverlay.classList.remove('hidden');
        }else
            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        }     
    )
}


const displayError = (message) => {
    const errorMessage = document.querySelector("#error-message-game");
        
        if (message !== "WAITING") {
            if(message === "INVALID_ACTION"){
                errorMessage.textContent = "Action invalide";
            }else if(message === "WRONG_TURN"){
                errorMessage.textContent = "Ce n'est pas votre tour";
            }else if(message === "NOT_ENOUGH_ENERGY"){
                errorMessage.textContent = "Vous n'avez pas assez de mana";
            }else if (message === "BOARD_IS_FULL"){
                errorMessage.textContent = "Pas assez de place pour la carte";
            }else if (message === "CARD_IS_SLEEPING"){
                errorMessage.textContent = " Cette carte ne peut attaquer ce tour-ci";
            }else if (message === "MUST_ATTACK_TAUNT_FIRST"){
                errorMessage.textContent = "Vous devez attaquer les taunts en premier";
            }else if (message === "OPPONENT_CARD_HAS_STEALTH"){
                errorMessage.textContent = "Vous ne pouvez pas attaquer cette carte";
            }

            errorMessage.classList.toggle("hidden");
            setTimeout(() => {
                errorMessage.classList.toggle("hidden");
            }, 2000);
        }
}


const updateUI = (gameState) => {
    
    if (typeof gameState !== "object") {
        displayError(gameState);
    }
    else {

        if (gameState.opponent.username !== opponentName){
            opponentName = gameState.opponent.username;
        }

        waitingOverlay.classList.add('fade-out');
        setTimeout(() => {
            waitingOverlay.classList.add('hidden');
        }, 500);

        timer.textContent = gameState.remainingTurnTime;
        opponentHP.textContent = gameState.opponent.hp;
        opponentMana.textContent = gameState.opponent.mp;
        userHP.textContent = gameState.hp;
        userMana.textContent = gameState.mp;

        if (gameLaunched){
            let userHero = new Hero({heroClass: gameState.heroClass, playerType: "user"});
            let opponentHero = new Hero({heroClass: gameState.opponent.heroClass, playerType: "opponent"});

            userHeroNode = userHero.buildHero();
            let opponentHeroNode = opponentHero.buildHero();

            userHeroNode.addEventListener('click', () => {
                heroPower();
            });

            opponentHeroNode.addEventListener('drop', (e) => {
                e.preventDefault();
                const attackerUid = e.dataTransfer.getData('text/uid');
                attackCard(attackerUid, 0);
            });

            opponentHeroNode.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            userNode.append(userHeroNode);
            opponentNode.append(opponentHeroNode);
            gameLaunched = false;
        }

        if (gameState.yourTurn){
            document.querySelector("#user-hero").classList.add('is-turn');
            document.querySelector("#opponent-hero").classList.remove('is-turn');
            btnEndTurn.classList.remove('fade-out');
            btnEndTurn.classList.add('fade-in');
            btnEndTurn.classList.remove('hidden');
        }else{
            document.querySelector("#user-hero").classList.remove('is-turn');
            document.querySelector("#opponent-hero").classList.add('is-turn');
            btnEndTurn.classList.remove('fade-in');
            btnEndTurn.classList.add('fade-out');
            btnEndTurn.classList.add('hidden');
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
                    e.dataTransfer.setData('text/uid', currentCard.uid);
                    e.dataTransfer.setData('text/id', currentCard.id);
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
    let formData = new FormData();
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
    let formData = new FormData();
    formData.append("type", "SURRENDER");

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
    })
}

const playCard = (uid, id) => {
    let formData = new FormData();
    formData.append("type", "PLAY");
    formData.append("uid", uid);

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
        updateUI(data);
        updateCardPlayCount(id);
    })
}

const attackCard = (uid, targetuid) => {
    let formData = new FormData();
    formData.append("type", "ATTACK");
    formData.append("uid", uid);
    formData.append("targetuid", targetuid);

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
        updateUI(data);
    })
}

const heroPower = () => {
    let formData = new FormData();
    formData.append("type", "HERO_POWER");

    fetch("ajax-game-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
        toBeRendered = true;
        updateUI(data);
        heroPowerAnimation();
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
            e.dataTransfer.setData('text/uid', currentCard.uid);
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
            const attackerUid = e.dataTransfer.getData('text/uid');
            attackCard(attackerUid, currentCard.uid);
        });
          
        newCardNode.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        opponentField.append(newCardNode);
    }
}

const setEndOfGameOverlay = (result) => {
    const endOfGameTitle = document.querySelector("#end-of-game-title");
    const endOfGameSubtitle = document.querySelector("#end-of-game-subtitle");

    if (result == "LAST_GAME_LOST"){
        endOfGameTitle.textContent = "Defaite!";
        endOfGameSubtitle.innerHTML = `Vous avez ete vaincu par <span id="username">${opponentName}</span>`;
    }else {
        endOfGameTitle.textContent = "Victoire!";
        endOfGameSubtitle.innerHTML = `Vous avez vaincu <span id="username">${opponentName}</span>`;
    }
}

const updateCardPlayCount = (cardId) => {
    let formData = new FormData();
    formData.append("cardId", cardId);

    fetch("ajax-db-action.php", {   
            method : "POST", 
            body: formData     
    })
    .then(response => response.json())
    .then(data => {
    })
}

