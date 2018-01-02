package com.enterise.web.htmlgen.doc;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.PicturesManager;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.PictureType;
import org.apache.poi.xwpf.converter.core.FileImageExtractor;
import org.apache.poi.xwpf.converter.core.FileURIResolver;
import org.apache.poi.xwpf.converter.xhtml.XHTMLConverter;
import org.apache.poi.xwpf.converter.xhtml.XHTMLOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.w3c.dom.Document;

import com.ulab.core.Constants;
import com.ulab.util.FileUtil;

/**
 * 
 * @time   2017年12月28日 下午2:37:41
 * @author zuoqb
 * @todo   将word转html
 */
public class WordToHtml {
	/**
	       * 2007版本word转换成html
	       * @throws IOException
	      */
	public static String Word2007ToHtml(String filePath,String fileName) throws IOException {
		File f = new File(filePath + fileName);
		if (!f.exists()) {
			System.out.println("Sorry File does not Exists!");
		} else {
			if (f.getName().endsWith(".docx") || f.getName().endsWith(".DOCX")) {

				// 1) 加载word文档生成 XWPFDocument对象  
				InputStream in = new FileInputStream(f);
				XWPFDocument document = new XWPFDocument(in);

				// 2) 解析 XHTML配置 (这里设置IURIResolver来设置图片存放的目录)  
				File imageFolderFile = new File(filePath);
				XHTMLOptions options = XHTMLOptions.create().URIResolver(new FileURIResolver(imageFolderFile));
				options.setExtractor(new FileImageExtractor(imageFolderFile));
				options.setIgnoreStylesIfUnused(false);
				options.setFragment(true);

				// 3) 将 XWPFDocument转换成XHTML  
				String htmlName=FileUtil.createFileName("WORD");
				OutputStream out = new FileOutputStream(Constants.CREATE_FILE_PATH+htmlName);
				XHTMLConverter.getInstance().convert(document, out, options);
				return htmlName;
			} else {
				System.out.println("只支持Word 2007 格式");
			}
		}
		return null;
	}

	/**
	 * /**
	 * 2003版本word转换成html
	 * @throws IOException
	 * @throws TransformerException
	 * @throws ParserConfigurationException
	 */
	public static String Word2003ToHtml(String filePath,String fileName) throws IOException, TransformerException,
			ParserConfigurationException {
		InputStream input = new FileInputStream(new File(filePath + fileName));
		HWPFDocument wordDocument = new HWPFDocument(input);
		WordToHtmlConverter wordToHtmlConverter = new WordToHtmlConverter(DocumentBuilderFactory.newInstance()
				.newDocumentBuilder().newDocument());
		//设置图片存放的位置
		wordToHtmlConverter.setPicturesManager(new PicturesManager() {
			public String savePicture(byte[] content, PictureType pictureType, String suggestedName, float widthInches,
					float heightInches) {
				File imgPath = new File(Constants.CREATE_IMAGE_PATH);
				if (!imgPath.exists()) {//图片目录不存在则创建
					imgPath.mkdirs();
				}
				File file = new File(Constants.CREATE_IMAGE_PATH + suggestedName);
				try {
					OutputStream os = new FileOutputStream(file);
					os.write(content);
					os.close();
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				return Constants.CREATE_IMAGE_PATH + suggestedName;
			}
		});

		//解析word文档
		wordToHtmlConverter.processDocument(wordDocument);
		Document htmlDocument = wordToHtmlConverter.getDocument();

		String htmlName=FileUtil.createFileName("WORD");
		File htmlFile = new File(Constants.CREATE_FILE_PATH +htmlName);
		OutputStream outStream = new FileOutputStream(htmlFile);

		//也可以使用字符数组流获取解析的内容
		//        ByteArrayOutputStream baos = new ByteArrayOutputStream(); 
		//        OutputStream outStream = new BufferedOutputStream(baos);

		DOMSource domSource = new DOMSource(htmlDocument);
		StreamResult streamResult = new StreamResult(outStream);

		TransformerFactory factory = TransformerFactory.newInstance();
		Transformer serializer = factory.newTransformer();
		serializer.setOutputProperty(OutputKeys.ENCODING, Constants.FILE_ENCODE);
		serializer.setOutputProperty(OutputKeys.INDENT, "yes");
		serializer.setOutputProperty(OutputKeys.METHOD, "html");

		serializer.transform(domSource, streamResult);

		//也可以使用字符数组流获取解析的内容
		//        String content = baos.toString();
		//        System.out.println(content);
		//        baos.close();
		outStream.close();
		return htmlName;
	}

	public static void main(String[] args) {
		try {
			Word2007ToHtml(Constants.READ_FILE_PATH,"安徽省工商行政管理局-downfile.jspclassid=0&filename=1612161715176679463-389.docx");
			Word2003ToHtml(Constants.READ_FILE_PATH,"网络安全审计系统使用说明(服务业发展局).doc");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
