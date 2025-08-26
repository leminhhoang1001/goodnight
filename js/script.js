const card = document.getElementById('card')
const starryNight = document.querySelector(".starry-night");
const tapHint = document.getElementById('tap-hint')
const button = document.getElementById('muteaudio');
const musicOn = '<i class="fas fa-volume-high"></i>';
const musicOff = '<i class="fas fa-volume-xmark"></i>';
// const messagelist = [
//     "Get some rest, my darling. You need it.",
//     "Sweet dreams, you deserve them.",
//     "Close your eyes, drift into dreamland, knowing you’re deeply loved.",
//     "Lie down and relax. Sweetheart, rest.",
//     "Rest knowing you are loved. Goodnight, lovely.",
//     "Have a restful sleep. Love, sleep well.",
//     "Let the stars sing you to sleep. Love, goodnight.",
//     "Peace, love, and sweet dreams to you. Sweetheart, rest.",
//     "Sleep well. Goodnight, sweetheart.",
//     "Sleep like a cat, sleepyhead.",
//     "Thinking of you. Sleep well!",
//     "Have the sweetest of dreams.",
//     "Sleep well. But if you get insomnia, I’m just a text away",
//     "Sleep well and dream of your favorite person . . . 😉!!!",
//     "Why are you still awake? Go to bed!",
//     "Hope you had a great day. Good night.",
//     "Have a peaceful night, babe",
//     "Get some sleep, gorgeous!",
//     "Wishing you the sweetest dreams as you drift off to sleep."
// ];
let messagelist = [];
let lastIndex = -1; // Lưu chỉ mục tin nhắn trước đó
// const random = Math.floor(Math.random() * messagelist.length);
// var i = 0;
// var speed = 50;
// var message = messagelist[random];
const muteSound = new Howl({
    src: ['./audio/Oxygen.mp3'],
    // mute: false,
    // autoplay:true,
    loop: true,
    html5: true,
    volume: 1
});
muteSound.autoUnlock = false;

// Hàm đọc file .txt và chuyển nội dung thành mảng
// Hàm tải danh sách câu chúc từ file JSON
async function loadMessages() {
    try {
        const response = await fetch('js/goodnight.json'); // Đường dẫn tới file JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        messagelist = await response.json(); // Parse JSON thành mảng
        console.log('Danh sách câu chúc đã tải thành công:', messagelist);
    } catch (error) {
        console.error('Lỗi khi tải danh sách câu chúc:', error.message);
    }
}

// Hàm lấy số ngẫu nhiên sử dụng crypto
function getSecureRandomIndex(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max; // Lấy phần dư để đảm bảo trong khoảng 0 đến max - 1
}

card.addEventListener('click', function(e) {
    e.preventDefault();
    $('html, body').css({ overflow: 'hidden' });
    card.classList.toggle('flipped');

    // Kiểm tra nếu đang ở mặt sau (lớp "flipped" được thêm vào)
    if (card.classList.contains('flipped')) {
        setTimeout(() => {
            if (messagelist.length === 0) {
                console.error('Danh sách câu chúc trống hoặc chưa được tải.');
                return;
            }

            // Chọn câu chúc ngẫu nhiên
            let random;
            do {
                random = getSecureRandomIndex(messagelist.length);
            } while (random === lastIndex); // Đảm bảo không lặp lại liên tiếp

            lastIndex = random; // Cập nhật chỉ mục mới
            const message = messagelist[random];

            // Xóa nội dung cũ trước khi hiển thị câu chúc mới
            const messageContainer = document.querySelector('.greeting-content');
            if (messageContainer) {
                messageContainer.innerHTML = ''; // Xóa nội dung cũ
            }

            setTimeout(() =>{
                // Hiển thị câu chúc mới
                new Typed('.greeting-content', {
                    strings: [message],
                    typeSpeed: 60,
                    showCursor: false
                });
            }, 3000);
            // Hiển thị câu chúc mới
            // new Typed('.greeting-content', {
            //     strings: [message],
            //     typeSpeed: 40,
            //     showCursor: false
            // });
        }, 60); // Thời gian trễ để khớp với hiệu ứng lật
    }
});

// Tải danh sách câu chúc khi trang được tải
loadMessages();


// play music once tim flip card
card.addEventListener('click', playsongbirthday, { once: true });

function playsongbirthday() {
    muteSound.play();
}


button.addEventListener("click", () => {
    // if the audio is muted, set the btn.innerHTML to unmuteIcon
    // otherwise, set it to the muteIcon
    console.log("Nút đã được bấm!"); 
    console.log("Trạng thái mute hiện tại là:", muteSound.muted);

    if (muteSound.muted) {
        button.innerHTML = musicOn;
        muteSound.mute(false);
        console.log("Đã unmute. Trạng thái mới là:", muteSound.muted);
    } else {
        button.innerHTML = musicOff;
        muteSound.mute(true);
        console.log("Đã mute. Trạng thái mới là:", muteSound.muted);
    }
    // toggle the muted property of the audio element
    muteSound.muted = !muteSound.muted;
});

// Random TypeWriter Message

// card.addEventListener('click', function() {
//     setTimeout(function() {
//         var typed = new Typed('.greeting-content', {
//             strings: [messagelist[random]],
//             typeSpeed: 60,
//             showCursor: false
//         });
//     }, 3000);
// }, { once: true });

// update date of card
var date = moment();
document.getElementById("date").innerHTML = date.format('DD.MM.YYYY');

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