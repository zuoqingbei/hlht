package com.ulab.job;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * 
 * @time   2018年1月25日 下午3:15:40
 * @author zuoqb
 * @todo   站点异常监控：比如网站无法访问
 */
public class SiteExceptionQuartzJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		System.out.println("---- 站点异常监控开始"+new Date());
	}
}
