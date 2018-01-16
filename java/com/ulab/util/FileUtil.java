package com.ulab.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.enterise.web.htmlgen.doc.WordToHtml;
import com.enterise.web.htmlgen.pdf.PdfToHtml;
import com.enterise.web.htmlgen.xls.ExcelToHtml;
import com.ulab.core.Constants;
import com.ulab.model.AttachmentContrastModel;
import com.ulab.model.HshPageModel;

public class FileUtil {
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	/**
	 * 
	 * @time   2017年12月29日 下午4:11:07
	 * @author zuoqb
	 * @todo   读取目录下文件
	 * @param  @param path
	 * @param  @return
	 * @param  @throws Exception
	 * @return_type   List<File>
	 */
	public static List<File> getFiles(String path) throws Exception {
		List<File> fileList = new ArrayList<File>();
		File file = new File(path);
		if (!file.exists()) {//判断文件夹是否创建，没有创建则创建新文件夹
			file.mkdirs();
		}
		if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (File fileIndex : files) {
				//如果这个文件是目录，则进行递归搜索
				if (fileIndex.isDirectory()) {
					getFiles(fileIndex.getPath());
				} else {
					//如果文件是普通文件，则将文件句柄放入集合中
					fileList.add(fileIndex);
				}
			}
		}
		return fileList;
	}

	/**
	 * 
	 * @time   2017年12月29日 下午4:17:26
	 * @author zuoqb
	 * @todo   根据文件类型处理事务
	 * @param  @param fileName
	 * @throws Exception 
	 * @return_type   void
	 */
	public static String dealByFileType(String filePath, String fileName) throws Exception {
		String fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length()).toLowerCase();
		String htmlName="";//转化后html页面名称
		//System.out.println(fileType);
		switch (fileType) {
		case "xls":
			htmlName=ExcelToHtml.excel2Html(filePath,fileName);
			break;
		case "xlsx":
			htmlName=ExcelToHtml.excel2Html(filePath,fileName);
			break;
		case "doc":
			htmlName=WordToHtml.Word2003ToHtml(filePath, fileName);
			break;
		case "docx":
			htmlName=WordToHtml.Word2007ToHtml(filePath, fileName);
			break;
		case "pdf":
			PdfToHtml pdf2Html = new PdfToHtml(filePath,fileName);
			htmlName=pdf2Html.generate();
			break;
		case "zip":
			dealCompressFile(filePath);
			break;
		case "rar":
			dealCompressFile(filePath);
			break;
		default:
			break;
		}
		return htmlName;
	}

	/**
	 * 
	 * @time   2017年12月29日 下午4:44:25
	 * @author zuoqb
	 * @todo   处理文件夹下文件（不包含zip rar压缩文件）转html
	 * @param  @param filePath
	 *  * @param  @param needBackUps :是否需要文件备份
	 * @throws Exception 
	 * @return_type   void
	 */
	public static boolean translateFileToHtml(String filePath,boolean needBackUps){
		List<File> list = new ArrayList<File>();
		try {
			File file = new File(Constants.CREATE_FILE_PATH);
			if (!file.exists()) {//判断文件夹是否创建，没有创建则创建新文件夹
				file.mkdirs();
			}
			list = getFiles(filePath);
			for (File f : list) {
				if (!f.getName().endsWith("zip") &&! f.getName().endsWith("rar")) {
					String htmlName=dealByFileType(filePath, f.getName());
					if(htmlName!=null&&StringUtils.isNotBlank(htmlName)){
						//在数据库做记录
						if(HshPageModel.dao.saveMethod(f.getName(), htmlName)){
							//如果入库成功 进行文件备份 
							if(needBackUps){
								moveTotherFolders(filePath, f.getName(), Constants.TEM_PATH);
							}else{
								//删除文件
								f.delete();
							}
						};
					}
				}
			}
			System.out.println("---文件处理成功---");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	/**
	 * 
	 * @time   2018年1月2日 上午9:26:33
	 * @author zuoqb
	 * @todo   处理压缩文件
	 *  处理之后又三个结果：
	 *  1. 解压文件夹uncompress生成解压文件
	 *  2. 备份文件夹tem生成zip rar压缩文件备份
	 *  3. 删除原始目录下压缩文件
	 * @param  @param path
	 * @return_type   void
	 */
	public static boolean dealCompressFile(String path) {
		File file = new File(path);// 里面输入特定目录
		if (!file.exists()) {//判断文件夹是否创建，没有创建则创建新文件夹
			file.mkdirs();
		}
		File temp = null;
		File[] filelist = file.listFiles();
		for (int i = 0; i < filelist.length; i++) {
			temp = filelist[i];
			// 获得文件名，如果后缀为“zip、rar”，就删除文件
			if (temp.getName().endsWith("zip") || temp.getName().endsWith("rar")) {
				try {
					//第一步 解压文件
					UnCompressFile.unzip(path + temp.getName(), Constants.UNCOMPRESS_PATH);
					//第二步  将当期压缩包下所有文件  记录到attachment_admin_contrast中  pid为压缩包id
					createAttachmentContrast(temp.getName(), path);
					//第三步 备份文件 因为使用的是文件移动，所以备份后原有文件就删除了
					moveTotherFolders(Constants.READ_FILE_PATH, temp.getName(), Constants.TEM_PATH);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return true;
	}
	/**
	 * 
	 * @time   2018年1月16日 下午5:26:30
	 * @author zuoqb
	 * @todo   针对压缩文件 生成压缩包内文件的附件中间表数据
	 * @param  @param zipName
	 * @param  @param path
	 * @param  @throws Exception
	 * @return_type   void
	 */
	public static void createAttachmentContrast(String zipName,String path) throws Exception{
		AttachmentContrastModel model=AttachmentContrastModel.dao.getByAttachmentName(zipName);
		if(model!=null){
			//获取当前压缩包下文件
			List<String> files=UnCompressFile.zipFiles(path+zipName);
			for(String name:files){
				AttachmentContrastModel m=new AttachmentContrastModel();
				m.set("pid", model.get("rowid"));
				m.set("data_id", model.get("data_id"));
				m.set("table_name", model.get("table_name"));
				m.set("attachment_name", name);
				m.save();
			}
		}
	}
	/**
	 * 
	 * @time   2017年12月29日 下午3:59:57
	 * @author zuoqb
	 * @todo   生成文件名称
	 * @param  @param startWith
	 * @param  @return
	 * @return_type   String
	 */
	public static String createFileName(String startWith) {
		return startWith + UUIDTool.get8UUID() + "(" + sdf.format(new Date()) + ").html";
	}

	/**
	 * 
	 * @time   2017年12月29日 下午4:03:22
	 * @author zuoqb
	 * @todo   判断文件是否存在
	 * @param  @param path
	 * @param  @return
	 * @return_type   boolean
	 */
	public static boolean judeFileExists(String path) {
		// 从给定位置获取文件
		File file = new File(path);
		if (file.exists()) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 
	 * @time   2017年12月29日 下午4:03:28
	 * @author zuoqb
	 * @todo   从给定位置读取readFile文件
	 * @param  @param path
	 * @param  @return
	 * @return_type   String
	 */
	public static String readFile(String path) {
		// 从给定位置获取文件
		File file = new File(path);
		BufferedReader reader = null;
		// 返回值,使用StringBuffer
		StringBuffer data = new StringBuffer();
		//
		try {
			reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), Constants.FILE_ENCODE));
			// 每次读取文件的缓存
			String temp = null;
			while ((temp = reader.readLine()) != null) {
				data.append(temp);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭文件流
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return data.toString();
	}

	/**
	 * 删除文件，可以是文件或文件夹
	 *
	 * @param fileName
	 *            要删除的文件名
	 * @return 删除成功返回true，否则返回false
	 */
	public static boolean delete(String fileName) {
		File file = new File(fileName);
		if (!file.exists()) {
			System.out.println("删除文件失败:" + fileName + "不存在！");
			return false;
		} else {
			if (file.isFile())
				return deleteFile(fileName);
			else if (file.isDirectory())
				return deleteDirectory(fileName);
			else
				return file.delete();
		}
	}

	/**
	 * 删除单个文件
	 *
	 * @param fileName
	 *            要删除的文件的文件名
	 * @return 单个文件删除成功返回true，否则返回false
	 */
	public static boolean deleteFile(String fileName) {
		File file = new File(fileName);
		// 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
		if (file.exists() && file.isFile()) {
			if (file.delete()) {
				return true;
			} else {
				System.out.println("删除单个文件" + fileName + "失败！");
				return false;
			}
		} else {
			System.out.println("删除单个文件失败：" + fileName + "不存在！");
			return false;
		}
	}

	/**
	 * 删除目录及目录下的文件
	 *
	 * @param dir
	 *            要删除的目录的文件路径
	 * @return 目录删除成功返回true，否则返回false
	 */
	public static boolean deleteDirectory(String dir) {
		// 如果dir不以文件分隔符结尾，自动添加文件分隔符
		if (!dir.endsWith(File.separator))
			dir = dir + File.separator;
		File dirFile = new File(dir);
		// 如果dir对应的文件不存在，或者不是一个目录，则退出
		if ((!dirFile.exists()) || (!dirFile.isDirectory())) {
			System.out.println("删除目录失败：" + dir + "不存在！");
			return false;
		}
		boolean flag = true;
		// 删除文件夹中的所有文件包括子目录
		File[] files = dirFile.listFiles();
		for (int i = 0; i < files.length; i++) {
			// 删除子文件
			if (files[i].isFile()) {
				flag = deleteFile(files[i].getAbsolutePath());
				if (!flag)
					break;
			}
			// 删除子目录
			else if (files[i].isDirectory()) {
				flag = deleteDirectory(files[i].getAbsolutePath());
				if (!flag)
					break;
			}
		}
		if (!flag) {
			System.out.println("删除目录失败！");
			return false;
		}
		// 删除当前目录
		if (dirFile.delete()) {
			System.out.println("删除目录" + dir + "成功！");
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 
	 * @time   2017年12月29日 下午4:55:54
	 * @author zuoqb
	 * @todo   移动文件 用于备份
	 * @param  @param pathName:路径+名称
	 * @param  @param fileName
	 * @param  @param ansPath
	 * @return_type   void
	 */
	public static boolean moveTotherFolders(String pathName, String fileName, String ansPath) {
		SimpleDateFormat s = new SimpleDateFormat("yyyyMMdd");
		String endPath = ansPath + File.separator + s.format(new Date()) + File.separator;
		File startFile = new File(pathName + fileName);
		File tmpFile = new File(endPath);//获取文件夹路径
		if (!tmpFile.exists()) {//判断文件夹是否创建，没有创建则创建新文件夹
			tmpFile.mkdirs();
		}
		//先看看目标文件是否存在  存在就删除在转移
		File toFile=new File(endPath + fileName);
		if(toFile.exists()){
			toFile.delete();
		}
		if (startFile.renameTo(new File(endPath + fileName))) {
			return true;
		} else {
			System.out.println(fileName + "File is failed to move!");
			return false;
		}
	}
	/**
	 * 
	 * @time   2018年1月2日 下午2:33:37
	 * @author zuoqb
	 * @todo   处理文件 pdf  excel word并转html入库
	 * @param  
	 * @return_type   void
	 */
	public static void translateFileToHtml(){
		//处理压缩文件
		dealCompressFile(Constants.READ_FILE_PATH);
		//转化指定文件夹下文件 并备份
		translateFileToHtml(Constants.READ_FILE_PATH,true);
		//转化解压后文件夹 而且不备份
		translateFileToHtml(Constants.UNCOMPRESS_PATH+File.separator,false);
	}
	public static void main(String[] args) throws Exception {
		translateFileToHtml();
	}

}
