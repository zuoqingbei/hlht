package com.enterise.web.htmlgen.pdf;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDResources;
import org.apache.pdfbox.pdmodel.graphics.xobject.PDXObjectImage;
import org.apache.pdfbox.util.PDFTextStripper;

import com.enterise.web.htmlgen.HtmlGenerator;
import com.ulab.core.Constants;

public class Pdf2Html implements HtmlGenerator {

	private PDDocument document;
	PdfHtmlBuilder pdfHtmlBuilder = new PdfHtmlBuilder();
	private List pages;
	private String fileName;
	
	public Pdf2Html(String fileName) {
		InputStream is=null;
		try {
			is = new FileInputStream(Constants.READ_FILE_PATH+fileName);
			document = PDDocument.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		}
		this.fileName=fileName;
	}
	
	public void generate() {
		
		int numberOfPages = document.getNumberOfPages();
		List pages = document.getDocumentCatalog().getAllPages();
		
		PDFTextStripper pdfTextStripper = null;
		try {
			pdfTextStripper = new PDFTextStripper();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		for (int i = 1; i <= numberOfPages; i++) {
			
			pdfHtmlBuilder.addHtmlPage(new PdfHtmlPage());
			PdfHtmlPage page = (PdfHtmlPage)pdfHtmlBuilder.getCurrentPage();
						
			pdfTextStripper.setStartPage(i);
			pdfTextStripper.setEndPage(i);
			String text = null;
			try {
				text = pdfTextStripper.getText(document);
			} catch (IOException e) {
				e.printStackTrace();
			}
			Reader reader = new StringReader(text);
			BufferedReader bufferedReader = new BufferedReader(reader);
			try {
				String textLine = null;
				while ((textLine = bufferedReader.readLine()) != null) {
					page.addTextLine(textLine);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			PDPage pDPage = (PDPage)pages.get(i - 1);
			PDResources resources = pDPage.getResources();
			try {
				Map images;
				images = resources.getImages();
				if( images != null )
	            {
	                Iterator imageIter = images.keySet().iterator();
	                while( imageIter.hasNext() )
	                {
	                    String key = (String)imageIter.next();
	                    PDXObjectImage image = (PDXObjectImage)images.get( key );
	                    //page.addPicture(image, image.getSuffix());
	                    page.addPicture(image, "png");
	                }
	            }
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

        try {
			document.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		pdfHtmlBuilder.writeToFile(fileName);
	}
	
	public static void main(String[] args) {
		String fileName="安徽省工商行政管理局-downfile.jspclassid=0&filename=1612151630411504106-394.pdf";
		Pdf2Html pdf2Html = new Pdf2Html(fileName);
		pdf2Html.generate();
	}
}