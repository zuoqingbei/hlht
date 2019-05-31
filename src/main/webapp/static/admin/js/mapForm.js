$(function () {

    /*响应菜单点击后隐藏*/
    $(".navbar-collapse a").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    //验证表单
    var validResult = false;
    var $flatMap_form = $("#flatMap_form").find("form");
    $flatMap_form.find(":input").keyup(function () {
        validateForm()
    });
    $flatMap_form.find(":submit").click(function () {
        // alert(1)
        validateForm();

        if ($flatMap_form.valid()) {
        	var param= $flatMap_form.serialize();
        	$.post(contextPath+"/admin/updateMap",param,function(data){
        		alert("修改成功!");
        		window.location.href=contextPath+"/admin/mapForm?id="+data.id;
        	});
        };

    });

    function validateForm() {
        $flatMap_form.validate({
            debug: true,
            rules: {
                name: {
                    required: true
                },
                short_name: {
                    required: true
                },
                location: {
                    required: true
                },
                lng: {
                    required: true,
                    number:true,
                    range:[-180,180]
                },
                lat: {
                    required: true,
                    number:true,
                    range:[-90,90]
                }
            },
            messages: {
                name: {
                    required: "请输入实验室名称"
                },
                short_name: {
                    required: "请输入实验室简称"
                },
                location: {
                    required: "请输入实验室所在地区"
                },
                lng: {
                    required: "请输入实验室经度",
                    number:"请输入-180~180之间的数值",
                    range: "请输入-180~180之间的数值"
                },
                lat: {
                    required: "请输入实验室纬度",
                    number: "请输入-90~90之间的数值",
                    range: "请输入-90~90之间的数值"
                }
            }
//                success:function () {
//                    validResult = true;
//                }
        });
    }

})