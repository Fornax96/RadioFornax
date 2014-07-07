package nl.Fornax;

import java.util.ArrayList;

/**
 * @author Fornax
 * 
 * If you like my work consider donating some doge ;)
 * DR5r16hwuSoTo4UBELQR3au6nJpwcXc5nd
 */
public class YouTubeRipper {
	
	public static ArrayList<String> conversionList = new ArrayList();
	
	private static YouTubeRipperThread conv1;
	private static YouTubeRipperThread conv2;
	private static YouTubeRipperThread conv3;
	private static YouTubeRipperThread conv4;
	
	public static void spawnThreads(){
		conv1 = new YouTubeRipperThread();
		conv1.start();
		conv1.setName("ConversionThread1");
		conv2 = new YouTubeRipperThread();
		conv2.start();
		conv2.setName("ConversionThread2");
		conv3 = new YouTubeRipperThread();
		conv3.start();
		conv3.setName("ConversionThread3");
		conv4 = new YouTubeRipperThread();
		conv4.start();
		conv4.setName("ConversionThread4");
		//Just created four YouTube downloaders for super super lighning speed music downloads
		System.out.println("YouTube Ripper threads spawned");
	}
	
	public static void killThreads(){
		//This doesn't really work, need to find an alternative route
		conv1.destroy();
		conv2.destroy();
		conv3.destroy();
		conv4.destroy();
	}
	
	public static void requestRip(String YouTubeID){
		String YouTubeURL = "http://www.youtube.com/watch?v=" + YouTubeID;
		
		int l1 = conv1.getListSize();
		int l2 = conv2.getListSize();
		int l3 = conv3.getListSize();
		int l4 = conv4.getListSize();
		
		//Here it checks what Thread has the least work to do and giges it the next ripping job
		if(l1 <= l2 && l1 <= l3 && l1 <= l4)		{conv1.requestRip(YouTubeURL);}
		else if(l2 <= l1 && l2 <= l3 && l2 <= l4)	{conv2.requestRip(YouTubeURL);}
		else if(l3 <= l1 && l3 <= l2 && l3 <= l4)	{conv3.requestRip(YouTubeURL);}
		else if(l4 <= l1 && l4 <= l3 && l4 <= l2)	{conv4.requestRip(YouTubeURL);}
		
		//Print out how the work is distributed
		System.out.println("Conversion queue T1: " + l1 + " T2: " + l2 + " T3: " + l3 + " T4: " + l4);
	}
}
