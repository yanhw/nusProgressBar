import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

class Module{
	private ArrayList<String> lockedModules=new ArrayList<String>();
	private String moduleCredit="\"moduleCredit\": \"-1\",";
	private ArrayList<String> modmavenTree=new ArrayList<String>();
	private ArrayList<String> parsedPreclusion=new ArrayList<String>();
	private ArrayList<String> preclusion=new ArrayList<String>();
	private String preclusionText = "";
	private String moduleTitle="\"moduleTitle\": \"-1\",";
	private String moduleCode="\"moduleCode\": \"-1\",";
	private ArrayList<String> moduleDescription=new ArrayList<String>();
	private String moduleDescriptionText = "";
	private String crossModule="\"crossModule\": \"-1\",";
	private String corequisite="\"corequisite\": \"-1\",";
	private String faculty="\"faculty\": \"-1\",";
	private String department="\"department\": \"-1\",";
	private int[][] history=new int[6][5];

	public boolean lockedModules(Scanner sc){
		if(!lockedModules.isEmpty())
			return false;
		lockedModules.add("\"lockedModules\":[");

		String input1=sc.nextLine();
		String[] input1str=input1.split("\"");
		if(input1str.length==5){
			lockedModules.add(lockedModules.remove(0)+"],");
			System.out.println(lockedModules.get(lockedModules.size()-1));
		}
		else{
			while(input1str.length>1){
				lockedModules.add(input1.substring(0,input1.length()-1));
				System.out.println(lockedModules.get(lockedModules.size()-1));
				input1=sc.nextLine();
				input1str=input1.split("\"");
			}
			lockedModules.add(lockedModules.remove(lockedModules.size()-1)+"\"");
			System.out.println(lockedModules.get(lockedModules.size()-1));
			lockedModules.add(input1.substring(0,input1.length()-1));
			System.out.println(lockedModules.get(lockedModules.size()-1));
		}
		return true;
	}
	public boolean moduleCredit(Scanner sc,String credit){
		if(!moduleCredit.equals("\"moduleCredit\": \"-1\","))
			return false;
		moduleCredit=moduleCredit.substring(0,moduleCredit.length()-4)+credit+"\",";
		return true;
	}
	public boolean modmavenTree(Scanner sc){
		if(!modmavenTree.isEmpty())
			return false;
		sc.nextLine();
		String input2=sc.nextLine();
		//String[] input2str=input2.split("\"");
		modmavenTree.add("\"prerequisite\": {");
		int count = 1;
		while(count > 0){
			if(input2.charAt(input2.length()-1)=='\\')
				modmavenTree.add(input2.substring(0,input2.length()-1));
			else
				modmavenTree.add(input2);
			input2=sc.nextLine();
			if (input2.trim().equals("},"))
				count--;
			if (input2.trim().equals("}"))
				count--;
			if (input2.trim().equals("{"))
				count++;
			//input2str=input2.split("\"");
		}
		modmavenTree.add("},");
		return true;
		}
	public boolean parsedPreclusion(Scanner sc){
		if(!parsedPreclusion.isEmpty())
			return false;
		String input3=sc.nextLine();
		String[] input3str=input3.split("\"");
		parsedPreclusion.add("\"preclusionList\": [");
		while(input3str.length>1){
			parsedPreclusion.add(input3.substring(0,input3.length()-1));
			input3=sc.nextLine();
			input3str=input3.split("\"");
			}
		parsedPreclusion.add(parsedPreclusion.remove(parsedPreclusion.size()-1)+"\"");
		parsedPreclusion.add(input3.substring(0,input3.length()-1));
		return true;
		}
	
	public boolean preclusion(Scanner sc,String[] credit){
		if(!preclusion.isEmpty())
			return false;
		preclusion.add("\"preclusion\": "+"\""+credit[3]);
		
		boolean endOfString, addedsomething = true;
		int index = 3;
		do {
			endOfString = true;
			
			
			preclusion.add(preclusion.remove(preclusion.size()-1).trim()+"\"");
			if ((preclusion.get(preclusion.size()-1).length() > 1) && (preclusion.get(preclusion.size()-1).charAt(preclusion.get(preclusion.size()-1).length()-2) == '\\')){ 
				endOfString = false;
				System.out.println("there is one more line");
			}
//			System.out.println(preclusion.get(preclusion.size()-1));
			if(!endOfString){
				index++;
				preclusion.add(credit[index]);
				System.out.println(credit[index]);
			}
		}while (!endOfString);
		preclusion.add(",");
		
		for (String content: preclusion)
			preclusionText += content;
		
		return true;
		
	}
	
	public boolean moduleTitle( String title){
		if(!moduleTitle.equals("\"moduleTitle\": \"-1\","))
			return false;
		moduleTitle=moduleTitle.substring(0,moduleTitle.length()-4)+title+"\",";
		return true;
		}
	public boolean moduleCode(String code){
		if(!moduleCode.equals("\"moduleCode\": \"-1\","))
			return false;
		moduleCode=moduleCode.substring(0,moduleCode.length()-4)+code+"\",";
		System.out.println(moduleCode);
		return true;
		}
	public boolean moduleDescription(Scanner sc, String[] text){
		if(!moduleDescription.isEmpty())
			return false;
		moduleDescription.add("\"moduleDescription\": "+"\""+text[3]);
		boolean endOfString, addedsomething = false;
		
		int index = 3;
		do {
			endOfString = true;
			
		//	String[] input5=sc.nextLine().split("\"");
		//	while((input5.length==1)&&(!addedsomething)){
		//	moduleDescription.add(input5[0]);
		//		input5=sc.nextLine().split("\"");
		//		System.out.println(input5[0]);
//				try {
//					wait(1000);
//				} catch (InterruptedException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
		//		}
//				addedsomething = true;
//			}  
//			if (!addedsomething)
//				moduleDescription.add(input5[0]);
			moduleDescription.add(moduleDescription.remove(moduleDescription.size()-1).trim()+"\"");
			if ((moduleDescription.get(moduleDescription.size()-1).length() > 1) && 
					(moduleDescription.get(moduleDescription.size()-1).charAt(moduleDescription.get(moduleDescription.size()-1).length()-2) == '\\')) 
				endOfString = false;
			addedsomething = true;
			if(!endOfString){
				index++;
				moduleDescription.add(text[index]);
	//			System.out.println(text[index]);
			}
		}while (!endOfString);
		moduleDescription.add(",");
		
		for (String content: moduleDescription)
			moduleDescriptionText += content;
		
		return true;
	}
	public String getCode(){
		return moduleCode.substring(15,moduleCode.length()-2);
	}
    public void print(){
		String name=moduleCode.substring(15,moduleCode.length()-2);
		printContent(name,"{");
		printContent(name,moduleCode);
		printContent(name,moduleTitle);
		printContent(name,moduleCredit);
		for(String s:lockedModules)
			printContent(name,s);
		for(String t:preclusion)
			printContent(name,t);
		for(String w:parsedPreclusion)
			printContent(name,w);
		for(String h:modmavenTree)
			printContent(name,h);
//		for(String y:moduleDescription)
			printContent(name,moduleDescriptionText);
		printContent(name,crossModule);
		printContent(name,corequisite);
		printContent(name,faculty);
		printContent(name,department);
		String historyToPrint="\"history\": [";
		for(int i=0;i<6;i++){
			historyToPrint+="[";
			for(int j=0;j<5;j++){
			historyToPrint+=history[i][j];
			historyToPrint+=",";
		}
			historyToPrint+="],";
		}
		historyToPrint=historyToPrint.substring(0,historyToPrint.length()-1)+"]";
		printContent(name,historyToPrint);
		printContent(name,"}");
		}
    public void printAll(){
		String name="allModuleInfo";
		printContent(name,"{");
		printContent(name,moduleCode);
		printContent(name,moduleTitle);
		printContent(name,moduleCredit);
		for(String s:lockedModules)
			printContent(name,s);
	//	for(String t:preclusion)
			printContent(name,preclusionText);
		for(String w:parsedPreclusion)
			printContent(name,w);
		for(String h:modmavenTree)
			printContent(name,h);
//		for(String y:moduleDescription)
			printContent(name,moduleDescriptionText);
		printContent(name,crossModule);
		printContent(name,corequisite);
		printContent(name,faculty);
		printContent(name,department);
		String historyToPrint="\"history\": [";
		for(int i=0;i<6;i++){
			historyToPrint+="[";
			for(int j=0;j<5;j++){
			historyToPrint+=history[i][j];
			historyToPrint+=",";
		}
			historyToPrint+="],";
		}
		historyToPrint=historyToPrint.substring(0,historyToPrint.length()-1)+"]";
		printContent(name,historyToPrint);
		printContent(name,"},");
	}
    
	private void printContent(String name,String content){
		BufferedWriter bw=null;
		try{
			bw=new BufferedWriter(new FileWriter(name+".json",true));
            bw.write(content);
			bw.newLine();
			}catch(IOException e){
				System.out.println("no file");
				}
			finally{
				if(bw!=null){
					try{
						bw.close();
						}catch(IOException e){
							e.printStackTrace();
							}
					}
				}
		}
	
	public void crossModule(Scanner sc){
		if(!crossModule.equals("\"crossModule\": \"-1\","))
			return;
		sc.next();
		String input=sc.next();
		if(!input.equals(""))
		crossModule=crossModule.substring(0,crossModule.length()-4)+sc.next()+"\",";
		}
    public void corequisite(Scanner sc){
    	if(!corequisite.equals("\"corequisite\": \"-1\","))
    		return;
        sc.next();
		String input=sc.next();
		if(!input.equals(""))
		corequisite=corequisite.substring(0,corequisite.length()-4)+input;
		else return;
		input=sc.next();
		while(!input.equals("},{")){
			corequisite=corequisite+input;
			input=sc.next();
			}
		corequisite=corequisite+"\",";
		}
    public void faculty(Scanner sc){
    	if(!faculty.equals("\"faculty\": \"-1\","))
    		return;
    	sc.next();
    	String input=sc.next();
    	faculty=faculty.substring(0,faculty.length()-4)+input;
    	input=sc.next();
    	while(!input.equals(",")){
    		faculty=faculty+input;
    		input=sc.next();
    	}
    	faculty=faculty+input.substring(0,input.length()-1)+"\",";
    	//System.out.println(faculty);
    }
    public void department(Scanner sc){
    	if(!department.equals("\"department\": \"-1\","))
    		return;
    	sc.next();
    	String input=sc.next();
    	department=department.substring(0,department.length()-4)+input;
    	input=sc.next();
    	while(!input.equals(",")){
    		department=department+input;
    		input=sc.next();
    	}
    	department=department+"\",";
    	//System.out.println(department);
    }
    public void history(int year,int sem){
    	history[year-2010][0]=year;
    	history[year-2010][sem]=sem;
    }
	
}