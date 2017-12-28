package com.enterise.web.htmlgen.doc;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.model.PicturesTable;
import org.apache.poi.hwpf.usermodel.Paragraph;
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.hwpf.usermodel.Range;

import com.enterise.web.htmlgen.HtmlGenerator;
import com.enterise.web.htmlgen.HtmlPage;

public class Word2Html implements HtmlGenerator {

	private HWPFDocument document;
	private int preferWordsNumberPerPage;
	private float pageWordsNumberChangeRatio;	
	private WordHtmlBuilder htmlBuilder;
	private int wordsNumberCounter1 = 0;
	private int wordsNumberCounter2 = 0;
	private List paragraphList;
	private HtmlPage htmlPage;
	private List pictureList;
	private String fileName;
	
	public Word2Html(InputStream wordInputStream, OutputStream htmlOutputStream,String fileName) {
		this(wordInputStream, htmlOutputStream, 1000, 0.05f,fileName);
	}
	
	public Word2Html(InputStream wordInputStream, OutputStream htmlOutputStream, 
			int preferWordsNumberPerPage, float pageWordsNumberChangeRatio,String fileName) {		
		this.preferWordsNumberPerPage = preferWordsNumberPerPage;
		this.pageWordsNumberChangeRatio = pageWordsNumberChangeRatio;	
		this.fileName=fileName;
		try {
			document = new HWPFDocument(wordInputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
		htmlBuilder = new WordHtmlBuilder();	
		htmlBuilder.addHtmlPage(new WordHtmlPage());
		paragraphList = new ArrayList();
		pictureList = new ArrayList();
	}
	
	public void generate() {
		Range range = document.getRange();
		for (int i = 0; i < range.numParagraphs(); i++) {
			Paragraph p = range.getParagraph(i);
			paragraphList.add(p);
		}		
		processParagraphs();
		
		PicturesTable picturesTable = document.getPicturesTable();
		List pictures = picturesTable.getAllPictures();
		Iterator iter = pictures.iterator();
		while (iter.hasNext()) {
			Picture p = (Picture)iter.next();
			pictureList.add(p);
		}
		htmlBuilder.addPictures(pictureList);		
		htmlBuilder.writeToFile(fileName);
	}
	
	private int getMinPageWordsNumber() {
		return preferWordsNumberPerPage - 
			Math.round(preferWordsNumberPerPage * pageWordsNumberChangeRatio);
	}
	
	private int getMaxPageWordsNumber() {
		return preferWordsNumberPerPage + 
			Math.round(preferWordsNumberPerPage * pageWordsNumberChangeRatio);
	}
	
	private void processParagraphs() {		
		if (paragraphList == null) {
			return;
		}		
		Iterator iter = paragraphList.iterator();
		if (iter == null) {
			return;
		}		
		while (iter.hasNext()) {
			Paragraph paragraph = (Paragraph)iter.next();
			processParagraph(paragraph);
		}
	}
	
	private void processParagraph(Paragraph paragraph) {
		String paragraphText = paragraph.text();
		wordsNumberCounter2 = wordsNumberCounter1;
		wordsNumberCounter1 += paragraphText.length();
		// ����һ�������ҳ������������preferWordsNumberPagePage����
		if (wordsNumberCounter1 < preferWordsNumberPerPage) {
			WordHtmlPage currentPage = (WordHtmlPage)htmlBuilder.getCurrentPage();
			currentPage.addParagraph(paragraphText);
		}
		// ����һ�������ҳ����������preferWordsNumberPagePage����
		if (wordsNumberCounter1 > preferWordsNumberPerPage) {
			int difference1 = wordsNumberCounter1 - preferWordsNumberPerPage;
			int difference2 = preferWordsNumberPerPage - wordsNumberCounter2;
			// ���Ӷ����ǰҳ������������Χ������preferWordsNumberPerPage * pageWordsNumberChangeRatio
			if (difference1 / preferWordsNumberPerPage < pageWordsNumberChangeRatio &&
					difference2 / preferWordsNumberPerPage < pageWordsNumberChangeRatio) {
				// �����Ӷ��������������ֵС�ڲ���Ӷ��������������ֵ
				if (difference1 < difference2) {
					WordHtmlPage currentPage = (WordHtmlPage)htmlBuilder.getCurrentPage();
					currentPage.addParagraph(paragraphText);
				// �����Ӷ��������������ֵ���ڲ���Ӷ��������������ֵ
				} else {
					htmlBuilder.addHtmlPage(new WordHtmlPage());
					wordsNumberCounter1 = 0;
					wordsNumberCounter2 = 0;
					WordHtmlPage currentPage = (WordHtmlPage)htmlBuilder.getCurrentPage();
					currentPage.addParagraph(paragraphText);
				}
			// ���Ӷ����ǰҳ������������Χ����preferWordsNumberPerPage * pageWordsNumberChangeRatio
			} else {
				String subParagraphText1 = paragraphText.substring(0, 
						preferWordsNumberPerPage - wordsNumberCounter2);
				WordHtmlPage currentPage = (WordHtmlPage)htmlBuilder.getCurrentPage();
				currentPage.addParagraph(subParagraphText1);
				String subParagraphText2 = paragraphText.substring(
						preferWordsNumberPerPage - wordsNumberCounter2);
				htmlBuilder.addHtmlPage(new WordHtmlPage());
				currentPage = (WordHtmlPage)htmlBuilder.getCurrentPage();
				currentPage.addParagraph(subParagraphText2);
				wordsNumberCounter1 = 0;
				wordsNumberCounter2 = 0;
			}
		}
	}

	public static void main(String[] args) {		
		InputStream is = null;		
		try {
			is = new FileInputStream("I:/海联/项目/关于行政处罚类数据采集需求评估及POC/代码/clj/采集附件-海联/安徽省工商行政管理局-downfile.jspclassid=0&filename=1612161715176679463-389.docx");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}		
		Word2Html  word2Html = new Word2Html(is, null,"安徽省工商行政管理局");
		word2Html.generate();
	}
}