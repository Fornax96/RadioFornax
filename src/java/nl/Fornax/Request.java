package nl.Fornax;

/**
 * @author Fornax
 * 
 * If you like my work consider donating some doge ;)
 * DR5r16hwuSoTo4UBELQR3au6nJpwcXc5nd
 * 
 * I can't remember why I created this class, I could probably remove it
 */
public class Request {
	public static boolean requestSong(String URL){
		String UrlFormatted = RadioUtil.formatURL(URL);
		
		if(UrlFormatted.length() == 11){
			System.out.println("Video " + UrlFormatted + " has been requested");
			return true;
		}else{
			return false;
		}
	}
}
