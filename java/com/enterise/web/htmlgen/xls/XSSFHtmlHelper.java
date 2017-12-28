package com.enterise.web.htmlgen.xls;

import java.util.Formatter;
import java.util.Map;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class XSSFHtmlHelper implements HtmlHelper{
	 private final XSSFWorkbook wb;  
	  
	   private static final Map<Integer, HSSFColor> colors = HSSFColor.getIndexHash();  
	   // private static final Map<Integer, HSSFColor> colors = new XSSFColor().;  
	    public XSSFHtmlHelper(XSSFWorkbook wb) {  
	        this.wb = wb;  
	    }  
	  
	    public void colorStyles(CellStyle style, Formatter out) {  
	        XSSFCellStyle cs = (XSSFCellStyle) style;  
	        styleColor(out, "background-color", cs.getFillForegroundXSSFColor());  
	        styleColor(out, "color", cs.getFont().getXSSFColor());//#00b050  
	    }  
	  
	    private void styleColor(Formatter out, String attr, XSSFColor color) {  
	        if (color == null || color.isAuto())  
	            return;  
	       /* byte[] rgb = color.getRGB(); 
	        if (rgb == null) { 
	            return; 
	        }*/  
	        out.format(" %s:#%s;%n",attr, color.getARGBHex().substring(2));  
	        // This is done twice -- rgba is new with CSS 3, and browser that don't  
	        // support it will ignore the rgba specification and stick with the  
	        // solid color, which is declared first  
	       // out.format("  %s: #%02x%02x%02x;%n", attr, rgb[0], rgb[1], rgb[2]);  
	/*        out.format("  %s: rgba(0x%02x, 0x%02x, 0x%02x, 0x%02x);%n", attr,color.g 
	                rgb[3], rgb[0], rgb[1], rgb[2] );*/  
	    }  
}
