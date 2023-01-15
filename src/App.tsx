import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log("componentDidMount");
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
  audio: HTMLAudioElement;

  private isClicked: boolean;
  private cellClicked = false;
  private shouldReset = false;
  private timeoutId: any;

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
    this.audio = new Audio();
  }

  public init() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].addEventListener('click', (event) => {
<<<<<<< HEAD
=======
        console.log("init EventListener: entered!");
>>>>>>> origin/main
        if (this.gameOver) {
          return;
        }
        const row = Math.floor(i / 3);
        const col = i % 3;
        this.play(row, col);
    });
    }
  }

  private showMessage(message: string, winner?: string) {
    if (!messageDisplayed) {
        const messageBox = document.createElement('div');
        messageBox.textContent = message;
        messageBox.classList.add('message-box');
        if (winner === "X") {
            messageBox.classList.add('x');
        } else if (winner === "O") {
            messageBox.classList.add('o');
        }
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.classList.add('ok-button');
        okButton.addEventListener('click', () => {
<<<<<<< HEAD
=======
            console.log("showMessage EventListener: entered!");
>>>>>>> origin/main
            messageBox.classList.remove("show");
            messageBox.classList.add("hide");
            // okButton.removeEventListener('click', this.audio.play);
            setTimeout(() => {
                messageBox.remove();
                this.reset();
                messageDisplayed = false;
                clearTimeout(this.timeoutId);
            }, 500);
        });
        messageBox.appendChild(okButton);
        document.body.appendChild(messageBox);
        messageDisplayed = true;
        requestAnimationFrame(() => {
            messageBox.classList.add("show");
        });
        this.timeoutId = setTimeout(() => {
            messageBox.classList.remove("show");
            messageBox.classList.add("hide");
            setTimeout(() => {
                messageBox.remove();
                this.reset();
                messageDisplayed = false;
            }, 500);
        }, 5000);
    }
  }

  private play(i: number, j: number) {
    console.log("play: entered");
    if (this.gameOver || this.board[i][j] !== '') {
      console.log("play: forced exit");
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
    const winningCells = this.checkForWin();
    if (winningCells.length > 0) {
      if (winningCells.length > 3) {
        // After the first win, the audio object is initialized and starts playing in the setTimeout function,
        // and a new audio object is created and starts playing before the first audio object finishes playing.
        if (this.audio) {
          this.audio.pause();
          this.audio.currentTime = 0;
        }
        this.audio.src = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_a0fb2198ef.mp3?filename=winner-bell-game-show-91932.mp3";
      } else {
        let winningSong = ["https://cdn.pixabay.com/download/audio/2021/08/04/audio_a233a6ff22.mp3?filename=level-win-6416.mp3",
          "https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-fanfare-trumpets-6185.mp3",
          "https://cdn.pixabay.com/download/audio/2021/08/04/audio_a5fa3caf34.mp3?filename=good-6081.mp3",
          "https://cdn.pixabay.com/download/audio/2022/03/19/audio_1d15b2dd20.mp3?filename=winbanjo-96336.mp3",
          "https://cdn.pixabay.com/download/audio/2022/03/19/audio_9fcb0e42c2.mp3?filename=windoot-96335.mp3",
          "https://cdn.pixabay.com/download/audio/2022/03/10/audio_e4dc860bc2.mp3?filename=winmutedguitar-39644.mp3",
          "https://cdn.pixabay.com/download/audio/2022/03/15/audio_98ebf54723.mp3?filename=win-87020.mp3",
          "https://cdn.pixabay.com/download/audio/2022/03/10/audio_f211cbbc55.mp3?filename=mission-success-41211.mp3",
          "https://cdn.pixabay.com/download/audio/2022/03/15/audio_9dd36d9f22.mp3?filename=yay-92370.mp3",
          "https://cdn.pixabay.com/download/audio/2022/03/10/audio_7cf6c8ec73.mp3?filename=winfretless-39643.mp3"];
        let randomNumber = Math.floor(Math.random() * winningSong.length);
        // After the first win, the audio object is initialized and starts playing in the setTimeout function,
        // and a new audio object is created and starts playing before the first audio object finishes playing.
        this.audio.src = winningSong[randomNumber];
<<<<<<< HEAD
      }
=======
>>>>>>> origin/main
        this.setWinningCells(this.winningCells);
        this.showMessage(`Player ${this.player} wins!`, this.player);
        this.gameOver = true;
        this.audio.volume = 0;
        this.audio.pause();
        this.audio.currentTime = 0;
        //Avoid the Promise Error - hack
        setTimeout(() => {
          this.audio.volume = 0.8;
          this.audio.play();
        }, 150);
<<<<<<< HEAD
=======
      }
>>>>>>> origin/main
      return;
    } else if (this.checkForTie()) {
      this.audio.src = "https://cdn.pixabay.com/download/audio/2022/03/10/audio_fd5890b345.mp3?filename=error-2-36058.mp3";
      this.showMessage('Tie game!');
      this.gameOver = true;
      this.audio.volume = 0;
      this.audio.pause();
      //Avoid the Promise Error - hack
      setTimeout(() => {
        this.audio.volume = 0.8;
        this.audio.play();
      }, 150);
      return;
    } else {
      // Switch players
      this.audio.src = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_f746cb8177.mp3?filename=cork-85200.mp3";
      this.player = this.player === 'X' ? 'O' : 'X';
      this.audio.volume = 0;
      this.audio.pause();
      //Avoid the Promise Error - hack
      setTimeout(() => {
        this.audio.volume = 0.8;
        this.audio.play();
      }, 150);
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
      }
    }
    for (let j = 0; j < 3; j++) {
      if (this.board[0][j] === this.player && this.board[1][j] === this.player && this.board[2][j] === this.player) {
        this.winningCells.push([0, j], [1, j], [2, j]);
      }
    }
    if (this.board[0][0] === this.player && this.board[1][1] === this.player && this.board[2][2] === this.player) {
      this.winningCells.push([0, 0], [1, 1], [2, 2]);
    }
    if (this.board[0][2] === this.player && this.board[1][1] === this.player && this.board[2][0] === this.player) {
      this.winningCells.push([0, 2], [1, 1], [2, 0]);
    }
    return this.winningCells;
  }

  private checkForTie() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
  }

  private reset() {
    console.log("reset: entered");
    this.board.forEach(row => row.fill(''));
    this.player = 'X';
    this.gameOver = false;
    this.isClicked = false;
    this.winningCells = [];
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = "";
    this.cells.forEach(cell => {
      cell.classList.remove('x-color', 'played', 'winner');
      // cell.removeEventListener('click', this.audio.play);
      cell.textContent = '';
    });
  }
}

let messageDisplayed = false;

export default App;
