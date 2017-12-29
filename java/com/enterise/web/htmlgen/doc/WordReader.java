package com.enterise.web.htmlgen.doc;

import java.io.File;
import java.io.FileInputStream;

import org.apache.poi.POIXMLDocument;
import org.apache.poi.POIXMLTextExtractor;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
/**
 * 
 * @time   2017年12月12日 上午11:49:23
 * @author zuoqb
 * @todo   读取word文档内容
 */
public class WordReader {
	public static String readWord(String filePath){  
	    String text = "";  
	    File file = new File(filePath);  
	    //2003  
	    if(file.getName().endsWith(".doc")){  
	        try {  
	            FileInputStream stream = new FileInputStream(file);  
	            WordExtractor word = new WordExtractor(stream);  
	            text = word.getText();  
	            //去掉word文档中的多个换行  
	            text = text.replaceAll("(\\r\\n){2,}", "\r\n");  
	            text = text.replaceAll("(\\n){2,}", "\n");  
	            stream.close();  
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        }  
	  
	    }else if(file.getName().endsWith(".docx")){       //2007  
	        try {  
	            OPCPackage oPCPackage = POIXMLDocument.openPackage(filePath);  
	            XWPFDocument xwpf = new XWPFDocument(oPCPackage);  
	            POIXMLTextExtractor ex = new XWPFWordExtractor(xwpf);  
	            text = ex.getText();  
	            //去掉word文档中的多个换行  
	            text = text.replaceAll("(\\r\\n){2,}", "\r\n");  
	            text = text.replaceAll("(\\n){2,}", "\n");  
	            System.out.println("ok");  
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        }  
	    }  
	    return text;  
	}  
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			String text = WordReader.readWord("I:/海联/文档资料/威海出租车天玥.docx");
			System.out.println(text);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
