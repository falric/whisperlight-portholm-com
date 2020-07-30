(function (window, document, undefined) {
  const { Terminal } = require("xterm");
  const term = new Terminal({
    logLevel: "off",
    cols: 60,
    cursorStyle: "bar",
  });
  term.open(document.getElementById("terminal"));

  console.log(term.getOption("cols"));

  let command = "";
  let login = false;
  let problemsSolved = 0;
  const requiredProblemsSolved = 2;
  let hack1 = false;
  let hack2 = false;

  function runFakeTerminal() {
    if (term._initialized) {
      return;
    }
    term._initialized = true;

    term.prompt = () => {
      term.write("\r\n$ ");
    };

    term.onData(handleInput);

    term.writeln("\x1b[1;36mWhisperlight Corporation Mainframe\r\n");
    term.writeln(
      "\x1b[1;31mHacker kit connected! Commands: [login] [hack] [track]"
    );
    term.writeln("\x1b[37m");

    prompt();
  }

  function prompt() {
    term.write(`${login ? "" : "\r\nUnautorized"}\r\n> `);
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
        if (!login) {
          term.write("\r\n");
          showProgressBar(function () {
            term.write("Login Successful. Welcome!");
          });
          login = true;
        }
        break;
      case "Hack":
      case "hack":
        if (login) {
          if (problemsSolved < requiredProblemsSolved) {
            term.write(
              `\r\nHacked ${problemsSolved}/${requiredProblemsSolved}\r\nf(x)=2,2x-66 | y=0?\r\nf(x)=x2-22 | f(11)?`
            );
          } else {
            term.write(
              `\r\nHacked ${problemsSolved}/${requiredProblemsSolved}\r\nf(x)=2,2x-66 | x=30\r\nf(x)=x2-22 | f(11)=99`
            );
          }
        }
        break;
      case "30":
        if (login) {
          if (!hack1) {
            hack1 = true;
            problemsSolved++;
          }
        }
        break;
      case "99":
        if (login) {
          if (!hack2) {
            hack2 = true;
            problemsSolved++;
          }
        }
        break;
      case "Track":
      case "track":
        if (login && hack1 && hack2) {
          term.write("\r\nTracking…");
          term.write(
            "\r\nFound CEO in penthouse apartment, section A. Use elevator 2."
          );
        }
        break;
      default:
        term.write("\r\nSyntax Error");
        break;
    }
  }

  function showProgressBar(callback) {
    var width = 0;
    var id = setInterval(progress, 200);
    function progress() {
      if (width == 20) {
        clearInterval(id);
        term.write("|\r\n\r\n");
        callback();
        prompt();
      } else {
        term.write("|=");
        width++;
      }
    }
  }

  runFakeTerminal();
})(window, document);
