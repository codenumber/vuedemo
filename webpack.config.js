let HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'built.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
				test: /\.(jpg|png|gif|ttf|woff|svg)$/,
				loader: 'url-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '首页',
			filename: 'index.html',
			template: 'index.html'
		}),
		new VueLoaderPlugin()
	],

}