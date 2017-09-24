var goToLayer;
require([
	'esri/Basemap',
  	'esri/Map',
  	'esri/config',
  	'esri/views/SceneView',
  	'esri/layers/TileLayer',
  	"esri/layers/MapImageLayer",
  	"esri/layers/FeatureLayer",
  	'esri/geometry/Point',
  	'esri/geometry/ScreenPoint',
], function(Basemap,Map,esriConfig,SceneView,TileLayer,MapImageLayer,FeatureLayer,Point,ScreenPoint) {
	var map;		//地图
	var view;		//视图
	var globeUrl = earthIPaddress + 'arcgis/rest/services/diqiu/MapServer';		//地球
	
	//arcgis地图资源跨域问题
	esriConfig.request.corsEnabledServers.push('localhost:8080');
	esriConfig.request.corsEnabledServers.push('http://183.230.182.149:18080');
	
	//TileLayer创建一个实例,你必须引用的URL缓存地图服务
	var layer = new TileLayer({
	    url: globeUrl
	});
	
	//定义行政区域图的坐标点
	var point = new Point({
		latitude: 29.94,
	    longitude:107.73
	});
	
	//自定义基本图层，加载缓存地图服务
  	var basemap = new Basemap({
    	baseLayers: [layer],
    	title: 'Custom Basemap',
    	id: 'myBasemap'
  	});
  	
	//自定义基本图层的地图
  	map = new Map({
    	basemap: basemap
  	});
  	
	//创建一个3D视图view
  	view = new SceneView({
   		center: [107.73, 29.94],
    	container: 'map',
    	map: map,
		zoom: 2
  	});
	
	//当前坐标
  	view.then(function() {
		$('#map').mousemove(function(e) {
			var spoint = new ScreenPoint();
			spoint.x = e.screenX;
			spoint.y = e.screenY;
			try {
				$('.nowLon').html(view.toMap(spoint).longitude.toFixed(6) + '°');
				$('.nowLat').html(view.toMap(spoint).latitude.toFixed(6) + '°');
			} catch(err) {
				console.log('无法获取地球外的经纬度！');
			}
		})
	});
  	
  	//比例尺
   	view.watch('scale', function(val) {
		if(val >= 1000) {
			var index = val.toString().indexOf('.');
			var oldNum = val.toString().substring(0, index - 3);
			var lastNum = val.toString().substring(index - 3, index);
			if(parseInt(lastNum) < 400) {
				$('.scale').html('比例尺：1:' + oldNum + '000');
				$('.scale').attr('data-scale', oldNum + '000');
			}
			if(parseInt(lastNum) <= 500 && parseInt(lastNum) >= 400) {
				$('.scale').html('比例尺：1:' + oldNum + '500');
				$('.scale').attr('data-scale', oldNum + '500');
			} else {
				$('.scale').html('比例尺：1:' + (parseInt(oldNum) + 1) + '' + '000');
				$('.scale').attr('data-scale', (parseInt(oldNum) + 1) + '000');
			}
		} else {
			$('.scale').html('比例尺：1:' + Math.round(val));
			$('.scale').attr('data-scale', Math.round(val));
		}
	});
	
	//登录跳转到行政图
	goToLayer = function(lon,lat,areacode,level,zoom,featureLayeraUrl,bufferLayeraUrl){
		var point = new Point({
			latitude: lat,
	    	longitude:lon
		});
		
		var featureLayerService = new MapImageLayer({
			url:featureLayeraUrl,
			visible:true
		});
		
		var bufferLayerService = new FeatureLayer({
			url: bufferLayeraUrl,
			visible: true
	    });
		map.add(featureLayerService);
		map.add(bufferLayerService);
		
		view.goTo({
			target: point,
			zoom: zoom
		});
	}
	
	$('#top-skip').click(function(){
		alert('跳转下一层');
	})
	
})


