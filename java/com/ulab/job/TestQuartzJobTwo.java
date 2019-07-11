package com.ulab.job;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.ulab.model.OrderNumModel;
/**
 * 
 * @time   2017年5月25日 上午10:41:40
 * @author zuoqb
 * @todo   订单量和通过率定时变化
 * 新增的定时器需要在quartz.properties进行配置
 */
public class TestQuartzJobTwo implements Job {

	@Override
	public void execute(JobExecutionContext context)
			throws JobExecutionException {
		 System.out.println("我是第二个定时任务 " + new Date());
		 Date now=new Date();
		 int index=now.getSeconds()/6;
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTime(now);
		 int minute=calendar.get(Calendar.MINUTE);
		 int rate=(now.getSeconds()+minute*60)/6;
		 List<OrderNumModel> list=OrderNumModel.dao.findOrderNums();
		 if(isBelong()){
			 System.out.println("rate---"+rate);
			 for(OrderNumModel order:list){
				 String[] arr=order.getStr("rate_val").split(",");
				 if(rate>arr.length-1){
					 rate=arr.length-1;
				 }
				 if(Double.parseDouble(order.get("rate")+"")>100){
					 order.set("rate", order.get("ri"));
				 }
				 int change=Integer.parseInt(order.getStr("interval").split(",")[index]);
				 double rateChange=Double.parseDouble(arr[rate]);
				 System.out.println("change-----"+rateChange+"----"+(Double.parseDouble(order.get("rate")+"")+rateChange));
				 //rateChange=0.09d;
				 if(rateChange!=0d){
					 System.out.println(now.getSeconds()+"---"+index);
				 }
				 if(change>0){
					 order.set("now_num", Integer.parseInt(order.get("now_num")+"")+change)
					 .set("rate",(double)Math.round( (Double.parseDouble(order.get("rate")+"")+rateChange)*100)/100).update();
				 }else {
					 if(rateChange!=0){
						 order.set("rate",(double)Math.round( (Double.parseDouble(order.get("rate")+"")+rateChange)*100)/100).update();
					 }
				 }
			 }
		 }else{
			 //更新订单率
			 for(OrderNumModel order:list){
				 String[] arr=order.getStr("rate_val").split(",");
				 if(rate>arr.length-1){
					 rate=arr.length-1;
				 }
				 double rateChange=Double.parseDouble(arr[rate]);
				 if(rateChange!=0){
					 order.set("rate",(double)Math.round( (Double.parseDouble(order.get("rate")+"")+rateChange)*100)/100).update();
				 }
			 }
		 }
		 for(OrderNumModel order:list){
			 if(Double.parseDouble(order.get("rate")+"")>100){
				 order.set("rate", order.get("ri")).update();
			 }
		 }
		 
	}
	public boolean isBelong(){

	    SimpleDateFormat df = new SimpleDateFormat("HH:mm");//设置日期格式
	    Date now =null;
	    Date beginTime = null;
	    Date endTime = null;
	    try {
	        now = df.parse(df.format(new Date()));
	        beginTime = df.parse("9:00");
	        endTime = df.parse("24:00");
	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    Boolean flag = belongCalendar(now, beginTime, endTime);
	    return flag;
	}
	public static void main(String[] args) {
		String s="0,.1,0,0,0,0,.1,0,0,0,0,0,-.1,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,.1,0,0,0,0,0,0,0,-.1,0,0,0,0,0,0,0,0,0,.1,0,0,0,0,-.1,0,0,0,0";
		s=s.replaceAll(".1", "0.1").replaceAll("-.1", "-0.1");
		System.out.println(s);
	}


	/**
	     * 判断时间是否在时间段内
	     * @param nowTime
	     * @param beginTime
	     * @param endTime
	     * @return
	     */
	    public static boolean belongCalendar(Date nowTime, Date beginTime, Date endTime) {
	        Calendar date = Calendar.getInstance();
	        date.setTime(nowTime);

	        Calendar begin = Calendar.getInstance();
	        begin.setTime(beginTime);

	        Calendar end = Calendar.getInstance();
	        end.setTime(endTime);

	        if (date.after(begin) && date.before(end)) {
	            return true;
	        } else {
	            return false;
	        }
	    }

}
