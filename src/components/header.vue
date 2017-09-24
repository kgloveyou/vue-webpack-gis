<template>
	<div class="top-nav">
		<img src="../assets/logo.gif" alt="logo" title="logo" />
		<h1>{{ title }}</h1>
		<i class="fa fa-expand" data-toggle="tooltip" data-placement="bottom" title="全屏" v-on:click="fullScreen"></i>
		<div class="top-info-left" v-if="seen">
			<button class="btn-true btn-loginOut" data-toggle="modal" data-target="#loginOutModal">退出</button>
			<span>欢迎登录！<i>{{ msg }}</i></span>
		</div>
		<div class="top-info-right" v-if="seen">
			<button id="top-skip" class="btn-true btn-skip" data-index="1">跳转</button>
			<span class="area-choose">
				<i class="fa fa-map-marker"></i> 选择地区
			</span>
			<span class="area-name">
				<i class="area-name-province">{{ province }}</i> 
				<i class="area-name-city"></i>
			</span>
		</div>
		
		<!--退出登录Modal-->
		<div class="modal fade" id="loginOutModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					 <div class="modal-header">
		                <h4 class="modal-title" id="myModalLabel">退出登录</h4>
		            </div>
					<div class="modal-body">
						是否确认退出登录！
					</div>
					<div class="modal-footer">
						<button type="button" class="btn-false" data-dismiss="modal">取消</button>
						<button type="button" id="loginOut" class="btn-true" @click="loginOut">确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	$(function(){
		$("[data-toggle='tooltip']").tooltip(); 
	})
	export default {
		name: 'header',
		props: ['msg','province'],
		data(){
			return{
				title: 'WebGIS大数据可视化平台',
				pfx: ["webkit", "moz", "ms", "o", ""],
				seen: true,
			}
		},
		methods: {
			fullScreen: function(e){	//全屏
				var pfx = this.pfx;
				function RunPrefixMethod(obj, method) {
					var p = 0,
						m, t;
					while(p < pfx.length && !obj[m]) {
						m = method;
						if(pfx[p] == "") {
							m = m.substr(0, 1).toLowerCase() + m.substr(1);
						}
						m = pfx[p] + m;
						t = typeof obj[m];
						if(t != "undefined") {
							pfx = [pfx[p]];
							return(t == "function" ? obj[m]() : obj[m]);
						}
						p++;
					}
				}
				function doit() {
					if(RunPrefixMethod(document, "FullScreen") ||
						RunPrefixMethod(document, "IsFullScreen")) {
						$('.top-nav>i').addClass('fa-compress').removeClass('fa-expand');
						$('.top-nav>i').attr('data-original-title', '取消全屏');
				
					} else {
						$('.top-nav>i').addClass('fa-expand').removeClass('fa-compress');
						$('.top-nav>i').attr('data-original-title', '全屏');
					}
				}
				//绑定事件处理函数
				document.addEventListener("fullscreenchange", function() {
					doit();
				}, false);
				document.addEventListener("mozfullscreenchange", function() {
					doit();
				}, false);
				document.addEventListener("webkitfullscreenchange", function() {
					doit();
				}, false);
				
				var elem = document.getElementsByTagName("html")[0];
				if(RunPrefixMethod(document, "FullScreen") ||
					RunPrefixMethod(document, "IsFullScreen")) {
					RunPrefixMethod(document, "CancelFullScreen");
				} else {
					RunPrefixMethod(elem, "RequestFullScreen");
				}
			},
			loginOut: function(){	//退出登录
				$.ajax({
					url: dataIPaddress+ 'login/logout',
					type:'get',
					xhrFields: {
				        withCredentials: true
				    },
				    crossDomain: true,
					success: function(result) {
						console.log(result);
						if(result.meta.success){   //true
//							ssStorage.clear();	//清除session
							console.log('退出登录成功');
							//重新加载页面
							window.location.reload();
						}
					}
			    })
			}
		}
		
	}
</script>

<style scoped> 
	.top-nav{
		position: absolute;
		top: 0;
		width: 100%;
		height: 40px;
		background: #232323;
		color: #fff;
	}
	.top-nav>img{
		position: absolute;
	    height: 30px;
	    margin: 5px 0 5px 25px;
	}
	.top-nav>h1{
		font-size: 24px;
		line-height: 40px;
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
	}
	.top-nav>i{
		position: absolute;
		top: 0;
		right: 25px;
		margin: 12px 0;
		cursor: pointer;
	}
	.top-nav>.top-info-left{
		position: absolute;
		top: 0;
		left: 70px;
		height: 100%;
	}
	.top-info-left>.btn-loginOut{
		margin-top: 4px;
	}
	.top-info-left>span{
		font-size: 14px;
	}
	.top-info-left>span>i{
		color: #2896FC;
	}
	.top-nav>.top-info-right{
		position: absolute;
		top: 0;
		right: 55px;
		float: right;
		height: 100%;
	}
	.top-info-right>.btn-skip{
		float: right;
		margin-top: 4px;
	}
	.top-info-right>.area-choose{
		float: right;
		display: inline-block;
		margin-top: 11px;
		margin-right: 5px;
		font-size: 14px;
		cursor: pointer;
	}
	.top-info-right>.area-name{
		float: right;
		display: inline-block;
		margin-top: 11px;
		margin-right: 10px;
		font-size: 14px;
		color: #2896FC;
	}
</style>