
package com.ulab.model;

import com.jfinal.ext.plugin.tablebind.TableBind;
import com.jfinal.plugin.activerecord.Model;
/**
 * 
 * @time   2018年1月15日11:08:26
 * @author zuoqb
 * @todo   附件中间表
 */
@TableBind(tableName = "attachment_admin_contrast",pkName="rowid")
public class AttachmentContrastModel extends Model<AttachmentContrastModel> {
	public static final AttachmentContrastModel dao = new AttachmentContrastModel();
	private static final long serialVersionUID = 4762813779629969917L;
	/**
	 * 
	 * @time   2018年1月15日 上午11:20:41
	 * @author zuoqb
	 * @todo   根据附件名称 查询中间表数据
	 * @param  @param attachmentName
	 * @param  @return
	 * @return_type   AttachmentContrastModel
	 */

	public AttachmentContrastModel getByAttachmentName(String attachmentName){
		String sql=" select * from attachment_admin_contrast where attachment_name='"+attachmentName+"'";
		return dao.findFirst(sql);
	}
}
