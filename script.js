const colorThemes = [
  {
    // Nuclear Red
    "--_y1": "#faa5a5",
    "--_y2": "#fb0808",
    "--_o1": "#ff0c0c",
    "--_o2": "#e70202",
    "--_o3": "#b30101",
    "--m1": "#fd0909",
    "--m2": "#e40303",
    "--m3": "#ac0404",
  },
  {
    // Neon Blue
    "--_y1": "#a5f3fa",
    "--_y2": "#08d6fb",
    "--_o1": "#0c8fff",
    "--_o2": "#0247e7",
    "--_o3": "#0128b3",
    "--m1": "#09eafd",
    "--m2": "#0367e4",
    "--m3": "#042aac",
  },
  {
    // Ghostly White
    "--_y1": "#ffffff",
    "--_y2": "#e0e0e0",
    "--_o1": "#cccccc",
    "--_o2": "#aaaaaa",
    "--_o3": "#777777",
    "--m1": "#ffffff",
    "--m2": "#bbbbbb",
    "--m3": "#888888",
  },
  {
    // Cyberpunk Pink/Purple
    "--_y1": "#faa5f3",
    "--_y2": "#fb08d6",
    "--_o1": "#ff0c8f",
    "--_o2": "#e70247",
    "--_o3": "#b30128",
    "--m1": "#fd09ea",
    "--m2": "#e40367",
    "--m3": "#ac042a",
  },
  {
    // Classic Amber/Orange
    "--_y1": "#fae8a5",
    "--_y2": "#fbd608",
    "--_o1": "#ff8f0c",
    "--_o2": "#e74702",
    "--_o3": "#b32801",
    "--m1": "#fdea09",
    "--m2": "#e46703",
    "--m3": "#ac2a04",
  },
];

let currentThemeIndex = 4;
for (const [variable, color] of Object.entries(
  colorThemes[currentThemeIndex],
)) {
  document.body.style.setProperty(variable, color);
}
let lastDisplayStr = "";
let lastHourStr = "";

function updateTimeAndDate() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  let amPm = hours >= 12 ? "PM" : "AM";

  const currentHourStr = hours + amPm;

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  let timeStr = hours.toString().padStart(2, "0") + minutes;
  if (timeStr.startsWith("0")) {
    timeStr = " " + timeStr.slice(1);
  }
  let month = (now.getMonth() + 1).toString().padStart(2, "0");
  let day = now.getDate().toString().padStart(2, "0");
  const year = now.getFullYear().toString().slice(-2);
  if (month.startsWith("0")) {
    month = " " + month.slice(1);
  }
  if (day.startsWith("0")) {
    day = " " + day.slice(1);
  }
  const displayStr = timeStr + amPm + month + day + year;

  if (displayStr !== lastDisplayStr) {
    animateDigits(displayStr);
    lastDisplayStr = displayStr;

    // Change color theme every minute
    currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
    const theme = colorThemes[currentThemeIndex];
    for (const [variable, color] of Object.entries(theme)) {
      document.body.style.setProperty(variable, color);
    }

    /* 
        // --- ALTERNATIVE: Change color theme every hour instead of every minute ---
        // To use this, comment out the "Change color theme every minute" block above,
        // and uncomment the block below.
        
        if (lastHourStr !== "" && currentHourStr !== lastHourStr) {
            currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
            const theme = colorThemes[currentThemeIndex];
            for (const [variable, color] of Object.entries(theme)) {
                document.body.style.setProperty(variable, color);
            }
        }
        lastHourStr = currentHourStr;
        */
  }
}

function animateDigits(targetStr) {
  const chars = "0123456789";
  let iterations = 0;
  const maxIterations = 15;

  const interval = setInterval(() => {
    iterations++;
    for (let i = 0; i < 12; i++) {
      let charToShow = targetStr[i];

      if (iterations < maxIterations - i * 0.5 && targetStr[i] !== " ") {
        if (targetStr[i] >= "A" && targetStr[i] <= "Z") {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          charToShow = letters[Math.floor(Math.random() * letters.length)];
        } else {
          charToShow = chars[Math.floor(Math.random() * chars.length)];
        }
      }

      document.getElementById("char" + i + "1").textContent = charToShow;
      document.getElementById("char" + i + "2").textContent = charToShow;
    }

    if (iterations >= maxIterations) {
      clearInterval(interval);
    }
  }, 50);
}

updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);
