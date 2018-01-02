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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import com.ulab.core.Constants;
import com.ulab.util.FileUtil;

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
	/**
	 * 
	 * @time   2017年12月29日 下午12:47:29
	 * @author zuoqb
	 * @todo   将pdf转html
	 * @param  @param fileName
	 * @param  @return
	 * @return_type   String
	 */
	public String writeToFile(String fileName) {
		Iterator iter = pageList.iterator();
		 FileOutputStream fOutputStream=null;
		 OutputStreamWriter writer = null;
		String htmlName = Constants.CREATE_FILE_PATH + FileUtil.createFileName("PDF");
		 try {
			 fOutputStream=new FileOutputStream(htmlName);
			 writer=new OutputStreamWriter(fOutputStream, Constants.FILE_ENCODE);
			 int i = 0;
				while (iter.hasNext()) {
					i++;
					HtmlPage page = (HtmlPage) iter.next();
					//Pagination pagination = new Pagination(documentId, i, pageList.size());
					//page.addPagination(pagination);
					try {
						//将图片内容转成文字
						String content=dealContentImg(page);
						writer.write(content);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
		} catch (Exception e) {
		}finally{
			try {
				writer.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return htmlName;
		
	}
	/**
	 * 
	 * @time   2017年12月29日 上午10:40:24
	 * @author zuoqb
	 * @todo   处理图片
	 * @param  @param page
	 * @param  @return
	 * @return_type   HtmlPage
	 */
	public static String dealContentImg(HtmlPage page){
		String content=page.getPageContent();
		if(StringUtils.isNotBlank(content)&&content.contains("<img")){
			//获取图片地址
			String imgPath=Constants.CREATE_IMAGE_PATH+getImgaddress(content)[0];
			//后期可以尝试解析图片上内容
			//System.out.println(imgPath);
			//content+=imgPath;
		}
		return content;
	}
	/** 
     * @param s 
     * @return 获得图片 
     */  
  public static List<String> getImg(String s){    
     String regex;    
     List<String> list = new ArrayList<String>();    
     regex = "src=\"(.*?)\"";    
     Pattern pa = Pattern.compile(regex, Pattern.DOTALL);    
     Matcher ma = pa.matcher(s);    
     while (ma.find())    
     {  
      list.add(ma.group());    
     }    
     return list;    
  }    
  /** 
   * 返回存有图片地址的数组 
   * @param tar 
   * @return 
   */  
  public static String[] getImgaddress(String tar){  
      List<String> imgList = getImg(tar);  
        
      String res[] = new String[imgList.size()];  
        
      if(imgList.size()>0){  
          for (int i = 0; i < imgList.size(); i++) {  
              int begin = imgList.get(i).indexOf("\"")+1;  
              int end = imgList.get(i).lastIndexOf("\"");  
              String url[] = imgList.get(i).substring(begin,end).split("/");  
              res[i]=url[url.length-1];  
          }  
      }else{  
      }  
      return res;  
  }  
	public List getPageList() {
		return pageList;
	}
	
	public String getDocumentId() {
		return documentId;
	}
}