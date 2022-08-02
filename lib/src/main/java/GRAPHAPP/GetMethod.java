package GRAPHAPP;

import java.io.PrintWriter;
import java.io.StringWriter;

public class GetMethod {
	
	public static String printException(Exception e) {
		e.printStackTrace();
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		e.printStackTrace(pw);
		pw.flush();
		return sw.toString();
	}
}
