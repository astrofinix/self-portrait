const originalImageURL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/1200px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg";

const image2 =
  "https://d3d00swyhr67nd.cloudfront.net/_source/artuk_stories/vincent-van-gogh-1853-1890-self-portrait-1887-the-art-institute-of-chicago-joseph-winterbotham-collection-725px-1.jpg";

const image3 =
  "https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg";
const image4 = "https://iiif.micr.io/Rgwlg/full/1280,/0/default.jpg";
const image5 = "https://iiif.micr.io/CVAAm/full/1280,/0/default.jpg";
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
  document.getElementById("output").textContent =
    angle.tiltX + "<-->" + angle.tiltY;

    if ((Number(angle.tiltX) > 4 && Number(angle.tiltY) > 4) || (Number(angle.tiltX) > 0 && Number(angle.tiltY) > 5)) {
      console.log($(this));
      $(this).css("background-image", "url(" + image2 + ")");
    } else {
      $(this).css("background-image", "url(" + originalImageURL + ")");
    }
    
});


let gyroscope = new Gyroscope({ frequency: 60});

gyroscope.setEventListener("reading", () => {
    document.getElementById("output1").textContent = 
    gyroscope.x + "<-->" + gyroscope.y;

  });