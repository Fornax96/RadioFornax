var curSongID = "DxtmQDCyLE8";
var interval = setInterval(loop, 5000);
var serverAddr = "http://213.73.138.240:8080/Servlet/";
var vidThumb;
var player;

$(document).ready(function(){
	console.log("JS loaded");
	player = document.getElementById("aPlayer");
	vidThumb = document.getElementById("curVidThumbnail");
	//Set color scheme
	if($.cookie("color") === "black" || 
			$.cookie("color") === "blue" || 
			$.cookie("color") === "green" || 
			$.cookie("color") === "orange" || 
			$.cookie("color") === "purple" || 
			$.cookie("color") === "red" || 
			$.cookie("color") === "yellow"){
		document.getElementById("colorScheme").href = "style/colors/" + $.cookie("color") + ".css";
	}
	interval;
});

function loop(){
	//console.log("Updated list");
	$.get("api.jsp?getcurrentsong", function(data){
		result = $.parseJSON(data).currentsong;
		updateThumbnail(result);
	});
	
	$.get("api.jsp?getlistsize", function(data){
		result = $.parseJSON(data).listsize;
		document.getElementById("songQueue").innerHTML = result;
	});
	
	$.get("api.jsp?getprogress", function(data){
		result = $.parseJSON(data).songprogress;
		document.getElementById("dSongProgressForeground").style.width = result * 100 + "%";
	});
	
	$.get("api.jsp?getplaylist", function(data){
		result = $.parseJSON(data).playlist;
		updatePlaylist(result);
	});
}

var listSize = 0;
function updatePlaylist(playlist){
	$.get("api.jsp?getlistsize", function(data){
		result = $.parseJSON(data).listsize;
		if(result !== listSize){
			html = "";
			songTitle = "Not implemented yet!";
			playlist.forEach(function(entry){
				videoTitle = "";
				html = html + "<div class='songCont'><img class='songThumb' src='http://img.youtube.com/vi/" + entry + "/default.jpg' alt='" + entry + "'><a href='' target='_blank' id='" + entry + "'>Retrieving title...</a></div>\n";
				$.getJSON("http://gdata.youtube.com/feeds/api/videos/" + entry + "?v=2&alt=jsonc",function(data){
					document.getElementById(entry).innerHTML = data.data.title;
					document.getElementById(entry).href = "http://youtube.com/watch?v=" + entry;
				});
			});
			document.getElementById("dPlaylist").innerHTML = html;
		}
		
		listSize = result;
	});
}

function updateThumbnail(videoID){
	if(curSongID !== videoID){
		if(videoID === "FAgfBBDrb0E"){
			document.getElementById("curVidThumbnail").src = "style/noQueue.png";
		}else{
			document.getElementById("curVidThumbnail").src = "http://img.youtube.com/vi/" + videoID + "/hqdefault.jpg";
		}
		$.getJSON("http://gdata.youtube.com/feeds/api/videos/" + videoID +"?v=2&alt=jsonc", function(data){
			document.getElementById("curTitle").innerHTML = "<a href='https://youtube.com/watch?v=" + videoID + "' target='_bank'>" + data.data.title + "</a>";
			document.getElementById("Title").innerHTML = "Radio FORNAX ~ " + data.data.title;
		});
		curSongID = videoID;
		console.log("Big thumbnail updated to: " + videoID);
	}
}

function showPopup(action){
	document.getElementById('dHoverFrame').style.display = 'inline';
	
	if(action === 0){
		document.getElementById('popupSettings').style.display = 'inline';
	}else if(action === 1){
		document.getElementById('popupRequest').style.display = 'inline';
	}
}

var reqVideoId = "";
function requestSong(){
	url = document.getElementById("inputVideo").value;
	
	
	$.post("api.jsp", {getvideoid: url}).done(function(data){
		alert(data);
		reqVideoId = $.parseJSON(data).success;
	});
	$.get("api.jsp?requestsong=" + reqVideoId, function(data){
		if(data === "false"){
			alert("Request failed");
		}else{
			alert("Request succeeded!");
		}
	});
	document.getElementById("inputVideo").value = "";
}

function changeColor(color){
	document.getElementById("colorScheme").href = "style/colors/" + color + ".css";
	$.cookie("color", color, {expires: 1000});
}