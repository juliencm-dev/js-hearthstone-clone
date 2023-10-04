let density = 50,
    sparks = [],
    counterSparks = 0, counterSmoke,
    timingSparks = Math.floor((Math.random() * 2000) - 200), timingSmoke = 10,
    smokeVelX = 0.5;   

if(timingSparks <= 0){
    timingSparks = 75;
}

window.addEventListener("load", () => {


    window.addEventListener('keydown', () => {
        document.querySelector('.logo').classList.add('hidden');
        document.querySelector('.login-wrapper').classList.remove('hidden');
    });

    let posX = 0, posY = 0

    window.addEventListener('mousemove', e => {
        const nodeList = document.querySelectorAll('.parallax');
        posX = e.clientX - window.innerWidth / 2;
        posY = e.clientY - window.innerHeight / 2;
        
        nodeList.forEach((elem) => {
            let velX = elem.dataset.speedx;
            let velY = elem.dataset.speedy;
            
            elem.style.transform = `translateX(calc(-50% + ${-posX * velX}px)) translateY(calc(-50% + ${posY * velY}px))`;
        })

    })

    animate();

})

const animate = () => {

    if (sparks.length < density && counterSparks === timingSparks) {
        for (let i = 0; i < density; i++) {
            sparks.push(new Spark);
        }
    }

    // if (counterSmoke === timingSmoke){       
    //     let nodeSmokes = document.querySelectorAll('.smoke');     
    //     nodeSmokes.forEach((smoke) => {
    //         let offsetLeft = smoke.offsetLeft;
    //         let newOffset = offsetLeft + smokeVelX;
    //         smoke.style.left = newOffset + "px";

    //     })
    //     counterSmoke = 0;
    // }else {
    //     counterSmoke++;
    // }

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