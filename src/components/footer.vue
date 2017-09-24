<template>
	<div class="bottom-nav">
		<div>
			您目前所处位置：经度：<span class="nowLon"></span>；纬度：<span class="nowLat"></span>；<span class="scale"></span>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'footer',
		data(){
			return{
			}
		}
	}
</script>

<style scoped> 
	.bottom-nav{
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 25px;
		color: #fff;
	}
	.bottom-nav>div{
		width:500px;
		height:25px;
		margin:0 auto;
		border-left:20px solid transparent;
		border-right:20px solid transparent;
		border-bottom:25px solid rgba(0,0,0,.6);
		text-align: center;
		line-height:25px;
		font-size: 12px;
	}
</style>