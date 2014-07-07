package nl.Fornax;

import java.util.ArrayList;
import uk.co.caprica.vlcj.player.MediaPlayer;

/**
 * @author Fornax
 * 
 * If you like my work consider donating some doge ;)
 * DR5r16hwuSoTo4UBELQR3au6nJpwcXc5nd
 */
public class Stream extends Thread{
	//private MediaPlayerFactory mediaPlayerFactory;
	private MediaPlayer mediaPlayer;
	private final ArrayList<String> playlist = new ArrayList();
	private final ArrayList<String> requestHistory = new ArrayList();
	private String currentSong = "";
	private boolean skipSong = false;
	private static boolean running = true;
	private String mediaOptions;
	
	public Stream(String mediaOptions){
		this.mediaOptions = mediaOptions;
	}
	
	@Override
	public void run(){
		//Servlet.mediaPlayerFactory = new MediaPlayerFactory(" --http-host=127.0.0.1:10000");
		mediaPlayer = Servlet.mediaPlayerFactory.newHeadlessMediaPlayer();
		mediaPlayer.setPlaySubItems(true);
		
		mediaPlayer.setStandardMediaOptions(mediaOptions);
		
		addPathToPlaylist(Servlet.intermissionLocation);
		
		try{
			//FIXME by finishing the new Stream class
			while(running){
				mediaPlayer.playMedia(playlist.get(0));
				currentSong = playlist.get(0);
				System.out.println("Playing: " + playlist.get(0));
				
				playlist.remove(0);
				playlist.trimToSize();
				
				Thread.sleep(1000); //Wait for the sound to buffer

				System.out.println(playlist.size() + " songs in playlist");

				if(playlist.isEmpty()){
					addPathToPlaylist(Servlet.intermissionLocation);
					System.out.println("Playlist was empty, Intermission added");
				}
				
				//This is probably where the stream gets interrupted sometimes because I'm not giving it enough time to buffer, I have not thought of a solution yet 
				
				skipSong = false;
				while(mediaPlayer.isPlaying() && !skipSong){
					Thread.sleep(10);
				}
			}
		}catch(InterruptedException e){
			System.out.println("Something killed my Stream Thread :( " + e);
		}
	}
	
	public static void stopAllStreams(){
		running = false;
	}
	
	public boolean addToPlaylist(String videoID){
		
		
		if(!(videoID == null)){
			for(String item : playlist){
				if(item.contains(videoID)){
					return false;
				}
			}
		}else{
			return false;
		}
		
		requestHistory.add(videoID);
		
		YouTubeRipper.requestRip(videoID);
		return true;
	}
	
	public void addPathToPlaylist(String filePath){
		playlist.add(filePath);
	}
	
	public ArrayList getPlaylist(){
		return playlist;
	}
	
	public int getPlaylistSize(){
		return playlist.size();
	}
	
	public float getSongProgress(){
		return mediaPlayer.getPosition();
	}
	
	public long getSongLength(){
		return mediaPlayer.getLength();
	}
	
	public String getCurrentSong(){
		String id = currentSong.replace(Servlet.musicDir, "");
		id = id.replace(".ogg", "");
		if(id.length() != 11){
			return "";
		}
		return id;
	}
	
	public void skipSong(){
		skipSong = true;
	}
}
