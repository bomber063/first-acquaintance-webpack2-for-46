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
* 主要参考[webpack4.39.3中文](https://www.webpackjs.com/guides/getting-started/)，[英文版](https://webpack.js.org/guides/getting-started/)因为我们用的是3.12.0版本，可能有一些命令会不一样。
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
      test: /\.js$/,//意思是如果你的后缀是.js，那么就用babel-loader翻译一下。
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
#### 增加模块化
* 我们的js不是src/index.js，由于用了babel，所以代码结构不一样，因为它自带了模块化。
* 首先创建在src目录下面创建三个文件module-1.js(里面只有一个console.log(1))，modele-2.js里面只有一个console.log(2),app.js
```
touch module-1.js
touch module-2.js
touch app.js
```
* app.js的功能就是调用模块1让他打印出1，调用模块2让他打印出2。
* 需要用到两个新的API——[export](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)和[import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
* app.js的代码为
```
import x from './module-1'//意思就是这个路径被导出的变量设置为x,这里的路径可以不用写后缀js
import y from './module-2'//意思就是这个路径被导出的变量设置为y,这里的路径可以不用写后缀js
```
* module-1.js代码改为
```
function fn(){
    console.log(1)
}

export default fn//如果有人引用就把默认的fn传出去
```
* module-2.js代码改为
```
function fn(){
    console.log(2)
}

export default fn//如果有人引用就把默认的fn传出去
```
* 也就是module-1.js和module-2.js是一个函数，如果有人引用他们就会引用fn。
* 那么前面的x就是module-1.js导出的fn，y就是module-2.js导出的fn。
* 现在就完成了app.js引用了模块module-1.js和模块module-2.js,并使用了这两个模块
* 由于我们路径和文件名字都修改了，所以还需要修改下webpack.config.js里面的配置
```
  entry: './src/app.js',//从app.js引入
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js/')//输出到这个目录下的bundle.js文件
  },
```
* 为了找到代码，我们对app.js做一个标志，就是在x()和y()之间console.log(3)
* 然后再次运行webpack
```
npx webpack
```
* 运行后
```
$ npx webpack
Hash: 8736c39b9bd9402ab196
Version: webpack 3.12.0
Time: 549ms
    Asset     Size  Chunks             Chunk Names
bundle.js  3.29 kB       0  [emitted]  main
   [0] ./src/app.js 353 bytes {0} [built]
   [1] ./src/module-1.js 142 bytes {0} [built]
   [2] ./src/module-2.js 142 bytes {0} [built]
```
* 可以看到它把**三个文件**（app.js和module-1.js和module-2.js）变成了**一个文件**bundle.js,**因为js的模块化就应该由js来控制，而不应该由html控制**
* 我们查看bundle.js看到
```
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _module = __webpack_require__(1);

var _module2 = _interopRequireDefault(_module);

var _module3 = __webpack_require__(2);

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _module2.default)();//这个是x()转换而来
console.log(3);
(0, _module4.default)();//这个是y()转换而来

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {//这个是module-1.js转换而来

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function fn() {
    console.log(1);
}

exports.default = fn;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {//这个是module-2.js转换而来

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function fn() {
    console.log(2);
}

exports.default = fn;

/***/ })
/******/ ]);
```
* 因为import和export是IE等版本比较低的浏览器是无法使用的，这样经过转换之后就可以使IE等版本比较低的浏览器也可以使用了或者能够认出的语法了。至于怎么转变的细节可以不用特别去记忆。
#### 接下来在index中来使用它
* 通过创建一个在dist目录下的一个index.html，里面只引用了js目录下的bundle.js
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="./js/bundle.js"></script>
</body>
</html>
```
* 通过http-server打开网页后发现打印出了
```
1//x()
3//console.log(3)
2//y()
```
* 这也就是app.js里面的代码执行的结果。
