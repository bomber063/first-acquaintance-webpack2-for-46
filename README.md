# first-acquaintance-webpack2-for-46
## webpack 准备工作
* 为了解决前面出现众多分裂而横空出世的[webpack](https://www.webpackjs.com/)
* 课上讲的 webpack 是 webapck 3，现在 webpack 已经升级到 4 了，配置方法不一样！请安装 webpack 的时候写成 webpack@3
* 比如 
```
npm i webpack@3
```
* 如果你已经安装了 webpack@4，请先卸载然后再安装 webpack@3
```
npm uninstall webpack@4
npm uninstall -g webpack@4
npm i webpack@3
npm i -g webpack@3
```
* 本节主要是[first-acquaintance-webpack-for-46](https://github.com/bomber063/first-acquaintance-webpack-for-46)的进一步介绍关于webpack。
* 你可以选择删除前面的package命令，比如
```
rm package.json
```
* rm就是remove files or directories
* 然后重新初始化package.json，比如
```
npm init
```
* 然后我们安装webpack@3
```
npm install --save-dev webpack@3
```
* 之后我们看到package.json里面多了一个"webpack": "^3.12.0"
```
  "devDependencies": {
    "webpack": "^3.12.0"
  }
```
### 开始配置webpack,简单的拷贝工作
* 主要参考[webpack4.39.3](https://www.webpackjs.com/guides/getting-started/)，因为我们用的是3.12.0版本，可能有一些命令会不一样。
* 然后创建一个webpack.config.js文件，
* 配置webpack.config.js这个文件，内容为：
```
const path = require('path');

module.exports = {
  entry: './src/index.js',//从这个目录的index.js文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')//输出到这个目录的bundle.js文件
  }
};
```
* 这里有一个小技巧，安装一个npx就可以节省你输入局部安装的命令的路径代码
```
npx webpack
```
* 它会告诉你一个hash版本号和webpack版本号,比如，还有生成的了一个bundle.js，他是由./src/index.js翻译而来的。
```
$ npx webpack
Hash: 0bd4f09244f0e8c60354
Version: webpack 3.12.0
Time: 36ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.47 kB       0  [emitted]  main
   [0] ./src/index.js 0 bytes {0} [built]

```
* 之后就可以把下面的代码
```
./node_modules/.bin/webpack --help
```
* 用下面的代码代替了
```
npx webpack --help
```
* **这个npx就是帮你去找本地目录的webpack**
* 此时我们发现bundle.js生成后已经**自动有一堆代码存在了**
* 当你在index.js你们输入alert(1)会转义到bundle.js的最下面的代码里面去
```
/***/ (function(module, exports) {

alert(1)

/***/ })
/******/ ]);
```
### 接下来我们把单纯的拷贝来增加更多功能
#### webpack babel可以转换let为var，箭头函数为普通函数
* 在google上搜索webpack babel。然后可以找到[This README is for babel-loader v8 + Babel v7](https://github.com/babel/babel-loader)
* 如果你的版本不是上面的最新版本，比如你是[Check the 7.x branch for docs with Babel v6](https://github.com/babel/babel-loader/tree/7.x)
* 首先我们要知道@7代表第7个最高的版本，如果不写@就代表目前为止最高的版本。
* 那么我们就先选择跟课程一样的版本吧，webpack 3.x | babel-loader >= 7.1，可以输入
```
npm install --save-dev babel-loader@7 babel-core babel-preset-env webpack
```
* 之后我们就可以看到package.json里面增加了
```
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "webpack": "^3.12.0"
  }
```
* 说明是符合前面webpack 3.x | babel-loader >= 7.1的要求，那么接下来的配置应该是没有问题的。
* 然后在webpack.config.js里面增加
```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
  ]
}
```
* 我们在源文件里面，也就是index.js里面增加代码
```
let a=1
alert(a)


let numbers = [1,2,3]; 
let dou = numbers.map((number)=>number*2); 
console.log(dou);
```
* 在安装了npx的前提下，重新增加了webpack.config.js之后再次输入下面代码，
```
npx webpack
```
* 就会显示新的wepack的hash版本号，比如
```
$ npx webpack
Hash: 3280599df1c7b516e09c
Version: webpack 3.12.0
Time: 518ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.64 kB       0  [emitted]  main
   [0] ./src/index.js 146 bytes {0} [built]
```
* 我们在**看一下bundle.js就不是单纯的拷贝了，而是把let转换为了var,箭头函数转换为普通函数，还多了一个参数 __webpack_require__**
```
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var a = 1;
alert(a);

var numbers = [1, 2, 3];
var dou = numbers.map(function (number) {
  return number * 2;
});
console.log(dou);

/***/ })
/******/ ]);
```
* **当然你也可以一个个的安装，比如先安装babel-loader，在安装babel-core，在安装babel-preset-env，不过这样你就需要一步步按照提示来安装，有的安装名字还需要google查询一下才能找到。**