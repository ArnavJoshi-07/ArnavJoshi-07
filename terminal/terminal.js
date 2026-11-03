const output = document.getElementById("terminal-output");
const input = document.getElementById("command-input");
const commandDisplay = document.getElementById("command-display");

const commandHistory = [];
let historyIndex = -1;

const commands = {
  help: () => `
available commands:

  whoami       display user information
  about        about me
  games        what I play
  skills       technologies and tools
  learning     what I'm learning right now
  certs        certifications in progress
  goals        goals for 2026
  neofetch     profile summary
  status       current focus
  clear        clear terminal
`,

  whoami: () =>
    "arnav",

  about: () => `
Arnav Joshi, second-year student at PES University.

Passionate about coding, gaming and watching movies.
Always curious to learn something new and build
cool projects along the way.

Coding and gaming sharpen the same skills:
focus, creativity and problem-solving.
`,

  games: () => `
CS2
Ultrakill
Doom
Batman
FarCry
Hollow Knight
`,

  skills: () => `
Languages:
  Python
  HTML
  SQL

Tools:
  Git
  GitHub
  VS Code
`,

  learning: () => `
Python for automation & data projects
Basics of databases & SQL
`,

  certs: () => `
Python Essentials            Coursera / HackerRank   In Progress
Git & GitHub Fundamentals    LinkedIn Learning       In Progress
`,

  goals: () => `
Build my first full-stack project
Contribute to an open-source project
Create a gaming-related web app or bot
Improve my DSA and problem-solving skills
`,

  neofetch: () => `
           arnav@github
           ----------------
Editor     VS Code
Languages  Python / HTML / SQL
Focus      Coding / Databases / DSA
University PES University
`,

  status: () =>
    "Learning to code one line at a time."
};

const availableCommands = Object.keys(commands);

function writeLine(text, className = "output") {
  const line = document.createElement("div");

  line.className = `line ${className}`;
  line.textContent = text;

  output.appendChild(line);

  output.scrollTop = output.scrollHeight;
}

function typeLine(text, className = "output", speed = 25) {
  return new Promise((resolve) => {
    const line = document.createElement("div");

    line.className = `line ${className}`;

    output.appendChild(line);

    let index = 0;

    const interval = setInterval(() => {
      line.textContent += text[index];

      index++;

      output.scrollTop = output.scrollHeight;

      if (index >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function updateCommandDisplay() {
  commandDisplay.textContent = input.value;
}

async function boot() {
  input.disabled = true;

  await typeLine(
    "Initializing environment...",
    "muted",
    20
  );

  await delay(250);

  await typeLine(
    "Loading profile...",
    "muted",
    20
  );

  await delay(250);

  await typeLine(
    "Loading shell...",
    "muted",
    20
  );

  await delay(250);

  await typeLine(
    "Loading modules...",
    "muted",
    20
  );

  await delay(350);

  await typeLine(
    "Ready.",
    "output",
    30
  );

  await delay(400);

  writeLine("");

  await typeLine(
    "Type 'help' to see available commands.",
    "muted",
    20
  );

  writeLine("");

  await typeLine(
    "Available commands:",
    "output",
    20
  );

  writeLine("");

  await typeLine(
    "  whoami       display user information",
    "output",
    10
  );

  await typeLine(
    "  about        about me",
    "output",
    10
  );

  await typeLine(
    "  games        what I play",
    "output",
    10
  );

  await typeLine(
    "  skills       technologies and tools",
    "output",
    10
  );

  await typeLine(
    "  learning     what I'm learning right now",
    "output",
    10
  );

  await typeLine(
    "  certs        certifications in progress",
    "output",
    10
  );

  await typeLine(
    "  goals        goals for 2026",
    "output",
    10
  );

  await typeLine(
    "  neofetch     profile summary",
    "output",
    10
  );

  await typeLine(
    "  status       current focus",
    "output",
    10
  );

  await typeLine(
    "  clear        clear terminal",
    "output",
    10
  );

  writeLine("");

  input.disabled = false;

  input.focus();

  updateCommandDisplay();
}

function execute(command) {
  const trimmed = command.trim().toLowerCase();

  if (!trimmed) {
    return;
  }

  commandHistory.push(command);

  historyIndex = commandHistory.length;

  writeLine(
    `arnav@github:~$ ${command}`,
    "command"
  );

  if (trimmed === "clear") {
    output.innerHTML = "";
    return;
  }

  if (commands[trimmed]) {
    writeLine(commands[trimmed]());
    return;
  }

  writeLine(
    `command not found: ${trimmed}. Type "help" for available commands.`,
    "muted"
  );
}

input.addEventListener("input", () => {
  updateCommandDisplay();
});

input.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {

    execute(input.value);

    input.value = "";

    updateCommandDisplay();

    return;
  }

  if (event.key === "Tab") {

    event.preventDefault();

    const current =
      input.value.trim().toLowerCase();

    if (!current) {
      return;
    }

    const matches =
      availableCommands.filter(
        command =>
          command.startsWith(current)
      );

    if (matches.length === 1) {

      input.value = matches[0];

      updateCommandDisplay();
    }

    return;
  }

  if (event.key === "ArrowUp") {

    event.preventDefault();

    if (commandHistory.length === 0) {
      return;
    }

    historyIndex =
      Math.max(
        0,
        historyIndex - 1
      );

    input.value =
      commandHistory[historyIndex];

    updateCommandDisplay();

    return;
  }

  if (event.key === "ArrowDown") {

    event.preventDefault();

    if (commandHistory.length === 0) {
      return;
    }

    historyIndex++;

    if (
      historyIndex >=
      commandHistory.length
    ) {

      historyIndex =
        commandHistory.length;

      input.value = "";

      updateCommandDisplay();

      return;
    }

    input.value =
      commandHistory[historyIndex];

    updateCommandDisplay();
  }
});

document.addEventListener("click", () => {
  if (!input.disabled) {
    input.focus();
  }
});

boot();