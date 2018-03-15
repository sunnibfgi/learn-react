const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/tabs/tabs.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/app.js',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['.js', 'jsx', '.json'],
		modules: [
			path.resolve(__dirname, 'node_modules')
		]
	},
	devServer: {
		contentBase: './',
		inline:true,
      	hot:true
	},

	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader?cacheDirectory=true',
				options: {
					presets: ['es2015', 'react', 'stage-0', 'stage-1']
				}
			}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		})
	]
}