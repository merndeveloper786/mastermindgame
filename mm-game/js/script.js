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
