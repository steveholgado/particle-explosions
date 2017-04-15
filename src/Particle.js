export default class Particle {

    constructor(ctx, options) {
        // Store reference to canvas context
        this.ctx = ctx;

        // initialize particle
        this.init(options);
    }

    init(options) {
        options = options || {};

        // Set properties based on passed in options or default values
        this.xPos         = options.xPos         || this.ctx.canvas.width / 2; 
        this.yPos         = options.yPos         || this.ctx.canvas.height / 2;
        this.minSize      = options.minSize      || 25;
        this.maxSize      = options.maxSize      || 25;
        this.minSpeed     = options.minSpeed     || 50;
        this.maxSpeed     = options.maxSpeed     || 100;
        this.resistance   = options.resistance   || 0.85; 
        this.gravity      = options.gravity      || 0;
        this.decay        = options.decay        || 0.9;
        this.sizeToRemove = options.sizeToRemove || 0.1;
        this.color        = options.color        || '#000000';

        // Generate random particle size betwen minimum and maximum
        this.size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1) + this.minSize);

        // Generate random particle speed betwen minimum and maximum
        this.speed = Math.floor(Math.random() * (this.maxSpeed - this.minSpeed + 1) + this.minSpeed);

        // Set initial velocity ensuring particles head in all directions
        this.xVel = Math.random() - 0.5;
        this.yVel = Math.random() - 0.5;

        // Apply particle speed
        this.xVel *= this.speed;
        this.yVel *= this.speed;
        
        // Enable particle
        this.enabled = true; 
    }

    draw() {
        this.ctx.fillStyle = this.color;

        const halfSize = this.size / 2;

        // Draw particle on canvas
        this.ctx.beginPath();
        this.ctx.arc(this.xPos, this.yPos, halfSize, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    update() {
        // Apply resistance
        this.xVel *= this.resistance;
        this.yVel *= this.resistance;
        
        // Apply velocity
        this.xPos += this.xVel;
        this.yPos += this.yVel;

        // Apply gravity if specified - defaults to zero
        this.yPos += this.gravity;
        
        // Apply decay to shrink particle
        this.size *= this.decay;

        // Draw particle on canvas
        this.draw();
        
        // Disable particle once decayed to specified size
        if (this.size <= this.sizeToRemove) this.enabled = false;
    }

}