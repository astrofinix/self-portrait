const originalImageURL = "./img/base.webp"
const image2 = "./img/word.webp"
const image3 = "./img/van.webp"
const image4 = "./img/dep.webp";
const image5 ="./img/meme.webp"
const image6 = "./img/raw.png"
const image7 = "./img/man.webp"

const preloadImages = [
  originalImageURL,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7
];

preloadImages.forEach(function (src) {
  const img = new Image();
  img.src = src;
});

// Your existing code
$(document).ready(function () {
  // Initialize Tilt.js on the parallax-image element
  $(".parallax-image").tilt({
    perspective: 500,
    scale: 1,
  });
  // Store the original background image URL

  // Listen for the "tilt" event on the parallax-image element
});
$(".parallax-image").on("change", function (event, angle) {
  // document.getElementById("output").textContent =
  //   angle.tiltX + "<-->" + angle.tiltY;

  if (
    //lower left
    (Number(angle.tiltX) > 4 && Number(angle.tiltY) > 4) ||
    (Number(angle.tiltX) > 0 && Number(angle.tiltY) > 5)
  ) {
    $(this).css("background-image", "url(" + image2 + ")");
  } else if (
    //lower right
    (Number(angle.tiltX) < -4 && Number(angle.tiltY) > 4) ||
    (Number(angle.tiltX) > 0 && Number(angle.tiltY) > 5)
  ) {
    $(this).css("background-image", "url(" + image3 + ")");
  } else if (
    // right
    (Number(angle.tiltX) < -4 && Number(angle.tiltY) > 4) ||
    (Number(angle.tiltX) < -4 && Number(angle.tiltY) > -5)
  ) {
    $(this).css("background-image", "url(" + image4 + ")");
  } else if (
    //upper right
    (Number(angle.tiltX) < -4 && Number(angle.tiltY) > -4) ||
    (Number(angle.tiltX) < 0 && Number(angle.tiltY) < -5)
  ) {
    $(this).css("background-image", "url(" + image5 + ")");
  } else if (
    //upper left
    (Number(angle.tiltX) > 4 && Number(angle.tiltY) < -4) ||
    (Number(angle.tiltX) < 0 && Number(angle.tiltY) < -5)
  ) {
    $(this).css("background-image", "url(" + image6 + ")");
  } else if (
    //
    // (Number(angle.tiltX) < 0)
    (Number(angle.tiltX) > 4 && Number(angle.tiltY) < 4) ||
    (Number(angle.tiltX) > 4 && Number(angle.tiltY) < -5)
  ) {
    $(this).css("background-image", "url(" + image7 + ")");
  } else {
    $(this).css("background-image", "url(" + originalImageURL + ")");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (e) {
    // Check if the pressed key is an arrow key
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault(); // Prevent the default behavior of arrow keys (e.g., scrolling the page)

      // Scroll the document based on the arrow key
      switch (e.key) {
        case "ArrowUp":
          window.scrollBy(0, -10);
          console.log("TEST"); // Scroll up
          break;
        case "ArrowDown":
          console.log("TEST");
          window.scrollBy(0, 10); // Scroll down
          break;
        case "ArrowLeft":
          window.scrollBy(-10, 0); // Scroll left
          console.log("TEST")
          break;
        case "ArrowRight":
          console.log("TEST")  
        window.scrollBy(10, 0); // Scroll right
          break;
      }
    }
  });
});