//导航选中切换

function Map() {
    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    }
    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    }
    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
        }
        return null;
    }
    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            this.arr.unshift(v);
        }
    }
    var size = function () {
        return this.arr.length;
    }
    var isEmpty = function () {
        return this.arr.length <= 0;
    }
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}

function echartsResize() {
    chartone.resize();
    charttwo.resize();
    chartthree.resize();
    chartfour.resize();
    chartfive.resize();
    chartsix.resize();
}


var dataCenterMap = new Map();//数据中心
var labsMap = new Map();//实验室
var labsHtmlsMap = new Map();//实验室HTMLS
//查询全部数据中心数据（包含层级关系）
function loadAllDataCenterAjax() {
    $.post(contextPath + "/lab/loadAllDataCenterAjax", {}, function (data) {
        // console.log(data)
        $(".inland").html(createDataCenterHtml(data, 0));
        $(".abroad").html(createDataCenterHtml(data, 1));
        $(".inland>li:eq(0)").trigger("click");

        // 如果是从full页面平面地图提示中跳来的，需要进入到对应实验室
        let urlSearch = window.top.location.search;
        if (urlSearch.includes('toLabData')) {
            let param = urlSearch.slice(urlSearch.indexOf('&'));
            let centerId = param.split('=')[1];
            toCenterLab(centerId,'fromFull')

        }

    });
}

function createDataCenterHtml(data, dataType) {
    //dataType:0：国内 1：国外
    var htmls = "";
    var cuNum = 0;
    $.each(data, function (index, item) {
        if (item.id !== '3') {//隐藏模块商
            if (item.data_type == dataType) {
                var haschildren = false;
                if (item.haschildren == 1) {
                    haschildren = true;
                }
                // console.log("item",item)
                dataCenterMap.put(item.id, item);
               /* if(item.center_name==='检测中心'){
                    item.center_name='检测中心'
                }*/
                // console.log(item.id)
                if (!haschildren) {
                    htmls += '<li data-centerid="' + item.id + '" ';
                    if (cuNum == 0) {
                        htmls += ' class=" noChildren active" ';
                    } else {
                        htmls += ' class=" noChildren " ';
                    }
                    cuNum++;
                    //创建li响应方法
                    htmls += createClickFuntionForDataCenter(item);
                    htmls += ' >' + item.center_name + '</li>';
                } else {
                    htmls += '<li '
                    if (cuNum == 0) {
                        htmls += ' class=" hasChildren active" >';
                    } else {
                        htmls += ' class=" hasChildren " >';
                    }
                    cuNum++;

                    htmls += ' <header class="fold">' + item.center_name + '<span>∧</span></header> ';
                    htmls += '<ul>';
                    dataCenterMap.put(item.id, item);
                    $.each(item.children, function (index, cItem) {

                        dataCenterMap.put(cItem.id, cItem);
                        if (cItem.id !== "3") {
                            htmls += '<li data-centerid="' + cItem.id + '" ';
                            htmls += createClickFuntionForDataCenter(cItem) + " ><span class='icon'></span> " + cItem.center_name + '</li>';
                        }
                    });
                    htmls += '</ul></li>';
                }

            }
        }
    });
    return htmls;

}

//创建数据中心li响应方法
function createClickFuntionForDataCenter(item) {
    var htmls = "";
    var dataSource = item.data_source;
    //如果是在数据中心配置的为url则直接跳转，否则根据数据中心再去查询对应实验室level为3(单位/产品) 4（模块/整机）
    if (dataSource === "url") {
        htmls += " data-urltype =" + item.id + " ";
    } else {
        htmls += " onclick= loadAllDataCenterLabAjaxFunc('" + item.id + "') ";
    }
    return htmls;
}

function setCenterLabHtmlDB(dataCenter, dataCenterId) {
    /*数据库恢复时出错，暂时没有后台，就这这里改一下应急*/
    /*if (dataCenterId === '1') {
        dataCenter.center_name = '检测中心';
        dataCenter.center_desc = '海尔质量检测认证中心占地约18000㎡，拥有一流的专业实验室57个，覆盖安全、性能、EMC、噪音、运输、可靠性、成套智能家电等10大整机专业测试领域和电脑板、电机、压缩机、橡塑、钣金等10大类模块的6000多个项目的检测能力。中心拥有一支技术专业、经验丰富的团队，严格按照ISO/IEC17025标准体系要求，在电子电器产品及关键模块领域具有主导和参与标准制定的能力。合作的50多家国际认证机构如VDE、UL、JET、TUV等实现了检测数据互认，可为海尔销往全球各地的产品提供专业、快速、经济的检测认证。';
        dataCenter.img_content = '../static/img/labMain/centerLab0.png';
    }*/
    $(".labMain_cblt_tone_world").html("<p style:'font-size:1.3em'>" + dataCenter.center_desc + "</p>");
    $(".labMain_cblt_ttwo_world img").attr("src", dataCenter.img_content);
    $("#labName_world").html(dataCenter.center_name);
    $("#labnameIcon_world").html(dataCenter.center_name);
    $("#secondName_world").html(dataCenter.center_name);
}

//获取数据中心的视频列表
function loadVideosByDataCenterAjax(dataCenterId) {
    $.post(contextPath + "/lab/loadVideosByDataCenterAjax/?dataCenterId=" + dataCenterId, function (data) {
        console.log('获取视频的data', data);
        var centerDataVideoArray = [];
        var html = "";
        if (data.length > 0) {
            $(".sheshi_tab.centerVideo").removeClass("disabled");
            for (var i = 0; i < data.length; i++) {
                var localVideo = data[i].videl_url.replace("10.130.96.65:10800", "10.130.96.113:10801");
                html += "<li data-videourl=" + localVideo + " >" + data[i].show_title + "</li>"
            }
            // console.log(html)
            $(".centerVideoList>ul").html(html)
        } else {
            $(".sheshi_tab.centerVideo").addClass("disabled")
        }
    });

}

var mDataCenterId;

//查询数据中心下实验室 level为3(单位/产品)
function loadAllDataCenterLabAjaxFunc(dataCenterId) {
    $("#lab_unit_selected_center_world").html("");
    $("#legend_ul_world").html("");
    myChartWorld1.clear();
    myChartWorld2.clear();
    mDataCenterId = dataCenterId;
    console.log("loadAllDataCenterLabAjaxFunc", dataCenterId);

    var dataCenter = dataCenterMap.get(dataCenterId);
    var parentDataCenter = dataCenterMap.get(dataCenter.parent_id);
    var data_type = dataCenter.data_type;
    var data_source = dataCenter.data_source;
    setCenterLabHtmlDB(dataCenter, dataCenterId);
    //加载数据中心第三级
    $.post(contextPath + "/lab/loadAllDataCenterLabAjax", {"dataCenterId": dataCenterId}, function (data) {
        // console.log("查询level为3",data)
        var html = '';
        var firstLabCode = "";
        $.each(data, function (index, item) {
            myChartWorld1.clear();
            myChartWorld2.clear();
            myChart1.clear();
            myChart2.clear();
            var dataSource = item.data_source;
            dataCenterMap.put(item.id, item);
            if (dataSource == "url") {
                html += '<li  data-center-id="' + item.id + '"  class="toLabIframe quxian_li_' + item.id + '" data-url="' + item.souce_value + '"><header>' + (item.isshow_name == 0 ? item.center_name : "") + '</header></li>';
            } else {
                //生成实验室
                if (item.data_source == "webservice") {
                    html += '<li class="quxian_li_' + item.id + '" ' + createClickFuntion(item) + ' data-center-id="' + item.id + '"  ><header>' + (item.isshow_name == 0 ? item.center_name : "") + '<span>∨</span></header>';
                    html += '</li>';
                } else {
                    html += '<li class="quxian_li_' + item.id + '" data-center-id="' + item.id + '"  ><header>' + (item.isshow_name == 0 ? item.center_name : "") + '<span>∨</span></header>';
                    var labsHtmls = "<ul>";
                    $.each(item.children, function (ind, it) {
                        if (index == 0 && ind == 0) {
                            firstLabCode = it.lab_code + "_" + it.id;
                        }
                        if (it.data_source != "webservice") {
                            var currentHtmls = ' <li class="lab_code_' + it.lab_code + '_' + it.id;
                            var header = '<header labcode="' + it.lab_code + '"  ' + createClickFuntion(it) + '>' + it.lab_name;
                            if (it.data_source == "url") {
                                currentHtmls += ' toLabIframe " data-url="' + it.souce_value + '">';
                                header += '</header>';
                            } else {
                                currentHtmls += ' ">';
                                header += '<span>∨</span></header>';
                            }
                            labsMap.put(it.id, it);
                            labsHtmlsMap.put(it.id, '<header labcode="' + it.lab_code + '"  ' + createClickFuntion(it) + '>' + it.lab_name + '<span>∧</span></header>');
                            //如果是检测中心 不拼接header
                            labsHtmls = labsHtmls + currentHtmls + header + "</li>";
                        } else if (it.data_source == "webservice") {
                            //直接获取webservice实验室信息
                            var htmls = "";
                            $.post(contextPath + '/lab/loadLabSearchLabConnectAjax', {}, function (data) {
                                $.each(data, function (index, item) {
                                    item.labName = item.labName.replace("（", "(").replace("）", ")").replace("、", "/");
                                    htmls += ' <li class="lab_code_' + item.labCode + '"><header labcode="' + item.labCode + '"  onclick=loadLabUnitInfoAjaxZhbr("' + item.labCode + '","' + item.url + '")>' + item.labName + '<span>∨</span></header>';
                                    labsHtmlsMap.put(item.labCode, '<header labcode="' + item.labCode + '"  onclick=loadLabUnitInfoAjaxZhbr("' + item.labCode + '","' + item.url + '")>' + item.labName + '<span>∧</span></header>');
                                    htmls += ' </li>';
                                });
                                $(".quxian_li_" + item.id).find("ul:eq(0)").append(htmls);
                            });
                        }
                    });
                    labsHtmls += '</ul>';
                    html += labsHtmls;
                    html += '</li>';
                }

            }
        });
        $("#lab_unit_selected_center").html(html);
        $("#lab_unit_selected_center_world").html(html);
        $(".lab_code_" + firstLabCode).find("header").trigger("click");

    });

}

//创建li响应方法
function createClickFuntion(item) {
    var htmls = "";
    /**
     * 数据源 db-直连数据库； url-第三方链接；
     webservice-连接webservice；json-读取json文件
     */
        // console.log("item",item)
    var dataSource = item.data_source;
    if (dataSource == "db") { //国外曲线
        htmls += " onclick= loadLabUnitInfoCenterTabAjaxWorldHadoop('" + item.id + "')"
    } else if (dataSource == "webservice") {
        //检测中心
        // htmls += " onclick=loadLabUnitInfoAjaxZhbr('" + item.id + "') ";
    } else if (dataSource == "json") {
        //新西兰 日本读取json文件 国外曲线
        htmls += " onclick= loadLabUnitInfoCenterTabAjaxWorld('" + item.id + "') ";
    }
    return htmls;
}
