$(document).ready(function () {
  $(".game-over").hide();
  $("#pause").hide();
  $("#timer").hide();
  $(".button-menu").hide();
  $("#menu").submit(function (event) {
    event.preventDefault();

    var formData = $(this).serializeArray();
    var name = formData[0].value;
    var number = formData[1].value;
    if (isNaN(number)) {
      alert("Please Enter a Number");
      return;
    }
    if (number > 30 || number < 1) {
      alert("Please Enter a number (1-30)");
      return;
    }
    $(".button-menu").show();
    $("#player").text(name.toString());
    $("#timer").show();

    $(this).hide();

    let oneSelected = undefined;
    let twoSelected = undefined;

    console.log("Name entered: " + name + " Number entered:" + number);

    var numbers = [];

    // Create an array of numbers from 1 to numberOfCards
    for (var i = 1; i <= number; i++) {
      numbers.push(i);
      numbers.push(i);
    }

    for (var i = numbers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = temp;
    }

    //var numRows = Math.ceil(number / 10);

    var container = $(".memory-game");
    var timerElement = $("#timer");
    var seconds = 0;
    var minutes = 0;
    var hours = 0;

    function updateTimer() {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }

      var formattedTime =
        formatTime(hours) +
        ":" +
        formatTime(minutes) +
        ":" +
        formatTime(seconds);
      timerElement.text(formattedTime);
    }

    function formatTime(time) {
      return time < 10 ? "0" + time : time;
    }

    $("#pause").on("click", pauseButton);

    function pauseButton() {
      $(this).off("click", pauseButton);
      cards.each(function () {
        $(this).off("click", flipCard);
      });
      clearInterval(timerInterval);
      $(this).text("Resume").on("click", resumeButton);
    }

    function resumeButton() {
      $(this).off("click", resumeButton);
      cards.each(function () {
        $(this).on("click", flipCard);
      });
      timerInterval = setInterval(updateTimer, 1000);
      $(this).text("Pause").on("click", pauseButton);
    }

    for (var i = 0; i < numbers.length; i++) {
      var card = $("<div>").addClass("memory-card");
      var bold = $("<b>");
      var content = $("<div>").addClass("content");
      var title = $("<p>").addClass("title").text(numbers[i]);

      content.append(title);
      card.append(bold);
      card.append(content);

      container.append(card);
    }
    const cards = $(".memory-card");
    let numberOfPairs = 0;
    let gameStarted = false;
    var timerInterval;
    function flipCard() {
      if (oneSelected == undefined) {
        if (!gameStarted) {
          gameStarted = true;
          $("#pause").show();
          timerInterval = setInterval(updateTimer, 1000);
        }
        oneSelected = $(this);
        oneSelected.toggleClass("active");
        return;
      }
      if (twoSelected == undefined && !$(this).is(oneSelected)) {
        twoSelected = $(this);
        if (twoSelected.text() == oneSelected.text()) {
          twoSelected.toggleClass("active");
          numberOfPairs++;
          if (number == numberOfPairs) {
            finishGame();
          }
          oneSelected = undefined;
          twoSelected = undefined;
          return;
        }
        twoSelected.toggleClass("active");
        setTimeout(clearCards, 1000);
        return;
      }
    }
    function clearCards() {
      oneSelected.toggleClass("active");
      twoSelected.toggleClass("active");
      oneSelected = undefined;
      twoSelected = undefined;
    }
    function finishGame() {
      $(".win").text(name + " Congratulations for winning the game!");
      $(".game-over").show();
      cards.each(function () {
        $(this).off("click", flipCard);
      });
      clearInterval(timerInterval);
      $("#pause").hide();
    }

    cards.each(function () {
      $(this).on("click", flipCard);
    });
  });
});
