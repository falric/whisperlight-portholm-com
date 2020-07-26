(function (window, document, undefined) {
  const { Terminal } = require("xterm");
  const term = new Terminal({ logLevel: "off", cols: 60 });
  term.open(document.getElementById("terminal"));

  console.log(term.getOption("cols"));

  let command = "";

  function runFakeTerminal() {
    if (term._initialized) {
      return;
    }
    term._initialized = true;

    term.prompt = () => {
      term.write("\r\n$ ");
    };

    term.onData(handleInput);

    term.writeln("\x1b[1;36mWhisperlight Corporation Mainframe");
    term.writeln("\x1b[37m");

    prompt(term);
  }

  function prompt(term) {
    term.write("\r\n$ ");
  }

  function handleInput(e) {
    switch (e) {
      case "\r": // Enter
        // Handle entered command
        handleCommand(command);
        // Clear command
        command = "";
        // Show prompt
        prompt(term);
        break;
      case "\u0003": // Ctrl+C
        // Clear command
        command = "";
        // Show prompt
        prompt(term);
        break;
      case "\u007F": // Backspace (DEL)
        // Remove last character in command
        command = command.substr(0, command.length - 1);
        // Do not delete the prompt
        if (term._core.buffer.x > 2) {
          term.write("\b \b");
        }
        break;
      default:
        // Add to command
        command += e;
        // Print entered character
        term.write(e);
    }
  }

  function handleCommand(command) {
    switch (command) {
      case "":
        break;
      case "Login":
      case "login":
        term.write("\r\nLogin…");
        break;
      default:
        term.write("\r\nSyntax Error");
        break;
    }
  }

  runFakeTerminal();
})(window, document);
