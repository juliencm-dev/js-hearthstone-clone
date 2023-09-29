'use strict'

window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.mode');
    const deckBuilder = document.querySelector("#deck-builder");
    const overlay = document.querySelector(".overlay");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const mode = this.getAttribute('value');
            document.querySelector('#game-mode').value = mode;
            document.querySelector('#submit').click();
        });
    });
    
    deckBuilder.addEventListener("click", () => {
        document.querySelector("#deck-builder-frame").classList.toggle("hidden");
        document.querySelector(".overlay").classList.toggle("hidden");
    });

    overlay.addEventListener("click", () => {
        document.querySelector("#deck-builder-frame").classList.toggle("hidden");
        document.querySelector(".overlay").classList.toggle("hidden");
    })

});

const applyStyles = iframe => {
	let styles = {
		fontGoogleName : "Roboto",
		fontSize : "16px",
		hideIcons : false,
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    const messageWindow = document.getElementById('errorMessage');
    if (messageWindow) {
        setTimeout(() => {
            messageWindow.remove();
        }, 3000);
    }
});




