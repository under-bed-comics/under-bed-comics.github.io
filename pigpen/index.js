var message = "undercover agent";
var message2 = "QEUUEXJ QHU\nQEUUEXJ QHU\nCAKXCVK HT\nEXK MAJ";

var lines = message2
  .split("\n")
  .map((line) =>
    line.split(" ").map((word) => word.toLocaleUpperCase().split(""))
  );

var inputs = document.getElementById("inputs");

function handleKeyUp(event) {
  var code = event.target.getAttribute("data-code");
  var key = event.key == "Backspace" ? "" : event.key.toLocaleUpperCase();

  if ((key.length === 1 && key >= "A" && key <= "Z") || key === "") {
    var all = document.querySelectorAll("input");
    all.forEach(function (input) {
      if (input.value === key) {
        input.value = "";
      }
    });
    var others = document.querySelectorAll('[data-code="' + code + '"]');

    others.forEach(function (input) {
      input.value = key;
    });
  }
}

lines.forEach(function (words) {
  words.forEach(function (word) {
    var wordElement = document.createElement("span");
    wordElement.setAttribute("class", "word");
    word.forEach(function (letter) {
      var img = document.createElement("img");
      img.setAttribute("src", "letters/" + letter + ".svg");

      var input = document.createElement("input");
      input.setAttribute("data-code", letter);
      input.setAttribute("size", "1");
      input.addEventListener("keyup", handleKeyUp);

      var span = document.createElement("span");
      span.setAttribute("class", "letter");
      span.appendChild(img);
      span.appendChild(input);
      wordElement.appendChild(span);
    });
    inputs.appendChild(wordElement);
  });
  inputs.appendChild(document.createElement("br"));
});
