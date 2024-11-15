const card = document.getElementById('card')
const starryNight = document.querySelector(".starry-night");
const tapHint = document.getElementById('tap-hint')
const button = document.getElementById('muteaudio');
const musicOn = '<i class="fas fa-volume-high"></i>';
const musicOff = '<i class="fas fa-volume-xmark"></i>';
const messagelist = [
    "Get some rest, my darling. You need it.",
    "Sweet dreams, you deserve them.",
    "Close your eyes, drift into dreamland, knowing you’re deeply loved.",
    "Lie down and relax. Sweetheart, rest.",
    "Rest knowing you are loved. Goodnight, lovely.",
    "Have a restful sleep. Love, sleep well.",
    "Let the stars sing you to sleep. Love, goodnight.",
    "Peace, love, and sweet dreams to you. Sweetheart, rest.",
    "Sleep well. Goodnight, sweetheart.",
    "Sleep like a cat, sleepyhead.",
    "Thinking of you. Sleep well!",
    "Have the sweetest of dreams.",
    "Sleep well. But if you get insomnia, I’m just a text away",
    "Sleep well and dream of your favorite person . . . 😉!!!",
    "Why are you still awake? Go to bed!",
    "Hope you had a great day. Good night.",
    "Have a peaceful night, babe",
    "Get some sleep, gorgeous!",
    "Wishing you the sweetest dreams as you drift off to sleep."
];
const random = Math.floor(Math.random() * messagelist.length);
var i = 0;
var speed = 50;
var message = messagelist[random];
const muteSound = new Howl({
    src: ['./audio/Romantic-Happy-Birthday.mp3'],
    // mute: false,
    // autoplay:true,
    loop: true,
    html5: true,
    volume: 1
});
muteSound.autoUnlock = false;
card.addEventListener('click', function(e) {
    e.preventDefault();
    $('html, body').css({ overflow: 'hidden' });
    card.classList.toggle('flipped');

    // if (tapHint) {
    //   tapHint.remove()
    // }
    // else if(!tapHint){
    //   tapHint.add()
    // }

});
// play music once tim flip card
card.addEventListener('click', playsongbirthday, { once: true });

function playsongbirthday() {
    muteSound.play();
}


// mute/unmute
button.addEventListener("click", () => {
    // if the audio is muted, set the btn.innerHTML to unmuteIcon
    // otherwise, set it to the muteIcon
    if (muteSound.muted) {
        button.innerHTML = musicOn;
        muteSound.mute(false);
    } else {
        button.innerHTML = musicOff;
        muteSound.mute(true);
    }
    // toggle the muted property of the audio element
    muteSound.muted = !muteSound.muted;
});

// Random TypeWriter Message

card.addEventListener('click', function() {
    setTimeout(function() {
        var typed = new Typed('.greeting-content', {
            strings: [messagelist[random]],
            typeSpeed: 40,
            showCursor: false
        });
    }, 2000);
}, { once: true });


// Function to generate random stars
function generateRandomStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starryNight.appendChild(star);
    }
}

generateRandomStars();