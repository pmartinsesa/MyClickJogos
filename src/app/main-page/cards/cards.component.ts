import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  public Games : string[] = [
    'Jogo da Velha',
    'Snake Game'
  ];

  public GamesDescription : string[] = [
    'Jogue multiplayer o jogo da velha com o seu amigo.',
    'Jogo da cobra original.'
  ];

  public ImageUrl : string[] = [
    '../../../assets/images/velha.jpg',
    '../../../assets/images/snake.jpg'
  ];

  public ImageAlt : string[] = [
    'snake-game-image',
    'tic-tac-toe-image'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
