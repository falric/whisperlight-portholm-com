require("./terminal");

function toggleTerminal() {
  const terminalClassList = document.getElementById("terminal").classList;
  terminalClassList.toggle("invisible");
  const noTerminalClassList = document.getElementById("no-terminal").classList;
  noTerminalClassList.toggle("hidden");
  const corporateBsElements = document.querySelectorAll(".corporate-bs");
  corporateBsElements.forEach(function (elm) {
    elm.classList.toggle("hidden");
  });
}

(function (window, document, undefined) {
  const toggleTerminalButton = document.getElementById("toggle-terminal");
  toggleTerminalButton.addEventListener("click", toggleTerminal);
})(window, document);
