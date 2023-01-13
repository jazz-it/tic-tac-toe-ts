import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    const game = new TicTacToe();
    game.init();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <table>
            <tbody>
              <tr>
                <td id="0-0"></td>
                <td id="0-1"></td>
                <td id="0-2"></td>
              </tr>
              <tr>
                <td id="1-0"></td>
                <td id="1-1"></td>
                <td id="1-2"></td>
              </tr>
              <tr>
                <td id="2-0"></td>
                <td id="2-1"></td>
                <td id="2-2"></td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

class TicTacToe {
  board: string[][];
  player: string;
  cells: NodeListOf<HTMLTableCellElement>;
  gameOver: boolean;
  winningCells: [number, number][];

  private isClicked: boolean;
  private cellClicked = false;

  constructor() {
    // Initialize board
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.player = 'X';
    this.cells = document.querySelectorAll('td');
    this.gameOver = false;
    this.isClicked = false;
    this.winningCells = [];
  }

  public init() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].addEventListener('click', (event) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        this.play(row, col);
    });
    }
  }

  private showMessage(message: string) {
    if(!messageDisplayed){
        console.log("Message displayed.")
        const messageBox = document.createElement('div');
        messageBox.textContent = message;
        messageBox.classList.add('message-box');
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.classList.add('ok-button');
        okButton.addEventListener('click', () => {
            messageBox.remove();
            this.reset();
            messageDisplayed = false;
        });
        messageBox.appendChild(okButton);
        document.body.appendChild(messageBox);
        messageDisplayed = true;
    }
}

  private play(i: number, j: number) {
    if (this.gameOver || this.board[i][j] !== '') {
      return;
    }
    const cell = this.cells[i * 3 + j];
    if (!cell) return;
    // Update board and add visual effects
    this.board[i][j] = this.player;
    cell.textContent = this.player;
    if (this.player === 'X') {
      cell.classList.add('x-color');
    }
    cell.classList.add('played');
    // Check for game over
    const win = this.checkForWin();
    if (win) {
      this.setWinningCells(this.winningCells);
      this.showMessage(`Player ${this.player} wins!`);
      this.gameOver = true;
      return;
    } else if (this.checkForTie()) {
      this.showMessage('Tie game!');
      this.gameOver = true;
      return;
    } else {
      // Switch players
      this.player = this.player === 'X' ? 'O' : 'X';
    }
  }

  private setWinningCells(winningCells: [number, number][]) {
    for (let i = 0; i < winningCells.length; i++) {
        const [row, col] = winningCells[i];
        const cell = this.cells[row * 3 + col];
        if (!cell) return;
        cell.classList.add("winner");
    }
  }

  private checkForWin() {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === this.player && this.board[i][1] === this.player && this.board[i][2] === this.player) {
        this.winningCells.push([i, 0], [i, 1], [i, 2]);
        return true;
      }
    }
    for (let j = 0; j < 3; j++) {
      if (this.board[0][j] === this.player && this.board[1][j] === this.player && this.board[2][j] === this.player) {
        this.winningCells.push([0, j], [1, j], [2, j]);
        return true;
      }
    }
    if (this.board[0][0] === this.player && this.board[1][1] === this.player && this.board[2][2] === this.player) {
      this.winningCells.push([0, 0], [1, 1], [2, 2]);
      return true;
    }
    if (this.board[0][2] === this.player && this.board[1][1] === this.player && this.board[2][0] === this.player) {
      this.winningCells.push([0, 2], [1, 1], [2, 0]);
      return true;
    }
    return false;
  }

  private checkForTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === '') {
                return false;
            }
        }
    }
    if (!this.gameOver) {
      this.gameOver = true;
    }
    return true;
  }

  private reset() {
    this.board.forEach(row => row.fill(''));
    this.player = 'X';
    this.gameOver = false;
    this.isClicked = false;
    this.winningCells = [];
    this.cells.forEach(cell => {
      cell.classList.remove('x-color', 'played', 'winner');
      cell.textContent = '';
    });
  }
}

let messageDisplayed = false;

document.addEventListener('DOMContentLoaded', () => {
  const game = new TicTacToe();
  game.init();
});

export default App;
