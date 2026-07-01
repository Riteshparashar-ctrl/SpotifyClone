 console.log("Welcome to spotify")

//Initialize the variable
 let songIndex = 0;
 let audioElement = new Audio('songs/8.mp4');
//  audioElement.play();
 let masterPlay = document.getElementById('masterPlay')
//  console.log(masterPlay);
 let myProgressBar = document.getElementById('myProgressBar')
 let gif = document.getElementById('gif')
 let masterSongName = document.getElementById('masterSongName')
  let songItems = Array.from(document.getElementsByClassName('songItem'))
  let currentTime = document.getElementById('currentTime')

 let songs = [
     { songName: "salam-ee-Ishq", filePath: "songs/2.mp4" , coverPath: "Covers/2.webp"},
     { songName: "salam-er-Ishq", filePath: "songs/3.mp4" , coverPath: "Covers/3.webp"},
     { songName: "salam-e-rIshq", filePath: "songs/4.mp4" , coverPath: "Covers/4.webp"},
     { songName: "salam-e-tIshq", filePath: "songs/5.mp4" , coverPath: "Covers/5"},
     { songName: "salam-e-eIshq", filePath: "songs/6.mp4" , coverPath: "Covers/6.jpg"},
     { songName: "salam-e-Ieshq", filePath: "songs/7.mp4" , coverPath: "Covers/7.webp"},
     { songName: "salam-e-Isdhq", filePath: "songs/8.mp4" , coverPath: "Covers/8.webp"},
     { songName: "salam-e-Ishsq", filePath: "songs/9.mp4" , coverPath:"Covers/9.webp"},
     { songName: "salam-e-Ishqs", filePath: "songs/10.mp4" , coverPath: "Covers/10.webp"},
     { songName: "salam-e-Ishaq", filePath: "MP3.mpeg" , coverPath: "Covers/11.jpeg"},

 ]
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    let id = parseInt(element.id);
    let tempAudio = new Audio();
    tempAudio.preload = "metadata";
    tempAudio.src = `songs/${id}.mp4`;

    tempAudio.addEventListener("loadedmetadata", () => {
        let mins = Math.floor(tempAudio.duration / 60);
        let secs = Math.floor(tempAudio.duration % 60);

        let timeSpan = element.closest(".songlistplay").querySelector(".timespan");
        timeSpan.innerText = `${mins}:${secs.toString().padStart(2, "0")}`;
    });
});



  songItems.forEach((element,i)=>{
    //  console.log(element, i);
     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
     element.getElementsByClassName("songName")[0].innerText = songs[i].songName
  } )

//handle play/pause
 masterPlay.addEventListener('click', ()=>{
     
    
     if(audioElement.paused || audioElement.currentTime <= 0){
         
         audioElement.play();
         masterPlay.classList.remove('fa-play')
         masterPlay.classList.add('fa-pause')
         gif.style.opacity = 1;
     }
       else{
           audioElement.pause();
           masterPlay.classList.remove('fa-pause')
           masterPlay.classList.add('fa-play')
           gif.style.opacity = 0;
        }
})

// listen to events
 audioElement.addEventListener('timeupdate',()=>{
     //upadte seekbar
     if(audioElement.duration)
     progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
     myProgressBar.value = progress


     let minutes = Math.floor(audioElement.currentTime / 60);
let seconds = Math.floor(audioElement.currentTime % 60);

currentTime.innerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    
 })
 myProgressBar.addEventListener('change',()=>{
    
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
 })

 const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause')
        element.classList.add('fa-play');     
    })

 }
 Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=> {
        console.log(e.target);
        let clickedIndex = parseInt(e.target.id);
        // Same song chal raha hai → PAUSE
if(clickedIndex === songIndex && !audioElement.paused){
    audioElement.pause();
    e.target.classList.remove('fa-pause');
    e.target.classList.add('fa-play');
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
    gif.style.opacity = 0;
    return;
}

// Same song paused tha → RESUME
if(clickedIndex === songIndex && audioElement.paused){
    audioElement.play();
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    return;
}
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play'); 
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex}.mp4`; 
        masterSongName.innerText = songs[songIndex].songName;    
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        }) 
 })
 document.getElementById('forward').addEventListener('click',()=>{
    if(songIndex>=11){
        songIndex=0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp4`; 
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')


 })

 document.getElementById('backward').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
    songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp4`; 
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')


 })

