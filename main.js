document.addEventListener("DOMContentLoaded", function () {
  const sounds = ["fire", "wind", "wave", "rain"];
  const master = document.getElementById("master-bottle");
  const masterWater = document.getElementById("master-water");
  let masterVolume = 1;

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
      audio.volume = volume * masterVolume;
      water.style.height = (volume * 100) + "%";
    }

    audio.volume = 0.5;
    water.style.height = "50%";
  });

  let draggingMaster = false;
  master.addEventListener("mousedown", e => {
    draggingMaster = true;
    adjustMaster(e);
  });
  document.addEventListener("mousemove", e => {
    if (draggingMaster) adjustMaster(e);
  });
  document.addEventListener("mouseup", () => draggingMaster = false);

  function adjustMaster(e) {
    const rect = master.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    masterVolume = Math.min(Math.max(1 - y / height, 0), 1);
    masterWater.style.height = (masterVolume * 100) + "%";
    sounds.forEach(name => {
      const audio = document.getElementById(`${name}-audio`);
      const sliderHeight = parseFloat(document.getElementById(`${name}-water`).style.height) / 100;
      audio.volume = sliderHeight * masterVolume;
    });
  }

  masterWater.style.height = "100%";
});


let paused = false;

document.getElementById("pause-all").addEventListener("click", function () {
  const sounds = ["fire", "wind", "wave", "rain"];
  paused = !paused;
  sounds.forEach(name => {
    const audio = document.getElementById(`${name}-audio`);
    if (paused) {
      audio.pause();
    } else {
      audio.play();
    }
  });
  this.textContent = paused ? "▶️ 播放所有声音" : "⏸️ 暂停所有声音";
});
