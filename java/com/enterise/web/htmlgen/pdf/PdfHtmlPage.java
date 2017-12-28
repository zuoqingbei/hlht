package com.enterise.web.htmlgen.pdf;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;

import org.apache.pdfbox.pdmodel.graphics.xobject.PDXObjectImage;
import org.dom4j.Element;

import com.enterise.gis.image.ImageScale;
import com.enterise.web.htmlgen.HtmlPage;

public class PdfHtmlPage extends HtmlPage {

	public void addTextLine(String text) {
		getBodyElement().addElement("br").setText(text);
	}
	
	public void addPicture(PDXObjectImage image, String fileExtensionName) {
		Random r = new Random();
		String pictureId = String.valueOf(Math.abs(r.nextInt()));
		String fileName = getDocumentId() + "_" + pictureId + "." + fileExtensionName;
		
		try {
			BufferedImage srcImage = image.getRGBImage();
			ImageScale imageScale = new ImageScale(176, 220);
			BufferedImage destImage = imageScale.scale(srcImage);
			ImageIO.write(destImage, fileExtensionName, new File(fileName));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		Element imgElem = getBodyElement().addElement("p").addElement("img");
		imgElem.addAttribute("src", fileName);
	}
}