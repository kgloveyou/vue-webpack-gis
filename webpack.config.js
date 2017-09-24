var path = require('path');
var webpack = require('webpack');
var webPackDevServer = require('webpack-dev-server');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
//	entry: './src/main.js',	
	entry: {	
		bundle: './src/main.js',
		vendor: 'vue'	//提取第三方库
	},
	
	output: {
		filename: 'js/bundle.js',	//[hash:6]
		path: __dirname + '/build',
		publicPath: '/build/',				//dev模式
//		publicPath: '/cq_guotu2/build/',	//build模式
	},
	
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{loader: 'vue-loader'},
				]

			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				use: {
					loader: 'url-loader',
					query: {
						limit: 10000,	//小于limit base-64 大于limit 原图
						name: 'img/[name]-[hash:6].[ext]'
					},
				}
			},
			{
			 	test: /\.css$/,
			  	use: ExtractTextPlugin.extract({
		          	fallback: "style-loader",
		          	use:[
                        {
                            loader: 'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
                        }
                    ]
		        })
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use:[ 
						{
							loader: 'css-loader',
                            options:{
                                minimize: true //css压缩
                            }
						},
						{
							loader: 'sass-loader',
						}
					],
				})
			},
			{
		      	test: /\.js$/,
		      	exclude: /(node_modules|bower_components)/,
		      	use: {
		        	loader: 'babel-loader',
		        	options: {
		          		presets: ['env']
		        	}
		      	}
		    },
			
		]
	},
	
	devServer:{		//热加载
		historyApiFallback:true,
		hot:false,
		inline:true,
	},
	
	plugins: [
		new htmlWebpackPlugin({
			filename: '../index.html',
			template: './index.html'
		}),
		new webpack.LoaderOptionsPlugin({  //vue文件处理
		   test:/\.vue$/,  
		   options: {  
		       vue: {  
		            loaders: {  
		            css: ExtractTextPlugin.extract({  
		               	fallback:'vue-style-loader',   
		               	 use:[
	                        {
	                            loader: 'css-loader',
	                            options:{
	                                minimize: true //css压缩
	                            }
	                        }
	                    ] 
		            }),  
		           }  
		       }  
		   }
		}),
		new ExtractTextPlugin('css/bundle.css'),	//[hash:6]
		new webpack.optimize.UglifyJsPlugin({	//js代码压缩	
	      	compress: {
	        	warnings: false
	      	},
	      	sourceMap: true
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
	    	name: 'vendor',
	    	filename: 'js/vendor.js',
	    })
	],
	
	resolve: {		//打开vue支持 单文件template 选项
		alias: { 'vue': 'vue/dist/vue.min.js' } 
	}
}
