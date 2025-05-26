document.addEventListener('DOMContentLoaded', function() {
    const sounds = {
        fire: document.getElementById('fire'),
        rain: document.getElementById('rain'),
        wave: document.getElementById('wave'),
        wind: document.getElementById('wind')
    };

    const buttons = document.querySelectorAll('.play-btn');
    const sliders = document.querySelectorAll('.volume-slider');
    const pauseAllBtn = document.getElementById('pause-all');

    // Initialize volume
    Object.values(sounds).forEach(audio => {
        audio.volume = 0.5;
    });

    // Button controls for each sound
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const soundId = this.getAttribute('data-sound');
            const audio = sounds[soundId];

            if (audio.paused) {
                audio.play();
                this.textContent = 'Pause';
                this.classList.add('playing');
            } else {
                audio.pause();
                this.textContent = 'Play';
                this.classList.remove('playing');
            }
        });
    });

    // Volume control
    sliders.forEach(slider => {
        slider.addEventListener('input', function () {
            const soundId = this.getAttribute('data-sound');
            const volume = parseFloat(this.value);
            sounds[soundId].volume = volume;
        });
    });

    // Pause All functionality
    pauseAllBtn.addEventListener('click', function() {
        Object.values(sounds).forEach(audio => {
            audio.pause();
        });
        
        buttons.forEach(button => {
            button.textContent = 'Play';
            button.classList.remove('playing');
        });
    });
});
