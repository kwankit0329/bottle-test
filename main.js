document.addEventListener("DOMContentLoaded", function () {
  const sounds = ["fire", "wind", "wave", "rain"];
  sounds.forEach(name => {
    const bottle = document.getElementById(`${name}-bottle`);
    const water = document.getElementById(`${name}-water`);
    const audio = document.getElementById(`${name}-audio`);

    let dragging = false;
    bottle.addEventListener("mousedown", (e) => {
      dragging = true;
      adjustVolume(e);
    });
    document.addEventListener("mousemove", (e) => {
      if (dragging) adjustVolume(e);
    });
    document.addEventListener("mouseup", () => dragging = false);

    function adjustVolume(e) {
      const rect = bottle.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;
      let volume = 1 - y / height;
      volume = Math.min(Math.max(volume, 0), 1);
      audio.volume = volume;
      water.style.height = (volume * 100) + "%";
    }

    audio.volume = 0.5;
    water.style.height = "50%";
  });
});
