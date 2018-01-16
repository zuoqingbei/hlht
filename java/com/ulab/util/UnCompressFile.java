package com.ulab.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import com.ulab.core.Constants;

/**
 * 
 * @time   2017年12月12日 下午12:38:15
 * @author zuoqb
 * @todo   解压文件
 */
public class UnCompressFile {
	private static UnCompressFile instance = new UnCompressFile();

	private UnCompressFile() {
	}

	public static UnCompressFile getInstance() {
		return instance;
	}

	/**
	 * 解压zip或者rar包的内容到指定的目录下，可以处理其文件夹下包含子文件夹的情况
	 *
	 * @param zipFilename
	 *            要解压的zip或者rar包文件
	 * @param outputDirectory
	 *            解压后存放的目录
	 */
	@SuppressWarnings("rawtypes")
	public static synchronized void unzip(String zipFilename, String outputDirectory) throws IOException {
		File outFile = new File(outputDirectory);
		if (!outFile.exists()) {
			outFile.mkdirs();
		}
		ZipFile _zipFile = new ZipFile(zipFilename,Charset.forName(Constants.FILE_ENCODE));
		for( Enumeration entries = _zipFile.entries() ; entries.hasMoreElements() ; ){
            ZipEntry entry = (ZipEntry)entries.nextElement() ;
            File _file = new File(outputDirectory + File.separator + entry.getName()) ;
            if( entry.isDirectory() ){
                _file.mkdirs() ;
            }else{
                File _parent = _file.getParentFile() ;
                if( !_parent.exists() ){
                    _parent.mkdirs() ;
                }
                InputStream _in = _zipFile.getInputStream(entry);
                OutputStream _out = new FileOutputStream(_file) ;
                int len ;
                byte[] by = new byte[BUFFEREDSIZE];
                while( (len = _in.read(by)) > 0){
                    _out.write(by, 0, len);
                }
                if (null !=_out){
                    _out.flush();
                    _out.close();
                }
                if (null !=_in){
                    _in.close();
                }
            }
        }
		// 加了这行代码之后就可以删除了
        _zipFile.close();// 加了这行代码之后就可以删除了
	}
	/**
	 * 
	 * @time   2018年1月16日 下午5:26:48
	 * @author zuoqb
	 * @todo   读取压缩包下文件列表
	 * @param  @param zipFilename
	 * @param  @return
	 * @param  @throws IOException
	 * @return_type   List<String>
	 */
	@SuppressWarnings("rawtypes")
	public static synchronized List<String> zipFiles(String zipFilename) throws IOException {
		List<String> files=new ArrayList<String>();
		ZipFile _zipFile = new ZipFile(zipFilename,Charset.forName(Constants.FILE_ENCODE));
		for( Enumeration entries = _zipFile.entries() ; entries.hasMoreElements() ; ){
            ZipEntry entry = (ZipEntry)entries.nextElement() ;
            files.add(entry.getName());
           System.out.println( entry.getName());
        }
		_zipFile.close();
		return files;
	}

	private static final int BUFFEREDSIZE = 1024;

	public static void main(String[] args) {
		try {
			//unzip("I:/海联/文档资料/test.rar", "D:/zzz/test");

			//unzip("I:/海联/文档资料/test.zip", "D:/zzz/struts");
			zipFiles("D:/kubi/backups/20180115/采集附件-海联.zip");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
