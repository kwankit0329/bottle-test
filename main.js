document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("fire-bottle");
  const water = document.getElementById("fire-water");
  const audio = document.getElementById("fire-audio");

  let dragging = false;
  svg.addEventListener("mousedown", e => {
    dragging = true;
    setVolume(e);
  });
  document.addEventListener("mousemove", e => {
    if (dragging) setVolume(e);
  });
  document.addEventListener("mouseup", () => {
    dragging = false;
  });

  function setVolume(e) {
    const rect = svg.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    let volume = 1 - y / height;
    volume = Math.min(Math.max(volume, 0), 1);
    audio.volume = volume;

    const waterHeight = 130 * volume;
    const newY = 260 - waterHeight;
    water.setAttribute("y", newY);
    water.setAttribute("height", waterHeight);
  }

  // Set default
  audio.volume = 0.5;
  water.setAttribute("y", "195");
  water.setAttribute("height", "65");
});
