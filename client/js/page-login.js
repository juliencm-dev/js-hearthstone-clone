let density = 50,
    sparks = [],
    counter = 0,
    timing = Math.floor((Math.random() * 1000) - 300);

window.addEventListener("load", () => {

    window.addEventListener('keydown', () => {
        document.querySelector('.logo').classList.add('hidden');
        document.querySelector('.main-wrapper').classList.remove('hidden');
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
        timing = Math.floor((Math.random() * 1000) - 300);

        if(timing <= 0){
            timing = 250;
        }
    }

    console.log(sparks);
    window.requestAnimationFrame(animate);

}