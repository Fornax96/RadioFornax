<%-- 
    Document   : request
    Created on : Mar 29, 2014, 1:22:38 PM
    Author     : Fornax
--%>

<%@page import="nl.Fornax.Servlet"%>
<%@page import="nl.Fornax.Stream"%>
<%@page import="nl.Fornax.YouTubeRipper"%>
<%@page import="nl.Fornax.RadioUtil"%>
<%@page import="nl.Fornax.Request"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Request Song</title>
	</head>
	<body>
		<span style="color: crimson; font-size: 30px">
		<% 
			if(!(request.getParameter("yt") == null)){
				String UrlFormatted = RadioUtil.formatURL(request.getParameter("yt"));
				
				if(UrlFormatted.length() == 11){
					if(Servlet.mainStream.addToPlaylist(UrlFormatted)){
						out.println("Video ID '" + RadioUtil.formatURL(request.getParameter("yt")) + "' has been requested!");
						System.out.println("Video '" + UrlFormatted + "' has been requested");
					}else{
						out.println("'" + UrlFormatted + "' has been requested too recently!");
					}
				}else{
					out.println("Somehing went wrong while requesting your song, check if your submission is a valid YouTube video");
				}
			}
		%>
		</span>
		<form action="request.jsp" method="POST">
			YouTube URL: <input type="text" name="yt" width="400">
			<input type="submit" name="request"/>
		</form>
	</body>
</html>
