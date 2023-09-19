const originalImageURL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/1200px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg";

const alternateImageURL =
  "https://d3d00swyhr67nd.cloudfront.net/_source/artuk_stories/vincent-van-gogh-1853-1890-self-portrait-1887-the-art-institute-of-chicago-joseph-winterbotham-collection-725px-1.jpg";

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
  console.log(angle);
  if (Number(angle.tiltY) > 5) {
    // If the tilt angle is greater than 30 degrees, switch to the alternate image
    console.log($(this));
    $(this).css("background-image", "url(" + alternateImageURL + ")");
  } else {
    // If the tilt angle is less than or equal to 30 degrees, revert to the original image
    $(this).css("background-image", "url(" + originalImageURL + ")");
  }
});
