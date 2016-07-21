import java.util.LinkedList;

public class Exclusion {
	private LinkedList<Triple> exclusionList;
	
	public Exclusion(String input) {
		exclusionList = new LinkedList<Triple>();
		String[] token = input.substring(10).split(",|\\;");
		for (int i = 0; i < token.length/3; i++) {
			String temp1 = token[i].trim();
			String temp2 = token[i+1].trim();
			String temp3 = token[i+2].trim();
			exclusionList.add(new Triple(temp1, temp2, temp3));
		}
	}
	
	public LinkedList<Triple> getExclusionList() {
		return exclusionList;
	}
	
	public LinkedList<String> getCauseList() {
		LinkedList<String> causeList = new LinkedList<String>();
		for (Triple temp : exclusionList) {
			causeList.add(temp.getFirst());
		}
		return causeList;
	}
}
