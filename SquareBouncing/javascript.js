const g = 9.8;
const speed = 5;

class BouncingSquare {
    
    constructor(theSquare){
        this.theSquare = theSquare;
        this.top = 0;
        this.left = 0;
        this.acceleration = g;
        this.bouncingBoost = 0;
    } 

    async startMoving(){
        if (this.theSquare){
            this.top = 0-this.theSquare.offsetHeight;
            //this.left = 0-this.theSquare.offsetWidth;
            let controlTop = 0;
            let controlLeft = 0;
            let direction = 0; //0 down, 1 up;
            do{
                controlTop = Math.round(this.top);
                controlLeft = this.left;
                if (direction)
                {
                    await this.moveTheSquareUp();
                    direction = 0;
                }
                else
                {
                    await this.moveTheSquareDown();
                    direction = 1;
                }
                console.log("controlTop:" + controlTop);
                console.log("this.top:" + this.top);
                console.log("Math.round(controlTop):" + Math.round(controlTop));
                console.log("Math.round(this.top):" + Math.round(this.top));
            }
            while (Math.round(controlTop) != Math.round(this.top))
        }
    }

    async moveTheSquareDown()
    {
        let t = 0;
        let startFalling = new Date();
        while (this.top + this.theSquare.offsetHeight < window.innerHeight)
        {
            let leftMoving = 0;

            t = (new Date() - startFalling)/1000; //because I want the t in seconds.
            this.acceleration = Math.round((t * g)*1000)/1000;

            if (this.top + this.theSquare.offsetHeight + this.acceleration > window.innerHeight)
            {
                this.acceleration = window.innerHeight - (this.top + this.theSquare.offsetHeight);
            }
            this.top += this.acceleration;
            
            this.left += leftMoving;
            changeEltPosition(this.theSquare, this.top, this.left);
            await sleep(speed);
        }
    }

    async moveTheSquareUp()
    {
        if (this.theSquare)
        {
            let t = 0;
            let startMovingUp = new Date();
            while (this.acceleration > 0)
            {
                t = (new Date() - startMovingUp)/1000; //because I want the t in seconds.
                this.acceleration = (this.acceleration - Math.round((t * g)*1000)/1000) + this.bouncingBoost;
                this.bouncingBoost = 0;
                if (this.acceleration < 0) this.acceleration = 0;
                console.log("squareUp>this.top:" + this.top);
                console.log("squareUp>this.acceleration:" + this.acceleration);

                let leftMoving = 0;

                this.top -= Math.abs(this.acceleration);
                
                this.left += leftMoving;
                startMovingUp = new Date();
                changeEltPosition(this.theSquare, this.top, this.left);
                await sleep(speed);
            }
        }
    }


}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function changeEltPosition(elt, top, left)
{
    elt.style.position = "absolute";
    elt.style.top = top + "px";
    elt.style.left = left + "px";
}

async function bouceTheSquareNew(speed)
{
    let theSquares = document.querySelectorAll(".square");
    if (!theSquares) return;
    theSquares.forEach(async function (item){
        let bouncingSquare = new BouncingSquare(item);
        bouncingSquare.startMoving();
    });
    
}