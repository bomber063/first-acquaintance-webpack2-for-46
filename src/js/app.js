import x from './module-1'//意思就是这个路径被导出的变量设置为x,这里的路径可以不用写后缀js
import y from './module-2'//意思就是这个路径被导出的变量设置为y,这里的路径可以不用写后缀js
import '../css/style.scss'//意思是引入style.scss

x()
console.log(3)
y()