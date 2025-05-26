document.addEventListener("DOMContentLoaded", () => {
  const playButtons = document.querySelectorAll(".play-btn");
  const sliders = document.querySelectorAll(".volume-slider");

  playButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sound = button.getAttribute("data-sound");
      const audio = document.getElementById(sound);

      if (audio.paused) {
        audio.play();
        button.textContent = "暂停";
        button.classList.add("playing");
      } else {
        audio.pause();
        button.textContent = "播放";
        button.classList.remove("playing");
      }
    });
  });

  sliders.forEach((slider) => {
    const sound = slider.getAttribute("data-sound");
    const audio = document.getElementById(sound);
    const water = document.getElementById("water-" + sound);

    slider.addEventListener("input", () => {
      audio.volume = slider.value;
      if (water) {
        const percent = parseFloat(slider.value) * 100;
        water.style.height = percent + "%";
      }
    });

    // 初始化设置水位
    slider.dispatchEvent(new Event("input"));
  });
});
