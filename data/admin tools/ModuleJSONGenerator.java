import java.util.*;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.FileReader;

public class ModuleJSONGenerator {
    private static ArrayList<Module> modules=new ArrayList<Module>();
    private static HashMap<String,Module> map=new HashMap<String,Module>();
	
    public static void main(String[] args) {
       modules.add(new Module());
		ModuleJSONGenerator m=new ModuleJSONGenerator();
		m.runModulesVer2016();
		m.runModulesVer2015();
		m.runModulesSem2016();
		m.runModulesSem2015();
		m.runModulesSem2014();
		m.runModulesSem2013();
		m.runModulesSem2012();
		
		Collections.sort(modules);
		
		try{
			BufferedWriter bw=new BufferedWriter(new FileWriter("moduleList.json",true));
			bw.write("[\"");
			for(Module s:modules){
				s.print();
			    //s.printAll();
			    bw.write(s.getCode());
			    bw.write("\",\"");
			}
			bw.close();
		}catch(IOException e){
			System.out.println("no file");
		}
		finally{
/*			if(bw!=null){
				try{
					bw.close();
				}catch(IOException e){
					e.printStackTrace();
				}
			}		*/
		}
	}
	private void runModulesVer2016(){
		try{
			Scanner sc=new Scanner(new FileReader("2016modules.txt"));
			while(sc.hasNextLine()){
				String temp = sc.nextLine();
				String[] input=temp.split("\"");
				if(input.length>1){
					switch(input[1]){
					case "ModuleCredit": {
						if(!modules.get(modules.size()-1).moduleCredit(sc, input[3])){
							//modules.get(modules.size()-1).print();
							modules.add(new Module());
						}
							//modules.add(new Module());
						
						modules.get(modules.size()-1).moduleCredit(sc,input[3]);
						break;}
					case "ModmavenTree": {
						if(!modules.get(modules.size()-1).modmavenTree(sc))
							modules.add(new Module());
						modules.get(modules.size()-1).modmavenTree(sc);
						break;}
					case "ParsedPrerequisite": {
						if(!modules.get(modules.size()-1).parsedPrerequisite(sc, input))
							modules.add(new Module());
						modules.get(modules.size()-1).parsedPrerequisite(sc, input);
						break;}
					case "ParsedPreclusion":{ 
						if(!modules.get(modules.size()-1).parsedPreclusion(sc))
							modules.add(new Module());
						modules.get(modules.size()-1).parsedPreclusion(sc);
						break;}
					case "ModuleTitle": {
						if(!modules.get(modules.size()-1).moduleTitle(input[3]))
							modules.add(new Module());
						modules.get(modules.size()-1).moduleTitle(input[3]);
						break;}
					case "ModuleCode": {
						if(!modules.get(modules.size()-1).moduleCode(input[3]))
							modules.add(new Module());
						modules.get(modules.size()-1).moduleCode(input[3]);
						map.put(modules.get(modules.size()-1).getCode(),modules.get(modules.size()-1));
						break;}
					case "ModuleDescription": {
						if(!modules.get(modules.size()-1).moduleDescription(sc, input))
							modules.add(new Module());
						modules.get(modules.size()-1).moduleDescription(sc,input);
						break;}
					case "Prerequisite": {
						if(!modules.get(modules.size()-1).prerequisite(sc, input))
							modules.add(new Module());
						modules.get(modules.size()-1).prerequisite(sc,input);
						break;}
					case "LockedModules":{
						if(!modules.get(modules.size()-1).lockedModules(sc, input))
							modules.add(new Module());
						modules.get(modules.size()-1).lockedModules(sc, input);
						break;
					}
					case "Preclusion":{
						if(!modules.get(modules.size()-1).preclusion(sc,input))
							modules.add(new Module());
						modules.get(modules.size()-1).preclusion(sc, input);
						break;}
					case "CrossModule": 
						modules.get(modules.size()-1).crossModule(temp);
						break;
					}
					
				}
			}
			}catch(IOException e){
				System.out.println("File read error");
		}     

	}
	
	private void runModulesVer2015(){
		boolean isRepeated = false;
		try{
			Scanner sc=new Scanner(new FileReader("2015modules.txt"));
			while(sc.hasNextLine()){
				String temp = sc.nextLine();
				String[] input=temp.split("\"");
				if(input.length>1){
					switch(input[1]){
					case "ModuleCredit": {
						if(!modules.get(modules.size()-1).moduleCredit(sc, input[3])){
							//modules.get(modules.size()-1).print();
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
							//modules.add(new Module());
						
						modules.get(modules.size()-1).moduleCredit(sc,input[3]);
						break;}
					case "ModmavenTree": {
						if(!modules.get(modules.size()-1).modmavenTree(sc)) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).modmavenTree(sc);
						break;}
					case "ParsedPrerequisite": {
						if(!modules.get(modules.size()-1).parsedPrerequisite(sc, input)) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).parsedPrerequisite(sc, input);
						break;}
					case "ParsedPreclusion":{ 
						if(!modules.get(modules.size()-1).parsedPreclusion(sc)) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).parsedPreclusion(sc);
						break;}
					case "ModuleTitle": {
						if(!modules.get(modules.size()-1).moduleTitle(input[3])) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).moduleTitle(input[3]);
						break;}
					case "ModuleCode": {
						if(!modules.get(modules.size()-1).moduleCode(input[3])) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).moduleCode(input[3]);
						if (map.containsKey(input[3]))
							isRepeated = true;
						else
							map.put(modules.get(modules.size()-1).getCode(),modules.get(modules.size()-1));
						break;}
					case "ModuleDescription": {
						if(!modules.get(modules.size()-1).moduleDescription(sc, input)) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).moduleDescription(sc,input);
						break;}
					case "Prerequisite": {
						if(!modules.get(modules.size()-1).prerequisite(sc, input)) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).prerequisite(sc,input);
						break;}
					case "LockedModules":{
						if(!modules.get(modules.size()-1).lockedModules(sc, input)) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).lockedModules(sc, input);
						break;
					}
					case "Preclusion":{
						if(!modules.get(modules.size()-1).preclusion(sc,input)) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).preclusion(sc, input);
						break;}
					case "CrossModule": 
						if(!modules.get(modules.size()-1).preclusion(sc,input)) {
							if (isRepeated) {
								modules.remove(modules.size()-1);
								isRepeated = false;
							}
							modules.add(new Module());
						}
						modules.get(modules.size()-1).crossModule(temp);
						break;
					}
					
				}
			}
			}catch(IOException e){
				System.out.println("File read error");
		}     

	}
	
	private void runModulesSem2016(){
		String[] semesters={"2016bulletinModulesRaw1.txt","2016bulletinModulesRaw2.txt",
				"2016bulletinModulesRaw3.txt","2016bulletinModulesRaw4.txt"};
		for(int i=0;i<4;i++){
		try{
			Scanner sc=new Scanner(new FileReader(semesters[i]));
			sc.useDelimiter("\"");
			String code=null;
			while(sc.hasNext()){
				String input=sc.next();
				switch(input){
				case "Corequisite": map.get(code).corequisite(sc);break;
//				case "CrossModule": map.get(code).crossModule(input);break;
				case "ModuleCode": {
					sc.next();
					//System.out.println(map.get("ACC1002").getCode());
					code=sc.next();
//					System.out.println(code);
					map.get(code).history(2016,Integer.parseInt(Character.toString(semesters[i].charAt(22))) );
					//System.out.println(code);
					break;
				}
				case "Faculty": map.get(code).faculty(sc);break;
				case "Department": map.get(code).department(sc);break;
				}
			}
		}catch(IOException e){
			System.out.println("File read error");
		}
		}
	}
	
	private void runModulesSem2015(){
		String[] semesters={"2015bulletinModulesRaw1.txt","2015bulletinModulesRaw2.txt",
				"2015bulletinModulesRaw3.txt","2015bulletinModulesRaw4.txt"};
		for(int i=0;i<4;i++){
		try{
			Scanner sc=new Scanner(new FileReader(semesters[i]));
			sc.useDelimiter("\"");
			String code=null;
			while(sc.hasNext()){
				String input=sc.next();
				switch(input){
				case "Corequisite": map.get(code).corequisite(sc);break;
//				case "CrossModule": map.get(code).crossModule(input);break;
				case "ModuleCode": {
					sc.next();
					//System.out.println(map.get("ACC1002").getCode());
					code=sc.next();
//					System.out.println(code);
					map.get(code).history(2015,Integer.parseInt(Character.toString(semesters[i].charAt(22))) );
					//System.out.println(code);
					break;
				}
				case "Faculty": map.get(code).faculty(sc);break;
				case "Department": map.get(code).department(sc);break;
				}
			}
		}catch(IOException e){
			System.out.println("File read error");
		}
		}
	}
	
	private void runModulesSem2014(){
		String[] semesters={"2014bulletinModulesRaw1.txt","2014bulletinModulesRaw2.txt",
				"2014bulletinModulesRaw3.txt","2014bulletinModulesRaw4.txt"};
		for(int i=0;i<4;i++){
		try{
			Scanner sc=new Scanner(new FileReader(semesters[i]));
			String[] array = sc.nextLine().split("\"");
			String code=null;
			for (int j = 0; j < array.length; j++) {
				if (array[j].equals("ModuleCode")) {
					j += 2;
					code = array[j];
					if (map.containsKey(code))
						map.get(code).history(2014, (i+1));
				}
			}
		}catch(IOException e){
			System.out.println("File read error");
		}
		}
	}
	
	private void runModulesSem2013(){
		String[] semesters={"2013bulletinModulesRaw1.txt","2013bulletinModulesRaw2.txt",
				"2013bulletinModulesRaw3.txt","2013bulletinModulesRaw4.txt"};
		for(int i=0;i<4;i++){
		try{
			Scanner sc=new Scanner(new FileReader(semesters[i]));
			String[] array = sc.nextLine().split("\"");
			String code=null;
			for (int j = 0; j < array.length; j++) {
				if (array[j].equals("ModuleCode")) {
					j += 2;
					code = array[j];
					if (map.containsKey(code))
						map.get(code).history(2013, (i+1));
				}
			}
		}catch(IOException e){
			System.out.println("File read error");
		}
		}
	}
	
	private void runModulesSem2012(){
		String[] semesters={"2012corsBiddingStatsRaw1.txt","2012corsBiddingStatsRaw2.txt",
				"2012moduleTimetableDeltaRaw3.txt","2012moduleTimetableDeltaRaw4.txt"};
		for(int i=0;i<4;i++){
		try{
			Scanner sc=new Scanner(new FileReader(semesters[i]));
			String[] array = sc.nextLine().split("\"");
			String code=null;
			for (int j = 0; j < array.length; j++) {
				if (array[j].equals("ModuleCode")) {
					j += 2;
					code = array[j];
					if (map.containsKey(code))
						map.get(code).history(2012, (i+1));
				}
			}
		}catch(IOException e){
			System.out.println("File read error");
		}
		}
	}
}