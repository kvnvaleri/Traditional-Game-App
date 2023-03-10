class Player {
  constructor(props) {
    if (this.constructor === Player) {
      throw new Error("Cannot instantiate from Abstract Class");
    }
    let { name, signs, signIdx } = props;
    this.name = name;
    this.signs = signs;
    this.signIdx = signIdx;
  }
}

class HumanPlayer extends Player {
  constructor(props) {
    super(props);
  }
}

class Computer extends Player {
  constructor(props) {
    super(props);
  }
}

class Game {
  constructor(props) {
    let {winDisplay,  player1, player2} = props;
    this.winDisplay = winDisplay;
    this.player1 = player1;
    this.player2 = player2;
  }

  startGame() {
    if (computer.signs[0].style.backgroundColor == "gray" || computer.signs[1].style.backgroundColor == "gray" || computer.signs[2].style.backgroundColor == "gray") {
      for (let i=0; i<3; i++) {
        player1.signs[i].style.backgroundColor =  "#AE876B"
        computer.signs[i].style.backgroundColor =  "#AE876B"
      }
      this.winDisplay.innerHTML = `<p class="versus">V S</p>`;
      pickStatus = false;
    } else {
      let timesRun = 0;
      let signIdxBefore = 0;
      let intervalGenerator = setInterval(() => {
        this.player2.signIdx = Math.floor(Math.random() * 3);
        this.player2.signs[this.player2.signIdx].style.backgroundColor = "gray";
        if (timesRun > 0) {
          this.player2.signs[signIdxBefore].style.backgroundColor =  "#AE876B";
        }
        signIdxBefore = this.player2.signIdx;
        timesRun += 1;
        if (timesRun == 2 ) {
          clearInterval(intervalGenerator);
          this.player2.signs[this.player2.signIdx].style.backgroundColor = "gray";
          timesRun = 0;
        }
      }, 2);
      setTimeout(() => {
        this.whoWin(this.player1.signIdx, this.player2.signIdx);
      }, 200)
    }
  }

  whoWin(player1, player2) {
  const win = "PLAYER 1\nWIN!";
  const lose = "COM\nWIN!";
  const draw = "DRAW";
  if (player1 == 0 && player2 == 2) {
    this.winDisplay.innerHTML = `<p class="win-status">${win}</p>`;
  } else if (player1 == 2 && player2 == 0) {
    this.winDisplay.innerHTML = `<p class="win-status">${lose}</p>`;
  } else if (player1 > player2) {
    this.winDisplay.innerHTML = `<p class="win-status">${win}</p>`;
  } else if (player1 < player2) {
    this.winDisplay.innerHTML = `<p class="win-status">${lose}</p>`;
  } else {
    this.winDisplay.innerHTML = `<p class="win-status">${draw}</p>`;
  }
  }
}


const player1 = new HumanPlayer({
  name: "Player 1",
  signs: document.getElementsByClassName("player1Sign"),
})

const computer = new Computer({
  name: "Computer",
  signs: document.getElementsByClassName("computerSign"),
})

const game1 = new Game({
  winDisplay: document.getElementById("versus"),
  player1: player1,
  player2: computer
})


let pickStatus = false;

const refreshButton = () => { 
  if (!pickStatus) {
    alert('Pick your sign!');
  } else {
    game1.startGame();
  } 
}

const playerCard = (card) => {
  player1.signIdx = card;
  game1.winDisplay.innerHTML = `<p class="versus">V S</p>`;
  for (let i=0; i<3; i++) {
    computer.signs[i].style.backgroundColor =  "#AE876B"
  }
  player1.signs[card].style.backgroundColor = "gray";
  for (let i=0; i<3; i++) {
    if (i !== card) {
      player1.signs[i].style.backgroundColor =  "#AE876B"
    }
  }
  pickStatus = true;
  game1.startGame();
}