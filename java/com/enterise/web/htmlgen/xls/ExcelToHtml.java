package com.enterise.web.htmlgen.xls;
import static org.apache.poi.ss.usermodel.CellStyle.ALIGN_CENTER;
import static org.apache.poi.ss.usermodel.CellStyle.ALIGN_CENTER_SELECTION;
import static org.apache.poi.ss.usermodel.CellStyle.ALIGN_FILL;
import static org.apache.poi.ss.usermodel.CellStyle.ALIGN_JUSTIFY;
import static org.apache.poi.ss.usermodel.CellStyle.ALIGN_LEFT;
import static org.apache.poi.ss.usermodel.CellStyle.ALIGN_RIGHT;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_DASHED;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_DASH_DOT;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_DASH_DOT_DOT;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_DOTTED;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_DOUBLE;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_HAIR;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_MEDIUM;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_MEDIUM_DASHED;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_MEDIUM_DASH_DOT;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_MEDIUM_DASH_DOT_DOT;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_NONE;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_SLANTED_DASH_DOT;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_THICK;
import static org.apache.poi.ss.usermodel.CellStyle.BORDER_THIN;
import static org.apache.poi.ss.usermodel.CellStyle.VERTICAL_BOTTOM;
import static org.apache.poi.ss.usermodel.CellStyle.VERTICAL_CENTER;
import static org.apache.poi.ss.usermodel.CellStyle.VERTICAL_TOP;

import java.io.BufferedReader;
import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Formatter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.format.CellFormat;
import org.apache.poi.ss.format.CellFormatResult;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellAddress;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.openxmlformats.schemas.spreadsheetml.x2006.main.CTRElt;
public class ExcelToHtml {
	   private  Workbook wb;  
	    private  Appendable output;  
	    private boolean completeHTML;  
	    private Formatter out;  
	    private boolean gotBounds;  
	    private int firstColumn;  
	    private int endColumn;  
	    private HtmlHelper helper;  
	    private HashSet<String> cell_merged= new HashSet<String>();//String = (x,y)  
	    private HashSet<String> cell_hasValue= new HashSet<String>();//String = (x,y)  
	    private HashSet<String> cell_hidden = new HashSet<String>();//String=(x,y);  
	    private Map<String,String> cell_merged_print= new HashMap<String,String>();//String1 = (x,y),String2=rowspan,colspan  
	    //private int rowspan;  
	  
	    private static final String DEFAULTS_CLASS = "excelDefaults";  
	    private static final String COL_HEAD_CLASS = "colHeader";  
	    private static final String ROW_HEAD_CLASS = "rowHeader";  
	  
	    private static final Map<Short, String> ALIGN = mapFor(ALIGN_LEFT, "left",  
	            ALIGN_CENTER, "center", ALIGN_RIGHT, "right", ALIGN_FILL, "left",  
	            ALIGN_JUSTIFY, "left", ALIGN_CENTER_SELECTION, "center");  
	  
	    private static final Map<Short, String> VERTICAL_ALIGN = mapFor(  
	            VERTICAL_BOTTOM, "bottom", VERTICAL_CENTER, "middle", VERTICAL_TOP,  
	            "top");  
	  
	    private static final Map<Short, String> BORDER = mapFor(BORDER_DASH_DOT,  
	            "dashed 1pt", BORDER_DASH_DOT_DOT, "dashed 1pt", BORDER_DASHED,  
	            "dashed 1pt", BORDER_DOTTED, "dotted 1pt", BORDER_DOUBLE,  
	            "double 1pt", BORDER_HAIR, "solid 1px", BORDER_MEDIUM, "solid 1pt",  
	            BORDER_MEDIUM_DASH_DOT, "dashed 1pt", BORDER_MEDIUM_DASH_DOT_DOT,  
	            "dashed 1pt", BORDER_MEDIUM_DASHED, "dashed 1pt", BORDER_NONE,  
	            "none", BORDER_SLANTED_DASH_DOT, "dashed 1pt", BORDER_THICK,  
	            "solid 1pt", BORDER_THIN, "dashed 1pt");  
	  
	    @SuppressWarnings({"unchecked"})  
	    private static <K, V> Map<K, V> mapFor(Object... mapping) {  
	        Map<K, V> map = new HashMap<K, V>();  
	        for (int i = 0; i < mapping.length; i += 2) {  
	            map.put((K) mapping[i], (V) mapping[i + 1]);  
	        }  
	        return map;  
	    }  
	  
	    /** 
	     * Creates a new converter to HTML for the given workbook. 
	     * 
	     * @param wb     The workbook. 
	     * @param output Where the HTML output will be written. 
	     * 
	     * @return An object for converting the workbook to HTML. 
	     */  
	    public static ExcelToHtml create(Workbook wb, Appendable output) {  
	        return new ExcelToHtml(wb, output);  
	    }  
	    public ExcelToHtml (Workbook wb, Appendable output){
	    	this.wb=wb;
	    	this.output=output;
	    }
	    public ExcelToHtml (){
	    	
	    }
	    /** 
	     * Creates a new converter to HTML for the given workbook.  If the path ends 
	     * with "<tt>.xlsx</tt>" an {@link XSSFWorkbook} will be used; otherwise 
	     * this will use an {@link HSSFWorkbook}. 
	     * 
	     * @param path   The file that has the workbook. 
	     * @param output Where the HTML output will be written. 
	     * 
	     * @return An object for converting the workbook to HTML. 
	     */  
	    public static ExcelToHtml create(String path, Appendable output)  
	            throws IOException {  
	        return create(new FileInputStream(path), output);  
	    }  
	  
	    /** 
	     * Creates a new converter to HTML for the given workbook.  This attempts to 
	     * detect whether the input is XML (so it should create an {@link 
	     * XSSFWorkbook} or not (so it should create an {@link HSSFWorkbook}). 
	     * 
	     * @param in     The input stream that has the workbook. 
	     * @param output Where the HTML output will be written. 
	     * 
	     * @return An object for converting the workbook to HTML. 
	     */  
	    public static ExcelToHtml create(InputStream in, Appendable output)  
	            throws IOException {  
	        try {  
	            Workbook wb = WorkbookFactory.create(in);  
	            return create(wb, output);  
	        } catch (InvalidFormatException e){  
	            throw new IllegalArgumentException("Cannot create workbook from stream", e);  
	        }  
	    }  
	  
	    private void ToHtml(Workbook wb, Appendable output) {  
	        if (wb == null)  
	            throw new NullPointerException("wb");  
	        if (output == null)  
	            throw new NullPointerException("output");  
	        this.wb = wb;  
	        this.output = output;  
	    }  
	  

	  
	    public void setCompleteHTML(boolean completeHTML) {  
	        this.completeHTML = completeHTML;  
	    }  
	  
	    public void printPage() throws IOException {  
	        try {  
	            ensureOut();  
	            if (completeHTML) {  
	                out.format(  
	                        "<?xml version=\"1.0\" encoding=\"GBK\" ?>%n");  
	                out.format("<html>%n");  
	                out.format("<head>%n");  
	                out.format("</head>%n");  
	                out.format("<body>%n");  
	            }  
	  
	            print();  
	  
	            if (completeHTML) {  
	                out.format("</body>%n");  
	                out.format("</html>%n");  
	            }  
	        } finally {  
	            if (out != null)  
	                out.close();  
	            if (output instanceof Closeable) {  
	                Closeable closeable = (Closeable) output;  
	                closeable.close();  
	            }  
	        }  
	    }  
	  
	    public void print() {  
	        printInlineStyle();  
	        printSheets();  
	    }  
	  
	    private void printInlineStyle() {  
	        //out.format("<link href=\"excelStyle.css\" rel=\"stylesheet\" type=\"text/css\">%n");  
	        out.format("<style type=\"text/css\">%n");  
	        printStyles();  
	        out.format("</style>%n");  
	    }  
	  
	    private void ensureOut() {  
	        if (out == null)  
	            out = new Formatter(output);  
	    }  
	  
	    public void printStyles() {  
	        ensureOut();  
	  
	        // First, copy the base css  
	        BufferedReader in = null;  
	        try {  
	            in = new BufferedReader(new InputStreamReader(  
	                    getClass().getResourceAsStream("excelStyle.css")));  
	            String line;  
	            while ((line = in.readLine()) != null) {  
	                out.format("%s%n", line);  
	            }  
	        } catch (IOException e) {  
	            throw new IllegalStateException("Reading standard css", e);  
	        } finally {  
	            if (in != null) {  
	                try {  
	                    in.close();  
	                } catch (IOException e) {  
	                    //noinspection ThrowFromFinallyBlock  
	                    throw new IllegalStateException("Reading standard css", e);  
	                }  
	            }  
	        }  
	  
	        // now add css for each used style  
	        Set<CellStyle> seen = new HashSet<CellStyle>();  
	        for (int i = 0; i < wb.getNumberOfSheets(); i++) {  
	            Sheet sheet = wb.getSheetAt(i);  
	            Iterator<Row> rows = sheet.rowIterator();  
	            while (rows.hasNext()) {  
	                Row row = rows.next();  
	                for (Cell cell : row) {  
	                    CellStyle style = cell.getCellStyle();  
	                    if (!seen.contains(style)) {  
	                        printStyle(style);  
	                        seen.add(style);  
	                    }  
	                }  
	            }  
	        }  
	    }  
	  
	    private void printStyle(CellStyle style) {  
	        out.format(".%s .%s {%n", DEFAULTS_CLASS, styleName(style));  
	        styleContents(style);  
	        out.format("}%n");  
	    }  
	  
	    private void styleContents(CellStyle style) {  
	        styleOut("text-align", style.getAlignment(), ALIGN);  
	        styleOut("vertical-align", style.getVerticalAlignment(), VERTICAL_ALIGN);  
	        fontStyle(style);  
	       // borderStyles(style);  
	        try {
				
	        	helper  =new XSSFHtmlHelper((XSSFWorkbook) wb);  
			} catch (Exception e) {
				// TODO: handle exception
				helper  =new HSSFHtmlHelper((HSSFWorkbook) wb);  
			}
	        
	        helper.colorStyles(style, out);  
	    }  
	  
	    private void borderStyles(CellStyle style) {  
	        out.format("border-left：%s;%n", "solid 1px");  
	        out.format("border-right：%s;%n", "solid 1px");  
	        out.format("border-top：%s;%n", "solid 1px");  
	        out.format("border-bottom：%s;%n", "solid 1px");  
	    }  
	    private String fontStyleDetail(Font font){  
	        StringBuffer buf = new StringBuffer("");  
	        XSSFFont font1 = (XSSFFont)font;  
	        if(!(font1.getXSSFColor()==null||font1.getXSSFColor().isAuto()))  
	            buf.append("color:#"+font1.getXSSFColor().getARGBHex().substring(2)+";");  
	         if (font.getBold()){  
	             buf.append("font-weight: bold;");  
	         }else{  
	             buf.append("font-weight: normal;");  
	         }       
	         if(font.getItalic())  
	             buf.append("font-style:italic;");  
	         buf.append("font-family:"+font.getFontName()+";");  
	         buf.append("font-size:"+font.getFontHeightInPoints()+"pt;");  
	         return buf.toString();  
	    }  
	      
	    private void fontStyle(CellStyle style) {  
	        Font font = wb.getFontAt(style.getFontIndex());  
	        if (font.getBold())  
	            out.format("  font-weight: bold;%n");  
	        if (font.getItalic()){  
	            out.format("  font-style: italic;%n");  
	        }  
	        out.format("  font-family: %s;%n",font.getFontName());   
	        int fontheight = font.getFontHeightInPoints();  
	        if (fontheight == 9) {  
	            //fix for stupid ol Windows  
	            fontheight = 10;  
	        }  
	        out.format("  font-size: %dpt;%n", fontheight);  
	          
	        // Font color is handled with the other colors  
	    }  
	  
	    private String styleName(CellStyle style) {  
	        if (style == null)  
	            style = wb.getCellStyleAt((short) 0);  
	        StringBuilder sb = new StringBuilder();  
	        Formatter fmt = new Formatter(sb);  
	        fmt.format("style_%02x", style.getIndex());  
	        return fmt.toString();  
	    }  
	  
	    private <K> void styleOut(String attr, K key, Map<K, String> mapping) {  
	        String value = mapping.get(key);  
	        if (value != null) {  
	            out.format("  %s: %s;%n", attr, value);  
	        }  
	    }  
	  
	    private static int ultimateCellType(Cell c) {  
	        int type = c.getCellType();  
	        if (type == Cell.CELL_TYPE_FORMULA)  
	            type = c.getCachedFormulaResultType();  
	        return type;  
	    }  
	  
	    private void printSheets() {  
	        ensureOut();  
	        Sheet sheet = wb.getSheetAt(wb.getFirstVisibleTab());  
	        ensureColumnBounds(sheet);  
	        saprateCells(sheet);  
	        printSheet(sheet);  
	    }  
	  
	     
	  
	    public void printSheet(Sheet sheet) {  
	        ensureOut();  
	        float width = 0f;  
	        //计算表格长度  
	        for(int i=firstColumn;i<endColumn;i++){  
	            width+=sheet.getColumnWidthInPixels(i);  
	        }  
	         
	        out.format("<div align=\"center\"><table class=%s cellspacing=\"0\" border=\"1\" cellpadding=\"0\" style=\"word-break:break-all;width:"+width+"px \">%n", DEFAULTS_CLASS);  
	        printCols(sheet);  
	        printSheetContent(sheet);  
	        out.format("</table>%n</div>%n");  
	    }  
	  
	    private void printCols(Sheet sheet) {  
	        out.format("<col/>%n");  
	        for (int i = firstColumn; i < endColumn; i++) {  
	            out.format("<col/>%n");  
	        }  
	    }  
	  
	    private void ensureColumnBounds(Sheet sheet) {  
	        if (gotBounds)  
	            return;  
	          
	        Iterator<Row> iter = sheet.rowIterator();  
	        firstColumn = (iter.hasNext() ? Integer.MAX_VALUE : 0);  
	        endColumn = 0;  
	        while (iter.hasNext()) {  
	            Row row = iter.next();  
	            short firstCell = row.getFirstCellNum();  
	            if (firstCell >= 0) {  
	                firstColumn = Math.min(firstColumn, firstCell);  
	                endColumn = Math.max(endColumn, row.getLastCellNum());  
	            }  
	        }  
	        gotBounds = true;  
	    }  
	  
	   /* private void printColumnHeads() { 
	        out.format("<thead>%n"); 
	        out.format("  <tr class=%s>%n", COL_HEAD_CLASS); 
	        out.format("    <th class=%s>◊</th>%n", COL_HEAD_CLASS); 
	        //noinspection UnusedDeclaration 
	        StringBuilder colName = new StringBuilder(); 
	        for (int i = firstColumn; i < endColumn; i++) { 
	            colName.setLength(0); 
	            int cnum = i; 
	            do { 
	                colName.insert(0, (char) ('A' + cnum % 26)); 
	                cnum /= 26; 
	            } while (cnum > 0); 
	            out.format("    <th class=%s>%s</th>%n", COL_HEAD_CLASS, colName); 
	        } 
	        out.format("  </tr>%n"); 
	        out.format("</thead>%n"); 
	    }*/  
	  
	    private void printSheetContent(Sheet sheet) {  
	        //printColumnHeads();  
	  
	        out.format("<tbody>%n");  
	        sheet.getActiveCell();  
	        
	        //Iterator<Row> rows = sheet.rowIterator();  
	        for(int num=sheet.getFirstRowNum();num<=sheet.getLastRowNum();num++) {  
	            Row row = sheet.getRow(num);  
	            if(row==null){  
	                out.format("<tr><td >  </td></tr>%n");  
	                continue;  
	            }  
	            if(row.getZeroHeight())  
	                continue;  
	            out.format("  <tr style=\"height:+"+row.getHeightInPoints()+"pt;\">%n");  
	            for(int j = firstColumn;j<endColumn;j++){  
	                String content = " ";  
	                String attrs = "";  
	                CellStyle style = null;  
	                String point = "("+j+","+num+")";  
	                if(cell_hidden.contains(point))  
	                    continue;  
	                if(!cell_hasValue.contains(point)){  
	                     out.format("    <td class=%s %s>%s</td>%n", styleName(style),  
	                             attrs, content);  
	                     continue;  
	                }  
	                Cell cell = row.getCell(j);  
	                if (shouldPrint(cell)) {  
	                    style = cell.getCellStyle();  
	                    attrs = tagStyle(cell, style);  
	                      
	                    try {  
	                        XSSFRichTextString rich = (XSSFRichTextString)cell.getRichStringCellValue();  
	                        StringBuffer contents = new StringBuffer("");  
	                        if(rich.hasFormatting()){  
	                            int startIndex = 0;   
	                            for(CTRElt ct : rich.getCTRst().getRList()){  
	                                XSSFFont font =rich.getFontAtIndex(startIndex);  
	                                startIndex += ct.getT().length();  
	                                contents.append("<font style=\""+fontStyleDetail(font)+" \">"+ct.getT()+"</font>") ;  
	                            }  
	                            content = contents.toString();  
	                        }else{  
	                            content = rich.getString();  
	                        }             
	                    } catch (Exception e) {  
	                         CellFormat cf;  
	                        if(style.getDataFormatString()!=null){  
	                             cf = CellFormat.getInstance(  
	                                     style.getDataFormatString());  
	                        }else{  
	                             cf = CellFormat.getInstance(  
	                                    "General");  
	                        }  
	                        CellFormatResult result = cf.apply(cell);  
	                        content = result.text;  
	                    }  
	                     
	                     
	                    if (content.equals(""))  
	                        content = " ";  
	                    out.format("    <td class=%s %s>%s</td>%n", styleName(style),  
	                            attrs, content.replaceAll("\\n", "<br/>"));  
	                }  
	            }  
	            out.format("  </tr>%n");  
	        }  
	        out.format("</tbody>%n");  
	    }  
	    private boolean shouldPrint(Cell cell){  
	        String point = "("+cell.getAddress().getColumn()+","+cell.getAddress().getRow()+")";  
	        if(cell_merged.contains(point)){  
	            //不是第一次渲染则不渲染  
	            if(!cell_merged_print.containsKey(point)){  
	                return false;  
	            }else{  
	                //cell.getSheet().autoSizeColumn(cell.getAddress().getColumn());  
	            }  
	                  
	        }  
	        return true;  
	    }  
	    private String tagStyle(Cell cell, CellStyle style) {  
	        //调整align  
	        StringBuffer buf = new StringBuffer("style=\"");  
	        //调整宽度  
	       // String width = cell.getSheet().getColumnWidthInPixels(cell.getColumnIndex())+"px;";  
	        Font font = wb.getFontAt(style.getFontIndex());  
	        String width = cell.getSheet().getColumnWidth(cell.getColumnIndex())/256*font.getFontHeight()/20+"pt";//通过字体大小计算Cell宽度  
	        buf.append("width:"+width);  
	        buf.append("\" ");  
	        String point = "("+cell.getAddress().getColumn()+","+cell.getAddress().getRow()+")";  
	        if(cell_merged_print.containsKey(point)){  
	            String[] str = cell_merged_print.get(point).split(",");  
	            int rowspan =Integer.parseInt(str[0]);  
	            int colspan =Integer.parseInt(str[1]);  
	            if(rowspan>1)buf.append("rowspan=\""+rowspan+"\" ");  
	            if(colspan>1)buf.append("colspan=\""+colspan+"\" ");  
	        }  
	         
	        return buf.toString();  
	    }  
	    /** 
	     * 用于分组全并的单元格，与其中要打印的单元格 
	     * @author liuyizhi 
	     * */  
	    private void saprateCells(Sheet sheet) {  
	        for(CellRangeAddress addr :sheet.getMergedRegions()){  
	             int rowspan = addr.getLastRow()-addr.getFirstRow()+1;  
	             int colspan = addr.getLastColumn()-addr.getFirstColumn()+1;  
	            for(int x=addr.getFirstColumn();x<=addr.getLastColumn();x++)  
	                for(int y=addr.getFirstRow();y<=addr.getLastRow();y++){  
	                    cell_merged.add("("+x+","+y+")");   
	                    if(x==addr.getFirstColumn()&&y==addr.getFirstRow())  
	                        cell_merged_print.put("("+x+","+y+")",rowspan+","+colspan);  
	                }  
	        }  
	        //过滤隐藏的列  
	        for(int i= firstColumn;i<endColumn;i++){  
	            if(sheet.isColumnHidden(i))  
	                for(int j = sheet.getFirstRowNum();j<=sheet.getLastRowNum();j++)  
	                    cell_hidden.add("("+i+","+j+")");  
	        }     
	          
	        //过滤有值的cell  
	        Iterator<Row> iter = sheet.rowIterator();  
	        while(iter.hasNext()){  
	            Row row = iter.next();  
	            for(int i = row.getFirstCellNum();i<row.getLastCellNum();i++){  
	                Cell cell = row.getCell(i);  
	                  
	                if(cell ==null)  
	                    continue;  
	                CellAddress address = cell.getAddress();  
	                cell_hasValue.add("("+address.getColumn()+","+address.getRow()+")");  
	            }  
	              
	        }  
	    }  
	    public static void main(String[] args) {
	    	   ExcelToHtml toHtml;
	    	   try {
					String fileName="中国保监会山东监管局-2012年行政处罚事项九-441";
					toHtml = ExcelToHtml.create("I:/海联/项目/关于行政处罚类数据采集需求评估及POC/代码/clj/采集附件-海联/中国保监会山东监管局-2012年行政处罚事项九-441.xls", 
							new PrintWriter(new File("D:/kubi/"+fileName+".html"),"gbk"));
					toHtml.setCompleteHTML(true);  
					toHtml.printPage(); 
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
		}
}
