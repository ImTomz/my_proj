const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const scrollDownTxt = intro.querySelector('.scrollDownTxt');
const welcomeTxt = document.querySelector('.welcomeMsg')

//Timeline for text animation
const tl = new TimelineMax({ onUpdate: updatePercentage }); //Timeline on scroll update
tl.fromTo(scrollDownTxt,2.5,{opacity: 1},{opacity: 0})
  .from(welcomeTxt,1.5,{opacity:0},10)

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    duration: 2000,
    triggerElement: intro,
    triggerHook: 0
}).setTween(tl)
  .setPin(intro)
  .addTo(controller)

let accelamount = 0.1
let scrollpos = 0
let delay = 0

scene.on("update", e => {
    scrollpos = e.scrollPos / 1000
})

setInterval(() => {
    delay += (scrollpos - delay) * accelamount
    video.currentTime = scrollpos
}, 33.33);

// Update on scrolling function
function updatePercentage() {
    tl3.progress();
  }