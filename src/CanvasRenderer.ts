export interface ICanvasRenderer {
  drawFilledCircle: (size: number, xPos?: number, yPos?: number, color?: string) => void
  clear: () => void
  canvasWidth: number
  canvasHeight: number
}

export default class CanvasRenderer implements ICanvasRenderer {

  private _ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx
  }

  drawFilledCircle(size: number, xPos?: number, yPos?: number, color?: string): void {
    if (!this._ctx) return
    if (!size || typeof size !== 'number') return

    // If position not set, set to center of canvas
    if (typeof xPos !== 'number') {
      xPos = this.canvasWidth / 2
    }

    if (typeof yPos !== 'number') {
      yPos = this.canvasHeight / 2
    }
    
    // Draw particle on canvas
    this._ctx.beginPath()
    this._ctx.arc(
      xPos, 
      yPos,
      size / 2,
      0,
      2 * Math.PI
    )

    if (color && typeof color === 'string') {
      this._ctx.fillStyle = color
    }

    this._ctx.fill()
  }

  clear(): void {
    this._ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  get canvasWidth(): number {
    return this._ctx.canvas.width
  }

  get canvasHeight(): number {
    return this._ctx.canvas.height
  }

}
