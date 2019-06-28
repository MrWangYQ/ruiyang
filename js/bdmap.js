var lng = document.getElementById('longitude');
var lat = document.getElementById('latitude');
// 百度地图API功能
var map = new BMap.Map("allmap"); // 创建Map实例
// getGeolocation();
// map.centerAndZoom(new BMap.Point(114.05072719904786, 34.42598049294945), 15);
map.centerAndZoom('开封市尉氏县大马乡', 15);
//添加地图类型控件
// map.addControl(new BMap.MapTypeControl({
//     mapTypes:[
//         BMAP_NORMAL_MAP,
//         BMAP_HYBRID_MAP
//     ]
// }));
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        // var mk = new BMap.Marker(new BMap.Point(r.point))
        map.addOverlay(mk);
        map.panTo(r.point);
        getGeolocation(r.point.lng, r.point.lat);
        // alert('您的位置：'+r.point.lng+','+r.point.lat);
    } else {
        // alert('failed' + this.getStatus());
    }
});
map.setCurrentCity("郑州"); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

//  定位城市
// function myFun(result){
//     var cityName = result.name;
//     map.setCenter(cityName);
//     console.log(result);
//     alert("当前定位城市:"+cityName);
// }
// var myCity = new BMap.LocalCity();
// myCity.get(myFun); 
function getGeolocation(lng = 113.42, lat = 34.44) {
    map.centerAndZoom(new BMap.Point(lng, lat), 15); // 初始化地图,设置中心点坐标和地图级别
}

function G(id) {
    console.log(document.getElementById(id), 'document.getElementById(id)')
    return document.getElementById(id);
}

//  自定义搜索
var ac = new BMap.Autocomplete( //建立一个自动完成的对象
    {
        "input": "suggestId",
        "location": map
    });

ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件

    var str = "";
    var _value = e.fromitem.value;
    var value = "";
    if (e.fromitem.index > -1) {
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
    }
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

    value = "";
    if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
    }
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    // G("searchResultPanel").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
    lng.value = '';
    lat.value = '';
    var _value = e.item.value;
    myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
    G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

    setPlace();
});


function setPlace() { // 创建地址解析器实例
    var myGeo = new BMap.Geocoder(); // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(myValue, function(point) {
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        }
    }, "北京");
}

map.addEventListener('click', function(e) {
    lng.value = e.point.lng;
    lat.value = e.point.lat;
})

// $(function() {
//     navigator.geolocation.getCurrentPosition(translatePoint); //定位 
// });

// function translatePoint(position) {
//     var currentLat = position.coords.latitude; //经度
//     var currentLon = position.coords.longitude; //纬度
//     var gpsPoint = new BMap.Point(currentLon, currentLat);
//     BMap.Convertor.translate(gpsPoint, 0, initMap); //转换坐标 
// }

// function initMap(point) {
//     //初始化地图 
//     map = new BMap.Map("allmap"); //实例化容器
//     map.addControl(new BMap.NavigationControl()); //平移缩放控件
//     map.addControl(new BMap.ScaleControl()); //比例尺控件
//     map.addControl(new BMap.OverviewMapControl()); //缩略地图控件
//     map.centerAndZoom(point, 15); //地图初始化，参数地图坐标和级别
//     map.addOverlay(new BMap.Marker(point)); //当前位置加标记
//     var myZoomCtrl = new ZoomControl();
//     map.addControl(myZoomCtrl);

//     function ZoomControl() {
//         this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT; //调整控件的位置
//         this.defaultOffset = new BMap.Size(10, 10); //通过像素调整位置
//     }
//     //自定义控件，点击两下实现放大
//     ZoomControl.prototype = new BMap.Control();
//     ZoomControl.prototype.initialize = function(map) {
//         var div = document.createElement("div");
//         div.appendChild(document.createTextNode("放大2级"));
//         div.style.cursor = "pointer";
//         div.style.border = "1px solid gray";
//         div.style.backgroundColor = "white";
//         div.onclick = function(e) {
//             map.zoomTo(map.getZoom() + 2);
//         }
//         map.getContainer().appendChild(div);
//         return div;
//     }
// }