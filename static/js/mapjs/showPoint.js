define([
	"esri/Graphic",
	"esri/layers/GraphicsLayer",
	"esri/geometry/Point",
	"esri/PopupTemplate",
	"esri/symbols/PictureMarkerSymbol"
], function(Graphic,GraphicsLayer,Point,PopupTemplate,PictureMarkerSymbol) {
	return {
		name: 'showPoint',
		quncequnfang: function(url) {
			console.log(url);
			$.ajax({
				url: url,
				type: "get",
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function(result) {
					var data = result.data;
					graphicsLayer_a1 = new GraphicsLayer();
					map.add(graphicsLayer_a1);
					for(i in data) {
						var point = new Point({
							longitude: data[i].disLon,
							latitude: data[i].disLat
						});

						var picSymbol = new PictureMarkerSymbol({
							angle: 3,
							height: 20,
							width: 20,
							url: imgIPaddress + '/downloadImgOrVideo.do?type=12&path=icon1/icon' + data[i].disType + '.png'
						});
						pointGraphic_a1 = new Graphic({
							geometry: point,
							popupTemplate: new PopupTemplate({
								title: "地质灾害点",
								content: '<iframe id="detailIframe" src="mapjs/tpl/disastent.html?disNo='+
									data[i].disNo + '&id=' + data[i].id + '" frameborder="0" scrolling="no" style="width:500px;height:300px;'+
									'background-color:transparent; padding:0px; overflow :auto"></iframe>'
							}),
							symbol: picSymbol,
						});
						graphicsLayer_a1.add(pointGraphic_a1);
					}
				}
			})
			$('#esri_widgets_Popup_0 .esri-popup-main').css('width', 'auto');
			$('#esri_widgets_Popup_0 .esri-popup-content').css('max-height', 'none');
		},
		
		removeQuncequnfang: function(){
			 graphicsLayer_a1.removeAll();
		}
		
	}
})

function aaa(){
	alert('aaa');
}
