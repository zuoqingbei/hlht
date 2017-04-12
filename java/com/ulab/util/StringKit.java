/*
 * Copyright (c) 2014. 骆驼CMS
 */

package com.ulab.util;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.htmlparser.Node;
import org.htmlparser.lexer.Lexer;
import org.htmlparser.nodes.TextNode;
import org.htmlparser.util.ParserException;

import com.jfinal.kit.StrKit;

/**
 * 字符串处理的工具
 * 
 * @author yongtree
 * @date 2013-5-21 下午3:11:26
 * @version 1.0
 * 
 */
public class StringKit extends StrKit{

	// 标准输出标志位
		private static boolean	outOn	= true;
	/**
	 * 为标准输出增加开关
	 * 
	 * @param out
	 */
	public static void outln(Object out) {
		if (StringKit.outOn)
			System.out.println(out);
	}
	
	/**
	 * 两个字符串比较
	 * 
	 * @author yongtree
	 * @date 2013-7-11下午3:10:43
	 * @param src
	 * @param dest
	 * @param nullIs
	 *            如果都为空，设置返回true or false
	 * @return
	 */
	public static boolean equals(String src, String dest, boolean nullIs) {
		if (src == null && dest == null)
			return nullIs;
		if (src != null && dest != null) {
			return src.equals(dest);
		} else {
			return false;
		}
	}

	/**
	 * 处理url
	 * 
	 * url为null返回null，url为空串或以http://或https://开头，则加上http://，其他情况返回原参数。
	 * 
	 * @param url
	 * @return
	 */
	public static String handelUrl(String url) {
		if (url == null) {
			return null;
		}
		url = url.trim();
		if (url.equals("") || url.startsWith("http://")
				|| url.startsWith("https://")) {
			return url;
		} else {
			return "http://" + url.trim();
		}
	}

	/**
	 * 文本转html
	 * 
	 * @param txt
	 * @return
	 */
	public static String txt2htm(String txt) {
		if (StringUtils.isBlank(txt)) {
			return txt;
		}
		StringBuilder sb = new StringBuilder((int) (txt.length() * 1.2));
		char c;
		boolean doub = false;
		for (int i = 0; i < txt.length(); i++) {
			c = txt.charAt(i);
			if (c == ' ') {
				if (doub) {
					sb.append(' ');
					doub = false;
				} else {
					sb.append("&nbsp;");
					doub = true;
				}
			} else {
				doub = false;
				switch (c) {
				case '&':
					sb.append("&amp;");
					break;
				case '<':
					sb.append("&lt;");
					break;
				case '>':
					sb.append("&gt;");
					break;
				case '"':
					sb.append("&quot;");
					break;
				case '\n':
					sb.append("<br/>");
					break;
				default:
					sb.append(c);
					break;
				}
			}
		}
		return sb.toString();
	}
	
	/**
	 * 清除html标签
	 * 
	 * @param txt
	 * @return
	 */
	public static String clearhtm(String txt) {
		if (StringUtils.isBlank(txt)) {
			return txt;
		}
		StringBuilder sb = new StringBuilder((int) (txt.length()));
		char c;
		boolean doub = false;
		for (int i = 0; i < txt.length(); i++) {
			c = txt.charAt(i);
			if (c == ' ') {
				if (doub) {
					sb.append(' ');
					doub = false;
				} else {
					sb.append("");
					doub = true;
				}
			} else {
				doub = false;
				switch (c) {
				case '&':
					sb.append("");
					break;
				case '<':
					sb.append("");
					break;
				case '>':
					sb.append("");
					break;
				case '"':
					sb.append("");
					break;
				case '\n':
					sb.append("");
					break;
				default:
					sb.append(c);
					break;
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 剪切文本。如果进行了剪切，则在文本后加上"..."
	 * 
	 * @param s
	 *            剪切对象。
	 * @param len
	 *            编码小于256的作为一个字符，大于256的作为两个字符。
	 * @return
	 */
	public static String textCut(String s, int len, String append) {
		if (s == null) {
			return null;
		}
		int slen = s.length();
		if (slen <= len) {
			return s;
		}
		// 最大计数（如果全是英文）
		int maxCount = len * 2;
		int count = 0;
		int i = 0;
		for (; count < maxCount && i < slen; i++) {
			if (s.codePointAt(i) < 256) {
				count++;
			} else {
				count += 2;
			}
		}
		if (i < slen) {
			if (count > maxCount) {
				i--;
			}
			if (!StringUtils.isBlank(append)) {
				if (s.codePointAt(i - 1) < 256) {
					i -= 2;
				} else {
					i--;
				}
				return s.substring(0, i) + append;
			} else {
				return s.substring(0, i);
			}
		} else {
			return s;
		}
	}

	public static String htmlCut(String s, int len, String append) {
		String text = html2Text(s, len * 2);
		return textCut(text, len, append);
	}

	public static String html2Text(String html, int len) {
		try {
			if(html==null){
				return "";
			}
			Lexer lexer = new Lexer(html);
			Node node;
			StringBuilder sb = new StringBuilder(html.length());
			while ((node = lexer.nextNode()) != null) {
				if (node instanceof TextNode) {
					sb.append(node.toHtml());
				}
				if (sb.length() > len) {
					sb.append("...");
					break;
				}
			}
			return sb.toString();
		} catch (ParserException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 检查字符串中是否包含被搜索的字符串。被搜索的字符串可以使用通配符'*'。
	 * 
	 * @param str
	 * @param search
	 * @return
	 */
	public static boolean contains(String str, String search) {
		if (StringUtils.isBlank(str) || StringUtils.isBlank(search)) {
			return false;
		}
		String reg = StringUtils.replace(search, "*", ".*");
		Pattern p = Pattern.compile(reg);
		return p.matcher(str).matches();
	}

	public static String sideTrim(String str) {
		str = str.replaceAll("(^\\s{1,})|(\\s{1,}$)", "");
		return str;
	}

	public static String mobileReplace(String mobile) {
		if (mobile != null) {
			int between = mobile.length() / 2;
			mobile = mobile.substring(0, between - 2) + "****"
					+ mobile.substring(between + 2, mobile.length());
		}
		return mobile;
	}

	/**
	 * 字符串列表转化成带有分割符的字符串
	 * @author yongtree
	 * @date 2013-8-23下午2:20:42
	 * @param list
	 * @param sep
	 * @return
	 */
	public static String list2str(List<String> list, String sep) {
		if (list == null)
			return null;
		String str = "";
		for (String s : list) {
			str = str + sep + s;
		}
		if (str.startsWith(sep)) {
			str = str.substring(1);
		}
		return str;
	}
	
	public static List<String> str2list(String str,String sep){
		if(notBlank(str)){
			String[] array = str.split(sep);
			List<String> list = new ArrayList<String>();
			for(String a : array){
				list.add(a);
			}
			return list;
		}else{
			return null;
		}
	}
	/**
	 * 字符串格式化
	 * beetl在调用class方法时，不定参数无法调用。
	 * @param tpl
	 * @param str
	 * @return
	 */
	public static String format(String tpl,String str){
		return MessageFormat.format(tpl, str);
	}
	
	/**
	 * 字符串格式化
	 * beetl在调用class方法时，不定参数无法调用。
	 * @param tpl
	 * @param str
	 * @return
	 */
	public static String format(String tpl,List<Object> opts){
		return MessageFormat.format(tpl, opts);
	}
	
	public static String array2str(String[] array,String sep){
		String str = "";
		for (String s : array) {
			str = str + sep + s;
		}
		if (str.startsWith(sep)) {
			str = str.substring(1);
		}
		return str;
	}
	
	public static boolean isNumeric(String str){ 
	    Pattern pattern = Pattern.compile("[0-9]*"); 
	    return pattern.matcher(str).matches();    
	 } 
	
	
	/**
	 * 替换掉HTML标签方法
	 */
	public static String replaceHtml(String html) {
		if (isBlank(html)){
			return "";
		}
		String regEx = "<.+?>";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(html);
		String s = m.replaceAll("");
		return s;
	}
	
	/**
	 * 合并且去重两个用相同指定字符隔开的字符串
	 * @author CuiLidong
	 * @date 2017-01-22
	 * @return String
	 */
	public static String mergeStr(String str, String newStr, String sep){
		return list2str(new ArrayList<String>(new HashSet<String>(str2list(trimFirstAndLastChar(trimFirstAndLastChar(str, sep) + sep + trimFirstAndLastChar(newStr, sep), sep), sep))), sep);
	}
	
	/** 
     * 去除字符串首尾出现的某个字符. 
     * @author CuiLidong
	 * @date 2017-01-22
     * @param source 源字符串. 
     * @param element 需要去除的字符. 
     * @return String. 
     */  
    public static String trimFirstAndLastChar(String source,String element){
    	if(isBlank(source))
    		return "";
    	if(isBlank(element))
    		return source;
        boolean beginIndexFlag = true;
        boolean endIndexFlag = true;
        do {
            int beginIndex = source.indexOf(element) == 0 ? 1 : 0;
            int endIndex = source.lastIndexOf(element) + 1 == source.length() ? source.lastIndexOf(element) : source.length();
            source = source.substring(beginIndex, endIndex);
            beginIndexFlag = (source.indexOf(element) == 0);
            endIndexFlag = (source.lastIndexOf(element) + 1 == source.length());
        } while (beginIndexFlag || endIndexFlag);
        return source;
    }
	
	public static void main(String[] args) {
		System.out.println(mergeStr("", "妈呀,心脏,病,快犯了,哎呀,", ","));
	}

}
