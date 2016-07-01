import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.LinkedList;

public class Programme {
	private LinkedList<String> modules;
	
	private String name;
	private String type;
	private String updatedDate;
	private String link;
	private int AY;
	private LinkedList<ModuleList> lists;
	
	private LinkedList<String> specialisations;
	private LinkedList<String> outputStrings;
	
	public Programme(String filename, LinkedList<String> modules) {
		this.modules = modules;
		try {
			BufferedReader in = new BufferedReader(new FileReader(filename));  
	        String input;
	        
	        //Read name
	        input = in.readLine();
	        name = input.substring(7);
	        
	        //Read type
	        input = in.readLine();
	        type = input.substring(6);
	        
	        //Read AY
	        input = in.readLine();
	        AY = Integer.parseInt(input.substring(4));
	        
	        //Read updatedDate
	        input = in.readLine().substring(9);
	        updatedDate = input.trim();
	        
	        //Read link
	        input = in.readLine();
	        link = input.substring(6);
	        
	        //Read specialisation list
	        specialisations = new LinkedList<String>();
	        input = in.readLine().substring(20);
	        String[] tokens = input.split(",|\\;");
	        for (int i = 0; i < tokens.length; i++) {
	        	specialisations.add(tokens[i].trim());
	        }
	        
	        in.readLine();
	        
	        //Read lists
	        lists = new LinkedList<ModuleList>();
	        while (in.readLine().equals("+")) {
	        	lists.add(new ModuleList(in));
	        }
	        
	        in.close();
		} catch (IOException e) {
	        System.out.println("File read error for (" + filename + ")! ");
	        e.printStackTrace();
	    }
		outputStrings = new LinkedList<String>();
	}
	
	public void edit() {
		for (int i = 0; i < specialisations.size(); i++) {
			String output = "{ \"specialisationName\" : \"" + specialisations.get(i) + "\",";
			i++;
			output += "\"lists\" : [";
			String target = specialisations.get(i);
			int count = 0;
			LinkedList<String> visibletemp = new LinkedList<String>();
			
			for (ModuleList list: lists) {
				LinkedList<String> types = list.getTypes();
				boolean isVisible = false;
				boolean isTargeted = false;
				for (int j = 0; j < types.size(); j++) {
					if (types.get(j).equals("visible"))
						isVisible = true;
					if (types.get(j).equals(target))
						isTargeted = true;
				}
				if (isVisible && isTargeted) {
					String listname = list.getName();
					visibletemp.add(listname);
					output += "{\"listName\":\"";
					output += listname;
					output += "\",";
					output += "\"requirement\":" + list.getRequirement() + ",";
					output += "\"list\":{";
					output += "\"and\":[";
					String listContent = createList(list, target);
					output += listContent;
					output +="]";
					output += "},";
					
					String tempString = "\"nonRepeatList\":[";
					LinkedList<String>tempList = new LinkedList<String>();
					String[] moduleArray = listContent.split("\"");
					for (int x = 0; x < moduleArray.length; x++)
						if (isModule(moduleArray[x])) {
							boolean isRepeated = false;
							for (int k = 0; k < tempList.size(); k++)
								if (moduleArray[x].equals(tempList.get(k)))
									isRepeated = true;
							if (!isRepeated)
								tempList.add(moduleArray[x]);
						}
					for (int y = 0; y < tempList.size(); y++) {
						tempString += "\"" + tempList.get(y) + "\"";
						if (y < tempList.size()-1)
							tempString += ",";
					}
					tempString += "]";
					output += tempString;
					
					output += "}";
					count++;
					if (count < 4)
						output += ",";
				}
			}
			output += "],";
			
			output += "\"visibleLists\":[";
			for (int z = 0; z < visibletemp.size(); z++) {
				output += "\"" + visibletemp.get(z) + "\"";
				if (z < visibletemp.size()-1)
					output += ",";
			}
			output += "]";
			
//			output += tempString;
			output += "}";
			outputStrings.add(output);
		
			
//			nonRepeatModules.add(tempString);
		}
	}
	
	private String createList(ModuleList list, String target) {
		String output = "";
		LinkedList<String> listString = new LinkedList<String>();
		for (int i = 0; i < list.getListSize(); i++) {
			if ((list.getItem(i).getType() == 1) || (list.getItem(i).getType() == 2)) {
				listString.add("\"" + list.getItem(i).getName() + "\"");
			}
			else if (list.getItem(i).getType() == 3) {
				String value = createType3(list.getItem(i).getName(), target);
				if (!value.equals("NIL"))
					listString.add(value);
			}
			else if (list.getItem(i).getType() == 4) {
				listString.add(createType4(list.getItem(i).getName()));
			}
			else if (list.getItem(i).getType() == 5) {
				listString.add(createType5(list.getItem(i).getName()));
			}	
		}
		for (int i = 0; i < listString.size(); i++) {
			output += listString.get(i);
			if (i < listString.size()-1)
				output+=",";
		}
		return output;
	}
	
	private String createType3(String input, String specialisation) {
		String output = "{\"or\":[";
		ModuleList target = null;
		for (ModuleList list: lists) {
			if (list.getName().equals(input))
				target = list;
		}
		boolean isCorrect = false;
		LinkedList<String> listType = target.getTypes();
		for (int i = 0; i < listType.size(); i++) {
			if (listType.get(i).equals(specialisation))
				isCorrect = true;
		}
		if (!isCorrect)
			return "NIL";
		output += createList(target, specialisation);
		output += "]}";
		return output;
	}
	
	private String createType4(String input) {
		String output = "";
		String target = "";
		for (int i = 0; i < input.length(); i++)
			if (input.charAt(i) != '*')
				target += input.charAt(i);
//		CharSequence sequence = target;
		LinkedList<String> temp = new LinkedList<String>();
		for (int i = 0; i < modules.size(); i++)
			if (modules.get(i).substring(0,target.length()).equals(target))
				temp.add(modules.get(i));
		for (int i = 0; i < temp.size(); i++) {
			output += "\"" + temp.get(i) + "\"";
			if (i < temp.size()-1)
				output += ",";
		}
		
		return output;
	}
	
	private boolean isModule(String input) {
		for (int i = 0; i < input.length(); i++)
			if (!(Character.isUpperCase(input.charAt(i))||Character.isDigit(input.charAt(i))))
				return false;
		return true;
	}
	
	private String createType5(String input) {
		String output = "";
		String target = "";
		for (int i = 0; i < input.length(); i++)
			if (input.charAt(i) != '*')
				target += input.charAt(i);
		String sequence = target.substring(0,target.length()-1);
		int bond = Integer.parseInt(target.substring(target.length()-1,target.length()));
//		System.out.println(target);
		LinkedList<String> temp = new LinkedList<String>();
		for (int i = 0; i < modules.size(); i++)
			if ((modules.get(i).substring(0,sequence.length()).equals(sequence)) && ((Integer.parseInt(modules.get(i).substring(target.length()-1,target.length())) >= bond)))
				temp.add(modules.get(i));
		for (int i = 0; i < temp.size(); i++) {
			output += "\"" + temp.get(i) + "\"";
			if (i < temp.size()-1)
				output += ",";
		}
		
		return output;
	}
	
	public void generateJSON() {
		String filename = name + ".json";;
		PrintWriter writer;
		try {
			writer = new PrintWriter(filename, "UTF-8");
			writer.println("{");
			
			//print name
			writer.println("\"name\":\"" + name + "\",");
			
			//print type
			writer.println("\"type\":\"" + type + "\",");
			
			//print AY
			writer.println("\"AY\":" + AY +",");
			
			//print undatedDate
			writer.println("\"updated\":\"" + updatedDate + "\",");
			
			//print link
			writer.println("\"link\":\"" + link + "\",");
			
			//print specialisations
			writer.println("\"specialisations\":");
			writer.print("[");
			for (int i = 0; i < outputStrings.size(); i++) {
				writer.println(outputStrings.get(i));
				if (i < outputStrings.size()-1)
					writer.print(",");
			}
			writer.println("]");
				
			writer.println("}");
			writer.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
//	private Date toDate(String input) {
//		StringTokenizer tokens = new StringTokenizer(input, "/");
//		int day = Integer.parseInt(tokens.nextToken());
//		int month = Integer.parseInt(tokens.nextToken());
//		int year = Integer.parseInt(tokens.nextToken());
//		Calendar calendar = Calendar.getInstance();
//		calendar.set(Calendar.YEAR, year);
//		calendar.set(Calendar.MONTH, month);
//		calendar.set(Calendar.DATE, day);
//		Date date = calendar.getTime();
//		return date;
//	}
}
