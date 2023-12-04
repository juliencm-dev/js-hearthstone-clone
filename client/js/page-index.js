/**
 * @fileoverview Fichier Javascript de la page d'index.
 * Il contient l'animation du logo ainsi que la gestion de la connexion.
 * Contient aussi l'animation des sparks, ainsi que la gestion de leur apparition. Le code est aussi 
 * responsable de l'animation du background.
 * 
 * @author [Julien Coulombe-Morency]
 * @version 1.0
 */

'use-strict';

let density = 50,
    sparks = [],
    counterSparks = 0, breathingLayers,
    timingSparks = Math.floor((Math.random() * 2000) - 200),
    smokeVelX = 0.5;   

if(timingSparks <= 0){
    timingSparks = 75;
}

window.addEventListener("load", () => {


    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter'){
            document.querySelector('.logo').classList.add('hidden');
            document.querySelector('.login-wrapper').classList.remove('hidden');
        }
    });

    animate();

})

const animate = () => {

    breathingLayers = document.querySelectorAll('.breathing');

    breathingLayers.forEach(layer => {
        const time = Date.now() * 0.002;

        const speedX = parseFloat(layer.getAttribute('data-speedx'));
        const speedY = parseFloat(layer.getAttribute('data-speedy'));
        const offsetX = Math.sin(time) * speedX * 25;
        const offsetY = Math.sin(time) * speedY * 5;
    
        layer.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;

    });


    if (sparks.length < density && counterSparks === timingSparks) {
        for (let i = 0; i < density; i++) {
            sparks.push(new Spark);
        }
    }
    
    sparks.forEach(spark => {
        spark.draw();

        if (spark.alive === false) {
            sparks.splice(sparks.indexOf(spark), 1);
        }

    });

    if (counterSparks != timingSparks) {
        counterSparks++;
    } else {
        counterSparks = 0;
        timingSparks = Math.floor((Math.random() * 1000) - 200);

        if(timingSparks <= 0){
            timingSparks = 75;
        }
    }
    window.requestAnimationFrame(animate);

}