const path = require('path');

const config = {
	entry: {
		server: './src/index.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	target: 'node',
	module: {
		rules: [
			{
				// Dịch từ ES6 sang ES5
				test: /\.js$/,
				// Không dịch node_modules
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};

module.exports = config;
