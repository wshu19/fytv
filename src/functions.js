

const run = {
    initElementDisplays() {
        //Hide all elements
        Element.volEl().style.display = 'none';
        Element.channelEntry().style.display = 'none';
        Element.controlDisplay().style.display = "none";
        Element.listDisplayDiv().style.display = "none";
        if (!get.crt) Element.screenElements().style.display = 'none';
        
        //Make sure the channel name is dissplayed
        Element.chNameDisplay().style.display = "block";
    },
    initiateLocalStorage() {
        ///last ch saved here
        if (!localStorage.getItem('lastChannel') || isNaN(localStorage.getItem('lastChannel'))) { localStorage.setItem('lastChannel', 0); };
        //save if this is the first time program is used in browser
        if (!localStorage.getItem('firstTime')) { localStorage.setItem('firstTime', 0); };
        ///volume and other data saved here
        if (!localStorage.getItem('playerVolume')) { localStorage.setItem('playerVolume', 50); };

        if (!localStorage.getItem('overscan')) { localStorage.setItem('overscan', 1); };
        if (!localStorage.getItem('horizontalShift')) { localStorage.setItem('horizontalShift', 0); };
        if (!localStorage.getItem('verticalShift')) { localStorage.setItem('verticalShift', 0); };
        if (!localStorage.getItem('crtFilter')) { localStorage.setItem('crtFilter', 0); };
    },
	
	populateChannelList() {
	  let channelContainer = document.getElementById('channelContainer');

	  Channels.forEach(channel => {
		let channelItem = document.createElement('div');
		channelItem.classList.add('channelItem');
		channelItem.textContent = channel.name;
		channelContainer.appendChild(channelItem);
	  });

	  // Add a line break after each channel
	  let lineBreak = document.createElement('br');
	  channelContainer.appendChild(lineBreak);
	  // Adjust the layout based on screen height
    adjustChannelsLayout();
	},
	

   /* populateChannelList() {
		let channelCount = Channels.length;

        for (let i = 0; i < channelCount; i++) {
            let li = document.createElement('li');
            li.textContent = Channels[i].name;
            Element.listDisplay().append(li);
        }
        for (let i = channelCount; i < Channels.length; i++) {
            let li = document.createElement('li');
            li.textContent = Channels[i].name;
            Element.listDisplay2().append(li);
        }
		
        const menuShortcutEl = document.createElement("p");
		menuShortcutEl.id = "menuShortcut";

		const menuText = "Vous pouvez me demander<br>'Bot'...<br>'mets la chaîne...'<br>'augmenter le son'<br>'recommence la video'<br>'remets la derniere video'<br>'fait pause la video'";
		menuShortcutEl.innerHTML = menuText;
		
		// Set the CSS style to position the element
		menuShortcutEl.style.position = "absolute";
		menuShortcutEl.style.top = "450px"; // Adjust the top position as needed
		menuShortcutEl.style.left = "400px"; // Adjust the left position as needed
		
		// Set the opacity to make it semi-transparent
		menuShortcutEl.style.opacity = "0.5"; // Adjust the opacity as needed (0.0 to 1.0)
	
		Element.listDisplayDiv().append(menuShortcutEl);

    },*/
    async checkRandomChannel() {
        //-----------CHECK IF RANDOM CHANNEL HAS BEEN GENERATED------------//

        /*This checks if the random channel has been generated before, and if it has it finds a new number.
        If there are no more random numbers to select, it clears the array of prev channels and starts over */

        //load saved prev generated channels. But first check if one exists. If it dosn't, create an empty one
        //The firat value stored is the playlist index.
        if (!localStorage.getItem(get.num)) { 
			localStorage.setItem(get.num, JSON.stringify([0])); 
		};

        get.pageData = JSON.parse(localStorage.getItem(get.num));

        // Instead of checking previous channels, generate a random playlist index directly

        //result = getTrueRandomEpisode(Channels[get.num].episodes);
		//randomPlaylistIndex = result[1];
		//get.rndEpisodeNum = result[0];
		
        return;
    },

	
};


