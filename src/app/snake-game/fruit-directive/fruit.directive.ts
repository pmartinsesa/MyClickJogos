import { Directive, ElementRef, Injectable, Renderer2 } from '@angular/core';
import { SnakeDirective } from './../snake-directive/snake.directive';

@Directive({
  selector: '[appFruit]'
})
@Injectable({
  providedIn: 'root'
})
export class FruitDirective {
  public fruit: any = {
    fruitElement: HTMLDivElement,
    position: {
      x: 0,
      y: 0
    },
    isActive: false
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private snakeDirective: SnakeDirective
  ) {}

  public renderFruit() {
    // console.log(this.fruit.isActive);
    if (!this.fruit.isActive) {
      this.fruit.fruitElement = this.renderer.createElement('div');
      // console.log(this.fruit.fruitElement )

      do {
        this.fruit.position.x = Math.floor(Math.random() * 21);
        this.fruit.position.y = Math.floor(Math.random() * 21);
      } while (this.snakeDirective.fruitBornIntoTheSnake(this.fruit.position.x, this.fruit.position.y))

      this.renderer.addClass(this.fruit.fruitElement, 'fruit');
      this.fruit.fruitElement.style.gridRowStart = this.fruit.position.x;
      this.fruit.fruitElement.style.gridColumnStart = this.fruit.position.y;
      this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), this.fruit.fruitElement);
      this.fruit.isActive = true;
    }
  }


  public eatFruit(tail: any, direction: any) {
    if (this.fruit.isActive) {
      this.fruit.isActive = false;
      switch(direction) {
        case 0:
          this.snakeDirective.snakeBody.push({x: tail.x + 1, y: tail.y});
          break;
        case 1:
          this.snakeDirective.snakeBody.push({x: tail.x, y: tail.y - 1});
          break;
        case 2:
          this.snakeDirective.snakeBody.push({x: tail.x - 1, y: tail.y});
          break;
        case 3:
          this.snakeDirective.snakeBody.push({x: tail.x, y: tail.y + 1});
          break;
      }
    }

    const fruit = this.elementRef.nativeElement.querySelector('.fruit');

    console.log(fruit);
    this.renderer.removeChild(this.elementRef.nativeElement.querySelector('#table'), fruit);
  }
}
