package com.enterise.web.htmlgen.xls;

import java.util.Formatter;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;

public class HSSFHtmlHelper implements HtmlHelper{
	 private final HSSFWorkbook wb;  
	  
	   private static final Map<Integer, HSSFColor> colors = HSSFColor.getIndexHash();  
	   // private static final Map<Integer, HSSFColor> colors = new XSSFColor().;  
	    public HSSFHtmlHelper(HSSFWorkbook wb) {  
	        this.wb = wb;  
	    }  
	  
	    public void colorStyles(CellStyle style, Formatter out) {  
	        HSSFCellStyle cs = (HSSFCellStyle) style;  
	        styleColor(out, "background-color", cs.getFillForegroundColorColor());  
	      //  styleColor(out, "color", cs.getHSSFColor());//#00b050  
	    }  
	  
	    private void styleColor(Formatter out, String attr, HSSFColor color) {  
	      
	    }  
}
