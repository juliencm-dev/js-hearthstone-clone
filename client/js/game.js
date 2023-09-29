let timer, opponentMana, opponentHP, userMana, userHP;
const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
         method : "POST"        // l’API (games/state)
    })
.then(response => response.json())
.then(data => {
    console.log(data); // contient les cartes/état du jeu.

    let gameState = data;

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
    }

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
    timer = document.querySelector("#turn-timer");
    opponentMana = document.querySelector("#opponent-mana");
    opponentHP = document.querySelector("#opponent-life");
    userMana = document.querySelector("#user-mana");
    userHP = document.querySelector("#user-life");
    
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

