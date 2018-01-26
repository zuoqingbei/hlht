package com.ulab.job;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.ulab.model.LogModel;

/**
 * 
 * @time   2018年1月25日 下午3:15:40
 * @author zuoqb
 * @todo   站点采集异常监控
 */
public class CollectionExceptionQuartzJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Thread th=new Thread(new Runnable() {
			@Override
			public void run() {
				LogModel.dao.collectionException();
			}
		});
		th.start();
		System.out.println("---网站采集异常监控---"+new Date());
	}
}
