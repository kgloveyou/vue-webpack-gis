var path = require('path');
var webpack = require('webpack');
var webPackDevServer = require('webpack-dev-server');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/main.js',
	
	output: {
		filename: 'js/bundle.js',
		path: __dirname + '/build',
		publicPath: '/build/',
//		publicPath: '/cq_guotu2/build/',
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
						name: 'img/[name]-[hash:5].[ext]'
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
//                          options:{
//                              minimize: true //css压缩
//                          }
                        }
                    ]
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
//			{
//				test: /\.css$/,
//				loader: 'style-loader!css-loader'
//			},
//			{
//              test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
//              loader: "file-loader"
//          },
//			{
//				test: /\.less$/,
//				loader: 'style-loader!css-loader!less-loader'
//			},
//			{
//				test: /\.html$/,
//				loader: 'html-loader'
//			},
//			{
//				test: /\.(png|jpg|gif|svg)$/i,
//				loaders:[
//					'url-loader?limit=100000&name=src/img/[name]-[hash:5].[ext]',
//					'image-webpack-loader'
//				]
//				loader: 'url-loader',
//				query: {
//					limit: 500000,	//小于原图 大于base-64
//					name: 'src/img/[name]-[hash:5].[ext]'
//				}
//			},
//			{
//				test: /\.(png|jpg|gif|svg)$/i,
//				loader: 'file-loader',
//				query: {
//					name: 'src/assets/[name]-[hash:5].[ext]'
//				}
//			},
//			{
//				test: /\.scss$/,
//				loader: 'style-loader!css-loader!sass-loader'
//			},
//			{
//				test: /\.tpl$/,
//				loader: 'ejs-loader'
//			}
			
		]
	},
	
	devServer:{
		historyApiFallback:true,
		hot:false,
		inline:true,
	},
	
	plugins: [
		new htmlWebpackPlugin({
			filename: '../index.html',
			template: './index.html'
		}),
		new webpack.LoaderOptionsPlugin({  
		   test:/\.vue$/,  
		   options: {  
		       vue: {  
		            loaders: {  
		            css: ExtractTextPlugin.extract({  
		               	fallback:'vue-style-loader',   
		               	 use:[
	                        {
	                            loader: 'css-loader',
//	                            options:{
//	                                minimize: true //css压缩
//	                            }
	                        }
	                    ] 
		            }),  
		           }  
		       }  
		   }
		}),
		new ExtractTextPlugin('css/bundle.css'),
		new webpack.optimize.UglifyJsPlugin({	
	      	compress: {
	        	warnings: false
	      	},
	      	sourceMap: true
	    }),
	],
	
	resolve: {
		alias: { 'vue': 'vue/dist/vue.min.js' } 
	}
}
