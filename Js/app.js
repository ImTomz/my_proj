const intro = document.querySelector('.intro');
const inVideo = intro.querySelector('video');
const scrollDownTxt = intro.querySelector('.scrollDownTxt');
const welcomeTxt = document.querySelector('.welcomeMsg');
const burger = intro.querySelector('#burger-container')
const outro= document.querySelector('.outro')
const outVideo = outro.querySelector('video')
const mainContent = document.querySelector('main')

//Timeline for text animation in intro
const tl = new TimelineMax({ onUpdate: updatePercentage }); //Timeline on scroll update
//Timeline for text animation in outro
const tl2 = new TimelineMax({ onUpdate: updatePercentage }); //Timeline on scroll update

//Timeline animation for intro
tl.fromTo(scrollDownTxt,0.3,{opacity: 1},{opacity: 0})
  .from(welcomeTxt,.5,{opacity:0},1)
  .fromTo(burger,0.4,{right: -150, pointerEvents: 'none'},{right: 0, pointerEvents: 'all'},"-=1")

//Timeline animation for outro
tl2.to(burger,0.2,{right: -150,pointerEvents: 'none'},"-=1")

//Scene cotroller for scrolling effects
const controller = new ScrollMagic.Controller();

//Scene for intro
const scene = new ScrollMagic.Scene({
    duration: 1000,
    triggerElement: intro,
    triggerHook: 0
}).setTween(tl)
  .setPin(intro)
  .addTo(controller)

//Scene for outro
const scene2 = new ScrollMagic.Scene({
  duration: 1000,
  triggerElement: outro,
  triggerHook: "onLeave"
}).setTween(tl2)
.setPin(outro)
.addTo(controller)

// Variables for video animation in intro
let accelamountIntro = 0.1;
let scrollposIntro = 0;
let delayIntro = 0;
// Variables for video animation in outro
let accelamountOutro = 0.1;
let scrollposOutro = 0;
let delayOutro = 0;

// Updating scrollpos for intro video
scene.on("update", e => {
    scrollposIntro = e.scrollPos / 1000
});
// Updating scrollpos for outro video
scene2.on("update", e => {
  scrollposOutro = (e.scrollPos - (1000 + mainContent.scrollHeight ) - 1000) / 1000
})

// Interval for intro
setInterval(() => {
    delayIntro += (scrollposIntro - delayIntro) * accelamountIntro
    inVideo.currentTime = scrollposIntro
}, 33.33);
// Interval for outro
setInterval(() => {
  delayOutro += (scrollposOutro - delayOutro) * accelamountOutro
  outVideo.currentTime = scrollposOutro
}, 33.33);

// Update on scrolling function
function updatePercentage() {
    tl.progress();
}