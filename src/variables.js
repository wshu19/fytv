let get = {
    channelBuffer: 0,
    n: 0,
    on: 1, //if the screen is "on" used for fake shutoff
    lastInPlaylist: 0, //flag for when last episode in playlist
    volTimeOut: 0,
    pageData: [],
    beginPlace: 0,
    overscanSize: parseFloat(localStorage.getItem('overscan')),
    horShift: parseFloat(localStorage.getItem('horizontalShift')),
    verShift: parseFloat(localStorage.getItem('verticalShift')),
    vol: parseInt(localStorage.getItem('playerVolume')),
    crt: parseInt(localStorage.getItem('crtFilter')),
     rndEpisodeNum: 0,
     //the saved channel number
     num: localStorage.getItem('lastChannel')
}




let result = 0;
let randomPlaylistIndex = 0;

let skipShortVideosEnabled = JSON.parse(localStorage.getItem('skipShortVideosEnabled')) || false;

let previousRandomNum = JSON.parse(localStorage.getItem('previousRandomNum')) || -1;


// Initialize minimumVideoLength from local storage or default to 0
let minimumVideoLength = JSON.parse(localStorage.getItem('minimumVideoLength')) || 0;
// Initialize maximumVideoLength from local storage or default to 86400
let maximumVideoLength = JSON.parse(localStorage.getItem('maximumVideoLength')) || 86400;


// Initialize an empty array
let previousVideos = JSON.parse(localStorage.getItem('previousVideos')) || [];


// Assuming you've previously set prevVid in localStorage
let prevVid = localStorage.getItem('prevVid')|| 0;;

