let labCode = "2,1,4",
    lineCode = "21,22,23,24,25,26,27";
$(function () {
    // parentMethod(lineCode, labCode);
    //设置产线和实验室的颜色
    addStyleForA();
    // 点击导航中的A标签
    clickNavA();
    // 实验室和产线的切换
    showLabLine();
    //全选
    selectAll();
    // 进入实验室按钮
    $(".legend .toLabData").click(function () {
        $("#r>iframe", parent.document).attr('src',contextPath+'/layout/lab');
        $(".orderPopup", parent.document).removeClass("show");
        //实验室切回国内的检测中心
        $(".lab .switchBox>ul.inland>li:eq(0)", parent.document).click();
        $(".lab .labMainNav header>ul>li:eq(0)", parent.document).click();
    });

    // 刷新动画
    setInterval(function () {

        loadOrderNumsAjax();
    }, 5000)

});

//全选
function selectAll() {
    $(".selectAll").click(function () {
        if (!$(this).find("input").is(":checked")) {
            $("#selectAll").prop("checked", true);//不知为什么不能通过点击直接修改checked的状态
            if ($(".legend-m ul.active").index() === 0) {
                labCode = "2,1,4";
            } else {
                lineCode = "21,22,23,24,25,26,27";
            }
            $(".legend-m ul.active>li").addClass("active");
            parentMethod(lineCode, labCode);
            // console.log(lineCode, labCode);
        }
        return false;
    })
}

// 实验室和产线的切换
function showLabLine() {
    $(".legend>.btn").click(function () {
        active($(this));
        if ($(this).index() === 0) {
            $(".legend-m ul").css("top", "-1.3125em");
            active($(".legend-m ul:eq(1)"))
        } else {
            $(".legend-m ul").css("top", "0");
            active($(".legend-m ul:eq(0)"));
        }
        // 判断当前激活li元素个数来确定是否选中全选按钮
        if ($(".legend-m ul.active>li.active").length === 1) {
            $("#selectAll").prop("checked", false);
        } else {
            $("#selectAll").prop("checked", true);
        }
    });
}

//平面地图的数据加载
function parentMethod(lineCode, labCode) {
    // $("#iframeFlat")[0].contentWindow.createArrData("21,22,23,24,25,26,27", "2,1,4,3");
    $("#iframeFlat")[0].contentWindow.createArrData(lineCode, labCode);
}

// 激活
function active($this) {
    $this.addClass("active").siblings().removeClass("active");
}

//设置产线和实验室的颜色
function addStyleForA() {
    let styleStr = '';
    let l = $(".legend-m .text>ul:eq(0)>li").length;//第一个列表长度
    $(".legend-m .text>ul>li").each(function (index) {
        let [firstOrLast, labOrLine, n] = ['first', 'lab', index + 1];
        if (index >= l) { // 遍历第二个列表
            [firstOrLast, labOrLine, n] = ['last', 'line', index + 1 - l];
        }
        styleStr +=
            `.legend-m ul:${firstOrLast}-of-type>li.active:nth-of-type(${n})>a,
             .legend-m ul:${firstOrLast}-of-type>li.active:nth-of-type(${n})>a:before{
                color: var(--c_${labOrLine}${n});
                background: radial-gradient(circle,var(--c_${labOrLine}${n}),rgba(0,0,0,0));
            }`
    });
    $("head").append(`<style>${styleStr}</style>`);
}

// 点击导航中的A标签
function clickNavA() {
    // 默认全部选中
    $(".legend-m ul>li").addClass("active").find("a").click(function () {
        let $parent = $(this).parent();
        active($parent);
        if ($parent.parent().index() === 0) { //实验室
            labCode = $(this).parent().index() + 1;
            if (labCode === 1) {
                labCode = 2;
            } else if (labCode === 2) {
                labCode = 1;
            } else if (labCode === 3) {
                labCode = 4;
            } else if (labCode === 4) {
                labCode = 3;
            }
        } else { //产线
            lineCode = $(this).parent().index() + 21;
        }
        $("#selectAll").prop("checked", false);
        parentMethod(lineCode, labCode);
        return false;
    })

    // 刷新动画
    /* setInterval(function () {
         $(".management strong").each(function (index,item) {
             $(this).hide().show(100);
         })
     },2000)*/
}

$(function () {
    loadOrderNumsAjax();
});


/*function changeData() {
    if (judgeChange()) {
        //开启调度
        interValFun();
    }
};
var indexs = 0;
var mData;

function interValFun() {
    $.each(mData, function (index, item) {
        var arr = item.interval.split(",");
        var change = arr[indexs % 10];
        if (parseInt(change) > 0) {
            //$("#m_td_order_"+item.id).html(parseInt($("#m_td_order_"+item.id).html())+parseInt(change));
            //更新数据
            updateOrderNumsAjax(item.id, change);
        }
    });
    indexs++;
}

var cId;
var mNum;

//更新数据
function updateOrderNumsAjax(id, change) {
    $.post(contextPath+"/lab/updateOrderNumsAjax", {"change": change, "id": id}, function (data) {
        console.log("更新成功");
        cId = id;
        mNum = data.now_num;
    });

}


//判断时间范围
function time_range(beginTime, endTime, nowTime) {
    var strb = beginTime.split(":");
    if (strb.length != 2) {
        return false;
    }
    var stre = endTime.split(":");
    if (stre.length != 2) {
        return false;
    }

    var strn = nowTime.split(":");
    if (stre.length != 2) {
        return false;
    }
    var b = new Date();
    var e = new Date();
    var n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);
    n.setHours(strn[0]);
    n.setMinutes(strn[1]);

    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
    } else {
        return false;
    }
}*/

//判断当前时间是否需要变化数字
/*function judgeChange() {
    var n = new Date();
    var now = n.getHours() + ":" + n.getMinutes();
    if (time_range("00:00", "9:00", now) || time_range("12:30", "13:30", now) || time_range("17:00", "24:00", now)) {
        return false;
    }
    if (time_range("9:00", "12:30", now) || time_range("13:30", "17:00", now)) {
        return true;
    }

};*/



