let density = 50,
    sparks = [],
    counter = 0,
    timing = Math.floor((Math.random() * 2000) - 200);

if(timing <= 0){
    timing = 75;
}

window.addEventListener("load", () => {

    window.addEventListener('keydown', () => {
        document.querySelector('.logo').classList.add('hidden');
        document.querySelector('.login-wrapper').classList.remove('hidden');
    });

    animate();

})

const animate = () => {

    if (sparks.length < density && counter === timing) {
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

    if (counter != timing) {
        counter++;
    } else {
        counter = 0;
        timing = Math.floor((Math.random() * 1000) - 200);

        if(timing <= 0){
            timing = 75;
        }
    }

    console.log(sparks);
    window.requestAnimationFrame(animate);

}