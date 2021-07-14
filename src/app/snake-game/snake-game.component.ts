import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { FruitDirective } from './fruit-directive/fruit.directive';
import { SnakeDirective } from './snake-directive/snake.directive';

  // 0 -> frente
  // 1 -> direita
  // 2 -> baixo
  // 3 -> esquerda


@Component({
  selector: 'snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit {
  public isDead: Subject<boolean> = new Subject<boolean>();

  private direction: number = 0;
  private initializeGame: boolean = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const key = event.key;
    console.log(key);
    switch(key)
    {
      case 'w':
        this.direction = 0
        break;
      case 'a':
        this.direction = 3
        break;
      case 's':
        this.direction = 2
        break;
      case 'd':
        this.direction = 1
        break;
      case 'p':
        this.initializeGame = !this.initializeGame;
        break;
      default:
        break;
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private fruitDirective: FruitDirective,
    private snakeDirective: SnakeDirective
    ) {}

  private dead() {
    this.isDead.next(true);
    this.initializeGame = false;
  }

  private renderWall() {
    for(let i = 0; i < 21; i ++) {
      const horizontalWall1 = this.renderer.createElement('div');
      this.renderer.addClass(horizontalWall1, 'wall');
      horizontalWall1.style.gridRowStart = 1;
      horizontalWall1.style.gridColumnStart = i;
      this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), horizontalWall1);

      const horizontalWall2 = this.renderer.createElement('div');
      this.renderer.addClass(horizontalWall2, 'wall');
      horizontalWall2.style.gridRowStart = 22;
      horizontalWall2.style.gridColumnStart = i;
      this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), horizontalWall2);

      const verticalWall1 = this.renderer.createElement('div');
      this.renderer.addClass(verticalWall1, 'wall');
      verticalWall1.style.gridRowStart = i;
      verticalWall1.style.gridColumnStart = 1;
      this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), verticalWall1);

      const verticalWall2 = this.renderer.createElement('div');
      this.renderer.addClass(verticalWall2, 'wall');
      verticalWall2.style.gridRowStart = i;
      verticalWall2.style.gridColumnStart = 22;
      this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), verticalWall2);
    }
  }

  ngOnInit(): void {
    // this.renderWall();
    setInterval(() => {
      if (this.initializeGame) {
        this.renderTable();
        this.snakeDirective.snakeWalk(this.direction);

        let eatAFruit = this.snakeDirective.snakeBody[0].x === this.fruitDirective.fruit.position.x && this.snakeDirective.snakeBody[0].y === this.fruitDirective.fruit.position.y;
        let eatYourself = this.snakeDirective.analyzeIfTheSnakeEatsYourself();
        if (eatAFruit){
          this.fruitDirective.eatFruit(this.snakeDirective.snakeBody[this.snakeDirective.snakeBody.length - 1], this.direction);
        }
        else if (eatYourself) {
          this.dead();
        }
      }
    }, 70);
  }

  private renderTable() {
    this.snakeDirective.renderSnake();
    this.fruitDirective.renderFruit();
  }
}
