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
  }

  public init() {
    console.log(document.querySelectorAll('td'));
    for (let i = 0; i < this.cells.length; i++) {

      this.cells[i].addEventListener('click', () => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const win = this.checkForWin();
        this.play(row, col, win);
      });

      /***
      this.cells[i].addEventListener('click', () => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const win = this.checkForWin();
        this.play(row, col, win);
      });
      */
    }
  }

  private showMessage(message: string) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.classList.add('message-box');
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.classList.add('ok-button');
    okButton.addEventListener('click', () => {
      messageBox.remove();
      this.reset();
    });
    messageBox.appendChild(okButton);
    document.body.appendChild(messageBox);
  }

  private play(i: number, j: number, win: boolean) {
    if (win || this.board[i][j] !== '') {
      return;
    }
    const cell = this.cells[i * 3 + j];
    if (!cell) return;
      if (win) {
      this.board[i][j] = this.player;
      cell.textContent = this.player;
      if (this.player === 'X') {
        cell.classList.add('x-color');
      }
      cell.classList.add('played');
      this.reset();
      return;
    }
    // Check if cell is already occupied
    if (this.board[i][j] !== '') {
      return;
    }
    // Update board and add visual effects
    this.board[i][j] = this.player;
    cell.textContent = this.player;
    if (this.player === 'X') {
      cell.classList.add('x-color');
    }
    cell.classList.add('played');
    // Check for game over
    if (this.checkForWin()) {
      this.showMessage(`Player ${this.player} wins!`);
      this.reset();
      this.gameOver = true;
    } else if (this.checkForTie()) {
      this.showMessage('Tie game!');
      this.reset();
      this.gameOver = true;
    } else {
      // Switch players
      this.player = this.player === 'X' ? 'O' : 'X';
    }
  }

  private checkForWin() {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === this.player && this.board[i][1] === this.player && this.board[i][2] === this.player) {
        return true;
      }
    }
    for (let j = 0; j < 3; j++) {
      if (this.board[0][j] === this.player && this.board[1][j] === this.player && this.board[2][j] === this.player) {
        return true;
      }
    }
    if (this.board[0][0] === this.player && this.board[1][1] === this.player && this.board[2][2] === this.player) {
      return true;
    }
    if (this.board[0][2] === this.player && this.board[1][1] === this.player && this.board[2][0] === this.player) {
      return true;
    }
    return false;
  }

  private checkForTie() {
    let tie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          tie = false;
          break;
        }
      }
    }
    if (tie) {
      const message = document.createElement('div');
      message.textContent = "It's a tie!";
      message.classList.add('tie-message');
      const button = document.createElement('button');
      button.textContent = 'OK';
      button.classList.add('ok-button');
      button.addEventListener('click', () => {
        message.remove();
        this.reset();
      });
      message.appendChild(button);
      document.body.appendChild(message);
      return true;
    }
    return false;
  }

  private reset() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.player = 'X';
    // Remove visual effects and reset cell text
    for (let i = 0; i < this.cells.length; i++) {
        this.cells[i].classList.remove('played');
        this.cells[i].innerText = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new TicTacToe();
  game.init();
});

export default App;
