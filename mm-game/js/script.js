//RULES
$("#rules-btn").click(function () {
  swal({
    title: "Rules of The Game",
    content: {
      element: "div",
      attributes: {
        innerHTML: `
          <div style="
            max-height: 300px;
            overflow-y: auto;
            text-align: left;
            font-size: 14px;
            line-height: 1.6;
            padding-right: 10px;
            color: #111;
          ">
            <ul style="padding-left: 20px;">
              <li>The computer picks a sequence of colors. The number of colors is the code length.</li>
              <li>The objective of the game is to guess the exact positions of the colors in the computer's sequence.</li>
              <li>By default, a color can be used only once in a code sequence. If you start a new game with the 'Allow duplicates' checked, then any color can be used any number of times in the code sequence.</li>
              <li>After filling a line with your guesses and clicking on the 'Check' button, the computer responds with the result of your guess.</li>
              <li>For each color in your guess that is in the correct color and correct position in the code sequence, the computer displays a small black color on the right side of the current guess.</li>
              <li>For each color in your guess that is in the correct color but is <b>not</b> in the correct position in the code sequence, the computer displays a small white color on the right side of the current guess.</li>
              <li>For each color in your guess that is not correct, the computer displays a small none color on the right side of the guess.</li>
              <li>You win the game when you manage to guess all the colors in the code sequence and when they all are in the right position.</li>
              <br/>
              <strong>How to play the game:</strong>
              <li>Start a new game by clicking on the 'Start Game' button. If you wish to change the default game parameters, you may change the 'Allow duplicates' field before clicking on the 'Start Game' button.</li>
              <li>To start filling a line, you must first select a color at the bottom of the table by clicking on it. After selecting a color, you can place it in the current guess line by clicking on the desired position.</li>
              <li>After filling a whole line, you can still change your selection before asking the computer to respond to your guess. When you're satisfied with your guess, just click on the 'Check' button and get the computer response.</li>
              <li>You have 10 attempts to guess the code sequence. Good luck!</li>
            </ul>
          </div>
        `,
      },
    },
    buttons: {
      confirm: { text: "Go BACk", className: "sweet-hover" },
    },
  });
});
// satrt button
$("#start-game").click(function () {
  $("#main-menu").hide();
  $("#game-board").show();
});

// duplicate button
// $("#name-duplicate").click(function () {
//   swal(
//     "Feature Coming Soon!",
//     "Name Duplicate feature is under development.",
//     "info"
//   );
// });

let answerChoices = ["red", "blue", "green", "yellow", "purple", "orange"];

let answer = [];
let guess = [];
let indexOfCorrect = [];
let black = 0;
let white = 0;
let round = 1;
let results = [];
let win;
let selectedGuessPin;
let col_id;
let emptyPin;

function setAnswer() {
  answer = []; // Reset previous answer

  const allowDuplicates = duplicateToggle.checked;

  if (allowDuplicates) {
    // Allow duplicate colors
    for (let i = 0; i < 4; i++) {
      const colorIndex = Math.floor(Math.random() * availableColors.length);
      answer.push(availableColors[colorIndex]);
    }
  } else {
    // Do not allow duplicates — choose unique values
    const shuffledColors = [...availableColors].sort(() => 0.5 - Math.random());
    answer = shuffledColors.slice(0, 4);
  }

  console.log("Generated answer:", answer);
}

// // //changes individual pin color with pin number, color index and selector
function changePinColor(pinNum, colorInd, id) {
  let pin = document.querySelector(`${id} div:nth-child(${pinNum})`);
  switch (answerChoices[colorInd]) {
    case "red":
      pin.style.backgroundColor = "#ff8097";
      break;
    case "orange":
      pin.style.backgroundColor = "#ffa66b";
      break;
    case "yellow":
      pin.style.backgroundColor = "#ffe992";
      break;
    case "blue":
      pin.style.backgroundColor = "#92d6e2";
      break;
    case "green":
      pin.style.backgroundColor = "#9fec98";
      break;
    case "purple":
      pin.style.backgroundColor = "#a38add";
      break;
  }
}

setAnswer();

document.getElementById("closeModal").addEventListener("click", () => {
  const modal = document.getElementById("resultModal");
  modal.classList.add("hidden");

  $("#reset").click();
});

function colorClicked(id) {
  switch (id) {
    case "red":
      guess.push(0);
      break;
    case "blue":
      guess.push(1);
      break;
    case "green":
      guess.push(2);
      break;
    case "yellow":
      guess.push(3);
      break;
    case "purple":
      guess.push(4);
      break;
    case "orange":
      guess.push(5);
      break;
  }
}

function changeRoundPins() {
  guess.forEach((el, i) => {
    let id = "#guess" + round;
    let pinBgCheck = $("#b" + round);
    if (pinBgCheck.css("background-color") == "rgb(207, 187, 165)") {
      guess.forEach((el, i) => {
        changePinColor(i + 1, el, id);
      });
    }
  });
}

// check if guess length is correct
function checkGuessLength() {
  if (guess.length == answer.length) {
    return true;
  } else {
    return false;
  }
}

//  changes guess pins back to black
function changeBackToBlack() {
  for (let x = 1; x < 5; x++) {
    let pin = $(`#guess div:nth-child(${x})`);
    pin.css("background-color", "rgb(207, 187, 165)");
  }
}

// function to delete last item
function removeLastGuess() {
  guess.pop();
  let x = guess.length;
  let id = $(`#${x + 1}`);
  id.css("background-color", "rgb(207, 187, 165)");
}

$("#clear").click(function () {
  removeLastGuess();
});

function checkWin() {
  let win = true;
  answer.forEach((el, i) => {
    if (el !== guess[i]) {
      win = false;
    }
  });
  return win;
}

// Show result modal
function showResultModal(isWin) {
  const modal = document.getElementById("resultModal");
  const header = document.getElementById("resultHeader");
  const levelText = document.getElementById("levelText");
  const scoreText = document.getElementById("scoreText");
  const starContainer = document.getElementById("starContainer");

  header.textContent = isWin ? "Victory" : "Game Over";
  header.style.background = isWin
    ? "linear-gradient(90deg, #ffa600, #ff5e00)"
    : "linear-gradient(90deg, #a0a0a0, #555)";

  levelText.textContent = "3";

  // Score Logic (100 - 10 per turn)
  let score = 0;
  if (isWin) {
    score = Math.max(100 - (round - 1) * 10, 10);
  }
  scoreText.textContent = score.toFixed(3);

  // Star Rating Logic
  let stars = 0;
  if (isWin) {
    if (round <= 3) stars = 3;
    else if (round <= 6) stars = 2;
    else if (round <= 10) stars = 1;
  }

  // Set emoji stars
  starContainer.textContent = "★".repeat(stars);

  modal.classList.remove("hidden");
}

function check() {
  if (checkGuessLength() == true) {
    if (round < 11) {
      getGuessResults();
      changeRoundPins();
      changeBackToBlack();

      let win = checkWin(); // ✅ Get the result without showing modal

      if (win) {
        showResultModal(true); // ✅ Show Victory modal immediately
        $("#check").off("click");
        answer.forEach((el, i) => {
          changePinColor(i + 1, el, "#answer");
        });
        for (let i = 1; i < 5; i++) {
          let ans = $(`#answer div:nth-child(${i})`);
          ans.text("");
        }
      } else {
        if (round == 10) {
          showResultModal(false); // ✅ Show Game Over modal only at round 10
          answer.forEach((el, i) => {
            changePinColor(i + 1, el, "#answer");
          });
          for (let i = 1; i < 5; i++) {
            let ans = $(`#answer div:nth-child(${i})`);
            ans.text("");
          }
        } else {
          // feedback.text("Try Again");
          guess = [];
          round++; // ✅ Increase round only if not final
        }
      }
    }
  } else {
    feedback.text("CHOOSE MORE PINS DUMBASS");
  }
}
// check button on click
$("#check").click(function () {
  check();
});

function getGuessResults() {
  // creates new arrays from answer and guess
  let ans = Array.from(answer);
  let gs = Array.from(guess);

  // check for black pins
  gs.forEach((el, i) => {
    if (el == ans[i]) {
      indexOfCorrect.push(i);
      results.push("black");
    }
  });

  // remove correct answers from arrays
  let removeItems = indexOfCorrect.reverse();

  removeItems.forEach((el) => {
    ans.splice(el, 1);
    gs.splice(el, 1);
  });

  // sort guess arr without black answers so we start with biggest number
  gs.sort();
  ans.sort();

  // for each element of gs, if ans includes ele, push white to results, else increase wrong count;
  gs.forEach((el, i) => {
    if (ans.includes(el)) {
      results.push("white");
      let indOfEl = ans.indexOf(el);
      ans.splice(indOfEl, 1);
    }
  });

  changeResultPins();
  results = [];
  indexOfCorrect = [];
}
function changeResultPins() {
  results.forEach((el, i) => {
    let pin = $(`#ans${round} div:nth-child(${i + 1})`);
    pin.css("background-color", el);
  });
}

$("#reset").click(function () {
  answer = [];
  guess = [];
  indexOfCorrect = [];
  black = 0;
  white = 0;
  round = 1;
  results = [];
  feedback.text("New game loaded");
  win = undefined;
  selectedGuessPin = undefined;
  col_id = undefined;
  setAnswer();
  changeAllToBlack();
  $("#check").click(function () {
    check();
  });
});

function changeAllToBlack() {
  for (let i = 1; i < 11; i++) {
    for (let x = 1; x < 5; x++) {
      let pin = $(`#guess${i} div:nth-child(${x})`);
      pin.css("background-color", "rgb(207, 187, 165)");
    }
  }
  for (let i = 1; i < 11; i++) {
    for (let x = 1; x < 5; x++) {
      let pin = $(`#ans${i} div:nth-child(${x})`);
      pin.css("background-color", "rgb(238, 207, 172)");
    }
  }
  for (let i = 1; i < 5; i++) {
    let pin = $(`#guess div:nth-child(${i})`);
    pin.css("background-color", "rgb(207, 187, 165)");

    let ans = $(`#answer div:nth-child(${i})`);
    ans.css("background-color", "rgb(207, 187, 165)");
    ans.text("?");
  }
}

// // to store selected guess pin on click
$("body").click(function (event) {
  selectedGuessPin = event.target.id;
});

$(".selector_pin").click(function (event) {
  let pin = selectedGuessPin;
  let clickedId = this.id;
  let pushToGuess = indexOfClickedColor(clickedId);

  if (
    selectedGuessPin == "1" ||
    selectedGuessPin == "2" ||
    selectedGuessPin == "3" ||
    selectedGuessPin == "4"
  ) {
    // need to get id of clicked color
    $(`#${col_id}`).css("background-color");
    changePinColor(pin, col_id, "#guess");
    updateGuess(pushToGuess);
  }
  // ADD ANOTHER ELSE IF TO CHECK FOR BLANKS
  else {
    if (guess.length == 0) {
      colorClicked(clickedId);
      let pinNum = guess.length;
      let color = guess[guess.length - 1];
      changePinColor(pinNum, color, "#guess");
    } else {
      findEmptyPin();
      updateGuess(pushToGuess);
      changePinColor(emptyPin, col_id, "#guess");
    }
  }
  if (guess.length == 4) {
    return (emptyPin = null);
  }
});

function findEmptyPin() {
  for (let i = 3; i > -1; i--) {
    if (guess[i] == null) {
      emptyPin = i + 1;
    }
  }
  return emptyPin;
}

function indexOfClickedColor(clickedId) {
  switch (clickedId) {
    case "red":
      return (col_id = 0);
    case "blue":
      return (col_id = 1);
    case "green":
      return (col_id = 2);
    case "yellow":
      return (col_id = 3);
    case "purple":
      return (col_id = 4);
    case "orange":
      return (col_id = 5);
  }
}

// UPDATE ARRAY
function updateGuess(x) {
  if (
    selectedGuessPin == "1" ||
    selectedGuessPin == "2" ||
    selectedGuessPin == "3" ||
    selectedGuessPin == "4"
  ) {
    let index = selectedGuessPin - 1;
    if (guess.length == 0) {
      if (selectedGuessPin == 4) {
        guess.push(null, null, null, x);
      } else if (selectedGuessPin == 3) {
        guess.push(null, null, x, null);
      } else if (selectedGuessPin == 2) {
        guess.push(null, x, null, null);
      } else {
        guess.push(x);
      }
    } else if (guess.length == 1) {
      if (selectedGuessPin == 2) {
        guess.push(x);
      } else if (selectedGuessPin == 3) {
        guess.push(null, x);
      } else if (selectedGuessPin == 4) {
        guess.push(null, null, x);
      }
    } else if (guess.length == 2) {
      if (selectedGuessPin == 3) {
        guess.push(x);
      } else if (selectedGuessPin == 4) {
        guess.push(null, x);
      }
    } else {
      guess.splice(index, 1, x);
    }
  } else {
    let index = emptyPin - 1;
    guess.splice(index, 1, x);
  }
}
