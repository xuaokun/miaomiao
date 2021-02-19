module.exports = {
	publicPath: '/miaomiao',
	devServer: {
		proxy: { /* 一个坑，不要写两个proxy对象，要把多个代理放在一个proxy对象中 */
			'/api2': {
				target: 'http://118.190.36.126:3000/api2/',
				changeOrigin: true,
				pathRewrite: {
					"^/api2": ''
				}
			},
			'/api': {
				target: 'http://api.douban.com/v2/movie/',
				changeOrigin: true,
				pathRewrite: {
					"^/api": ''
				}
			}
		}
	}
}
