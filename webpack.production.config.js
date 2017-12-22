const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');    // 加载html-webpack-plugin 功能是生成一个html文件，（我用来做我程序的入口文件）
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');    // 将 css 单独打包
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, './app/main.js'),
  ],
  // entry: __dirname + "/app/main.js",

  output: {
    path: __dirname + "/dev",    // 打包后的文件存放的地方
    filename: "bundle-[hash].js",    // 打包后输出文件的文件名
    chunkFilename: "[id].bundle-[hash].js"
  },
  module: {

    loaders: [
    { test: /\.js[x]?$/, use: { loader: "babel-loader"  }, exclude: /node_modules/ },
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.(png|jpg)$/, loader: 'file-loader' },
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      loader: 'url-loader'
    }]
  },
  // resolve: {
  //   extensions: ['', '.js', '.jsx'],
  // },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    // new webpack.optimize.DedupePlugin(),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false //不需要注释
        },
        sourceMap: false, //不要代码地图
        compress: {
          warnings: false //不需要警告
        }
      }
    }),
  //在 plugin 中添加
    new CompressionWebpackPlugin({ //gzip 压缩
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
        ),
        threshold: 10240,
        minRatio: 0.8
    }),
    new ExtractTextPlugin('style-[hash].css'),
     new HtmlWebpackPlugin({
        filename: 'index.html',    //生成的文件，从 output.path 开始 output.path + "/index.html"
        template: __dirname + "/webapp/index.tmpl.html",  //读取的模板文件,这个路径是相对于当前这个配置文件的
        inject: true, // 自动注入
        minify: {
            removeComments: true,        //去注释
            collapseWhitespace: true,    //压缩空格
            removeAttributeQuotes: true  //去除属性引用
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        //必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
        chunksSortMode: 'dependency'
    }),
    // new HtmlWebpackPlugin({
    //     template: __dirname + "/webapp/index.tmpl.html"
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(),
       //在 plugins 中添加
    new webpack.optimize.UglifyJsPlugin({
        comments: false,        //去掉注释
        compress: {
            warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
        }
    })
     ]
};