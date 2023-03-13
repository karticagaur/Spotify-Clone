console.log("Welcome To Spotify");

let songIndex = 0;
let audioElement = new Audio('audio/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "amari",                             filePath: "audio/1.mp3", coverPath: "cover/cover1.avif"},
    {songName: "my.life(with 21 Savage & Morray)",  filePath: "audio/2.mp3", coverPath: "cover/cover02.webp"},
    {songName: "punchin'.the.clock",                filePath: "audio/3.mp3", coverPath: "cover/cover03.webp"},
    {songName: "100 mil' (with Bas)",               filePath: "audio/4.mp3", coverPath: "cover/cover04.jpg"},
    {songName: "pride.is.the.devil(with Lil Baby)", filePath: "audio/5.mp3", coverPath: "cover/cover05.webp"},
    {songName: "let.go.my.hand(with Bas & 6LACK)",  filePath: "audio/6.mp3", coverPath: "cover/cover06.jpg"},
    {songName: "interlude",                         filePath: "audio/7.mp3", coverPath: "cover/cover07.jpg"},
    {songName: "hunger.on.hillside(with Bas)",      filePath: "audio/8.mp3", coverPath: "cover/cover08.webp"} 
]

//audioElement.play();

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    //updating seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `audio/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7)
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1
    }
    audioElement.src = `audio/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0)
    {
        songIndex = 0;
    }
    else
    {
        songIndex -= 1
    }
    audioElement.src = `audio/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})