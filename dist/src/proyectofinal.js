var DynamicLines = /** @class */ (function () {
    function DynamicLines(ctx, lineColor, lineWidth, lineLength, lineSpeed) {
        this.ctx = ctx;
        this.points = [];
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.lineLength = lineLength;
        this.lineSpeed = lineSpeed;
        // Agregar el primer punto en el centro del lienzo
        this.points.push({ x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 });
    }
    DynamicLines.prototype.generatePoints = function () {
        // Generar puntos aleatorios
        var newPoint = {
            x: Math.random() * this.ctx.canvas.width,
            y: Math.random() * this.ctx.canvas.height,
        };
        this.points.push(newPoint);
        // Mantener un número limitado de puntos
        if (this.points.length > 10) {
            this.points.shift(); // Eliminar el punto más antiguo
        }
    };
    DynamicLines.prototype.drawLines = function () {
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        // Conectar los puntos con líneas
        for (var i = 0; i < this.points.length; i++) {
            for (var j = i + 1; j < this.points.length; j++) {
                var distance = this.calculateDistance(this.points[i], this.points[j]);
                // Dibujar líneas si la distancia es menor que la longitud de la línea
                if (distance < this.lineLength) {
                    this.ctx.moveTo(this.points[i].x, this.points[i].y);
                    this.ctx.lineTo(this.points[j].x, this.points[j].y);
                }
            }
        }
        this.ctx.stroke();
        this.ctx.closePath();
    };
    DynamicLines.prototype.animateLines = function () {
        // Mover los puntos aleatoriamente
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.x += (Math.random() - 0.5) * this.lineSpeed;
            point.y += (Math.random() - 0.5) * this.lineSpeed;
            // Limitar los puntos dentro del lienzo
            point.x = Math.max(0, Math.min(point.x, this.ctx.canvas.width));
            point.y = Math.max(0, Math.min(point.y, this.ctx.canvas.height));
        }
    };
    DynamicLines.prototype.calculateDistance = function (point1, point2) {
        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    return DynamicLines;
}());
export { DynamicLines };
var ColorExplosions = /** @class */ (function () {
    function ColorExplosions(ctx) {
        this.ctx = ctx;
        this.explosions = [];
    }
    ColorExplosions.prototype.generateExplosion = function () {
        var explosion = {
            x: Math.random() * this.ctx.canvas.width,
            y: Math.random() * this.ctx.canvas.height,
            radius: Math.random() * 30 + 10,
            color: this.getRandomColor(),
        };
        this.explosions.push(explosion);
        // Mantener un número limitado de explosiones
        if (this.explosions.length > 5) {
            this.explosions.shift(); // Eliminar la explosión más antigua
        }
    };
    ColorExplosions.prototype.drawExplosions = function () {
        for (var _i = 0, _a = this.explosions; _i < _a.length; _i++) {
            var explosion = _a[_i];
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = explosion.color;
            this.ctx.fill();
            this.ctx.closePath();
        }
    };
    ColorExplosions.prototype.animateExplosions = function () {
        var _loop_1 = function (explosion) {
            explosion.radius += 1;
            // Eliminar explosiones cuando alcanzan un tamaño máximo
            if (explosion.radius > 50) {
                this_1.explosions = this_1.explosions.filter(function (exp) { return exp !== explosion; });
            }
        };
        var this_1 = this;
        // Hacer que las explosiones se expandan con el tiempo
        for (var _i = 0, _a = this.explosions; _i < _a.length; _i++) {
            var explosion = _a[_i];
            _loop_1(explosion);
        }
    };
    ColorExplosions.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    return ColorExplosions;
}());
export { ColorExplosions };
var ProgressBar = /** @class */ (function () {
    function ProgressBar(x, y, width, height, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.progress = 0; // Inicializa el progreso en 0
    }
    ProgressBar.prototype.update = function (progress) {
        this.progress = progress;
    };
    ProgressBar.prototype.draw = function () {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        // Dibuja la barra de carga completa
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // Dibuja la porción de la barra de carga según el progreso
        this.ctx.fillStyle = 'blue';
        var progressWidth = this.width * this.progress;
        this.ctx.fillRect(this.x, this.y, progressWidth, this.height);
        // Agrega el mensaje de carga
        this.ctx.fillStyle = 'black';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Loading...', this.x + this.width / 2 - 40, this.y + this.height / 2 + 6);
    };
    return ProgressBar;
}());
export { ProgressBar };
var DynamicBarChart = /** @class */ (function () {
    function DynamicBarChart(x, y, width, height, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.barColors = ['#ff5733', '#33ff57', '#5733ff']; // Colores de las barras
        this.barHeights = [50, 80, 120]; // Alturas iniciales de las barras
    }
    DynamicBarChart.prototype.updateBarHeights = function () {
        // Actualiza las alturas de las barras de manera dinámica (puedes personalizar la lógica según tus necesidades)
        for (var i = 0; i < this.barHeights.length; i++) {
            this.barHeights[i] = Math.random() * this.height;
        }
    };
    DynamicBarChart.prototype.draw = function () {
        // Dibuja las barras
        var barWidth = this.width / this.barColors.length;
        for (var i = 0; i < this.barColors.length; i++) {
            this.ctx.fillStyle = this.barColors[i];
            this.ctx.fillRect(this.x + i * barWidth, this.y + this.height - this.barHeights[i], barWidth, this.barHeights[i]);
        }
    };
    return DynamicBarChart;
}());
export { DynamicBarChart };
var ColorCurtainEffect = /** @class */ (function () {
    function ColorCurtainEffect(ctx, curtainWidth, speed) {
        this.ctx = ctx;
        this.curtainWidth = curtainWidth;
        this.speed = speed;
    }
    ColorCurtainEffect.prototype.update = function () {
        // Mueve la cortina hacia la derecha
        this.curtainWidth += this.speed;
        // Si la cortina alcanza el ancho del lienzo, reinicia su posición
        if (this.curtainWidth >= this.ctx.canvas.width) {
            this.curtainWidth = 0;
            // Cambia el color de la cortina a uno aleatorio
            this.randomizeCurtainColor();
        }
    };
    ColorCurtainEffect.prototype.draw = function (img) {
        this.ctx.drawImage(img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "rgba(".concat(this.getRandomColorComponent(), ", ").concat(this.getRandomColorComponent(), ", ").concat(this.getRandomColorComponent(), ", 0.5)");
        this.ctx.fillRect(0, 0, this.curtainWidth, this.ctx.canvas.height);
    };
    ColorCurtainEffect.prototype.randomizeCurtainColor = function () {
        this.ctx.fillStyle = "rgba(".concat(this.getRandomColorComponent(), ", ").concat(this.getRandomColorComponent(), ", ").concat(this.getRandomColorComponent(), ", 0.5)");
    };
    ColorCurtainEffect.prototype.getRandomColorComponent = function () {
        return Math.floor(Math.random() * 256);
    };
    return ColorCurtainEffect;
}());
export { ColorCurtainEffect };
//Estiramiento 
var StretchEffect = /** @class */ (function () {
    function StretchEffect(ctx, width, height, scale, direction) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.direction = direction;
    }
    StretchEffect.prototype.update = function () {
        this.scale += this.direction;
        if (this.scale <= 1 || this.scale >= 2) {
            this.direction *= -1;
        }
    };
    StretchEffect.prototype.draw = function (originalImage) {
        this.ctx.globalAlpha = 1;
        this.ctx.drawImage(originalImage, 0, 0, this.width, this.height);
        this.ctx.scale(this.scale, 1);
        this.ctx.drawImage(originalImage, 0, 0, this.width, this.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.globalAlpha = 1;
    };
    return StretchEffect;
}());
export { StretchEffect };
