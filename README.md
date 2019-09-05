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
* 这也就是app.js里面的代码(包括了module-1.js和module-2.js)执行的结果后得到bundles.js这样的模块化的结果。这样模块化可是使得文件之间可以互相依托和依赖。
###  webpack的SCSS转换为CSS
* google搜索webpack scss,可以找到[sass-loader](https://github.com/webpack-contrib/sass-loader)，之前的js对应babel-loader，现在这个scss对应的是sass-loader，是不是很相似,**都有一个loader**。
* 找到就先安装sass-loader
```
npm install sass-loader node-sass webpack --save-dev
```
* 还需要安装css-loader和style-loader,**这个文档里面没有说清楚**
```
npm install css-loader style-loader
```

* 然后webpack.config.js新增代码（这是网站的新代码）
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,//如果发现你的后缀是sass或者scss
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',//最后用style-loader加载，它会把JS字符串变成style标签
          // Translates CSS into CommonJS
          'css-loader',//然后用CSS-loader加载，它会把CSS变成JS字符串
          // Compiles Sass to CSS
          'sass-loader',//这里是倒着执行的，首先用sass-loader去加载，它会把sass变成css
        ],
      },
    ],
  },
};
```
* 老师课程上用的代码（这个是老的）是下面的，有一个大括号包起来，并且都有属性名loader,这个也是可以执行的。
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,//如果发现你的后缀是sass或者scss
        use: [
          // Creates `style` nodes from JS strings
          {loader：'style-loader'},//最后用style-loader加载，它会把JS字符串变成style标签
          // Translates CSS into CommonJS
          {loader：'css-loader'},//然后用CSS-loader加载，它会把CSS变成JS字符串
          // Compiles Sass to CSS
          {loader：'sass-loader'},//这里是倒着执行的，首先用sass-loader去加载，它会把sass变成css
        ],
      },
    ],
  },
};
```
* 上面的代码很像命令行的管道，loader：'sass-loader'的**输出**作为loader：'css-loader'的**输入**，而loader：'css-loader'的**输出**作为loader：'style-loader'的**输入**，最终'style-loader'会**输出**一个style标签到页面上
* 完成后，这个时候我们去运行npx webpack是还不起作用的，还需要更改app.js引入scss这个模块。
* 通过代码
```
import '../css/style.scss'//意思是引入style.scss
```
#### 再次webpack执行scss的时候报错
* 运行npx webpack只有一直报下面的错
```
ERROR in ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss
Module build failed: TypeError: this.getResolve is not a function
    at Object.loader (D:\jirengu\github收集\46webpack2\node_modules\sass-loader\dist\index.js:52:26)
 @ ./src/css/style.scss 1:14-124
 @ ./src/app.js
```
* 经过查询这个链接——[解决npm安装node-sass太慢及编译错误问题](http://m.morecoder.com/article/1268346.html)找到对应的解决办法,因为安装的sass-loader的版本为最新8.0.0，查看网上资料说是版本过高导致编译错误。把项目package.json文件中sass-loader版本改为7.3.1，也就是重新安装sass-loader@7就解决了。
```
npm install sass-loader@7
```
* 解决了上面的错误之后再次运行npx webpack就可以出现下面的运行结果
```
$ npx webpack
Hash: 8223d7c3ae60bc04ab00
Version: webpack 3.12.0
Time: 965ms
    Asset   Size  Chunks             Chunk Names
bundle.js  26 kB       0  [emitted]  main
   [0] ./src/js/app.js 602 bytes {0} [built]
   [1] ./src/js/module-1.js 189 bytes {0} [built]
   [2] ./src/js/module-2.js 189 bytes {0} [built]
   [3] ./src/css/style.scss 1.22 kB {0} [built]
   [4] ./node_modules/css-loader!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss 5.35 kB {0} [built]
    + 3 hidden modules
```
* 如果是用新版本的css-loader和style-loader比如 "css-loader": "^3.2.0","style-loader": "^1.0.0"的会显示+2 hidden modules
```
$ npx webpack
Hash: ac65b79b398b27a04405
Version: webpack 3.12.0
Time: 752ms
    Asset     Size  Chunks             Chunk Names
bundle.js  14.1 kB       0  [emitted]  main
   [0] ./src/js/app.js 602 bytes {0} [built]
   [1] ./src/js/module-1.js 189 bytes {0} [built]
   [2] ./src/js/module-2.js 189 bytes {0} [built]
   [3] ./src/css/style.scss 453 bytes {0} [built]
   [4] ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss 325 bytes {0} [built]
    + 2 hidden modules

```
* **可以看到不仅运行.js的文件，还把style.scss加载到js里面去了**。
* 然后检查下网页，发现网页自动把style.scss转换为css，并且能够运行到dist目录下面的index.html的代码里面去，也就是自动添加到index.html的head标签里面增加了一个style标签来存这个代码。
* 然后我们在检查下dist/js/bundle.js里面多了一些东西，比如
```
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//意思是引入style.scss
```
* 再比如，还把字符串全部写出来了
```
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// Module
exports.push([module.i, "body{background-color:#EFEFEF}.topNavBar{padding:20px 0px;position:fixed;width:100%;transition:all 0.5s;color:#B7B7B7}.topNavBar.sticky{color:#3d4451;padding:10px 0px;position:fixed;width:100%;background:white;z-index:1;box-shadow:0px 0px 10px 0px rgba(0,0,0,0.25)}.topNavBar-inner{padding:0px 16px}.topNavBar .logo{font-family:'Arial Black';font-size:24px;text-decoration:none;padding-top:3px;padding-bottom:4px}*{margin:0px;padding:0px}[data-x].offset{transform:translateY(100px)}[data-x]{transform:translateY(0px);transition:all 0.5s}.topNavBar a .rs{color:#E6686A}.topNavBar a .card{color:#9A9DA2}body div div nav{padding-top:5px;float:right}body nav ul{margin:0px;padding:0px;position:relative}nav ul li a{position:relative}li.active>a::after,li.highlight>a::after{content:'';position:absolute;display:block;top:100%;left:0;width:100%;height:3px;background:#E06567;animation:meunSlide  0.3s}@keyframes meunSlide{0%{width:0%}100%{width:100%}}.topNavBar .menu>ul>li{list-style:none;float:left;padding:auto;margin-left:17px;margin-right:17px;position:relative}.topNavBar nav ul li a{font-weight:bold;font-size:12px;color:inherit;padding:5px;text-decoration:none;padding:5px 0px;border-top:3px solid transparent;border-bottom:3px solid transparent;display:block}.submenu{list-style:none;display:none;position:absolute;right:0;top:100%;background:white;color:#3d4451;box-shadow:0 0 5px 0 rgba(0,0,0,0.5)}li.active>.submenu{list-style:none;display:block;animation:submenuSlide 0.3s}@keyframes submenuSlide{0%{margin-right:100%}100%{margin-right:0%}}.submenu>li{white-space:nowrap;padding:5px 10px}.banner{height:515px;background-size:cover;background-position:center center}.mask{height:515px;background-color:rgba(0,0,0,0.8)}.userCard{max-width:940px;margin-left:auto;margin-right:auto;box-shadow:0px 1px 5px 0px rgba(0,0,0,0.5);margin-top:-340px}.puctureAndText{background-color:#FFFFFF;padding:50px}.picture{float:left}.text{float:left;margin-left:65px;width:470px}.welcome{color:#FFFFFF;background-color:#E6686A;padding:4px 16px;display:inline-block;position:relative;margin-bottom:10px}.triangle{border:10px solid red;display:block;border-right:10px solid green;border-left:10px solid blue;border-bottom:10px solid black;border-top:10px solid #E6686A;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-width:0px;position:absolute;left:4px;top:100%}h1{margin-top:18px}hr{height:0;border:none;border-top:1px solid #DEDEDE;margin:20px 0px}.text dt,.text dd{float:left;padding:5px 0px}.text dt{width:30%;font-weight:bold}.text dd{width:70%;color:#9DA0A7}.media{background-color:#E6686A;text-align:center}footer.media a{padding:5px 0px;margin:16px;display:inline-block;border-radius:50%;width:40px;line-height:30px}footer.media a:hover{background:#CF5D5F}.userCard svg{width:30px;height:30px;fill:white;vertical-align:top}.button{border:1px solid #CDCFD1;text-align:center;width:205px;font-weight:bold;font-size:14px;padding:19px 0px;margin:32px auto;display:block;color:#3D4451;text-decoration:none;transition:box-shadow 0.3s}.button:hover{box-shadow:0px 4px 13px 0px rgba(0,0,0,0.2)}.selfIntroduction{font-family:cursive;margin:auto;max-width:940px;text-align:center;font-size:21px;line-height:1.8}.skillT{margin-top:60px;max-width:940px;margin-left:auto;margin-right:auto}section h2{color:#3D4451;text-align:center;font-size:34px}section .skills{list-style:none;background:#FFFFFF;padding:42px 50px 10px;margin-top:30px;box-shadow:0px 1px 5px 0px rgba(0,0,0,0.5)}section .skills li{float:left;width:48%;box-sizing:border-box;overflow:hidden}section .skills li:nth-child(even){float:right}.bar1{height:5px;background:#FAE1E1;margin:4px 0px 40px 0px;border-radius:2px}.skillT .bar2{background:#E6686A;height:100%;width:40%;border-radius:2px;transform:translateX(0);transition:all 1s}.skillT.offset .bar2{transform:translateX(-100%)}h3{font-weight:normal;font-size:14px}.portfolio{text-align:center;max-width:940px;margin-left:auto;margin-right:auto;margin-top:60px}.portfolio ol{list-style:none}.portfolio nav{display:inline-block;margin-top:32px}.portfolio ol li{float:left;margin-left:40px;cursor:pointer}.portfolio ol li:first-child{margin-left:0px}section.portfolio .swiper-container{width:668px;height:501px;padding-bottom:30px}section.portfolio .swiper-slide{background:white}section.portfolio h2{margin-bottom:32px}section.portfolio .swiper-button-prev{background-color:white;width:44px;height:44px;border-radius:50%;top:48%;position:absolute;left:75px}section.portfolio .swiper-button-next{background-color:white;width:44px;height:44px;border-radius:50%;top:48%;position:absolute;right:75px}.swiper-pagination-bullet{width:20px;height:20px;text-align:center;line-height:20px;font-size:12px;color:#000;opacity:1;background:rgba(0,0,0,0.2)}.swiper-pagination-bullet-active{color:#fff;background:#007aff}.jobs{position:relative;height:597px}#postMessageForm{margin:100px auto;width:700px}section ol#messageList{max-width:700px;margin:0 auto;list-style:none;background:#F5F5F5;border-top:1px solid #CCC}section ol#messageList li{padding:16px;border-bottom:1px solid #CCC}.clearfix::after{content:'';display:block;clear:both}\n", ""]);


/***/ }),
```
* 也就是把scss文件里面的代码变成字符串，等js运行的时候会把这个字符串放到页面，也就是index.html里面的一个style标签里面，也就是前面**[比卡丘](https://github.com/bomber063/The-Moving-Pikachu-for-43)**那节类似的效果,CSS是可以用字符串的形式存储的。然后慢慢的显示在style标签里面。而这里的webpack就直接把这个css变成字符串，等运行的时候就把这个字符串放到html文件的style标签里面去。
* 上面的代码针对**图片的问题暂时先不考虑**
* **即使你是sacc文件也可以引入到js里面作为一个模块**，webpack针对所有的东西都可以看成一个模块，比如用[import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)进来,至于引入后怎么出现在页面里面，暂时不用关心，而这里**需要知道的是一个js就可以搞定所有事情（包括CSS的进入）**，这条路线大概是，css->把css弄到bundle.js里面->运行bundle.js->把css弄到head的style标签里面
* 这里面还可以增加cache-control可以增加页面打开效率，还可以混杂模式，也就是既有传统的文件CSS(比如一些简单的默认样式可以直接写出来)，又有webpack的css(比如一些动态的样式可以使用JS来增加。)，一般来说是先加载CSS之后再去加载JS，而如果用js来加载CSS，那么就使得CSS代码出现在JS之后，那么这个混杂模式就可以稍微解决。
### 更多的兼容转换，比如增加前缀的postcss-loader
* 比如我们有一个CSS代码(这里老师的用的是flex，因为autoprefixer已经不支持这个转换了，但是也有可能是大部分浏览器升级后默认支持无前缀的 CSS，那么 postcss 就不会再加前缀了！)
```
.example {
    display: grid;
    transition: all .5s;
    user-select: none;
    background: linear-gradient(to bottom, white, black);
    display:flex;
}
```
* 我们测试一个css里面的flex，可以通过[caniuse网站](https://caniuse.com/#search=flex)查询它对于不同的浏览器的兼容效果。可以看到IE浏览器是不支持的，如果你服务特别多的用户，无法保证用户用的是什么浏览器，难免有些用户就使用了IE浏览器，而你的CSS代码中正好也有上面的代码。那么就可以通过一些方式，比如
1. 如果自己知道的话肯定可以写成**增加前缀**
2. 自动化——[autoprefixer](https://autoprefixer.github.io),你可以用这个插件的在线版来查询对应的代码。选择Filter 
last 4 version，也就是过滤掉得到所有浏览器的最早的四个版本，也就是最老的四个版本，如果这都能支持，那么其他的新版本的差不多都可以支持了。
通过查询我们可以看到转换为
```
.example {
    display: -ms-grid;
    display: grid;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    background: -webkit-gradient(linear, left top, left bottom, from(white), to(black));
    background: -o-linear-gradient(top, white, black);
    background: linear-gradient(to bottom, white, black);
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
}
```
3. 能否在webpack里面加第二条的插件呢？当然可以，我可以按照前面的说的webpack ...loader在google里面查询即可，那么这里就是查询webpack autoprefixer.loader得到[链接autoprefixer-loader](https://github.com/passy/autoprefixer-loader),但是这个链接里面有一句话
```
This module is deprecated. Autoprefixer official page recommends using postcss-loader instead.
译文：不推荐使用此模块。Autoprefixer官方页面建议使用postcss-loader。
```
* 所以我们进入到[postcss-loader](https://github.com/postcss/postcss-loader)
* 根据它的说明先安装
```
npm i -D postcss-loader
```
* 然后新增一个文件postcss.config.js,代码为
```
module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': {}
  }
}
```
* webpack.config.js增加
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'postcss-loader' ]
      }
    ]
  }
}
```
#### 但是这里的postcss-loader的文档有点问题没有说明清楚
* 运行npx webpack会报错，说找不到'postcss-import
```
Module build failed: Error: Loading PostCSS Plugin failed: Cannot find module 'postcss-import'
```
* 继续安装postcss-import
```
npm i postcss-import
```
* 再次运行npx webpack报错找不到postcss-preset-env(老师的视频是找不到postcss-cssnext)
* 安装postcss-preset-env
```
npm i postcss-preset-env
```
* 再次运行npx webpack报错找不到cssnano(老师的视频是找不到sugarss)
* 安装cssnano
```
npm i cssnano
```
* 再次运行npx webpack报错找不到sugarss(老师的视频这里已经没有要安装的了)
* 安装sugarss
```
npm i sugarss
```
* 再次运行npx webpack报错如下
```
ERROR in ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss
Module build failed: SyntaxError

(1:5) Unnecessary curly bracket
```
* 这个问题就不是安装的问题了，就需要在google上搜这个报错——(1:5) Unnecessary curly bracket，可以得到[bug的解决链接](https://github.com/postcss/postcss/issues/1062)找到一些信息比如
```
as the issue title suggest you are using a custom parser for plain .css files, the sugarss parser is not needed by default (see my comment above)
译文：正如问题标题所示，您正在为普通.css文件使用自定义解析器，默认情况下不需要sugarss解析器(请参阅上面的注释)
```
* 所以需要把postcss.config.js文件里面的sugarss删除或者注释掉
```
module.exports = {
    // parser: 'sugarss',//把它注释掉就不会报错了
    plugins: {
      'postcss-import': {},
      'postcss-preset-env': {},
      'cssnano': {}
    }
  }
```
* 现在我们再次运行npx webpack可以看到信息如下：
```
$ npx webpack
Hash: e47862db3c17b81428e7
Version: webpack 3.12.0
Time: 2089ms
    Asset     Size  Chunks             Chunk Names
bundle.js  14.3 kB       0  [emitted]  main
   [0] ./src/js/app.js 602 bytes {0} [built]
   [1] ./src/js/module-1.js 189 bytes {0} [built]
   [2] ./src/js/module-2.js 189 bytes {0} [built]
   [3] ./src/css/style.scss 500 bytes {0} [built]
   [4] ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss 528 bytes {0} [built]
    + 2 hidden modules
```
* 我们在目录dist里面运行http-server打开网站，并打开开发者工具里面的Elements可以看到多了一个style，并且标签多了一些前缀，比如
```
body{
  background:#ddd;
  display:flex
}
section ol#messageList{
  max-width:700px;
  margin:0 auto;
  list-style:none;
  background:#f5f5f5;
  border-top:1px solid #ccc
}
section ol#messageList li{
  padding:16px;
  border-bottom:1px solid #ccc
}
.example{
  display:grid;
  transition:all .5s;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  background:linear-gradient(180deg,#fff,#000)}
```
* 增加js代码查看let转换为var的效果
```
$ npx webpack
Hash: fcc429942ed1f1112ea5
Version: webpack 3.12.0
Time: 2084ms
    Asset     Size  Chunks             Chunk Names
bundle.js  14.3 kB       0  [emitted]  main
   [0] ./src/js/app.js 602 bytes {0} [built]
   [1] ./src/js/module-1.js 204 bytes {0} [built]
   [2] ./src/js/module-2.js 204 bytes {0} [built]
   [3] ./src/css/style.scss 500 bytes {0} [built]
   [4] ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss 528 bytes {0} [built]
    + 2 hidden modules
```
### 其他说明
* 注意很多东西都是不停地升级，比如目前的webpack已经升级到版本4了，上面说的过程都是版本3的过程
* [webpack：从入门到真实项目配置](https://zhuanlan.zhihu.com/p/30701816)
* [关于 webpack 的面试题有哪些？](https://www.zhihu.com/question/266788138)