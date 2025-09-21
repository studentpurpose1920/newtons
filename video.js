document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openVideoPopup");
  const popup = document.getElementById("videoPopup");
  const closeBtn = document.getElementById("closeVideoPopup");
  const video = document.getElementById("popupVideo");

  if (openBtn && popup && closeBtn && video) {
    // Open popup & play
    openBtn.addEventListener("click", () => {
      popup.style.display = "flex";
      video.play();
    });

    // Close popup
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
      video.pause();
      video.currentTime = 0;
    });

    // Close when clicking outside
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
        video.pause();
        video.currentTime = 0;
      }
    });
  }
});
