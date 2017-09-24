<template>
	<div id="map">
		<top :msg="msg" :province="province" ></top>
		
		<!--登录-->
		<div id="login" class="login" v-if="seen">
			<div class="login-cont">
				<div class="login-cont-header">
					<h2>用户登录</h2>
				</div>
				<div class="login-cont-body">
					<form action="" method="post">
						<div class="form-div">
							<input type="text" id="login-username" class="form-input" placeholder="请输入用户名!" value="cq_guotu" />
						</div>
						<div class="form-div">
							<input type="password" id="login-password" class="form-input" placeholder="请输入密码!" value="ycmcwin2000qwe"/>
						</div>
						<div class="form-div">
							<button type="button" id="login-button" class="form-button" v-on:click="login">登录</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
		<bottom></bottom> 
	</div>
</template>

<script>
	import top from './components/header.vue';
	import bottom from './components/footer.vue';
	import {alertTip} from './js/index.js';
	export default{
		name: 'app',
		components: {top,bottom}, 
		data(){
			return{
				seen: true,
				msg: '',
				province: '',
				
			}
		},
		methods: {
			login: function(){
				var username = document.getElementById('login-username').value.trim();
				var password = document.getElementById('login-password').value.trim();
				
				if(username==''||password==''){
					alertTip('请输入帐号或密码');
				}else{
//					this.axios.get(dataIPaddress+'login/login/'+username+'/'+password).then((result)=>{
//						var data = result.data.data;
//						console.log(data);
//						this.msg = data.nickname;
//						this.province = data.name;
//					})
					$.ajax({
						url:dataIPaddress+'login/login/'+username+'/'+password,
						type:"get",
					}).done((result)=>{
						var data = result.data;
						console.log(data);
						
						this.msg = data.nickname;	//头部显示当前登录
						this.province = data.name;
						
						var lon = data.lon;	//获取经度
                        var lat = data.lat;	//获取纬度
                        var areacode = data.areacode;	//获取用户areacode
			    		var level = data.level;	//获取用户level值
			    		var zoom = data.level==3?10.5:7.8 	 //定义行政区划图的缩放大小
						var featureLayeraUrl = earthIPaddress + data.area_url;    //获取行政区划图层地址
						var bufferLayeraUrl = earthIPaddress + data.buffer_url;    //行政区级缓冲线
						goToLayer(lon,lat,areacode,level,zoom,featureLayeraUrl,bufferLayeraUrl);	//跳转行政图
					})
					
					this.seen = false;
				}
				
				

				
			}
		}
		
	}
	
</script>

<style scoped>
	#map{
		width: 100%;
		height: 100%;
	}
	.login{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0,.5);
		color: #fff;
	}
	.login>.login-cont{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		z-index: 1;
		width: 400px;
		height: 300px;
		background-color: rgba(0, 0, 0,.2);
		box-shadow: 0 10px 20px rgba(0,0,0,.5);
		border-radius: 6px;
	}
	.login>.login-cont:after{
		content: '';
		position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    z-index: -1;
	    filter: blur(20px);
	    background-image: url(assets/login-bg.png);
	    background-position: center top;
	    background-size: cover;
	    background-attachment: fixed;
	}
	.login-cont>.login-cont-header{
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		background-color: rgba(0,0,0,.2);
		border-top-left-radius: 6px;
		border-top-right-radius:6px ;
	}
	.login-cont>.login-cont-header>h2{
		font-size: 20px;
		
	}
	.login-cont>.login-cont-body{
		width: 300px;
		margin: 40px auto 0 auto;
	}
	.form-div{
		margin-bottom: 20px;
	}
	.form-input{
		width: 300px;
		height: 40px;
		padding: 0 15px;
		border-radius: 4px;
		border: none;
		background-color: rgba(0, 0, 0, .2);
		transition: background-color 1s;
		font-size: 16px;
	}
	.form-input:focus{
		background-color: rgba(0, 0, 0, .4);
	}
	.form-button{
		width: 300px;
		height: 45px;
		border: 1px solid #2896FC;
		border-radius: 4px;
		background-color: #2896FC;
		transition-duration: .5s;
	}
	.form-button:hover{
		border: 1px solid #0983f5;
		background-color: #0983f5;
		box-shadow: 0 10px 15px rgba(0,0,0,.2);
		transition-duration: .5s;
	}
</style>