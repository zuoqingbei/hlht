package com.enterise.web.htmlgen.ppt;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.hslf.model.Picture;
import org.apache.poi.hslf.model.Shape;
import org.apache.poi.hslf.model.Slide;
import org.apache.poi.hslf.model.TextRun;
import org.apache.poi.hslf.usermodel.PictureData;
import org.apache.poi.hslf.usermodel.SlideShow;

import com.enterise.web.htmlgen.HtmlBuilder;
import com.enterise.web.htmlgen.HtmlPage;

public class Ppt2Html {

	private SlideShow document = null;
	private String fileName;
	
	public Ppt2Html(InputStream pptFileInputStream,String fileName) {
		try {
			document = new SlideShow(pptFileInputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
		this.fileName=fileName;
	}
	
	public void generate() {
		
		HtmlBuilder htmlBuilder = new HtmlBuilder();
		
		Slide[] slideArray = document.getSlides();
		for (int i = 0; i < slideArray.length; i++) {
			
			htmlBuilder.addHtmlPage(new HtmlPage());
			HtmlPage currentPage = htmlBuilder.getCurrentPage();
			
			Slide slide = slideArray[i];
			
			TextRun[] textRunArray = slide.getTextRuns();
			for (int j = 0; j < textRunArray.length; j++) {
				currentPage.addText(textRunArray[j].getText());
			}
			
			Shape[] shapeArray = slide.getShapes();
			
			for (int j = 0; j < shapeArray.length; j++) {
				Shape shape = shapeArray[j];
				String name = shape.getShapeName();
				if (shape instanceof Picture) {
					Picture picture = (Picture)shape;
					PictureData pictureData = picture.getPictureData();
					/*
					int pictureType = pictureData.getType();
					String fileExtensionName = null;
					switch (pictureType) {
					case Picture.DIB:
						fileExtensionName = "dib";
						break;
					case Picture.EMF:
						fileExtensionName = "emf";
						break;
					case Picture.JPEG:
						fileExtensionName = "jpg";
						break;
					case Picture.PNG:
						fileExtensionName = "png";
						break;
					case Picture.WMF:
						fileExtensionName = "wmf";
						break;
					}
					currentPage.addPicture(pictureData.getData(), fileExtensionName);
					*/
					currentPage.addPicture(pictureData.getData(), "png");
				}
			}
		}
		
		htmlBuilder.writeToFile(fileName);
	}
	
	public static void main(String[] args) {
		InputStream is = null;
		try {
			is = new FileInputStream("test.ppt");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		Ppt2Html ppt2Html = new Ppt2Html(is,"ppt");
		ppt2Html.generate();
	}
}