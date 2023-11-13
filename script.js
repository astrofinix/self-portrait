const originalImageURL = "./img/base.webp"
const image2 = "./img/word.webp"
const image3 =
  "https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg";
const image4 = "https://iiif.micr.io/Rgwlg/full/1280,/0/default.jpg";
const image5 ="./img/meme.webp"
const image6 = "./img/raw.png"
const image7 =
  "https://assets1.cbsnewsstatic.com/hub/i/2011/06/21/40c3e006-a643-11e2-a3f0-029118418759/Netherlands_Van_Goghs_Bro.JPEG";
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

// let sensor = new Gyroscope();
// let x, y, z, report;
// sensor.addEventListener("reading", () => {
//   document.getElementById("output1").textContent = sensor.x + "<-->" + sensor.y;
// });

// sensor.start();

// if ('Gyroscope' in window) {
//   let gyroscope = new Gyroscope({ frequency: 60 });

//   gyroscope.addEventListener("reading", () => {
//     document.getElementById("output1").textContent =
//       `Angular velocity along the X-axis: ${gyroscope.x}, Angular velocity along the Y-axis: ${gyroscope.y}`;
//   });

//   gyroscope.addEventListener("error", (event) => {
//     console.error("Error accessing gyroscope:", event.error);
//   });

//   gyroscope.start();
// } else {
//   document.getElementById("output1").textContent = "Gyroscope not supported on this device/browser.";
// }
function onClick() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === "granted") {
          window.addEventListener("devicemotion", handleOrientation);
        } else {
          document.getElementById("output1").textContent =
            "Request to access the orientation was rejected";
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener("devicemotion", handleOrientation);
  }
}
//sensor.onreading = () => {
//sensor.getElementById("output1").textContent =
//sensor.x + "<-->" + sensor.y;
//}
//function errorHandler(event) {
//console.log(event.error.name, event.error.message);
//}

//window.addEventListener("deviceorientation", handleOrientation);

//function handleOrientation(event) {
//var beta = event.beta;
// var gamma = event.gamma;
// var alpha = event.alpha;
//document.getElementById("output1").textContent = beta + " " + gamma + " " +alpha;

//}
