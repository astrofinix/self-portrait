// gsap.registerPlugin(Observer);

// let sections = document.querySelectorAll("section"),
//   images = document.querySelectorAll(".bg"),
//   headings = gsap.utils.toArray(".section-heading"),
//   outerWrappers = gsap.utils.toArray(".outer"),
//   innerWrappers = gsap.utils.toArray(".inner"),
//   splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })),
//   currentIndex = -1,
//   wrap = gsap.utils.wrap(0, sections.length),
//   animating;

// gsap.set(outerWrappers, { yPercent: 100 });
// gsap.set(innerWrappers, { yPercent: -100 });

// function gotoSection(index, direction) {
//   index = wrap(index); // make sure it's valid
//   animating = true;
//   let fromTop = direction === -1,
//       dFactor = fromTop ? -1 : 1,
//       tl = gsap.timeline({
//         defaults: { duration: 1.25, ease: "power1.inOut" },
//         onComplete: () => animating = false
//       });
//   if (currentIndex >= 0) {
//     // The first time this function runs, current is -1
//     gsap.set(sections[currentIndex], { zIndex: 0 });
//     tl.to(images[currentIndex], { yPercent: -15 * dFactor })
//       .set(sections[currentIndex], { autoAlpha: 0 });
//   }
//   gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
//   tl.fromTo([outerWrappers[index], innerWrappers[index]], {
//       yPercent: i => i ? -100 * dFactor : 100 * dFactor
//     }, {
//       yPercent: 0
//     }, 0)
//     .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
//     .fromTo(splitHeadings[index].chars, {
//         autoAlpha: 0,
//         yPercent: 150 * dFactor
//     }, {
//         autoAlpha: 1,
//         yPercent: 0,
//         duration: 1,
//         ease: "power2",
//         stagger: {
//           each: 0.02,
//           from: "random"
//         }
//       }, 0.2);

//   currentIndex = index;
// }

// Observer.create({
//   type: "wheel,touch,pointer",
//   wheelSpeed: -1,
//   onDown: () => !animating && gotoSection(currentIndex - 1, -1),
//   onUp: () => !animating && gotoSection(currentIndex + 1, 1),
//   tolerance: 10,
//   preventDefault: true
// });
const sections = document.querySelectorAll("section");
const images = document.querySelectorAll(".bg");
const headings = gsap.utils.toArray(".section-heading");
const outerWrappers = gsap.utils.toArray(".outer");
const innerWrappers = gsap.utils.toArray(".inner");

document.addEventListener("wheel", handleWheel);
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
document.addEventListener("touchend", handleTouchEnd);

let listening = false,
  direction = "down",
  current,
  next = 0;

const touch = {
  startX: 0,
  startY: 0,
  dx: 0,
  dy: 0,
  startTime: 0,
  dt: 0,
};

const tlDefaults = {
  ease: "slow.inOut",
  duration: 1.25,
};

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function slideIn() {
  if (current !== undefined) gsap.set(sections[current], { zIndex: 0 });

  gsap.set(sections[next], { autoAlpha: 1, zIndex: 1 });
  gsap.set(images[next], { yPercent: 0 });

  const tl = gsap
    .timeline({
      paused: true,
      defaults: tlDefaults,
      onComplete: () => {
        listening = true;
        current = next;
      },
    })
    .to([outerWrappers[next], innerWrappers[next]], { yPercent: 0 }, 0)
    .from(images[next], { yPercent: 15 }, 0);

  if (current !== undefined) {
    tl.add(
      gsap.to(images[current], {
        yPercent: -15,
        ...tlDefaults,
      }),
      0
    ).add(
      gsap
        .timeline()
        .set(outerWrappers[current], { yPercent: 100 })
        .set(innerWrappers[current], { yPercent: -100 })
        .set(images[current], { yPercent: 0 })
        .set(sections[current], { autoAlpha: 0 })
    );
  }

  tl.play(0);
}

// Slides a section out on scroll up
function slideOut() {
  gsap.set(sections[current], { zIndex: 1 });
  gsap.set(sections[next], { autoAlpha: 1, zIndex: 0 });

  gsap.set([outerWrappers[next], innerWrappers[next]], { yPercent: 0 });
  gsap.set(images[next], { yPercent: 0 });

  gsap
    .timeline({
      defaults: tlDefaults,
      onComplete: () => {
        listening = true;
        current = next;
      },
    })
    .to(outerWrappers[current], { yPercent: 100 }, 0)
    .to(innerWrappers[current], { yPercent: -100 }, 0)
    .to(images[current], { yPercent: 15 }, 0)
    .from(images[next], { yPercent: -15 }, 0)

    .set(images[current], { yPercent: 0 });
}

function handleWheel(e) {
  if (!listening) return;
  direction = e.wheelDeltaY < 0 ? "down" : "up";
  handleDirection();
}

function handleTouchStart(e) {
  if (!listening) return;
  const t = e.changedTouches[0];
  touch.startX = t.pageX;
  touch.startY = t.pageY;
}

function handleTouchMove(e) {
  if (!listening) return;
  e.preventDefault();
}

function handleTouchEnd(e) {
  if (!listening) return;
  const t = e.changedTouches[0];
  touch.dx = t.pageX - touch.startX;
  touch.dy = t.pageY - touch.startY;
  if (touch.dy > 10) direction = "up";
  if (touch.dy < -10) direction = "down";
  handleDirection();
}

slideIn();

document.getElementById("bottom").addEventListener("click", () => {
  next = sections.length - 1;
  slideIn();
});
document.getElementById("top").addEventListener("click", () => {
  next = 0;
  slideOut();
});

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
function handleDirection() {
  listening = false;

  if (direction === "down") {
    next = current + 1;
    if (next >= sections.length) next = 0;
    slideIn();
  }

  if (direction === "up") {
    next = current - 1;
    if (next < 0) next = sections.length - 1;
    slideOut();
  }
    
  // document.addEventListener("keydown", function (e) {
  //   if (e.key === "ArrowUp") {
  //     next = current - 1;
  //     if (next < 0) next = sections.length - 1;
  //     slideOut();
  //   } else if (e.key === "ArrowDown") {
  //     next = current + 1;
  //     if (next >= sections.length) next = 0;
  //     slideIn();
  //   }
  // });
}
// gotoSection(0, 1);
