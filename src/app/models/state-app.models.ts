export interface StateApp {
    player: string;
    statistic?: {
      winX: number,
      winO: number,
      sumGame: number
    };
    table: [string[], string[], string[]];
    statisticStr?: string;
    winnerStr?: string;
}

export class State implements StateApp {
  public player = 'X';
  public table = [['', '', ''], ['', '', ''], ['', '', '']];
  public statistic = {
    winX: 0,
    winO: 0,
    sumGame: 0
  };
  constructor() {
  }
}
