'use strict'

let swirlNode, swirlRotation = 0, swirlRotationSpeed = 0.15, swirlRotationMax = 360;

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

document.addEventListener('DOMContentLoaded', function() {
    const messageWindow = document.getElementById('errorMessage');
    if (messageWindow) {
        setTimeout(() => {
            messageWindow.remove();
        }, 3000);
    }
});

const animate = () => {

    swirlNode = document.querySelector('.swirl');

    if (swirlNode) {
        swirlRotation += swirlRotationSpeed;
        if (swirlRotation >= swirlRotationMax) {
            swirlRotation = 0;
        }
        
        swirlNode.style.transform = `rotate(${swirlRotation}deg)`;
    }
    
    window.requestAnimationFrame(animate);

}




