package com.enterise.web.htmlgen;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.enterise.gis.image.ImageScale;

public class HtmlPage {

	private Document document;
	private Element htmlElem;
	private Element headElem;
	private Element bodyElem;
	private String documentId;
	private Element currentParagraphElem;
	
	public HtmlPage() {
		document = DocumentHelper.createDocument();
		initDocument(document);
	}
	
	private void initDocument(Document document) {
		document = DocumentHelper.createDocument();
		htmlElem = document.addElement("html");
		headElem = htmlElem.addElement("head");
		bodyElem = htmlElem.addElement("body");
		
		Element metaElem = headElem.addElement("meta");
		metaElem.addAttribute("http-equiv", "Content-Type");
		metaElem.addAttribute("content", "text/html; charset=GBK");
	}	

	public void addTitle(String title) {
		Element titleElem = headElem.addElement("title");
		titleElem.setText(title);
	}
	
	public void addText(String text) {
		if (text == null || text.equals("")) {
			return;
		}
		getBodyElement().addElement("p").setText(text);
	}

	public String getPageContent() {
		return htmlElem.asXML();
	}
	
	public Element getBodyElement() {
		return bodyElem;
	}
	
	public void addPagination(Pagination pagination) {
		Element pElem = bodyElem.addElement("p");
		String documentId = pagination.getDocumentId();
		int currentPageNumber = pagination.getCurrentPageNumber();
		int maxPageNumber = pagination.getMaxPageNumber();
		
		for (int i = 1; i <= maxPageNumber; i++) {
			Element aElem = pElem.addElement("a");
			aElem.setText("" + String.valueOf(i) + "");
			if (i != currentPageNumber) {
				aElem.addAttribute("href", documentId + "-" + i + ".html");
			}			
			pElem.addText(" ");
		}
	}
	
	public Element getHtmlElement() {
		return htmlElem;
	}
	
	public String getDocumentId() {
		return documentId;
	}
	
	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}
	
	public void addPicture(byte[] pictureContent, String fileExtensionName) {
		Random r = new Random();
		String pictureId = String.valueOf(Math.abs(r.nextInt()));
		String fileName = getDocumentId() + "_" + pictureId + "." + fileExtensionName;
				
		ByteArrayInputStream bais = new ByteArrayInputStream(pictureContent);
		try {
			BufferedImage srcImage = ImageIO.read(bais);
			ImageScale imageScale = new ImageScale(176, 220);
			BufferedImage destImage = imageScale.scale(srcImage);
			ImageIO.write(destImage, fileExtensionName, new File(fileName));
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		Element imgElem = getBodyElement().addElement("p").addElement("img");
		imgElem.addAttribute("src", fileName);
	}

	private Element addParagraphElement() {
		currentParagraphElem =  getBodyElement().addElement("p");
		return currentParagraphElem;
	}
}