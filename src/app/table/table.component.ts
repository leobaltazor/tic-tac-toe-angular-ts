import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  player: string;
  statistic: {
    winX: number,
    winO: number,
    sumGame: number
  };
  table: [string[], string[], string[]];
  constructor() {

   }

  ngOnInit() {
    this.player = 'X';
    this.statistic = {
      winX: 0,
      winO: 0,
      sumGame: 0
    };
    this.statistic = this.initStatistic();
    this.table = [['', '', ''], ['', '', ''], ['', '', '']];
  }
  initStatistic() {
    if (localStorage.getItem('statistic') !== null) {
      return JSON.parse(localStorage.getItem('statistic'));
    } else {
      localStorage.setItem('statistic', JSON.stringify(this.statistic));
    }
    return JSON.parse(localStorage.getItem('statistic'));
  }
  onClick(e) {
    if ('X' === e.target.innerHTML || 'O' === e.target.innerHTML) {
      return false;
    }
    const {c, r} = e.target.dataset;
    this.table[r][c] = this.player;
    // e.target.innerHTML = this.player;
    this.whoseTurn();
  }
  whoseTurn(): void {
    this.player = this.player === 'X' ? 'O' : 'X';
  }
  whoWin() {
    this.table.forEach(e => {
      let str = e.join('');
      this.gameOwer(str);
    });
    for (var i = 0; i < 3; i++) {
      var str = `${arr[0][i]}${arr[1][i]}${arr[2][i]}`;
      gameOwer(str);
    }
    var str = `${arr[0][0]}${arr[1][1]}${arr[2][2]}`;
    gameOwer(str);
    var str = `${arr[2][0]}${arr[1][1]}${arr[0][2]}`;
    gameOwer(str);
  }
  gameOwer(str) {
    setTimeout(() => {
      if (str === "XXX") {
        stat(1, 0);
        confirmm(str[0]);
        _whoseTurn.innerHTML = "Победил игрок X";
      } else if (str === "OOO") {
        confirmm(str[0]);
        stat(0, 1);
        _whoseTurn.innerHTML = "Победил игрок О";
      }
    }, 100);
  }
}
