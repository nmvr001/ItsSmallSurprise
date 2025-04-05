$(document).ready(function () {
    let isSongPlaying = false;
    let isBgMusicPlaying = false;
    let countdownFinished = false; // Flag to track when countdown ends
    let bgMusic = $("#background-music")[0];
    let song = $("#birthday-song")[0];

    // Play background music after countdown ends and first user interaction
    $(document).click(function () {
        if (countdownFinished && !isBgMusicPlaying) {
            bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
            isBgMusicPlaying = true;
        }
    });

    // Toggle birthday song and background music
    $("#song-button").click(function () {
        if (isSongPlaying) {
            // Stop both sounds
            song.pause();
            song.currentTime = 0; // Reset song to beginning
            bgMusic.pause(); // Stop background music but don't reset
            $(this).text("Click here for a surprise 😊 ");
        } else {
            // Stop background music before playing birthday song
            if (!bgMusic.paused) {
                bgMusic.pause();
            }
            song.play();
            $(this).text("Pause the song ⏸️");
        }
        isSongPlaying = !isSongPlaying;
    });

    function RunTimer() {
        const fixDate = new Date(2025, 3, 13, 0, 0, 0, 0);
        const d = new Date();
        const difference = fixDate - d;

        if (difference <= 0) {
            $("#countdown-container").hide(); // Hide countdown when time is up
            $("#birthday-content").fadeIn("slow"); // Smoothly reveal content
            countdownFinished = true; // Set flag to true so music can play
            return;
        }

        const days_left = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours_left = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes_left = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds_left = Math.floor((difference % (1000 * 60)) / 1000);

        $("#days").text(`${days_left} d`);
        $("#hours").text(`${hours_left} h`);
        $("#minutes").text(`${minutes_left} m`);
        $("#seconds").text(`${seconds_left} s`);
    }

    $("#birthday-content").hide(); // Ensure content is hidden on page load
    RunTimer();
    setInterval(RunTimer, 1000);
});

// 🖼️ Slideshow Logic
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}
