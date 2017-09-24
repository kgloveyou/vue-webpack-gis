require('./css/style.scss');	//主页css
require('./js/index.js');	//主页js
import Vue from 'vue';	//vue
import axios from 'axios';	//ajax
import App from './App.vue';


Vue.config.productionTip = false;	//关闭vue提示
Vue.prototype.axios = axios;	//将axios挂载到Vue原型

new Vue({
	el: '#map',
	template: '<App/>',
	components: { App }
})


