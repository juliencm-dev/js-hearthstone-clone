/**
 * @fileoverview Ce fichier contient le code JavaScript pour le fichier page-lobby.js.
 * Il inclut des écouteurs d'événements, des fonctions d'animation, des fonctions de menu et des appels AJAX.
 * Le code est responsable de la gestion des interactions utilisateur et de l'envoi de demandes au serveur.
 * 
 * @author [Julien Coulombe-Morency]
 * @version 1.0
 */

'use strict'

let swirlNode, breathingLayers, swirlRotation = 0, swirlRotationSpeed = 0.15, swirlRotationMax = 360;
let privateNode, playMenu, utilsMenu, chatMenu, gameModeMenu, utilsWrapper;

window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.mode');
    const utilsButtons = document.querySelectorAll('.utils');
    const deckBuilder = document.querySelector("#deck-builder");
    const btnObserve = document.querySelector("#btn-observer");
    playMenu = document.querySelector("#play-menu-bg");
    utilsMenu = document.querySelector("#utils-menu-bg");
    gameModeMenu = document.querySelector('#game-mode-bg');
    privateNode = document.querySelector("#private");
    chatMenu = document.querySelector('#chat-box');
    utilsWrapper = document.querySelector('#utils-wrapper-bg');

    btnObserve.addEventListener("click", () => {
        observeGame();
    });

    window.addEventListener('keydown', (e) => {

        const keysToPrevent = ['Enter', 'Escape'];

        if (keysToPrevent.includes(e.key)){
            e.preventDefault();
            
            if (e.key === 'Enter' && !gameModeMenu.classList.contains('toggled')) {
                toggleChat();   
            }
            
            if (e.key === 'Escape'){
                if (gameModeMenu.classList.contains('toggled')) {
                    toggleMainMenu();
                } else if (utilsWrapper.classList.contains('toggled')) {
                    toggleMainMenuUtils();
                }
            }
        }
    });

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const mode = this.getAttribute('value');
            selectModeMenu(mode);
        });
    });
    
    utilsButtons.forEach(button => {
        button.addEventListener("click", function () {
            const mode = this.getAttribute('value');
            selectUtilsMenu(mode);
        });
    });

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
    breathingLayers = document.querySelectorAll('.breathing');
    swirlNode = document.querySelector('.swirl');

    const time = Date.now() * 0.002; 

    breathingLayers.forEach(layer => {

        const speedX = parseFloat(layer.getAttribute('data-speedx'));
        const speedY = parseFloat(layer.getAttribute('data-speedy'));
        const offsetX = Math.sin(time) * speedX * 25;
        const offsetY = Math.sin(time) * speedY;
    
        layer.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
    });

    if (swirlNode) {
        swirlRotation += swirlRotationSpeed;
        if (swirlRotation >= swirlRotationMax) {
            swirlRotation = 0;
        }
        
        swirlNode.style.transform = `rotate(${swirlRotation}deg)`;
    }
    
    window.requestAnimationFrame(animate);

}

// MENU FUNCTIONS

const toggleChat = () => {
    if (chatMenu.classList.contains('grow-bot')) {
        chatMenu.classList.toggle('grow-bot');
        chatMenu.classList.toggle('toggled');
    } else {
        chatMenu.classList.toggle('grow-bot');
        chatMenu.classList.toggle('toggled');
    }
}

const toggleMenus = () => {
    if (playMenu.classList.contains('grow-side')) {
        playMenu.classList.toggle('grow-side');
        utilsMenu.classList.toggle('grow-side');
    } else {
        playMenu.classList.toggle('grow-side');
        utilsMenu.classList.toggle('grow-side');
    }
}

const toggleGameModeMenu = (type) => {
    setupBtnGameMode(type);

    if (gameModeMenu.classList.contains('grow-in')) {
        gameModeMenu.classList.toggle('grow-in');
        gameModeMenu.classList.toggle('toggled');

    } else {
        gameModeMenu.classList.toggle('grow-in');
        gameModeMenu.classList.toggle('toggled');

    }
}

const toggleUtilsMenu = () => {
    if (utilsWrapper.classList.contains('grow-in')) {
        utilsWrapper.classList.toggle('grow-in');
        utilsWrapper.classList.toggle('toggled');
    } else {
        utilsWrapper.classList.toggle('grow-in');
        utilsWrapper.classList.toggle('toggled');
    }
}

const toggleMainMenuUtils = () => {
    toggleUtilsMenu();

    setTimeout(() => { 
        utilsWrapper.classList.toggle('hidden');
        resetModeMenu();
        setTimeout(() => {
            toggleMenus();
        }, 5);
    }, 600);
}

const toggleMainMenu = () => {
    if (gameModeMenu.classList.contains('grow-in')) {
        gameModeMenu.classList.toggle('grow-in');
        gameModeMenu.classList.toggle('toggled');
    }else{
        gameModeMenu.classList.toggle('grow-in');
    }

    setTimeout(() => { 
        gameModeMenu.classList.toggle('hidden');
        resetModeMenu();
        setTimeout(() => {
            toggleMenus();
        }, 5);
    }, 600);
}

const setupBtnGameMode = (type) => {
    const btnSolo = document.querySelector("#standard");
    const btnCoop = document.querySelector("#coop");
    const btnTraining = document.querySelector("#training");
    const btnPvP = document.querySelector("#pvp");

    btnSolo.addEventListener("click", () => {
        if (type === "TRAINING") {
            playTraining(type,'STANDARD');
        }else {
            const privateKey = document.querySelector("#private-key").value;
            playPvp(type, 'STANDARD', privateKey);
        }
    });

    btnCoop.addEventListener("click", () => {
        if (type === "TRAINING") {
            playTraining(type, 'COOP');
        }else {
            const privateKey = document.querySelector("#private-key").value;
            playPvp(type, 'COOP', privateKey);
        }
    });

    btnTraining.addEventListener("click", () => {
        playArena('TRAINING');
    });

    btnPvP.addEventListener("click", () => {
        playArena('PVP');
    });

}

const selectUtilsMenu = (type) => {
    if (type === "DECK") {
        document.querySelector("#deck-builder-frame").classList.toggle("hidden");
    } else if (type === "STATS") {
        document.querySelector("#stats-wrapper").classList.toggle("hidden");

    }

    toggleMenus();

    setTimeout(() => {
        utilsWrapper.classList.toggle('hidden');
        setTimeout(() => {
            toggleUtilsMenu();
        }, 2);
    }, 600);

}

const selectModeMenu = (type) => {

    if (type === "PVP") {
        privateNode.classList.toggle("hidden");
    }

    if (type === "ARENA") {
        document.querySelector("#arena-mode").classList.toggle("hidden");
    }else {
        document.querySelector("#standard-mode").classList.toggle("hidden");
    }

    if (chatMenu.classList.contains('toggled')) {
        toggleChat();
    }

    toggleMenus();

    setTimeout(() => {
        gameModeMenu.classList.toggle('hidden');
        setTimeout(() => {
            toggleGameModeMenu(type);
        }, 2);
    }, 600);
}

const resetModeMenu = () => {
    privateNode.classList.add("hidden");
    document.querySelector("#arena-mode").classList.add("hidden");
    document.querySelector("#standard-mode").classList.add("hidden");
    document.querySelector("#deck-builder-frame").classList.add("hidden");
    document.querySelector("#stats-wrapper").classList.add("hidden");

}

// AJAX CALLS

const observeGame = async () => {
    let value = document.querySelector("#username").value;

    let formData = new FormData();
    formData.append("observer", value);

    try {
        const response = await fetch("ajax-lobby-action.php", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (data.result === "SUCCESS") {
            window.location = "game.php";
        } else {
            const errorMessage = document.querySelector("#error-message");
            errorMessage.innerHTML = data.errorMessage;
            errorMessage.classList.toggle("hidden");
            setTimeout(() => {
                errorMessage.classList.toggle("hidden");
            }, 2000);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error);
    }
}

const playArena = async (type) => {

    let formData = new FormData();
    formData.append("type", type);
    formData.append("mode", 'ARENA');

    try {
        const response = await fetch("ajax-lobby-action.php", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (data.result === "SUCCESS") {
            window.location = "game.php";
        } else {
            const errorMessage = document.querySelector("#error-message");
            errorMessage.innerHTML = data.errorMessage;
            errorMessage.classList.toggle("hidden");
            setTimeout(() => {
                errorMessage.classList.toggle("hidden");
            }, 2000);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error);
    }
}

const playPvp = async (type, mode, privateKey) => {

    let formData = new FormData();
    formData.append("type", type);
    formData.append("mode", mode);

    if (privateKey !== "") {
        formData.append("privateKey", privateKey);
    }

    try {
        const response = await fetch("ajax-lobby-action.php", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (data.result === "SUCCESS") {
            window.location = "game.php";
        } else {
            const errorMessage = document.querySelector("#error-message");
            errorMessage.innerHTML = data.errorMessage;
            errorMessage.classList.toggle("hidden");
            setTimeout(() => {
                errorMessage.classList.toggle("hidden");
            }, 2000);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error);
    }
}

const playTraining = async (type, mode) => {

    let formData = new FormData();
    formData.append("type", type);
    formData.append("mode", mode);

    try {
        const response = await fetch("ajax-lobby-action.php", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (data.result === "SUCCESS") {
            window.location = "game.php";
        } else {
            const errorMessage = document.querySelector("#error-message");
            errorMessage.innerHTML = data.errorMessage;
            errorMessage.classList.toggle("hidden");
            setTimeout(() => {
                errorMessage.classList.toggle("hidden");
            }, 2000);
        }
    } catch (error) {
        console.error('Error during fetch operation:', error);
    }
}




