package com.ulab.job;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.ulab.util.FileUtil;

/**
 * 
 * @time   2018年1月2日14:48:27
 * @author zuoqb
 * @todo   定时器 文件处理
 * 新增的定时器需要在quartz.properties进行配置
 */
public class TestQuartzJobOne implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		System.out.println("----文件处理开始"+new Date());
		FileUtil.translateFileToHtml();
	}
}
