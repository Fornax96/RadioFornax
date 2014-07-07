<%-- 
    Document   : api
    Created on : Mar 31, 2014, 9:55:18 PM
    Author     : Fornax
--%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.util.regex.Pattern"%>
<%@page import="nl.Fornax.RadioUtil"%>
<%@page import="nl.Fornax.Stream"%>
<%@page import="java.util.ArrayList"%>
<%@page import="nl.Fornax.Servlet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
	long songLength = Servlet.mainStream.getSongLength();
	float songProgress = Servlet.mainStream.getSongProgress();
	int listSize = Servlet.mainStream.getPlaylistSize();
	String currentSong = Servlet.mainStream.getCurrentSong();
	ArrayList<String> playList = Servlet.mainStream.getPlaylist();
	
	if(!(request.getParameter("getplaylist") == null)){
		out.print("{\"playlist\": [");
		int n = 0;
		for(String id : playList){
			if(id == Servlet.intermissionLocation){
				if(n == 0){
					out.print("\"FAgfBBDrb0E\"");
				}else{
					out.print(",\"FAgfBBDrb0E\"");
				}
			}else{
				id = id.replace(Servlet.musicDir, "");
				id = id.replace(".ogg", "");
				if(n == 0){
					out.print("\"" + id + "\"");
				}else{
					out.print(",\"" + id + "\"");
				}
			}
			n++;
		}
		out.print("]}");
		
//		out.print("{\"playlist\": ");
//		out.print(playList);
//		out.print("}");
	}else if(!(request.getParameter("getcurrentsong") == null)){
		out.print("{\"currentsong\": \"");
		if(currentSong == ""){
			out.print("FAgfBBDrb0E");
		}else{
			out.print(currentSong);
		}
		out.print("\"}");
	}else if(!(request.getParameter("getlistsize") == null)){
		out.print("{\"listsize\": ");
		out.print(listSize);
		out.print("}");
	}else if(!(request.getParameter("getprogress") == null)){
		out.print("{\"songprogress\": ");
		out.print(songProgress);
		out.print("}");
	}else if(!(request.getParameter("getsonglength") == null)){
		out.print("{\"songlength\": ");
		out.print(songLength);
		out.print("}");
	}else if(!(request.getParameter("gettimeremaining") == null)){
		out.print("{\"timeremaining\": ");
		out.print(songLength - (songLength * songProgress));
		out.print("}");
	}else if(!(request.getParameter("gettimepast") == null)){
		out.print("{\"timepast\": ");
		out.print(songLength * songProgress);
		out.print("}");
	}else if(!(request.getParameter("getvideoid") == null)){
		out.print("{\"videoid\": \"");
		out.print(RadioUtil.formatURL(request.getParameter("getvideoid")));
		out.print("\"}");
	}else if(!(request.getParameter("getconnectioncount") == null)){
		Process process = Runtime.getRuntime().exec("netstat -an | grep :10000 | wc -l");
		BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()));
		String line;
		
		out.print("{\"connectioncount\": \"");
		while ((line = br.readLine()) != null) {
			out.print(line);
		}
		out.print("\"}");
		br.close();
		
//		ProcessBuilder builder = new ProcessBuilder("netstat -an | grep :10000 | wc -l");
//		builder.redirectErrorStream(true);
//		Process process = builder.start();
//		InputStream is = process.getInputStream();
//		BufferedReader reader = new BufferedReader(new InputStreamReader(is));
//
//		String line = null;
//			out.print("{\"connectioncount\": \"");
//		while ((line = reader.readLine()) != null){
//			out.print(line);
//		}
//		out.print("\"}");
	}else if(!(request.getParameter("skipsong") == null)){
		if(request.getParameter("skipsong").contains("7JklrC6hh8TS432MNa")){
			Servlet.mainStream.skipSong();
			System.out.println("Someone requested a skip");
			out.print(1);
		}
	}else if(!(request.getParameter("requestsong") == null)){
		out.print("{\"success\": \"");
		out.print(Servlet.mainStream.addToPlaylist(request.getParameter("requestsong")));
		out.print("\"}");
	}else{
		%>
		<h1>API Usage</h1>
		<ol>
			<li>"/api.jsp?getplaylist" returns a comma seperated list of songs in the playlist</li>
			<li>"/api.jsp?getcurrentsong" returns the YouTube video ID of the currently playling song, (returns nothing if playlist is empty)</li>
			<li>"/api.jsp?getlistsize" returns an int of songs in the playlist</li>
			<li>"/api.jsp?getprogress" returns a Float value of song progress 0F = 0% 1F = 100%</li>
			<li>"/api.jsp?getsonglength" returns a long of the song duration in milliseconds</li>
			<li>"/api.jsp?gettimeremaining" returns a long of remaining playtime of the current song in milliseconds</li>
			<li>"/api.jsp?gettimepast" returns a long of the past playtime of the current song in milliseconds</li>
			<li>"/api.jsp?getvideoid=YouTubeVideoURL" returns the video id of the youtube URL</li>
			<li>"/api.jsp?requestsong=YouTubeVideoID" requests a song with the given video ID (You can use getvideoid to get the video ID). Returns false if the song has been requested too recently</li>
		</ol>
		<%
	}
%>