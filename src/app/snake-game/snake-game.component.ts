import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit {
  private direction: number = 0;
  private initializeGame: boolean = false;
  private snakeBody = [
    {x: 10, y: 11},
    {x: 11, y: 11},
    {x: 12, y: 11},
  ]
  private fruit: any = {
    fruitElement: HTMLDivElement,
    position: {
      x: 2,
      y: 2
    },
    isActive: false
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const key = event.key;
    console.log(key);
    switch(key)
    {
      case 'w':
        this.initializeGame = true;
        this.direction = 0
        break;
      case 'a':
        this.initializeGame = true;
        this.direction = 3
        break;
      case 's':
        this.initializeGame = true;
        this.direction = 2
        break;
      case 'd':
        this.initializeGame = true;
        this.direction = 1
        break;
      case 'p':
        this.initializeGame = false;
        break;
      default:
        break;
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
    ) {}

  private eatFruit(tail: any) {
    if (this.fruit.isActive) {
      console.log(this.fruit.isActive);
      this.snakeBody.push({x: tail.x + 1, y: tail.y});
      this.fruit.isActive = false;
    }

    const fruit = this.elementRef.nativeElement.querySelector('.fruit');

    console.log(fruit);
    this.renderer.removeChild(this.elementRef.nativeElement.querySelector('#table'), fruit);
  }

  private dead() {
    console.log('f');
    this.initializeGame = false;
  }

  private analyzeWhatTheSnakeEats(): boolean {
    let eatYourself: boolean = false

    for (let i = 1; i < this.snakeBody.length; i++) {
      if (this.snakeBody[0].x === this.snakeBody[i].x && this.snakeBody[0].y === this.snakeBody[i].y) {
        eatYourself = true;
        break;
      }
    }

    return eatYourself;
  }

  ngOnInit(): void {

    setInterval(() => {
      if (this.initializeGame) {
        this.renderTable();
        this.SnakeWalk(this.direction);

        let eatAFruit = this.snakeBody[0].x === this.fruit.position.x && this.snakeBody[0].y === this.fruit.position.y;
        let eatYourself = this.analyzeWhatTheSnakeEats();
        if (eatAFruit){
          this.eatFruit(this.snakeBody[this.snakeBody.length - 1]);
        }
        else if (eatYourself) {
          this.dead();
        }
      }
    }, 180);
  }

  ngDoCheck(): void {
    // this.SnakeWalk();
  }

  private renderTable() {
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

    // console.log(this.fruit.isActive);
    if (!this.fruit.isActive) {
      this.fruit.fruitElement = this.renderer.createElement('div');
      // console.log(this.fruit.fruitElement )

      this.fruit.position.x = Math.floor(Math.random() * 21);
      this.fruit.position.y = Math.floor(Math.random() * 21);

      this.renderer.addClass(this.fruit.fruitElement, 'fruit');
      this.fruit.fruitElement.style.gridRowStart = this.fruit.position.x;
      this.fruit.fruitElement.style.gridColumnStart = this.fruit.position.y;
      this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), this.fruit.fruitElement);
      this.fruit.isActive = true;
    }

  }

  // 0 -> frente
  // 1 -> direita
  // 2 -> baixo
  // 3 -> esquerda
  private SnakeWalk(direction: number) {
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

}
