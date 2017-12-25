由于接触了那么久的 React，觉得也得总结一下自己对它的掌握情况，所以就打算用 React 写一个个人的博客。

# React-blog

个人搭建的博客

## 准备条件

博客所用到的东西：
- nginx
- React
- Node
- webpack
- jquery
- layer
- bootstrap
- INSPINIA
- Echart

## 前端设计思路

我在工作的时候就开始接触前后端分离的项目，大多数做的项目也是前后端分离的项目，对它也比较熟悉，所以我就打算把这个项目做成一个前后端分离的项目。

刚开始写的时候一脸茫然，只知道我自己想用 React 写一个 博客，但是里面内容、布局、所要用到的插件都不知道用什么，寻思了半天，就打算用自己熟悉的、经常用到的。
插件来构建我这个博客，就有了上面的那些插件。

## 起步

1. webpack 的配置

其实我对 webpack 的了解不深，用它的时候，几乎都是百度得来的，这个博客搭建也一样。它的 webpack.config.js 的配置文件就是根据网上说的 给优化来的。这个博客是第一版的，代码没有进行分片，等我把整个博客给搭建完成后再去进行代码的分片。
配置文件 webpack.conf.js

```js
// 注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。

const webpack = require('webpack');    // 加载webpack
// const path = require('path');    // 引用node的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin');    // 依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
 
 /**
 *  __dirname      node全局变量  存储的是文件所在的文件目录
 *  __filename     node全局变量  存储的是文件名
 *  path.resolve   将一个字符串解析到一个绝对路径里。
*/

module.exports = {
	entry:  __dirname + "/app/main.js",    // 已多次提及的唯一入口文件
    // entry: {
    //     app: path.resolve(APP_PATH, 'index.js')  //规定webpack在 APP_PATH 的idnex.js 文件开始打包
    // },

	output: {
		path: __dirname + "/dev/bundle",    // 打包后的文件存放的地方
        // filename: "bundle-[hash].js"    // 打包后输出文件的文件名
		filename: "bundle.js",    // 打包后输出文件的文件名
        chunkFilename: "bundle.js"
	},
	devtool: 'eval-source-map',    // 用来调试 因为你在线上跑的是压缩过的代码，看不到具体错误，这个方法是让源代码和压缩代码产生映射，方便快速的定位到指定你的文件，

    // 可以开启一个本地web服务器
	devServer: {
		contentBase: "/dev",    // 本地服务器所加载的页面所在的目录
		historyApiFallback: true,    // 不跳转
		port: "7007",    // 设置默认监听端口，如果省略，默认为”7080“
		inline: true,    // 实时刷新
        contentBase: '/dev',
        progress: true,
        proxy: {
         '\*': {
           target: 'http://127.0.0.1:8081',    // 123

          secure: false
         }
        }
	},

	module: {
        // webpack的特色加载器
        rules: [
            { test: /\.js[x]?$/, use: { loader: "babel-loader"  }, exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|gif)$/, loader: 'file-loader' },
            {
              test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
              loader: 'url-loader'
            }
        ]
    },
    // 配置一些规则，提升解析速度 由于我配置文件有问题导致这儿配置的会报错，所以我先注释掉
    // resolve: {
    //     extensions: ['', '.js', '.jsx']
    // },
     // webpack的特色插件
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),    // 版权
        new HtmlWebpackPlugin({
            template: __dirname + "/webapp/index.tmpl.html"    // new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()    // 热加载插件
    ],

}


*/

2. React 
3. Nginx 的配置








## 访问地址

访问地址 [Hollis Blog](http://blog.yangjialei.com)。
