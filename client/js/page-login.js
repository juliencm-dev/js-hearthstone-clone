let density = 50,
    sparks = [],
    counter = 0;
    timing = Math.floor((Math.random() * 1000) - 500);

window.addEventListener("load", () => {

    animate();

})

function animate() {

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
        timing = Math.floor((Math.random() * 1000) - 400);

        if(timing <= 0){
            timing = 250;
        }
    }

    console.log(counter);
    window.requestAnimationFrame(animate);

}