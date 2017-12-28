package com.enterise.web.htmlgen.doc;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.poi.hwpf.usermodel.Picture;
import org.dom4j.Element;

import com.enterise.gis.image.ImageScale;
import com.enterise.web.htmlgen.HtmlBuilder;
import com.enterise.web.htmlgen.HtmlPage;

public class WordHtmlBuilder extends HtmlBuilder {

	private String documentId;
	private int pictureCount = 0;

	public WordHtmlBuilder() {
		super();
	}

	public void addPictures(List pictureList) {
		List pageList = getPageList();
		Iterator pageIter = pageList.iterator();
		while (pageIter.hasNext()) {
			HtmlPage page = (HtmlPage) pageIter.next();
			Element bodyElem = page.getBodyElement();
			List paragraphElemList = bodyElem.selectNodes("p");
			Iterator pElemIter = paragraphElemList.iterator();
			while (pElemIter.hasNext()) {
				Element pElem = (Element) pElemIter.next();
				String elemText = pElem.getText();
				while (isContainsPicture(elemText)) {
					insertPicture(pElem, pictureList);
					elemText = pElem.getText();
				}
			}
		}
	}

	private boolean isContainsPicture(String elemText) {
		// A picture is represented in the document text stream as a ASCII 1.
		return elemText.indexOf((char)1) != -1;
	}

	private void insertPicture(Element pElem, List pictureList) {

		Picture p = (Picture) pictureList.get(pictureCount);
		int width = p.getWidth();
		int height = p.getHeight();
		byte[] pictureContent = p.getContent();
		
		String documentId = getDocumentId();
		String pictureFileName = documentId + "_img_" + pictureCount + ".png";
		ByteArrayInputStream bais = new ByteArrayInputStream(pictureContent);
		try {
			BufferedImage srcImage = ImageIO.read(bais);
			ImageScale imageScale = new ImageScale(176, 220);
			BufferedImage destImage = imageScale.scale(srcImage);
			ImageIO.write(destImage, "png", new File(pictureFileName));
		} catch (IOException e) {
			e.printStackTrace();
		}
		Element imgElem = pElem.addElement("img");
		imgElem.addAttribute("src", pictureFileName);
		
		String elemText = pElem.getText();
		String strASCII1= String.valueOf((char)1);
		String newText = elemText.replaceAll(strASCII1, "");
		pElem.setText(newText);

		pictureCount++;
	}
}