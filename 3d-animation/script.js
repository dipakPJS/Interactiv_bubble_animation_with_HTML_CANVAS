// Selecting the body element
const body = document.querySelector('body');

// Creating and appending canvas element to the body
const canvas = document.createElement('canvas');
body.appendChild(canvas);

// Getting 2D context of the canvas
const ctx = canvas.getContext('2d');

// Setting canvas width and height to full width and height of the body
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array of specified and additional bright colors
const colors = ['#fff200', '#ff3838', '#17c0eb', '#7158e2', 'orange', 'green', '#ff6600', '#00cc00', '#cc00ff', '#ff0066'];

// Array to store bubbles
let bubbles = [];

// Class representing a Bubble
class Bubble {
    constructor(x, y, radius, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fill();

        // Glass effect
        let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.speedX = -this.speedX;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedY = -this.speedY;
        }

        this.draw();
    }
}

// Function to initialize bubbles
function init() {
    bubbles = [];
    for (let i = 0; i < 50; i++) {
        let radius = Math.random() * 20 + 10;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        bubbles.push(new Bubble(x, y, radius, speedX, speedY, color));
    }
}

// Function to animate bubbles
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
    }
}

// Event listener for mousemove to create interactive effect
canvas.addEventListener('mousemove', function(event) {
    bubbles.forEach(bubble => {
        if (Math.pow(event.clientX - bubble.x, 2) + Math.pow(event.clientY - bubble.y, 2) <= Math.pow(bubble.radius, 2)) {
            bubble.speedX = (Math.random() - 0.5) * 10;
            bubble.speedY = (Math.random() - 0.5) * 10;
        }
    });
});

// Initialize bubbles and start animation
init();
animate();
