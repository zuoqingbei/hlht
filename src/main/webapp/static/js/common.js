function dataToObject(data) {
    var item = new Object();
    item.name = data.name;
    item.value = data.value;
    return item;
}

function dataToArray(data) {
    //console.log(data.clist)
    var d = new Array();
    for (var x = 0; x < data.clist.length; x++) {
        d.push(dataToObject(data.clist[x]));
    }
    return d;
}

function jsonToArray(data) {
    //console.log(data.clist)
    var d = new Array();
    /*var p=  {
            lng:120.355171,
            lat: 36.082981,
            litude:[120.355171,36.082981],
            dateTime: '',
            title: '青岛研发中心',
            id: '1',
            url: '',
            name: '青岛研发中心',
            value: 168,
            country:"中国"
        };
    d.push(p);*/
    for (var x = 0; x < data.length; x++) {
        var obj = data[x];

        //先写死试试
        /*if(!obj.imgUrl){
            obj.imgUrl = "../static/img/labMain/Thailand.jpg";
        }
        if(!obj.centerId){
            obj.centerId = "9";
        }*/


        var e = {
            lng: obj.lng,
            lat: obj.lat,
            litude: [obj.lng, obj.lat],
            dateTime: obj.datetime,
            title: obj.title,
            id: '1',
            url: '',
            name: obj.name,
            value: obj.num,
            country: obj.country,
            imgUrl: obj.img_content,
            centerId: obj.data_center_id,
            lab_type: obj.lab_type

        }
        d.push(e);
    }
    return d;
}

function dataToArrayContinueArray(data) {
    var d = new Array();
    for (var x = 0; x < data.length; x++) {
        var obj = data[x];
        var e = new Array();
        var item0 = new Object();
        item0.name = "青岛研发中心";
        e.push(item0);
        e.push(dataToObject(obj));
        d.push(e);
    }
    return d;
}

function dataToArrayAll(data) {
    var d = new Array();
    for (var i = 0; i < data.length; i++) {
        for (var x = 0; x < data[i].clist.length; x++) {
            var obj = data[i].clist[x];
            var e = new Array();
            var item0 = new Object();
            item0.name = obj.pshortname;
            e.push(item0);
            var item1 = new Object();
            item1.name = obj.shortname;
            e.push(item1);
            d.push(e);
        }
    }
    return d;
}

function geoCoord(data) {
    var r = '{';
    for (var i = 0; i < data.length; i++) {
        r += "\"" + data[i].shortname + "\":[" + data[i].lng + "," + data[i].lat + "],";
        for (var x = 0; x < data[i].clist.length; x++) {
            var obj = data[i].clist[x];
            var key = obj.shortname;
            r += "\"" + key + "\":[" + obj.lng + "," + obj.lat + "],";
        }
        //r+="\"上海\":[121.4648,31.2891],";
    }
    r = r.substr(0, r.length - 1)
    r += '}'
    return $.parseJSON(r);
}

function isHasElementOne(arr, value) {
    for (var i = 0, vlen = arr.length; i < vlen; i++) {
        if (arr[i] == value) {
            return i;
        }
    }
    return -1;
}


/**
 *
 *map3D
 */

//加载全部位置属性
function getAirports(data, markPointStyle) {
    var d = new Array();
    for (var i = 0; i < data.length; i++) {
        var pitem0 = new Object();
        pitem0.geoCoord = [data[i].lng, data[i].lat];
        pitem0.itemStyle = markPointStyle;
        d.push(pitem0);
        for (var x = 0; x < data[i].clist.length; x++) {
            var obj = data[i].clist[x];
            var item0 = new Object();
            item0.geoCoord = [obj.lng, obj.lat];
            item0.itemStyle = markPointStyle;
            d.push(item0);
        }
    }
    return d;
}

//legend标题
function legendData(data) {
    var legendData = [];
    for (var i = 0; i < data.length; i++) {
        var name = (data[i].shortname == null ? data[i].shortname : data[i].shortname);// 名称
        legendData.push(name);
    }
    return legendData;
}

//拼接地图迁徙起点-终点坐标
/**
 * [
 [{geoCoord:'起点坐标'},{geoCoord:'终点坐标'}],
 [{geoCoord:'起点坐标'},{geoCoord:'终点坐标'}]
 ]
 */
function lineGeoCoord(data) {
    var d = new Array();
    for (var x = 0; x < data.clist.length; x++) {
        var obj = data.clist[x];
        var e = new Array();
        var item0 = new Object();
        item0.geoCoord = [obj.plng, obj.plat];
        e.push(item0);
        var item1 = new Object();
        item1.geoCoord = [obj.lng, obj.lat];
        e.push(item1);
        d.push(e);
    }
    return d;
}


//---------------------------js和jquery扩展相关方法-----------------------------------------------------	
/**
 * COMMON DHTML FUNCTIONS
 * These are handy functions I use all the time.
 *
 * By Seth Banks (webmaster at subimage dot com)
 * http://www.subimage.com/
 *
 * Up to date code can be found at http://www.subimage.com/dhtml/
 *
 * This code is free for you to use anywhere, just keep this comment block.
 */

/**
 * X-browser event handler attachment and detachment
 * TH: Switched first true to false per http://www.onlinetools.org/articles/unobtrusivejavascript/chapter4.html
 *
 * @argument obj - the object to attach event to
 * @argument evType - name of the event - DONT ADD "on", pass only "mouseover", etc
 * @argument fn - function to call
 */
function addEvent(obj, evType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent("on" + evType, fn);
        return r;
    } else {
        return false;
    }
}

function removeEvent(obj, evType, fn, useCapture) {
    if (obj.removeEventListener) {
        obj.removeEventListener(evType, fn, useCapture);
        return true;
    } else if (obj.detachEvent) {
        var r = obj.detachEvent("on" + evType, fn);
        return r;
    } else {
        alert("Handler could not be removed");
    }
}


function Map() {
    this.elements = new Array();
    //获取MAP元素个数  
    this.size = function () {
        return this.elements.length;
    };
    //判断MAP是否为空  
    this.isEmpty = function () {
        return (this.elements.length < 1);
    };
    //删除MAP所有元素  
    this.clear = function () {
        this.elements = new Array();
    };
    //向MAP中增加元素（key, value)   
    this.put = function (_key, _value) {
        this.elements.push({
            key: _key,
            value: _value
        });
    };
    //删除指定KEY的元素，成功返回True，失败返回False  
    this.remove = function (_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取指定KEY的元素值VALUE，失败返回NULL  
    this.get = function (_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    };
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL  
    this.element = function (_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };
    //判断MAP中是否含有指定KEY的元素  
    this.containsKey = function (_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //判断MAP中是否含有指定VALUE的元素  
    this.containsValue = function (_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取MAP中所有VALUE的数组（ARRAY）  
    this.values = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };
    //获取MAP中所有KEY的数组（ARRAY）  
    this.keys = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
}

//判断是否引入某个JS、css
function isIncludeJSCSS(name) {
    var js = /js$/i.test(name);
    var es = document.getElementsByTagName(js ? 'script' : 'link');
    for (var i = 0; i < es.length; i++)
        if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
    return false;
}

//引入没有引入的JS、css
function importJSCSS(name) {
    if (!isIncludeJSCSS(name)) {
        var baseName = name.split("?")[0];
        if (baseName.endWith("css") || baseName.endWith("CSS")) {
            document.write('<link href="' + name + '" rel="stylesheet" type="text/css" />');
        } else {
            document.write("<script language=javascript src='" + name + "'>\<\/script>");
        }
    }
}


/**
 * Code below taken from - http://www.evolt.org/article/document_body_doctype_switching_and_more/17/30655/
 *
 * Modified 4/22/04 to work with Opera/Moz (by webmaster at subimage dot com)
 *
 * Gets the full width/height because it's different for most browsers.
 */
function getViewportHeight() {
    if (window.innerHeight != window.undefined) return window.innerHeight;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientHeight;
    if (document.body) return document.body.clientHeight;

    return window.undefined;
}

function getViewportWidth() {
    var offset = 17;
    var width = null;
    if (window.innerWidth != window.undefined) return window.innerWidth;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientWidth;
    if (document.body) return document.body.clientWidth;
}

/**
 * Gets the real scroll top
 */
function getScrollTop() {
    if (self.pageYOffset) // all except Explorer
    {
        return self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop)
    // Explorer 6 Strict
    {
        return document.documentElement.scrollTop;
    } else if (document.body) // all other Explorers
    {
        return document.body.scrollTop;
    }
}

function getScrollLeft() {
    if (self.pageXOffset) // all except Explorer
    {
        return self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollLeft)
    // Explorer 6 Strict
    {
        return document.documentElement.scrollLeft;
    } else if (document.body) // all other Explorers
    {
        return document.body.scrollLeft;
    }
}

String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
}
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//cookie操作
function cookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

//-------------------------------表单属性变成url字段，没用 了直接用jquery 的serialize-------------------
//获取指定form中的所有的<input>对象    
function getElements(formId) {
    var form = document.getElementById(formId);
    if (form == null)
        return;
    var elements = new Array();
    var tagElements = form.getElementsByTagName('input');
    for (var j = 0; j < tagElements.length; j++) {
        elements.push(tagElements[j]);
    }
    var tagElementsSelect = form.getElementsByTagName('select');

    for (var i = 0; i < tagElementsSelect.length; i++) {
        elements.push(tagElementsSelect[i]);
    }
    return elements;
}

//获取单个input中的【name,value】数组  
function inputSelector(element) {
    if (element.checked)
        return [element.name, element.value];
}

function input(element) {
    switch (element.type.toLowerCase()) {
        case 'submit':
        case 'hidden':
        case 'password':
        case 'text':
        case 'select-one':
        case 'select':
            return [element.name, element.value];
        case 'checkbox':
        case 'radio':
            return inputSelector(element);
    }
    return false;
}

//组合URL  
function serializeElement(element) {
    var method = element.tagName.toLowerCase();
    var parameter = input(element);
    if (parameter) {
        var key = parameter[0];
        if (key.length == 0)
            return;
        if (parameter[1].constructor != Array)
            parameter[1] = [parameter[1]];

        var values = parameter[1];
        var results = [];
        for (var i = 0; i < values.length; i++) {
            results.push(key + '=' + values[i]);
        }
        return results.join('&');
    }
}

//组合多个URL  
function serializeElements(elements) {
    var queryComponents = new Array();
    for (var i = 0; i < elements.length; i++) {
        var queryComponent = serializeElement(elements[i]);
        if (queryComponent)
            queryComponents.push(queryComponent);
    }
    return queryComponents.join('&');
}


//调用方法     
function serializeForm(formId) {
    var form = document.getElementById(formId);

    if (form == null)
        return "";
    var elements = getElements(formId);
    var queryComponents = new Array();
    for (var i = 0; i < elements.length; i++) {
        var queryComponent = serializeElement(elements[i]);
        if (queryComponent)
            queryComponents.push(queryComponent);
    }
    return queryComponents.join('&');
}


//--------------------------------------------------公用插件区-----------------------------------
/**
 * 用js筛选页面里面的内容,比如table中,tr太多,要筛选tr中第一列名字叫李磊的人,并只把符合条件的tr显示出来
 * 可调用此方法
 * 例子:搜索tbody里面的内容,就会把第一个tr显示,第二个tr隐藏
 * common_filterHtml('小李子',￥（"#userList tr "）,"#userList tr td:nth-child(1)");
 *  <tbody id="userList">
 <tr align="center" >
 <td class="username">小李子</td>
 <td>${conuser.mobile!} </td>
 <td>${conuser.company!} </td>
 </tr>
 <tr align="center" >
 <td class="username">大李子</td>
 <td>${conuser.mobile!} </td>
 <td>${conuser.company!} </td>
 </tr>
 </tbody>
 * @param searchContent        要搜索的匹配的内容
 * @param parentTagSelector    要显示的整体组件(比如tr为单位,显示不显示)元素的筛选器
 * @param bodySelector        根据组件内摸个小单位进行筛选符合的元素的筛选器
 */
function common_filterHtml(searchContent, parentTagSelector, bodySelector) {
    if (searchContent == '') {
        $(parentTagSelector).each(function () {
            $(this).show();
        })
        return;
    }
    $(parentTagSelector).each(function () {
        $(this).hide();
    })
    $(bodySelector + ":contains('" + searchContent + "')").each(function () {
        $(this).closest(parentTagSelector).show();
    })
}

/**
 * 对某个含有show-img-src 属性的元素进行图片预览
 * <a  class="imgPreview2" show-img-src="priview.jpg"  onclick="select(\''+theme.ID+'\')">
 * common_imgPreview(".imgPreview2",-50,50,150,180);
 * @param selector        要对那个元素进行显示
 * @param mouseX        距离鼠标偏移多少X距离显示
 * @param mouseY        距离鼠标偏移多少Y距离显示
 * @param imgWidth        图片显示宽度
 * @param mouseY        图片显示高度
 */
function common_imgPreview(selector, mouseX, mouseY, imgWidth, imgHeight) {
    //保存鼠标位置坐标
    var x = mouseX;//距离鼠标偏移多少X距离显示
    var y = mouseY;//距离鼠标偏移多少Y距离显示
    var width = imgWidth;  //图片显示宽度
    var height = imgHeight;//图片显示高度
    //注册图片的鼠标移动事件  
    $(selector).mouseover(function (e) {
        //把图片的title属性值保存起来  
        this.myTitle = this.title ? this.title : '';
        this.title = ""
        //放大后图片上的提示信息  
        var imgTitle = this.myTitle ? "<br/>" + this.myTitle : "";
        //创建一个现实大图片的DIV  
        var tooltip = "<div id='imgPreviewtooltip' style='position: absolute;'  ><img src='" + $(this).attr("show-img-src")
            + "'  style='width: " + width + "px;height: " + height + "px;'  />" + imgTitle + "</div>";
        //将创建的DIV添加到窗体中去  
        $('body').append(tooltip);
        //设置显示出来的图片的位置  
        $('#imgPreviewtooltip').css({"top": (e.pageY + y) + "px", "left": (e.pageX + x) + "px"}).show();
        //鼠标移出事件  
    }).mouseout(function () {
        //设回title值  
        this.title = this.myTitle;
        $('#imgPreviewtooltip').remove();
    }).mousemove(function (e) {
        $('#imgPreviewtooltip').css({"top": (e.pageY + y) + "px", "left": (e.pageX + x) + "px"});
    });
}

//input type=file选择图片文件的时候,预览图片文件
function common_fileToImg(inputObj, imgId) {
    //1.获取input里面的file文件
    var file = inputObj.files[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL = windowURL.createObjectURL(file);
    $("#" + imgId).attr("src", dataURL);
}

//根据身份证号码识别用户出生日期   年龄   性别  
//num   1  出生日期   2  性别   3 年龄
function common_idCard_info(UserCard, num) {
    if (num == 1) {
        //获取出生日期
        birth = UserCard.substring(6, 10) + "-" + UserCard.substring(10, 12) + "-" + UserCard.substring(12, 14);
        return birth;
    }

    if (num == 2) {
        //获取性别
        if (parseInt(UserCard.substr(16, 1)) % 2 == 1) {
            //男
            return "0";
        } else {
            //女
            return "1";
        }
    }

    if (num == 3) {
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UserCard.substring(6, 10) - 1;
        if (UserCard.substring(10, 12) < month || UserCard.substring(10, 12) == month && UserCard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
}

/**
 * 对checkbox或者radio进行全选和反选操作
 * @param selector        要对那个元素进行筛选
 */
function common_checkbox_selectAll(selector) {
    $(selector).each(function () {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked");
        } else {
            $(this).attr("checked", 'true');
        }
    })
}


/**
 *  根据填写内容自动补全方法,需要引入，
 *  <script src="/script/autocomplete/jquery.autocomplete.js" type="text/javascript"></script>
 <link rel="stylesheet" href="/script/autocomplete/jquery.autocomplete.css" type="text/css" />
 *  @param    inputId 自动补全的输入框ID
 *  @param    url    根据输入框查找的url,此url必须返回有result的字段，用于显示,
 *  @param    width    自动补全的div宽度
 *  @param    callBackFunc    确定选择的回调方法
 *  @param    formatFunc    将url返回内容生成div的方法，默认返回return '<div>'+row.RESULT+'</div> ';
 */
function common_autocomplete(inputId, url, width, callBackFunc, formatFunc) {
    $('#' + inputId).bind("input.autocomplete", function () {
        $(this).trigger('keydown.autocomplete');
    });

    ///ajax/GetorgByNameV2 seekname
    $("#" + inputId).autocomplete(url,//数据处理的页面地址或url地址
        {
            width: width,
            max: 20,
            scrollHeight: 300,
            matchCase: false,
            dataType: "json",
            extraParams: {
                keywords: function () {
                    return $.trim($("#" + inputId).val())
                }
            },
            parse: function (data) {
                var rows = [];
                var d = data;
                for (var i = 0; i < d.length; i++) {
                    rows[rows.length] = {
                        data: d[i]
                    };
                }
                return rows;
            },
            formatItem: function (row, i, max) {
                //如果有装饰div方法，没有默认放回'<div>'+row.RESULT+'</div> ';
                if (formatFunc) {
                    return formatFunc(row, i, max)
                } else {
                    return '<div>' + row.RESULT + '</div> ';
                }
            }
        })
        .result(function (event, data, formatted) {
            //如果有回调函数
            if (callBackFunc) {
                callBackFunc(data)
            }
        })
}

//获取字典标签
function getDictLabel(data, value, defaultValue) {
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        if (row.value == value) {
            return row.label;
        }
    }
    return defaultValue;
}


/**
 * input/textarea  输入最大字数，显示剩余多少字数 每次输入一个文字，可输入一次递减。
 *
 * 此方法绑定在input,textarea的onfocus事件上，参数分别人：this, maxlength,显示剩余字数的span的id.
 * @param target     文本框对象
 * @param maxlength   最大输入 字数
 * @param counterId
 * @param counterId
 */
function fed_inputMaxLength(target, maxlength, counterId, MaxFunc) {
    if ($(target).attr('fed_max_length') == null) {
        $(target).attr('fed_max_length', maxlength);
        var counter = $('#' + counterId);
        if ($.browser.msie) { //IE浏览器  
            $(target).unbind("propertychange").bind("propertychange", function (e) {
                e.preventDefault();
                textareaMaxProc1(target, maxlength);
                counter.html(maxlength - $(target).val().length);
            });
            target.attachEvent("onpropertychange", function (e) {
                //e.preventDefault();  
                textareaMaxProc1(target, maxlength);
                counter.html(maxlength - $(target).val().length);
            });

        } else { //ff浏览器
            target.addEventListener("input", function (e) {
                e.preventDefault();
                textareaMaxProc1(target, maxlength);
                counter.html(maxlength - $(target).val().length);
            }, false);
        }
        $('target').unbind("keypress").bind("keypress", function (event) {
            var code;
            if (typeof event.charCode == "number") { //charCode只在keypress事件后才包含值，此时keyCode可能有值也可能没有，Ie没有charCode属性。
                code = event.charCode;
            } else {
                code = event.keyCode;
            }
            if (code > 9 && !event.ctrlKey && $(target).val().length >= maxlength) {
                event.preventDefault();
            } else if (event.ctrlKey && $(target).val().length >= maxlength && code == 118) {
                event.preventDefault();
            }
        });
    }
}


function textareaMaxProc1(textArea, total) {
    var max;
    max = total;

    if ($(textArea).val().length > max) {
        $(textArea).val($(textArea).val().substring(0, max));
    }
}

//判断是否引入某个JS、css
function isIncludeJSCSS(name) {
    var js = /js$/i.test(name);
    var es = document.getElementsByTagName(js ? 'script' : 'link');
    for (var i = 0; i < es.length; i++)
        if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
    return false;
}

//引入没有引入的JS、css
function importJSCSS(name) {
    if (!isIncludeJSCSS(name)) {
        var baseName = name.split("?")[0];
        if (baseName.endWith("css") || baseName.endWith("CSS")) {
            document.write('<link href="' + name + '" rel="stylesheet" type="text/css" />');
        } else {
            document.write("<script language=javascript src='" + name + "'>\<\/script>");
        }
    }
}

//从平面地图的提示框打开实验室
function toCenterLab(centerId, fromFull) {
    let $centerList = '';
    if (fromFull === 'fromFull') {
        $centerList = $('.lab .lab_content_l .switchBox>ul>li.noChildren,.lab .lab_content_l .switchBox>ul>li>ul>li');
    } else {
        $centerList = $('.lab .lab_content_l .switchBox>ul>li.noChildren,.lab .lab_content_l .switchBox>ul>li>ul>li', $('#r iframe')[0].contentWindow.document);
    }
    // console.log('$centerList',$centerList);
    $centerList.each(function (index, elem) {
        if ($(elem).data("centerid") == centerId) {
            var $headerBtn = $(elem).parents(".switchBox").prev().find("ul>li");
            if ($(elem).parents(".inland").length > 0) {
                $headerBtn.eq(0).click();
            } else {
                $headerBtn.eq(1).click();
            }
            $(elem).click();

            return false;
        }
    });
}

