package nl.Fornax;

import java.io.File;
import java.util.ArrayList;
import uk.co.caprica.vlcj.player.MediaPlayer;

/**
 * @author Fornax
 * 
 * If you like my work consider donating some doge ;)
 * DR5r16hwuSoTo4UBELQR3au6nJpwcXc5nd
 * 
 * It'd be easier if this thread was integrated into YouTubeRipper class, but I realized that when it was already too late 
 */
public class YouTubeRipperThread extends Thread{
	private final ArrayList<String> conversionList = new ArrayList();
	
	//MediaPlayerFactory mediaPlayerFactory= new MediaPlayerFactory();
	//MediaPlayer converter = mediaPlayerFactory.newHeadlessMediaPlayer();
	MediaPlayer converter = Servlet.mediaPlayerFactory.newHeadlessMediaPlayer();
	
	@Override
	public void run(){
		converter.setPlaySubItems(true);
		
		try{
			while(true){
				//Loop trough the conversion stuff, not the most efficient way probably, but I'm too lazy to change it
				if(conversionList.isEmpty()){
					Thread.sleep(1000);
				}else{
					String id = RadioUtil.formatURL(conversionList.get(0));
					File file = new File(Servlet.musicDir + id + ".ogg");
					
					if(file.exists() && file.length() > 1){
						conversionList.remove(0);
						conversionList.trimToSize();
						Servlet.mainStream.addPathToPlaylist(Servlet.musicDir + id + ".ogg");
						System.out.println(Thread.currentThread() + " Song already converted, " + conversionList.size() + " conversions to go!");
					}else{
					
						converter.playMedia(conversionList.get(0), 
								":sout=#transcode{vcodec=none,novideo,acodec=vorb,ab=128,channels=2,samplerate=44100}"
										+ ":file{dst=" + Servlet.musicDir + id + ".ogg,no-overwrite}");

						System.out.println(Thread.currentThread() + " Starting conversion of " + conversionList.get(0));
						Thread.sleep(10000);

						conversionList.remove(0);
						conversionList.trimToSize();

						while(converter.isPlaying()){
							//System.out.println(Thread.currentThread() + " Conversion: " + converter.getPosition() * 100 + "% done");
							Thread.sleep(10000);
						}

						Servlet.mainStream.addPathToPlaylist(Servlet.musicDir + id + ".ogg");
						System.out.println(Thread.currentThread() + " Converted song added to playlist, " + conversionList.size() + " conversions to go!");
					
					}
					Thread.sleep(100);

				}
			}
		}catch(InterruptedException e){
			System.err.println(e);
		}
	}
	
	public int getListSize(){
		return conversionList.size();
	}
	
	public void requestRip(String URL){
		conversionList.add(URL);
	}
	
	public float getProgress(){
		return converter.getPosition();
	}
}