package com.enterise.web.htmlgen.doc;
import com.enterise.web.htmlgen.HtmlPage;

public class WordHtmlPage extends HtmlPage {
	
	public void addParagraph(String paragraphText) {
		getBodyElement().addElement("p").addText(paragraphText);
	}
}