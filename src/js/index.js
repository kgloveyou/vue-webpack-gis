//页面有请求时加载loading
//window.onload = loadDocument;
document.onreadystatechange = loadDocument;
var $earthLoad = $('#loading>.earthCenter>.earthLoad');
var countZong = null;
var queryResultTimeout = null;

function loadDocument() {
	if(document.readyState == 'complete') {
		$('#viewDiv').fadeIn(2000);
		$('#loading').fadeOut(2000, function() {
			countZong = false;
		});
	} else {
		countZong = true;
		loadEarth();
	}
}

$(document).ajaxStart(function() {
	countZong = true;
	loadEarth();
	$("#loading").fadeIn(500);
});

$(document).ajaxStop(function() {
	$('#loading').fadeOut(500, function() {
		countZong = false;
	});
});

function loadEarth() {
	var queryX = -parseInt($earthLoad.css('background-position-y'));
	var queryY = -parseInt($earthLoad.css('background-position-x'));
	if(queryX == 0 && queryY < 1608) {
		queryY += 134;
	} else if(queryX == 133 && queryY < 1608) {
		queryY += 134;
	} else if(queryX == 266 && queryY < 1608) {
		queryY += 134;
	} else if(queryX == 399 && queryY < 1340) {
		queryY += 134;
	} else if(queryX == 399) {
		queryX = 0;
		queryY = 0;
	} else if(queryY == 1608 && queryX < 399) {
		queryY = 0;
		queryX += 133;
	}

	$earthLoad.css('background-position', '-' + queryY + 'px -' + queryX + 'px');

	if(countZong) {
		queryResultTimeout = setTimeout(function() {
			loadEarth();
		}, 30);
	} else {
		clearTimeout(queryResultTimeout);
	}
}


//组件方法
//提示
export function alertTip(tip,color){
	var fails = '<div class="conFloChild">' +
	               '<div class="fails" style="background-color:'+color+'">'+tip+'</div>' +
	               '<script>setTimeout(function () {' +
	               '$(".conFloChild").fadeOut(3000, function (){$(this).remove();})' +
	               '}, 500);' +
	               '</script>' +
	            '</div>';
	$('body').append(fails);
	return;
}
