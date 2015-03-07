app = {};

$(document).ready(function(){
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
		value: 100,

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
			
			document.getElementById("song").volume = value*1.0/100;

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
		
		//document.getElementById("song").src = "..assets/public/ + url;
		//document.getElementById("song").play();	
	
	/*
      ID3.loadTags(url, function() {
        showTags(url);
      }, {
        tags: ["title","artist","album","picture"],
        dataReader: FileAPIReader(file)
      });*/
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
		if(document.getElementById("song").paused){
			document.getElementById("song").play();	
			document.getElementById("play").src = "assets/pause.png";
		}
		else {
			document.getElementById("song").pause();
			document.getElementById("play").src = "assets/play.png";
		}
	}
	
	
	function show(option) {
		$("#songslist").text("");
		if( option == "menu"){
			var text = '<div id="letter">'
				+ '<h4>Menu</h4>'
				+ '</div>'	
				+ '<div class="song">'
				+ '<h4>Create New Playlist</h4>'
				+ '<hr>'
				+ '</div>'
				+ '<div class="song" onclick=show("selplay")>'
				+ '<h4>Select Playlist</h4>'
				+ '<hr>'
				+ '</div>'
				+ '<div class="song" id="localonly" style="position:relative" onclick=show("locsongs")>'
				+ '<h4 style="cursor: pointer">Local Songs only</h4>'
				+ '<hr>'
				+ '</div>';
			$("#songslist").append(text);
		}
		else if(option == "globalsongs"){
			
			$.ajax({
				url: "/get_global_songs",
				type: "get",
				data: "choice=globalsongs",
				dataType: "json",
				success: function(data){
					var text = '<div class="globalsongs t4">'+
						'<div id="letter">' +
							'<h4 style="margin-top:0">Showing all songs</h4>' +
						'</div>' +
						'<hr>';
					for(var i=0; i<data.songs.length; i++){
						text += '<div class="playable" onclick="playplayable(this)" id=' + data.songs[i].id + ' style="position:relative"><h4>' + data.songs[i].name 
							+ '</h4>' + '<h6>' + data.songs[i].artist + ' - ' 
							+ data.songs[i].album + '</h6><hr>'
							+ '<span style="position:absolute; right:15px; top:8px;" class="glyphicon glyphicon-plus-sign"></span></div>';
					}
						text += '</div>';
						$("#songslist").append(text);
				}
			});
		}
		else if(option == "artist"){
			
			$.ajax({
				url: "/get_global_songs",
				type: "get",
				data: "choice=byartist",
				dataType: "json",
				success: function(data){
					var text = '<div class="globalsongs t4">'+
						'<div id="letter">' +
							'<h4 style="margin-top:0">Showing all artists</h4>' +
						'</div>' + '<hr>';
					for(var i=0; i<data.songs.length; i++){
						text += '<h4 onclick="showartistsongs(this)">' + data.songs[i].artist +'</h4>' + '<hr>';
					}
						text += '</div>';
						$("#songslist").append(text);
				}
			});
		}
		else if(option == "album"){
			
			$.ajax({
				url: "/get_global_songs",
				type: "get",
				data: "choice=byalbum",
				dataType: "json",
				success: function(data){
					var text = '<div class="globalsongs t4">'+
						'<div id="letter">' +
							'<h4 style="margin-top:0">Showing all albums</h4>' +
						'</div>' + '<hr>';
					for(var i=0; i<data.songs.length; i++){
						text += '<div ><h4 onclick="showalbumsongs(this)">' + data.songs[i].album +'</h4>' + '<hr></div>';
					}
						text += '</div>';
						$("#songslist").append(text);
				}
			});
		}
		else if(option == "locsongs"){
			
			$.ajax({
				url: "/get_global_songs",
				type: "get",
				data: "choice=localsongs",
				dataType: "json",
				success: function(data){
					var text = '<div class="globalsongs t4" >'+
						'<div id="letter">' +
							'<h4 style="margin-top:0">Showing my songs</h4>' +
						'</div>' +
						'<hr>';
					for(var i=0; i<data.songs.length; i++){
						text += '<div class="playable" onclick="playplayable(this)" id=' + data.songs[i].id + ' style="position:relative"><h4>' + data.songs[i].name 
							+ '</h4>' + '<h6>' + data.songs[i].artist + ' - ' 
							+ data.songs[i].album + '</h6><hr>'
							+ '<span style="position:absolute; right:15px; top:8px;" class="glyphicon glyphicon-plus-sign"></span></div>';
					}
						text += '</div>';
						$("#songslist").append(text);
				}
			});
		}
		else if(option == "selplay"){
			
			$.ajax({
				url: "/get_global_songs",
				type: "get",
				data: "choice=selectplaylist",
				dataType: "json",
				success: function(data){
					var text = '<div class="globalsongs t4">'+
						'<div id="letter">' +
							'<h4 style="margin-top:0">Showing my playlists</h4>' +
						'</div>' +
						'<hr>';
					for(var i=0; i<data.songs.length; i++){
						text += '<h4 id=' + data.songs[i].id + ' onclick="selectPlaylist(this)">' + data.songs[i].name +'</h4><hr>';
					}
						text += '</div>';
						$("#songslist").append(text);
				}
			});
		}
	}
	
	function selectPlaylist(object){
		console.log(object.id);
		$.ajax({
			url: "/get_playlist_songs",
			type: "get",
			data: "choice="+ object.id,
			dataType: "json",
			success: function(data){
				$("#songslist").text("");
				var text = '<div class="globalsongs t4">'+
					'<div id="letter">' +
						'<h4 style="margin-top:0">Showing songs</h4>' +
					'</div>' +
					'<hr>';
				for(var i=0; i<data.songs.length; i++){
					text += '<div class="playable" onclick="playplayable(this)" id=' + data.songs[i].id + ' style="position:relative"><h4>' + data.songs[i].name 
							+ '</h4>' + '<h6>' + data.songs[i].artist + ' - ' 
							+ data.songs[i].album + '</h6><hr>'
							+ '<span style="position:absolute; right:15px; top:8px;"></span></div>';
				}
					text += '</div>';
					$("#songslist").append(text);
			}
		});
	}
	
	function showalbumsongs(object){
		console.log($(object).text());
		$.ajax({
			url: "/get_album_songs",
			type: "get",
			data: "choice=" + $(object).text(),
			dataType: "json",
			success: function(data){
				$("#songslist").text("");
				var text = '<div class="globalsongs t4">'+
					'<div id="letter">' +
						'<h4 style="margin-top:0">Showing songs</h4>' +
					'</div>' +
					'<hr>';
				for(var i=0; i<data.songs.length; i++){
					text += '<div class="playable" onclick="playplayable(this)" id=' + data.songs[i].id + ' style="position:relative"><h4>' + data.songs[i].name 
							+ '</h4>' + '<h6>' + data.songs[i].artist + ' - ' 
							+ data.songs[i].album + '</h6><hr>'
							+ '<span style="position:absolute; right:15px; top:8px;"></span></div>';
				}
					text += '</div>';
					$("#songslist").append(text);
			}
		});
	}
	
	function showartistsongs(object){
		console.log($(object).text());
		$.ajax({
			url: "/get_artist_songs",
			type: "get",
			data: "choice=" + $(object).text(),
			dataType: "json",
			success: function(data){
				$("#songslist").text("");
				var text = '<div class="globalsongs t4">'+
					'<div id="letter">' +
						'<h4 style="margin-top:0">Showing songs</h4>' +
					'</div>' +
					'<hr>';
				for(var i=0; i<data.songs.length; i++){
					text += '<div class="playable" onclick="playplayable(this)" id=' + data.songs[i].id + ' style="position:relative"><h4>' + data.songs[i].name 
							+ '</h4>' + '<h6>' + data.songs[i].artist + ' - ' 
							+ data.songs[i].album + '</h6><hr>'
							+ '<span style="position:absolute; right:15px; top:8px;"></span></div>';
				}
					text += '</div>';
					$("#songslist").append(text);
			}
		});
	}
	
	function playplayable(object){
		 // document.getElementById("song").src = "assets/hi.mp3";
		 // document.getElementById("song").play();
		 var mp3;
		$.ajax({
			url: "/play_song",
			type: "get",
			type: "get",
			data: "id=" + object.id,
			dataType: "json",
			success: function(data){
				
				mp3 =  data.songs
				document.getElementById("song").src = "Songs/" + data.songs.file_name;
				document.getElementById("song").play();
				console.log("PLAYED");
				document.getElementById("play").src = "assets/pause.png";
				
				$("#artistname").text(data.songs.artist); 
				$("#albumname").text(data.songs.album);
				$("#songname").text(data.songs.name);
			}
		});
		
	}
	
	
