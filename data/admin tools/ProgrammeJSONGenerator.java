import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Scanner;

public class ProgrammeJSONGenerator {
	public static void main(String[] args) {
		LinkedList<String> modules = new LinkedList<String>();
		try {
			BufferedReader in = new BufferedReader(new FileReader("moduleList.json"));  	        
		    String[] tokens = in.readLine().split("\"");
		    for (int i = 1; i < tokens.length; i++) {		    	
		    	modules.add(tokens[i]);
		    	i++;
			}
		    in.close();
		} catch (IOException e) {
	        System.out.println("File read error for moduleList.json! ");
	        e.printStackTrace();
	    }
		
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter file name");
		String filename = sc.nextLine();
		Programme myProgramme = new Programme(filename, modules);
		myProgramme.edit();
		myProgramme.generateJSON();
		sc.close();
	}
}
