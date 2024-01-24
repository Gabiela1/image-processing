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


export class ColorExplosions {
  protected ctx: CanvasRenderingContext2D;
  protected explosions: { x: number; y: number; radius: number; color: string }[];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.explosions = [];
  }

  public generateExplosion() {
    const explosion = {
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
  }

  public drawExplosions() {
    for (const explosion of this.explosions) {
      this.ctx.beginPath();
      this.ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = explosion.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  public animateExplosions() {
    // Hacer que las explosiones se expandan con el tiempo
    for (const explosion of this.explosions) {
      explosion.radius += 1;

      // Eliminar explosiones cuando alcanzan un tamaño máximo
      if (explosion.radius > 50) {
        this.explosions = this.explosions.filter((exp) => exp !== explosion);
      }
    }
  }

  protected getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}


export class ProgressBar {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected ctx: CanvasRenderingContext2D;
  public progress: number;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.progress = 0; // Inicializa el progreso en 0
  }

  public update(progress: number) {
    this.progress = progress;
  }

  public draw() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);

    // Dibuja la barra de carga completa
    this.ctx.fillStyle = 'lightgray';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    // Dibuja la porción de la barra de carga según el progreso
    this.ctx.fillStyle = 'blue';
    const progressWidth = this.width * this.progress;
    this.ctx.fillRect(this.x, this.y, progressWidth, this.height);

    // Agrega el mensaje de carga
    this.ctx.fillStyle = 'black';
    this.ctx.font = '16px Arial';
    this.ctx.fillText('Loading...', this.x + this.width / 2 - 40, this.y + this.height / 2 + 6);
  }
}


export class DynamicBarChart {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected ctx: CanvasRenderingContext2D;
  protected barColors: string[];
  protected barHeights: number[];

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.barColors = ['#ff5733', '#33ff57', '#5733ff']; // Colores de las barras
    this.barHeights = [50, 80, 120]; // Alturas iniciales de las barras
  }

  public updateBarHeights() {
    // Actualiza las alturas de las barras de manera dinámica (puedes personalizar la lógica según tus necesidades)
    for (let i = 0; i < this.barHeights.length; i++) {
      this.barHeights[i] = Math.random() * this.height;
    }
  }

  public draw() {
    // Dibuja las barras
    const barWidth = this.width / this.barColors.length;

    for (let i = 0; i < this.barColors.length; i++) {
      this.ctx.fillStyle = this.barColors[i];
      this.ctx.fillRect(this.x + i * barWidth, this.y + this.height - this.barHeights[i], barWidth, this.barHeights[i]);
    }
  }
}


export class ColorCurtainEffect {
  protected ctx: CanvasRenderingContext2D;
  protected curtainWidth: number;
  protected speed: number;

  constructor(ctx: CanvasRenderingContext2D, curtainWidth: number, speed: number) {
    this.ctx = ctx;
    this.curtainWidth = curtainWidth;
    this.speed = speed;
  }

  public update() {
    // Mueve la cortina hacia la derecha
    this.curtainWidth += this.speed;

    // Si la cortina alcanza el ancho del lienzo, reinicia su posición
    if (this.curtainWidth >= this.ctx.canvas.width) {
      this.curtainWidth = 0;

      // Cambia el color de la cortina a uno aleatorio
      this.randomizeCurtainColor();
    }
  }

  public draw(img: HTMLImageElement) {
  
    this.ctx.drawImage(img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = `rgba(${this.getRandomColorComponent()}, ${this.getRandomColorComponent()}, ${this.getRandomColorComponent()}, 0.5)`;
    this.ctx.fillRect(0, 0, this.curtainWidth, this.ctx.canvas.height);
  }

  private randomizeCurtainColor() {
   
    this.ctx.fillStyle = `rgba(${this.getRandomColorComponent()}, ${this.getRandomColorComponent()}, ${this.getRandomColorComponent()}, 0.5)`;
  }

  private getRandomColorComponent() {
    
    return Math.floor(Math.random() * 256);
  }
}

//Estiramiento 

export class StretchEffect {
  protected ctx: CanvasRenderingContext2D;
  protected width: number;
  protected height: number;
  protected scale: number;
  protected direction: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, scale: number, direction: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.direction = direction;
  }

  public update() {
  
    this.scale += this.direction;

    if (this.scale <= 1 || this.scale >= 2) {
      this.direction *= -1;
    }
  }

  public draw(originalImage: HTMLImageElement) {
  
    this.ctx.globalAlpha = 1;

  
    this.ctx.drawImage(originalImage, 0, 0, this.width, this.height);


    this.ctx.scale(this.scale, 1);


    this.ctx.drawImage(originalImage, 0, 0, this.width, this.height);


    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

  
    this.ctx.globalAlpha = 1;
  }
}
