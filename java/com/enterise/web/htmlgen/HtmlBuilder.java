package com.enterise.web.htmlgen;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class HtmlBuilder {

	private List pageList;
	private HtmlPage currentPage;
	private String documentId;
	private int pictureCount = 0;

	public HtmlBuilder() {
		pageList = new ArrayList();
		documentId = String.valueOf(System.currentTimeMillis());
	}

	public void addHtmlPage(HtmlPage htmlPage) {
		pageList.add(htmlPage);
		htmlPage.setDocumentId(documentId);
		currentPage = htmlPage;
	}

	public HtmlPage getCurrentPage() {
		return currentPage;
	}

	public void writeToFile(String fileName) {
		Iterator iter = pageList.iterator();
		int i = 0;
		while (iter.hasNext()) {
			i++;
			HtmlPage page = (HtmlPage) iter.next();
			String pageId =fileName+ "-" + i;
			Pagination pagination = new Pagination(documentId, i, pageList.size());
			page.addPagination(pagination);
			try {
				//File htmlFile = new File("D://kubi/"+pageId + ".html");
				//Writer writer = new FileWriter(htmlFile);
				 FileOutputStream fOutputStream=new FileOutputStream("D://kubi/"+pageId + ".html");
				OutputStreamWriter writer=new OutputStreamWriter(fOutputStream, "gbk");
				writer.write(page.getPageContent());
				writer.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	public List getPageList() {
		return pageList;
	}
	
	public String getDocumentId() {
		return documentId;
	}
}