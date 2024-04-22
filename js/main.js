const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// el canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#abcdef";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * speed;
        this.dy = 1 * speed;
        this.colors = [
            "red",
            "green",
            "blue",
            "purple",
            "yellow",
            "orange",
            "white",
            "cyan",
            "magenta",
            "brown",
            "violet",
            "teal",
        ];
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 3;
        context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
        context.strokeStyle = this.color;

        context.textAlign = "center";
        context.textBaseLine = "middle";
        context.font = "20px Verdana";

        context.fillText(this.text, this.posX, this.posY);

        context.stroke();
        context.closePath();
    }

    changeColor() {
        let rand = Math.floor(Math.random() * this.colors.length);
        this.color = this.colors[rand];
    }

    update(context) {
        // context.clearRect(0, 0, window_width, window_height);
        this.draw(context);
        // cuando sobresale del tamaño de la pantalla,
        // hay que cambiar la dirección hacia la izquierda
        if (this.posX + this.radius >= window_width) {
            this.dx *= -1;
            this.changeColor();
        }

        // cuando se corta en la pantalla por la izquierda
        // cambiamos la dirección hacia la derecha
        if (this.posX - this.radius <= 0) {
            this.dx *= -1;
            this.changeColor();
        }

        if (this.posY + this.radius >= window_height) {
            this.dy *= -1;
            this.changeColor();
        }

        if (this.posY - this.radius <= 0) {
            this.dy *= -1;
            this.changeColor();
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let circles = [];
for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let radius = Math.floor(Math.random() * 100) + 20;
    let speed = Math.floor(Math.random() * 10) + 2;

    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    let circle = new Circle(
        randomX,
        randomY,
        radius,
        `rgb(${red}, ${green}, ${blue})`,
        `${i + 1}`,
        speed
    );
    circles.push(circle);
}

// let circle = new Circle(50, 50, 30, "red", "holi", 5);
// circle.draw(ctx);

// let circle2 = new Circle(250, 250, 100, "white", "adios", 5);
// circle2.draw(ctx);

let updateCircle = () => {
    ctx.clearRect(0, 0, window_width, window_height);
    requestAnimationFrame(updateCircle);
    circles.forEach((circle) => {
        circle.update(ctx);
    });
};

updateCircle();
