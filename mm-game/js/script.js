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
