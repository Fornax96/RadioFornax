package nl.Fornax;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import uk.co.caprica.vlcj.player.MediaPlayerFactory;

/**
 * @author Fornax
 * 
 * If you like my work consider donating some doge ;)
 * DR5r16hwuSoTo4UBELQR3au6nJpwcXc5nd
 * 
 * Completely abundant class, almost ready to be removed.
 */
public class RadioUtil {
	//TODO move this method to a more appropriate place and remove RadioUtil
	private final MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory();
	
	public static String formatURL(String URL){
		String pattern = "#(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\\/)[^&\\n]+|(?<=v=)[^&\\n]+|(?<=youtu.be/)[^&\\n]+#";
		Pattern compiledPattern = Pattern.compile(pattern);
		Matcher matcher = compiledPattern.matcher(URL);
		
		if(matcher.find()){
			return matcher.group();
		}else{
			return "";
		}
	}
	
	public static String YouTubeMP3(String URL){
		return "http://youtubeinmp3.com/fetch/?api=advanced&video=" + URL;
		
		//String vidID = formatURL(URL);
		//return "http://www.youtube-mp3.org/get?ab=128&video_id=" + vidID;
		
	}
}
