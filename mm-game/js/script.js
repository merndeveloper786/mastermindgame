//RULES
$("#rules-btn").click(function () {
  swal({
    content: "text",
    title: "Instructions",
    text: "You have 10 turns. Black pins represent the correct colored pin in the correct place. White pins mean you have the correct colored pin but in the wrong place.",
    buttons: {
      confirm: { text: "PLAY TIME", className: "sweet-hover" },
    },
  });
});
// satrt button
$("#start-game").click(function () {
  $("#main-menu").hide();
  $("#game-board").show();
});

// duplicate button
$("#name-duplicate").click(function () {
  swal(
    "Feature Coming Soon!",
    "Name Duplicate feature is under development.",
    "info"
  );
});

let answerChoices = ["red", "blue", "green", "yellow", "purple", "orange"];

let answer = [];
let guess = [];
let indexOfCorrect = [];
let black = 0;
let white = 0;
let round = 1;
let results = [];
let feedback = $(".feedback_container");
let win;
let selectedGuessPin;
let col_id;
let emptyPin;

function setAnswer() {
  for (let x = 0; x < 4; x++) {
    let colorIndex = Math.floor(Math.random() * 6);
    answer.push(colorIndex);
    console.log(answer);
  }
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

function check() {
  if (checkGuessLength() == true) {
    if (round < 11) {
      getGuessResults();
      changeRoundPins();
      changeBackToBlack();
      if (win == true) {
        $("#check").off("click");
        answer.forEach((el, i) => {
          changePinColor(i + 1, el, "#answer");
        });
        for (let i = 1; i < 5; i++) {
          let ans = $(`#answer div:nth-child(${i})`);
          ans.text("");
        }
      } else if (win == false && round == 10) {
        answer.forEach((el, i) => {
          changePinColor(i + 1, el, "#answer");
        });
        for (let i = 1; i < 5; i++) {
          let ans = $(`#answer div:nth-child(${i})`);
          ans.text("");
        }
      } else {
        round++;
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
