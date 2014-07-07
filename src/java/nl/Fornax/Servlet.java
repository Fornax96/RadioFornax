package nl.Fornax;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import uk.co.caprica.vlcj.player.MediaPlayerFactory;

/**
 * @author Fornax
 * 
 * If you like my work consider donating some doge ;)
 * DR5r16hwuSoTo4UBELQR3au6nJpwcXc5nd
 */
@WebServlet(name = "RadioFornax", urlPatterns = {"/radio"})
public class Servlet extends HttpServlet {
	//TODO Implement all the ideas I have in mind
	
	//Create the stream object and pass the VLC stuff to the constructor
	//Yes, the "dst=:10000" part specifies the port it hosts on
	public static Stream mainStream = new Stream(":sout=#http{mux=ogg,dst=:10000}");
	public static final MediaPlayerFactory mediaPlayerFactory= new MediaPlayerFactory();
	
	//This is where the ripped music should be saved to, please edit this line to fir your needs
	public static final String musicDir = "/home/wim/Music/radio/";
	//Where the intermission song is located, MUST START WITH "file://"!
	public static final String intermissionLocation = "file:///home/wim/Music/intermission.ogg";
	
	@Override
	public void init(){
		
		YouTubeRipper.spawnThreads();
		//This is where the OOP magic happens
		mainStream.start();
		mainStream.setName("Streamer1");
	}
	
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Is this method actually used?");
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("There was a POST request! " + request);
		
		processRequest(request, response);
	}
	
	@Override
	public String getServletInfo() {
		return "Short description";
	}
}
