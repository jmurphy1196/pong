export default class Ball {
    constructor(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.radius = canvasWidth * 0.0125; 
        this.velocityX = 3.5; 
        this.velocityY = 3.5; 
        this.color = "white"; 
    }
    
    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
    
    resetPosition(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
    }
}