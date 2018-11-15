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
    this.player = this.player === 'X' ? 'O' : 'X';
  }
}
