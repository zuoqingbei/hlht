package com.enterise.web.htmlgen.xls;

import java.util.Formatter;

import org.apache.poi.ss.usermodel.CellStyle;

public interface HtmlHelper {
	 void colorStyles(CellStyle style, Formatter out);  
}
