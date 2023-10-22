


function Video() {
    console.log('Video function initiated! Waiting for API....');

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads./////////////////////
	
};
let player;



function onYouTubeIframeAPIReady() {
    console.log('API ready!');
	
	//printPrevVidArray();

	if (prevVid === '1') {
		console.log('prevVid is true');
		loadPreviousVideo();
		document.getElementById('prevVidtxt').style.display = 'block';
		setTimeout(function() {
		  document.getElementById('prevVidtxt').style.display = 'none';
		}, 1500); // 500 milliseconds = 0.5 seconds			
		// prevVid is true
		
	} else {
		console.log('previous video has not been asked for');
	}
	
	//console.log("before player load",get.rndEpisodeNum,randomPlaylistIndex, get.num)
	
	localStorage.setItem(`prevVid`, 0);	

	
	
	
    player = new YT.Player("player", {
        height: '480',
        width: '720',
        host: 'http://www.youtube-nocookie.com',
        playerVars: {
            start: get.beginPlace,
            controls: 0,
            modestbranding: 1,
            listType: 'playlist',
            list: Channels[get.num].list[randomPlaylistIndex],
            index: get.rndEpisodeNum + 1, //this always subtracts one
            // loop: 1, //llops the playlist
            autoplay: true,
            mute: 0,

        },

        events: {

			'onReady': function(event) {
                // Get the playlist items
                var playlist = event.target.getPlaylist();
				
				if (playlist){
					if (get.rndEpisodeNum >= playlist.length) {
						console.log('Error: Random episode number is out of bounds');
						location.reload();
					}					
				} else {
					location.reload();
				}


                videoStart(event);
            },

            'onStateChange': stateChange,
			'onStateChange': onPlayerStateChange

        }
    });
	
	//console.log("AFTER player load",get.rndEpisodeNum,randomPlaylistIndex, get.num)
	
	

	
}






// Event listener for the 'G' key
document.addEventListener('keydown', function(event) {
  if (event.key === 'g' || event.key === 'G') {
    setMinimumVideoLength();
  }
});

// Event listener for the 'M' key
document.addEventListener('keydown', function(event) {
  if (event.key === 'm' || event.key === 'M') {
    setMaximumVideoLength();
  }
});


function checkVideoTime() {
	window.focus();
  let currentTime = player.getCurrentTime();
  let duration = player.getDuration();

  if (duration - currentTime <= 2) {
    location.reload();
  }
}

function onPlayerStateChange(event) {
	window.focus();
  if (event.data == YT.PlayerState.PLAYING) {
    setInterval(checkVideoTime, 500); // Check every second
  }
}







function videoStart(event) {	
	
	
	if (player.getPlaylistIndex() < 0)
	{
		
	} else {
		if (prevVid === '1') {

		console.log('videos not saved because going through previous videos');
		} else { 
			savePreviousVideos();
		}
	}
	
	const currentVideoDuration = player.getDuration();
	
	if (currentVideoDuration < minimumVideoLength || currentVideoDuration > maximumVideoLength) {
        console.log('Skipping short video...');
        Input.refresh(); // Load the next random video
        return; // Exit early to prevent further processing
    }
	
	
	console.log('max vid length = ',maximumVideoLength);
	
	
	
	
	
    console.log('VIDEO START');
    //focus on window so that keyboard input is responsive
    window.focus();
    //event.target.playVideo();
    //Element.vidWindow() = document.querySelector('#player');
    get.overscanSize = parseFloat(localStorage.getItem('overscan'));
    Element.vidWindow().style.transform = "scale(" + get.overscanSize + ")";
    Element.vidWindow().style.marginLeft = get.horShift + "px";
    Element.vidWindow().style.marginTop = get.verShift + "px";

    Element.vidWindow().style.display = "block";
    //////////hide static and pause//////////////////
    document.getElementById("staticImage").style.display = "none";
    Element.sound().pause();
	
	
	
	console.log("Ep chosen: ", get.rndEpisodeNum+1);
    console.log("Ep running: ", player.getPlaylistIndex()+1);
	
	console.log('playlist chosen = ',randomPlaylistIndex+1); 
	
	

	
	
	

    //if the video is unavailable or blocked index will return -1
    if (player.getPlaylistIndex() < 0) {
        //if video is an error, push the index number represented my rndEpisodeNum-1
        //this only works with a newly random generated item
        get.pageData.push(get.rndEpisodeNum);
        ///and save the array to local storage (each channel gets its own local storage slot)
        localStorage.setItem(get.num, JSON.stringify(get.pageData));
        if (!(get.pageData.length > Channels[get.num].episodes[randomPlaylistIndex])) {
          Input.refresh();
        } else {
            Element.channelEntry().style.whiteSpace = "pre";
            Element.channelEntry().textContent = "Reset Channel Memory!\nEnter 99 at Channel List";
            Element.channelEntry().style.display = "block";
        }


    }
	var playlist = event.target.getPlaylist();
	console.log('playlist length = ',playlist.length); 


    //update vol every 100 ms
    setInterval(function () {
        //constat update of volume
        event.target.setVolume(get.vol);

    }, 100)



   
        get.rndEpisodeNum = player.getPlaylistIndex();

      
        let vidLength = Math.floor((player.getDuration()));
        //HOW MANY 15 MIN SLOTS EXISTS
        let multi = Math.floor((vidLength / 10));
        //A RANDOM NUM FOR A 15 MION SLOT 
        let rnd = Math.floor(Math.random() * (multi));
        /*Then we check if the selected channel wants to be set to a random point with randPoint = true
        and finds a random spot in the video in increments of 10mins (600s)*/
        if (Channels[get.num].randPoint) { 
		
		//find a random 10 second segment withing the first 1/8 of the video + 0.5% of the video length
            get.beginPlace = (rnd * (10/8)) + (vidLength * 0.005); 
            /*Then we apply that value to the vidoe player via "seekTo()"*/
            player.seekTo(get.beginPlace, true);
        } else {
			//if random point is false then video will start 1% into the duration of the video. 
            get.beginPlace = vidLength * 0.01; 
            /*Then we apply that value to the vidoe player via "seekTo()"*/
            player.seekTo(get.beginPlace, true);
        }
        

};
function stateChange() {
    //focus on window so that keyboard input is responsive
    window.focus();
    ///get.rndEpisodeNum keeps track of episode updates
    if (get.rndEpisodeNum < player.getPlaylistIndex()) {

        get.rndEpisodeNum = player.getPlaylistIndex();
        //waits for 500ms before saving prev video to let player have time to switch states
        // let j = setTimeout(function () {
        //add last episode to watched list array (pageData)
        get.pageData.push(player.getPlaylistIndex() - 1);

        ///and save the array to local storage (each channel gets its own local storage slot)
        localStorage.setItem(get.num, JSON.stringify(get.pageData));

        for (let i = 1; i < get.pageData.length; i++) {
            //if the ch has been generated before, make new number and start over (i=0)
            if (get.pageData[i] === player.getPlaylistIndex()) {
                Input.refresh();
            }
        }

        console.log('Prev episode saved to watched list')
        //clearTimeout(j);
        // }, 500);
    }
	    
}


function randomSkip() {
	let vidLength = Math.floor((player.getDuration()));
    //HOW MANY 15 MIN SLOTS EXISTS
    let multi = Math.floor((vidLength / 10));
    //A RANDOM NUM FOR A 15 MION SLOT 
    let rnd = Math.floor(Math.random() * (multi));	
	player.seekTo(rnd*10, true);
}

function startSkip() {
	player.seekTo(0, true);
}

function SkipF() {
	player.seekTo(player.getCurrentTime() + 15, true);
}

function SkipB() {
	player.seekTo(player.getCurrentTime() - 3, true);
}

function TogglePlayPause() {	
    let playerState = player.getPlayerState();
    if (playerState === 1) { // 1 represents playing state
        player.pauseVideo();
    } else if (playerState === 2) { // 2 represents paused state
        player.playVideo();
    }
}

function loadPreviousVideoOld() {		
	get.rndEpisodeNum = parseInt(localStorage.getItem(`previousEpisodeIndex`));
	randomPlaylistIndex = parseInt(localStorage.getItem(`previousPlaylistIndex`));
	get.num = parseInt(localStorage.getItem(`previousChannelIndex`));	
	
	console.log("LOADING PREVIOUS VIDEO WITH THIS DATA = ",get.rndEpisodeNum,randomPlaylistIndex, get.num)
}

function loadPreviousVideo() {		
	let removedValues = removeFirstItem();

	if (removedValues) {
		let { ep, list, chan } = removedValues;
		console.log(`Removed: ep=${ep}, list=${list}, chan=${chan}`);
		get.rndEpisodeNum = ep;
		randomPlaylistIndex = list;
		get.num = chan;
	} else {
		console.log('Array is empty.');
	}
	

	
	
}


function savePreviousVideos() {
	
	if (localStorage.getItem('currVideo') !== null) {
		let prevVideo = JSON.parse(localStorage.getItem('currVideo'));
		let [ ep, list, chan ] = prevVideo;
		console.log('addded to array = ',ep, list, parseInt(chan, 10));
		addItem(ep,list,chan);
		
		
	}
	let currVideo = [get.rndEpisodeNum, randomPlaylistIndex, parseInt(get.num, 10)];
	localStorage.setItem(`currVideo`, JSON.stringify(currVideo));		

	
	
}




function toggleSkipShortVideos() {
  skipShortVideosEnabled = !skipShortVideosEnabled;
  localStorage.setItem('skipShortVideosEnabled', JSON.stringify(skipShortVideosEnabled));
}


// Function to prompt user for minimum video length and update local storage
function setMinimumVideoLength() {
  const userInput = prompt('Enter the minimum video length in minutes:');
  const parsedInput = parseInt(userInput, 10);

  if (!isNaN(parsedInput) && parsedInput >= 0) {
    minimumVideoLength = parsedInput * 60;
    localStorage.setItem('minimumVideoLength', JSON.stringify(minimumVideoLength));
    console.log(`Minimum video length set to ${minimumVideoLength} seconds.`);
  } else {
    console.log('Invalid input. Minimum video length not changed.');
  }
}


function setMaximumVideoLength() {
  const userInput = prompt('Enter the maximum video length in minutes:');
  const parsedInput = parseInt(userInput, 10);

  if (!isNaN(parsedInput) && parsedInput >= 0) {
    maximumVideoLength = parsedInput * 60;
    localStorage.setItem('maximumVideoLength', JSON.stringify(maximumVideoLength));
    console.log(`Maximum video length set to ${maximumVideoLength} seconds.`);
  } else {
    console.log('Invalid input. Maximum video length not changed.');
  }
}



// Function to add a new item to the beginning of the array
function addItem(ep, list, chan) {
    // Check if all three arguments exist and are numbers
    if (typeof ep === 'number' && typeof list === 'number' && typeof chan === 'number') {
        // Create an object with the specified properties
        let newItem = { ep: ep, list: list, chan: chan };

        // Add the object to the beginning of the array
        previousVideos.unshift(newItem);

        // Save the updated array to local storage
        localStorage.setItem('previousVideos', JSON.stringify(previousVideos));
    } else {
        console.error('Invalid arguments. All three arguments (ep, list, chan) must be numbers.');
    }
}



function removeFirstItem() {
    // Get the first item from the array
    let removedItem = previousVideos.shift();

    if (removedItem) {
        let { ep, list, chan } = removedItem;

        // Check if ep, list, and chan exist and are numbers
        if (typeof ep === 'number' && typeof list === 'number' && typeof chan === 'number') {
            // Save the updated array to local storage
            localStorage.setItem('previousVideos', JSON.stringify(previousVideos));

            return { ep, list, chan };
        } else {
            // If any of the values are invalid, call the function again
            return removeFirstItem();
        }
    } else {
        return null; // Return null if the array is empty
    }
}

function eraseHistory() {
	previousVideos = [];
	localStorage.setItem('previousVideos', JSON.stringify(previousVideos));
	console.log('previousVideos array cleared');
	printPrevVidArray();

}

function printPrevVidArray() {
	
	if (previousVideos.length === 0) {
		console.log("Previous video array is EMPTY");
	} else {
		for (let i = 0; i < previousVideos.length; i++) {
			let { ep, list, chan } = previousVideos[i];
			console.log(`Item ${i + 1}: ep=${ep}, list=${list}, chan=${chan}`);
		}
	}	
}



function adjustChannelsLayout() {
	  let channelContainer = document.getElementById('channelContainer');
	  let windowHeight = window.innerHeight;
	  let containerHeight = channelContainer.offsetHeight;
	  
	  if (containerHeight > windowHeight) {
		let numColumns = Math.ceil(containerHeight / windowHeight);
		channelContainer.style.columnCount = numColumns;
		channelContainer.style.columnWidth = `${100 / numColumns}%`;
	  }
	}	
	



function getTrueRandomEpisode(arr) {
    const totalSum = arr.reduce((acc, val) => acc + val, 0);
    let randomNum;

    do {
        randomNum = Math.floor(Math.random() * totalSum);
    } while (randomNum === previousRandomNum);
    
    console.log("previous random=", previousRandomNum);
    console.log("new random=", randomNum);
    
    previousRandomNum = randomNum; 
    localStorage.setItem('previousRandomNum', JSON.stringify(previousRandomNum)); // Save to local storage
	
	
	console.log("saved item=", JSON.parse(localStorage.getItem('previousRandomNum')));

    let currentSum = 0;
    for (let i = 0; i < arr.length; i++) {
        currentSum += arr[i];
        if (currentSum >= randomNum) {
            return [randomNum - (currentSum - arr[i]), i];
        }
    }
}


document.addEventListener('keydown', function(event) {
   let key = event.keyCode || event.which;
   let keycodeDisplay = document.getElementById('keycodeDisplay');
   keycodeDisplay.innerText = 'Key Code: ' + key;
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('channelUp').addEventListener('click', function() {
		if (get.num >= Channels.length - 1) { 
			get.num = 0; 
			localStorage.setItem('minimumVideoLength', JSON.stringify(0)); 
			localStorage.setItem('maximumVideoLength', JSON.stringify(86400)); 
			Input.refresh();  
		} else { 
			get.num++; 
			localStorage.setItem('minimumVideoLength', JSON.stringify(0)); 
			localStorage.setItem('maximumVideoLength', JSON.stringify(86400));
			Input.refresh(); 
		}
    });

    document.getElementById('channelDown').addEventListener('click', function() {
		if (get.num <= 0) { 
			get.num = Channels.length - 1; 
			localStorage.setItem('minimumVideoLength', JSON.stringify(0)); 
			localStorage.setItem('maximumVideoLength', JSON.stringify(86400));
			Input.refresh(); 
		} else { 
			get.num--; 
			localStorage.setItem('minimumVideoLength', JSON.stringify(0)); 
			localStorage.setItem('maximumVideoLength', JSON.stringify(86400));
			Input.refresh(); 
		}
    });
});






