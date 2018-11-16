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
  statisticStr: string;
  winnerStr: string;
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
    const {c, r} = e.target.dataset;
    e.target.innerHTML = this.player;
    this.table[r][c] = this.player;
    this.whoseTurn();
    this.whoWin();
  }
  whoseTurn(): void {
    this.player = this.player === 'X' ? 'O' : 'X';
  }
  whoWin() {
    this.table.forEach(e => {
      const line = e.join('');
      this.gameOwer(line);
    });
    for (let i = 0; i < 3; i++) {
      const column = `${this.table[0][i]}${this.table[1][i]}${this.table[2][i]}`;
      this.gameOwer(column);
    }
    const diagonal = `${this.table[0][0]}${this.table[1][1]}${this.table[2][2]}`;
    this.gameOwer(diagonal);
    const diagonalRevers = `${this.table[2][0]}${this.table[1][1]}${this.table[0][2]}`;
    this.gameOwer(diagonalRevers);
  }
  gameOwer(str) {
    setTimeout(() => {
      if (str === 'XXX') {
        this.stat(1, 0);
        this.confirmm(str[0]);
        this.winnerStr = 'Победил игрок X';
      } else if (str === 'OOO') {
       this. confirmm(str[0]);
        this.stat(0, 1);
        this.winnerStr = 'Победил игрок О';
      }
    }, 100);
  }
  confirmm(data) {
    if (confirm(`Победил ${data}.\nИграем еще?`)) {
      window.location.reload();
    } else {
      console.log('endGame');

    }
  }
  stat(data1, data2) {
    this.statistic.winX += +data1;
    this.statistic.winO += +data2;
    this.statistic.sumGame++;
    localStorage.setItem('statistic', JSON.stringify(this.statistic));
    this.genStatistic();
  }
  genStatistic() {
    let { winX: x, winO: o, sumGame: sum} = this.statistic;
    sum = sum === 0 ? 1 : sum;
    this.statisticStr = `<div>X побеждал в ${(x / sum * 100).toFixed(2)}%</div>
    <div>O побеждал в ${(o / sum * 100).toFixed(2)}%</div>
    <div>Всего ${sum} игр</div>`;
  }
}
