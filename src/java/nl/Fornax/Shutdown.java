package nl.Fornax;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * @author Fornax
 */
public class Shutdown implements ServletContextListener{

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		System.out.println("Context Listener Initialised");
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		System.out.println("Stopping all threads");
		YouTubeRipper.killThreads();
		Stream.stopAllStreams();
	}

}
