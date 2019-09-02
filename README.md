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