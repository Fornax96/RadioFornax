package nl.Fornax;

/**
 * @author Fornax
 * 
 * Here I was trying to fix the utter brokenness of the stream, but it's far from done
 * 
 * I have commented out the entire class so it wouldn't create any compile time errors
 */
public class StreamNew extends Thread{
	/*
	
	//private MediaPlayerFactory mediaPlayerFactory;
	//private MediaPlayer mediaPlayer;
	private final ArrayList<String> playlist = new ArrayList();
	private final ArrayList<String> requestHistory = new ArrayList();
	private final MediaList ml;
	private final MediaListPlayer mlp;
	private String currentSong = "";
	private boolean skipSong = false;
	private static boolean running = true;
	private final String mediaOptions;
	
	public Stream(String mediaOptions){
		this.mediaOptions = mediaOptions;
		this.ml = Servlet.mediaPlayerFactory.newMediaList();
		this.mlp = Servlet.mediaPlayerFactory.newMediaListPlayer();
		ml.setStandardMediaOptions(mediaOptions);
		mlp.setMediaList(ml);
//		mlp.addMediaListPlayerEventListener(this);
	}
	
	@Override
	public void run(){
		
		//mlp.setStandardMediaOptions(mediaOptions);
		
		addPathToPlaylist(Servlet.intermissionLocation);
		mlp.play();
		
		while(mlp.isPlaying()){
			if(ml.size() < 1){
				this.addPathToPlaylist(Servlet.intermissionLocation);
			}
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
		ml.addMedia(filePath);
	}
	
	public ArrayList getPlaylist(){
		return playlist;
	}
	
	public int getPlaylistSize(){
		return ml.size();
	}
	
	public float getSongProgress(){
		//return mlp.getPosition();
		return 0.5F;
	}
	
	public long getSongLength(){
		//return mlp.getLength();
		return 1337;
	}
	
	public String getCurrentSong(){
//		String id = currentSong.replace(Servlet.musicDir, "");
//		id = id.replace(".ogg", "");
//		if(id.length() != 11){
//			return "";
//		}
//		return id;
		return "DxtmQDCyLE8";
	}
	
	public void skipSong(){
		skipSong = true;
	}
	
	*/
}
