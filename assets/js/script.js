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
	const buttonsToToggle = [
		document.getElementById('Dbu'),	
		document.getElementById('Bck'),			
		document.getElementById('channelDown'),
		document.getElementById('channelUp'),
		document.getElementById('channelUp10'),
		document.getElementById('Rwd'),
		document.getElementById('Rwd10'),
		document.getElementById('Fwd'),
		document.getElementById('Fwd10'),
		document.getElementById('time-remaining'),		
		document.getElementById('rdmTime'),
		document.getElementById('rdmVid'),
		document.getElementById('rdmChaine'),
		
		document.getElementById('Subs'),
		
		
		document.getElementById('Browse'),
		document.getElementById('tasteChaine'),
		document.getElementById('tasteTV')
		
	];


    const hideButton = document.getElementById('hide');
    const subsButton = document.getElementById('Subs');
    const subCoverButton = document.getElementById('subCover');
    // const subCover2Button = document.getElementById('subCover2');
	// const subCover3Button = document.getElementById('subCover3');

    let subCoverState = 0; // 0: subCover visible, 1: subCover and subCover2 visible, 2: both invisible

    hideButton.addEventListener('click', function() {
        buttonsToToggle.forEach(button => {
            button.style.display = (button.style.display === 'none') ? 'block' : 'none';
        });

        localStorage.setItem('buttonsHidden', JSON.stringify(buttonsToToggle.some(button => button.style.display === 'none')));
    });

    subsButton.addEventListener('click', function() {
        subCoverState = (subCoverState + 1) % 2; // Cycle through 0, 1, 2

        if (subCoverState === 0) {
            subCoverButton.style.display = 'block';	
        } else if (subCoverState === 1) {
            subCoverButton.style.display = 'none';			
        }

        localStorage.setItem('subCoverState', subCoverState);
    });

    // Check local storage on page load
    const buttonsHidden = JSON.parse(localStorage.getItem('buttonsHidden'));
    if (buttonsHidden) {
        buttonsToToggle.forEach(button => {
            button.style.display = 'none';
        });
    }

    const storedSubCoverState = JSON.parse(localStorage.getItem('subCoverState'));
    if (storedSubCoverState === 0) {
            subCoverButton.style.display = 'block';		
    } else if (storedSubCoverState === 1) {
            subCoverButton.style.display = 'none';		
    }
	
	initializeButton('tasteChaine', 'tasteChaineClicked', 'tasteTV');
	initializeButton('tasteTV', 'tasteTVClicked', 'tasteChaine');
});



function initializeButton(buttonId, storageKey, otherButtonId) {
    const button = document.getElementById(buttonId);
    const otherButton = document.getElementById(otherButtonId);

    button.addEventListener('click', function() {
        if (button.classList.contains('clicked')) {
            button.classList.remove('clicked');
            localStorage.setItem(storageKey, false);
        } else {
            button.classList.add('clicked');
            localStorage.setItem(storageKey, true);
        }

        if (otherButton.classList.contains('clicked')) {
            otherButton.classList.remove('clicked');
            localStorage.setItem(otherButtonId + 'Clicked', false);
        }
    });

    // Check local storage on page load for the button
    const buttonClicked = JSON.parse(localStorage.getItem(storageKey));
    if (buttonClicked) {
        button.classList.add('clicked');
    }
}












