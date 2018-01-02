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
import com.ulab.core.Constants;

public class PdfHtmlPage extends HtmlPage {

	public void addTextLine(String text) {
		getBodyElement().addElement("br").setText(text);
	}
	
	public void addPicture(PDXObjectImage image, String fileExtensionName) {
		Random r = new Random();
		String pictureId = String.valueOf(Math.abs(r.nextInt()));
		String fileName =Constants.CREATE_IMAGE_PATH+getDocumentId() + "_" + pictureId + "." + fileExtensionName;
		
		try {
			BufferedImage srcImage = image.getRGBImage();
			//可以选择缩放 目前没有
			/*ImageScale imageScale = new ImageScale(176, 220);
			BufferedImage destImage = imageScale.scale(srcImage);
			ImageIO.write(destImage, fileExtensionName, new File(fileName));*/
			File imageFile=new File(fileName);
			if (!imageFile.exists()) {//判断文件夹是否创建，没有创建则创建新文件夹
				imageFile.mkdirs();
			}
			ImageIO.write(srcImage, fileExtensionName, imageFile);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		Element imgElem = getBodyElement().addElement("p").addElement("img");
		imgElem.addAttribute("src", fileName);
	}
}