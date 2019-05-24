$(function () {

    /*响应菜单点击后隐藏*/
    $(".navbar-collapse a").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    let updateItem = JSON.parse(localStorage.getItem('updateItem'));
    if(updateItem){
        $('#orderId').val()
    }
    console.log('updateItem',updateItem)
    let $order_form = $("#order_form").find("form");
    $order_form.submit(function (e) {
        e.preventDefault();
        let param = {
            id:$('#orderId').val(),
            testNumber: $('#testNumber').val(),
            creationTime: $('#creationTime').val(),
            step: $("[name=step]:checked").parent().index()-1,
        };
        $("[id$=name]").each(function (index,item) {
            let name = $(this).val();
            let tel = $(this).parent().next().find('[id$=tel]').val();
            if(name||tel){
                let stepN = $(this).attr('id').split('_')[0];
                param[stepN] = {
                    name:name,
                    tel:tel
                }
            }
        });
        console.log(JSON.stringify(param))
    })




});

