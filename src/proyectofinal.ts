export class DynamicLines {
  protected ctx: CanvasRenderingContext2D;
  protected points: { x: number; y: number }[];
  protected lineColor: string;
  protected lineWidth: number;
  protected lineLength: number;
  protected lineSpeed: number;

  constructor(ctx: CanvasRenderingContext2D, lineColor: string, lineWidth: number, lineLength: number, lineSpeed: number) {
    this.ctx = ctx;
    this.points = [];
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
    this.lineLength = lineLength;
    this.lineSpeed = lineSpeed;

    // Agregar el primer punto en el centro del lienzo
    this.points.push({ x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 });
  }

  public generatePoints() {
    // Generar puntos aleatorios
    const newPoint = {
      x: Math.random() * this.ctx.canvas.width,
      y: Math.random() * this.ctx.canvas.height,
    };

    this.points.push(newPoint);

    // Mantener un número limitado de puntos
    if (this.points.length > 10) {
      this.points.shift(); // Eliminar el punto más antiguo
    }
  }

  public drawLines() {
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();

    // Conectar los puntos con líneas
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const distance = this.calculateDistance(this.points[i], this.points[j]);

        // Dibujar líneas si la distancia es menor que la longitud de la línea
        if (distance < this.lineLength) {
          this.ctx.moveTo(this.points[i].x, this.points[i].y);
          this.ctx.lineTo(this.points[j].x, this.points[j].y);
        }
      }
    }

    this.ctx.stroke();
    this.ctx.closePath();
  }

  public animateLines() {
    // Mover los puntos aleatoriamente
    for (const point of this.points) {
      point.x += (Math.random() - 0.5) * this.lineSpeed;
      point.y += (Math.random() - 0.5) * this.lineSpeed;

      // Limitar los puntos dentro del lienzo
      point.x = Math.max(0, Math.min(point.x, this.ctx.canvas.width));
      point.y = Math.max(0, Math.min(point.y, this.ctx.canvas.height));
    }
  }

  protected calculateDistance(point1: { x: number; y: number }, point2: { x: number; y: number }): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
