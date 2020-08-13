const app = () => {
	const song = document.querySelector(".song"); // Selecting the audio tag which has the song.
	const playButton = document.querySelector(".play"); //Selecting the play button image.
	const outline = document.querySelector(".moving-circle circle"); //Selecting the circle that needs to be animated.
	const video = document.querySelector(".video-container video");//Selecting the video tag that conatins the video.

	//Sounds
	const sounds = document.querySelectorAll(".audio-selector button");

	//Time-Display
	const timeDisplay = document.querySelector(".time-display");

	//Time select
	const timeSelect = document.querySelectorAll(".time-selector button");

	//Length of the outline
	const outlineLength = outline.getTotalLength();

	//Duration of the song playing
	let fakeDuration = 1200; // This will be updated later on with respect to the time that is selected.

	outline.style.strokeDasharray = outlineLength;
	outline.style.strokeDashoffset = outlineLength;

	//Function for selecting the time.
	timeSelect.forEach(option => {
		option.addEventListener("click", function() {
			fakeDuration = this.getAttribute("data-time");
			timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
		})
	})

	//function for selecting the songs and the videos.
	sounds.forEach(sound => {
		sound.addEventListener("click", function() {
			video.src = this.getAttribute("data-video");
			song.src = this.getAttribute("data-audio");
		})
	})

	//Playing songs
	const checkPlaying = () => {
		if(song.paused) {
			song.play();
			video.play();
			playButton.src = "./svg/play.svg";
		} else {
			song.pause();
			video.pause();
			playButton.src = "./svg/pause.svg";
		}
	};

	playButton.addEventListener("click", checkPlaying);

	//Updating the time, animating the circle and updating the text
	song.ontimeupdate = () => {
		//Updating the time as the video and audio is played.
		let currentTime = song.currentTime;
		let elapsedTime = fakeDuration - currentTime;
		let seconds = Math.floor(elapsedTime % 60);
		let minutes = Math.floor(elapsedTime / 60);

		// Update the text.
		timeDisplay.textContent = `${minutes}:${seconds}`;

		//Animating the circle.
		let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
		outline.style.strokeDashoffset = progress;

		if(currentTime >= fakeDuration) {
			song.pause();
			song.currentTime = 0;
			video.pause();
			playButton.src = "./svg/pause.svg";
		}
	};

}

app();