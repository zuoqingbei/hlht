package com.ulab.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.ulab.model.CreditModel;
import com.ulab.model.InsuranceModel;

/**
 * 
 * @time   2018年1月22日09:32:56
 * @author zuoqb
 * @todo 更新校验哈希拉
 */
public class UpdateHashQuartzJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		InsuranceModel.dao.updateHash();
		CreditModel.dao.updateHash();
	}
}
