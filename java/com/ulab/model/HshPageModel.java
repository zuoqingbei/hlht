
package com.ulab.model;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.ulab.util.UUIDTool;
/**
 * 
 * @time   2017年12月29日 下午2:24:22
 * @author zuoqb
 * @todo   TODO
 */
@TableBind(tableName = "transform_admin_page",pkName="id")
public class HshPageModel extends Model<HshPageModel> {
	public static final HshPageModel dao = new HshPageModel();
	private static final long serialVersionUID = 4762813779629969917L;
	private static final SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public boolean saveMethod(String fileName,String htmlName){
		HshPageModel model = new HshPageModel();
		model.set("rowid", UUIDTool.get12UUID());
		//来自attachment_admin_contrast附件中间表主键
		AttachmentContrastModel attachment=AttachmentContrastModel.dao.getByAttachmentName(fileName);
		if(attachment!=null){
			model.set("attachment_id", attachment.get("rowid"));
		}
		model.set("html_name", htmlName);
		model.set("file_name", fileName);
		model.set("file_type", fileName.substring(fileName.lastIndexOf(".")+1, fileName.length()));
		model.set("create_time", sdf.format(new Date()));
		model.set("del_flag", 0);
		return model.save();
	}
	public Page<HshPageModel> paginate(int pageNumber, int pageSize) {
		return paginate(pageNumber, pageSize, " select a.data_id,a.table_name,t.*   ", " from transform_admin_page t left join attachment_admin_contrast a on a.rowid=t.attachment_id where t.del_flag=0");
	}
}
