$(document).ready(function () {
  $("#menu").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting
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

    $(this).hide();
    // Extract the form data

    // Use the extracted data as needed (e.g., display it, send it to a server, etc.)
    console.log("Name entered: " + name + " Number entered:" + number);

    var numbers = [];

    // Create an array of numbers from 1 to numberOfCards
    for (var i = 1; i <= number; i++) {
      numbers.push(i);
      numbers.push(i);
    }

    // Shuffle the numbers array using Fisher-Yates algorithm
    for (var i = numbers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = temp;
    }

    var numRows = Math.ceil(number / 10);

    // Assign the shuffled numbers in pairs to the memory cards
    var container = $(".memory-game");
    for (var i = 0; i < numbers.length; i++) {
      var card = $("<div>").addClass("memory-card");
      var bold = $("<b>");
      var content = $("<div>").addClass("content");
      var title = $("<p>").addClass("title").text(numbers[i]);

      content.append(title);
      card.append(bold);
      card.append(content);

      // Add a CSS class to adjust the layout
      if (numRows > 1) {
        card.addClass("card-row");
      }
      container.append(card);
    }
    const cards = $(".memory-card");

    function flipCard() {
      $(this).toggleClass("active");
    }

    cards.each(function () {
      $(this).on("click", flipCard);
    });
  });
});
