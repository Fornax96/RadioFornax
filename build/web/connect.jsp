<%-- 
    Document   : connect
    Created on : Apr 4, 2014, 10:06:39 AM
    Author     : Fornax
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Connecting to Radio FORNAX in your mediaplayer of choice</h1>
		<a href="index.jsp">Return to home</a>
		
		<h2>Clementine</h2>
		<ol>
			<li>Go to the 'Internet' tab on the left side</li>
			<li>Right-click 'Your radio streams' and click 'Add another stream'</li>
			<li>At the URL field enter: 'http://213.73.138.240:10000'</li>
			<li>At the name field enter: 'Radio FORNAX'</li>
			<li>Click OK</li>
			<li>Add Radio FORNAX to your playlist</li>
		</ol>
		
		<h2>WinAmp</h2>
		<ol>
			<li>From the 'File' menu, select 'Play URL'</li>
			<li>In the input field enter: 'http://213.73.138.240:10000?.ogg'</li>
			<li>Click 'Open'</li>
			<li>Double click the stream in the playlist</li>
		</ol>
    </body>
</html>
