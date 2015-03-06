$("#main").ready(function(){
	//Store frequently elements in variables
	var slider  = $('#slider'),
		tooltip = $('.tooltip');

	//Hide the Tooltip at first
	tooltip.hide();

	//Call the Slider
	slider.slider({
		//Config
		range: "min",
		min: 1,
		value: 35,

		start: function(event,ui) {
			tooltip.fadeIn('fast');
		},

		//Slider Event
		slide: function(event, ui) { //When the slider is sliding

			var value  = slider.slider('value'),
				volume = $('.volume');

			tooltip.css('left', value).text(ui.value);  //Adjust the tooltip accordingly

			if(value <= 5) { 
				volume.css('background-position', '0 0');
			} 
			else if (value <= 25) {
				volume.css('background-position', '0 -25px');
			} 
			else if (value <= 75) {
				volume.css('background-position', '0 -50px');
			} 
			else {
				volume.css('background-position', '0 -75px');
			};

		},

		stop: function(event,ui) {
			tooltip.fadeOut('fast');
		},
	});
	

	if($('#songname').data("path")!=""){
		console.log($('#songname').data('path') + "HI");
		$('#artwork').css('background', 'url("assets/'+$('#songname').data('path') + '") no-repeat center');
	}
});


    /**
     * Loading the tags using the FileAPI.
     */
    function loadFile(input) {
		$("form").submit();
		
		//document.getElementById("song").src = "assets/" + url;
		//document.getElementById("song").play();	
	
	/*
      ID3.loadTags(url, function() {
        showTags(url);
      }, {
        tags: ["title","artist","album","picture"],
        dataReader: FileAPIReader(file)
      });*/
    }

    /**
     * Generic function to get the tags after they have been loaded.
     */
    function showTags(url) {
	togglePlay();
		var tags = ID3.getAllTags(url);
		document.getElementById("song").src = "songs\\" + url;
		
		console.log(url);
		console.log(tags);
		addToPlaylist(tags);
		$('#artwork').css('background-image', 'url('+ url +')');
		var image = tags.picture;
		if (image) {
			var base64String = "";
			for (var i = 0; i < image.data.length; i++) {
				base64String += String.fromCharCode(image.data[i]);
			}
			var base64 = "data:" + image.format + ";base64," + window.btoa(base64String	);
			//document.getElementById('artwork').setAttribute('src',base64);
			$('#artwork').css('background', 'url('+ base64 +') no-repeat center');
	
			//document.getElementById('picture').setAttribute('src',base64);
		}
		
		
    }
	
	function addToPlaylist(tags){
		var tempText = "<div>";
		tempText +=	"<h4>" + tags.title + "</h4>";
		tempText +=	"<h6>" + tags.album + " - " + tags.artist + "</h6>";
		tempText +=	"<hr>";	
		tempText += "</div>";
		$("#songslist").append(tempText);
	}
	
	function togglePlay() {
		// if(document.getElementById("song").paused){
			// document.getElementById("song").play();	
			// document.getElementById("play").src = "assets/pause.png";
		// }
		// else {
			// document.getElementById("song").pause();	
			// document.getElementById("song").currentTime=0;
			// document.getElementById("play").src = "assets/play.png";
		// }
		$("#wrapper").toggleClass("toggled");
	}
	
	function toggle(option) {
		if($("#options").className != 'menu'){
			console.log($("#options").className);
			$("#songslist").text("");
			
			var text = '<div id="letter">'
			text += '<h4>Menu</h4>'
			text += '</div>'
					
			text += '<div class="song">'
			text += '<h4>Create New Playlist</h4>'
			text += '<hr>'
			text += '</div>'
			
			text += '<div class="song">'
			text += '<h4>Select Playlist</h4>'
			text += '<hr>'
			text += '</div>'
			
			text += '<div class="song">'
			text += '<h4>Local Songs only</h4>'
			text += '<hr>'
			text += '</div>'
			
			
		
			$("#songslist").append(text);
			$("#options").toggleClass('menu');
		}
		else {
			console.log("changee");
			$("#songslist").text("");
			
			$("#options").toggleClass('menu');
	
		}
	}
	
