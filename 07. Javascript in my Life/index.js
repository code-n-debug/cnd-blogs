/**
 * ColorPicker box
 */
class ColorPicker{
    constructor(){
        // get canvas
        this.canvas = document.querySelector('.picker');
        this.canvas.height = 200;
        this.canvas.width = 200;
        // get canvas context
        this.context = this.canvas.getContext("2d");

        // generate the colors
        this.generate();

        // get the image data of context
        // it will return array
        this.imageData = this.context.getImageData(0, 0, 200, 200);
    }

    generate(){
        // generate 100 random color
        for(let x = 0;x < 200;x+=20){
            for(let y = 0; y < 200; y+=20){
                this.context.fillStyle = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
                // in 20x20 pixel
                this.context.fillRect(x, y, 20, 20);
            }
        }
    }

    // get canvas image base on pointer x and y on mousemove
    getPixel(x, y){
        /**
         * Image data is in single array
         * r = red
         * g = green
         * b = blue
         * a = alpha
         *                  r, g, b, a
         *    imageData = [ x, x, x, x
         *                  x, x, x, x
         *                  x, x, x, x];
         * to get specific index for each pixel
         * index = (y * width + x ) * 4
         */
        const index = (y * this.imageData.width + x) * 4,
              red = this.imageData.data[index],
              green = this.imageData.data[index + 1],
              blue = this.imageData.data[index + 2],
              alpha = this.imageData.data[index+ 3] / 255;
        
        // return the rgba text
        return `rgba(${red},${green},${blue},${alpha})`;
    }

    // pass the node garden instance
    run(garden){
        const $this = this;

        // add event listener on mousemove
        this.canvas.addEventListener('mousemove', function(event){
            // get the color on mousemove
            const style = $this.getPixel(event.clientX, event.clientY);
            // set the garden stroke style
            garden.setStrokeStyle(style);
        });
    }
}

/**
 * Our Garden or nodes
 */
class NodeGarden{
    constructor(){
        // get canvas
        this.canvas = document.querySelector('.garden');
        // set particle count
        this.particles = 300;
        // max distance per each particle
        this.maxDist = 125;
        // width of canvas
        this.width = window.innerWidth;
        this.canvas.width = this.width;
        // height of canvas
        this.height = window.innerHeight;
        this.canvas.height = this.height;

        // initial strokestyle
        this.strokeStyle = '#ffffff';
        // get canvas context
        this.context = this.canvas.getContext("2d");

        // generate the particles
        this.generate();

        // start particle animation
        this.animate();
    }

    // set strokestyle
    setStrokeStyle(style){
        this.strokeStyle = style;
    }

    // generate particles
    generate(){
        // blank node
        this.nodes = [];
        // create particles
        for(let i = 0; i < this.particles; i++){
            this.nodes.push({
                x: Math.random() * this.width,  // x position of particle
                y: Math.random() * this.height, // y position of particle
                vx: Math.random() * 2 - 1,  //speed of particle in x direction
                vy: Math.random() * 2 - 1   //speed of particle in y direction
            });
        }
    }

    // function that animate the particles
    animate(){
        // local variables for each garden properties
        let context = this.context,
            nodes = this.nodes,
            height = this.height,
            width = this.width,
            maxDist = this.maxDist,
            strokeStyle = this.strokeStyle;
        
        // clear canvas in every animation
        context.clearRect(0, 0, width, height);

        // render the particles
        nodes.forEach(node=>{
            // move node x position based on speed
            node.x += node.vx;
            // move node y position based on speed
            node.y += node.vy;

            // particle bounds
            
            // if x go out of bounds set to initial values 
            if(node.x > width){
                node.x = 0;
            }else if(node.x < 0){
                node.x = width;
            }
            // if y go out of bounds set to initial values 
            if(node.y > height){
                node.y = 0;
            }else if(node.y < 0){
                node.y = height;
            }

            // render the particle as small point
            // base on x and y position
            context.beginPath();
            context.arc(node.x, node.y, 2, 0, Math.PI * 2);
            context.fillStyle = "#ffffff";
            context.fill();
        });

        // logic to render particle paths
        for(let x = 0; x < nodes.length - 1; x++){
            const nodeA = nodes[x];
            for(let y = x + 1; y < nodes.length; y++){
                const nodeB = nodes[y];
                const   dx = nodeB.x - nodeA.x,
                        dy = nodeB.y - nodeA.y,
                        // distance of node with each other node
                        dist = Math.sqrt(dx * dx + dy * dy);

                // dont render the particle path if distance is less than max distance
                if(dist < maxDist){
                    // line width max value is 1 
                    context.lineWidth = 1 - dist / maxDist;
                    context.beginPath();
                    context.moveTo(nodeA.x, nodeA.y);
                    context.lineTo(nodeB.x, nodeB.y);
                    // add stroke style of path if there's any
                    if(strokeStyle){
                        context.strokeStyle = strokeStyle;
                    }
                    // render the path
                    context.stroke();
                }
            }
        }

        // the local this before passing in the function
        const self = this;
        // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
        requestAnimationFrame(()=>{
            // call animate
            self.animate();
        });
    }
}

let garden;
// on window load
window.addEventListener('load', ()=>{
    // initialize the garden
    garden = new NodeGarden();

    // initialize the color picker then pass the garden instance
    new ColorPicker().run(garden);
});