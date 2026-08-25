let albumName = document.querySelector(".album-name");
let albumAuthor = document.querySelector(".album-author");
let songIndex = 0;
let currentTime = document.getElementById("current-time");
const songs = [
    {
        name: "Wavin' flag (FIFA WC 2006)",
        author: "by: K'naan",
        song: "./K'naan – Wavin' Flag.mp3",
    },

]

window.onload = function(){
    albumName.innerHTML = songs[songIndex].name;
    albumAuthor.innerHTML = songs[songIndex].author;
}

let forwardBtn = document.getElementById("forward-btn");
let backwardBtn = document.getElementById("backward-btn");
let music = new Audio(songs[songIndex].song);

forwardBtn.addEventListener("click", function(){
    songIndex += 1;
    progressBar.value = 0;
    music.pause();
    music = new Audio(songs[songIndex].song);
    music.play();
    if(songIndex >= songs.length){
        songIndex = 0;
    }
});

backwardBtn.addEventListener("click", function(){
    songIndex -= 1;
    progressBar.value = 0;
    music.pause();
    music = new Audio(songs[songIndex].song);
    music.play();
    if(songIndex <= songs.length){
        songIndex = songs.length - 1;
    }
})

let runMusicButton = document.getElementById("run-music-button");
runMusicButton.innerHTML = `<i class="fa-solid fa-play"></i>`;

runMusicButton.addEventListener("click", function(){
    if(!music.paused){
        music.pause();
        runMusicButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }else{
    music.play();
    runMusicButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
})


let progressBar = document.getElementById("progress-bar");
music.addEventListener("loadedmetadata", () => {
    progressBar.value = 0;
    setInterval(() =>{
        let seconds = Math.floor(music.currentTime);
        currentTime.innerHTML = `0:${seconds}`;

        if(seconds >= 60){
            let currentMinutes = seconds / 60;
            seconds = seconds % 60;
            currentTime.innerHTML = `${Math.floor(currentMinutes)}:0${seconds}`;
            if(seconds > 9 && currentMinutes > 0){
            currentTime.innerHTML = `${Math.floor(currentMinutes)}:${seconds}`;
            }
        }

        progressBar.max = music.duration;
    }, 1000);
});
music.addEventListener("timeupdate", function(){
    progressBar.value = music.currentTime;
})

progressBar.addEventListener("change", function(){
    music.currentTime = progressBar.value;
})


let volumeIcon = document.getElementById("volume-icon");
