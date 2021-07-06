import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit {
  private snakeBody = [
    {x: 10, y: 11},
    {x: 11, y: 11},
    {x: 12, y: 11}
  ]

  // private snake!: HTMLDivElement;
  private fruit!: HTMLDivElement;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log(event.key);
    // this.SnakeWalk();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
    ) {}

  ngOnInit(): void {

    setInterval(() => {
      this.initializeTable();
      this.SnakeWalk();
    }, 500);
  }

  ngDoCheck(): void {
    // this.SnakeWalk();
  }

  private initializeTable() {
    const oldSnakeBody = this.elementRef.nativeElement.querySelectorAll('.snake');

    oldSnakeBody.forEach((element: any) => {
      this.renderer.removeChild(this.elementRef.nativeElement.querySelector('#table'), element);
    });

    this.snakeBody.forEach((element, index) => {
      const snake = this.renderer.createElement('div');
      this.renderer.addClass(snake, 'snake');
      snake.style.gridRowStart = element.x;
      snake.style.gridColumnStart = element.y;
      this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), snake);
    })

    console.log(this.snakeBody);
    // this.fruit = this.renderer.createElement('div');
    // this.renderer.addClass(this.fruit, 'fruit');

    // this.renderer.appendChild(this.elementRef.nativeElement.querySelector('#table'), this.fruit);
  }

  private SnakeWalk() {
    for(let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i+1] = { ...this.snakeBody[i]}
    }

    this.snakeBody[0].x --;
    // console.log(this.snakeBody)
  }

}
