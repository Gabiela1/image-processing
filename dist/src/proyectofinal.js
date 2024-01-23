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
