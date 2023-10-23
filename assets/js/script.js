run.initiateLocalStorage();
//populated the channel list elements with the channel names by number
run.populateChannelList();
//initiate elements displays to none or block
run.initElementDisplays();


//---------------main app init--------------//
async function app() {
	

    //set channel name to current channel
    Element.chNameDisplay().textContent = Channels[get.num].name ;
    const firstTime = JSON.parse(localStorage.getItem('firstTime'));

    if (!firstTime) {
        Element.chNameDisplay().textContent += ` -- Press "." for Menu -- `;
    }
    //set static volume based on volume value
    Element.sound().volume = (get.vol / 100);
    //timer for chNameDisplay
    //Because a channel change is handled with a page refresh, this runs in the main code
    let chNameDisplayTimer = setInterval(
        function () {
            //set firsTime to 1
            
            Element.chNameDisplay().textContent = Channels[get.num].name;
            Element.chNameDisplay().style.display = "none";
            clearInterval(chNameDisplayTimer);
        }
        , 8000);

    //generate a random episode based off of Channel[num].episodes
    
	result = getTrueRandomEpisode(Channels[get.num].episodes);
	randomPlaylistIndex = result[1];
	get.rndEpisodeNum = result[0];	
	
    await run.checkRandomChannel().then(() => console.log('new video number selected'));

    //if the current channel numbner isnt saved in local storage, add it
    if (!localStorage.getItem(get.num)) { localStorage.setItem(get.num, JSON.stringify([0])); };


    //-------------------------------temp console logs to check values------------------------//
    console.log('Channels List: ', Channels)
    console.log('Last channel watched before shutdown: ', get.num)
    console.log("Rand Ep: ", get.rndEpisodeNum)
    console.log('Volume set to: ', get.vol)

    //play video
    console.log('Now attempting to run video player')
    Video();

}

//event listener for keypress
document.addEventListener('keydown', Input.keypress)

app();


document.addEventListener('DOMContentLoaded', function() {
    // Check if the visibility state is stored in local storage
    var visibilityState = localStorage.getItem('visibilityState');
    if (visibilityState) {
        var buttonsToToggle = document.querySelectorAll('.toggle-buttons');
        for (var i = 0; i < buttonsToToggle.length; i++) {
            buttonsToToggle[i].style.display = visibilityState === 'visible' ? 'block' : 'none';
        }
    }

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        var mobileElements = document.getElementsByClassName('mobile-only');

        for (var i = 0; i < mobileElements.length; i++) {
            mobileElements[i].style.display = 'block';
        }

        var hideButton = document.getElementById('hide');
        hideButton.addEventListener('click', function() {
            var buttonsToToggle = document.querySelectorAll('.toggle-buttons');
            for (var i = 0; i < buttonsToToggle.length; i++) {
                buttonsToToggle[i].style.display = buttonsToToggle[i].style.display === 'none' ? 'block' : 'none';
            }

            // Store the visibility state in local storage
            var newState = buttonsToToggle[0].style.display === 'none' ? 'hidden' : 'visible';
            localStorage.setItem('visibilityState', newState);
        });
    } else {
        var mobileElements = document.getElementsByClassName('mobile-only');

        for (var i = 0; i < mobileElements.length; i++) {
            mobileElements[i].style.display = 'none';
        }
    }
});




document.addEventListener('DOMContentLoaded', function() {
    var subCover = document.getElementById('subCover');
    var subsButton = document.getElementById('Subs');

    // Check if the visibility is stored in local storage
    var visibility = localStorage.getItem('subCoverVisibility');

    if (visibility === 'hidden') {
        subCover.style.display = 'none';
    }

    // Add click event listener to the 'Subs' button
    subsButton.addEventListener('click', function() {
        if (subCover.style.display === 'none' || subCover.style.display === '') {
            subCover.style.display = 'block';
            localStorage.setItem('subCoverVisibility', 'visible');
        } else {
            subCover.style.display = 'none';
            localStorage.setItem('subCoverVisibility', 'hidden');
        }
    });
});



