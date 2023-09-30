class Spark{
    constructor(){
        this.position = {
            x: window.screen.width / 2,
            y: window.screen.height - 200
        }

        this.node = document.createElement('div');
        this.node.classList.add('spark');

        this.velocity={
            x: (Math.random() * 3) * ((Math.floor(Math.random() * 2)) == 0 ? 1 : -1),   // Assigne une vélocitée aléatoire en x
            y: -15
        };

        this.gravity = Math.random();

        this.alive = true;

        document.querySelector('body').appendChild(this.node);

    }

    deleteSpark(){
        this.node.remove();
    }

    draw(){

        if(this.position.y > window.screen.height){
            this.alive = false;
        }

        if (!this.alive){ this.deleteSpark() }

        this.position.x += this.velocity.x;
        this.node.style.left = `${this.position.x}px`;

        this.velocity.y += this.gravity;

        if (this.velocity.y > 15) this.velocity.y = 15;
        
        this.position.y += this.velocity.y;
        this.node.style.top = `${this.position.y}px`;

    }
}