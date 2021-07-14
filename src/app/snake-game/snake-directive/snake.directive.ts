import { Directive } from '@angular/core';
import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSnake]'
})
@Injectable({
  providedIn: 'root'
})
export class SnakeDirective {
  public snakeBody = [
    {x: 10, y: 11},
    {x: 11, y: 11},
    {x: 12, y: 11},
  ]

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  public fruitBornIntoTheSnake(posX: any, posY: any): boolean {
    let bornIntoTheSnake: boolean = false;

    for (let i = 0; i < this.snakeBody.length; i++) {
      if (posX === this.snakeBody[i].x && posY === this.snakeBody[i].y) {
        bornIntoTheSnake = true;
        break;
      }
    }
    return bornIntoTheSnake;
  }

  public renderSnake() {
    const oldSnakeBody = this.elementRef.nativeElement.querySelectorAll('.snake');

    oldSnakeBody.forEach((element: any) => {
      this.renderer.removeChild(this.elementRef.nativeElement.querySelector('#table'), element);
    });

    // console.log(this.snakeBody);
    this.snakeBody.forEach((element, index) => {
      const snake = this.renderer.createElement('div');
      this.renderer.addClass(snake, 'snake');
      snake.style.gridRowStart = element.x;
      snake.style.gridColumnStart = element.y;
      this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), snake);
    })
  }

  public snakeWalk(direction: number) {
    for(let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i+1] = { ...this.snakeBody[i]}
    }

    switch(direction) {
      case 0:
        if (this.snakeBody[0].x - 1 < 0) {
          this.snakeBody[0].x = 21;
        }
        else {
          this.snakeBody[0].x --;
        }
        break;
      case 1:
        if (this.snakeBody[0].y + 1 > 21) {
          this.snakeBody[0].y = 0;
        }
        else {
          this.snakeBody[0].y ++;
        }
        break;
      case 2:
        if (this.snakeBody[0].x + 1 > 21) {
          this.snakeBody[0].x = 0;
        }
        else {
          this.snakeBody[0].x ++;
        }
        break;
      case 3:
        if (this.snakeBody[0].y - 1 < 0) {
          this.snakeBody[0].y = 21;
        }
        else {
          this.snakeBody[0].y --;
        }
        break;
    }
  }

  public analyzeIfTheSnakeEatsYourself(): boolean {
    let eatYourself: boolean = false

    for (let i = 1; i < this.snakeBody.length; i++) {
      if (this.snakeBody[0].x === this.snakeBody[i].x && this.snakeBody[0].y === this.snakeBody[i].y) {
        eatYourself = true;
        break;
      }
    }

    return eatYourself;
  }
}
