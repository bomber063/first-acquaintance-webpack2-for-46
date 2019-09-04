/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _module = __webpack_require__(1);

var _module2 = _interopRequireDefault(_module);

var _module3 = __webpack_require__(2);

var _module4 = _interopRequireDefault(_module3);

__webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//意思是引入style.scss

//意思就是这个路径被导出的变量设置为x,这里的路径可以不用写后缀js
(0, _module2.default)(); //意思就是这个路径被导出的变量设置为y,这里的路径可以不用写后缀js

console.log(3);
(0, _module4.default)();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function fn() {
    console.log(1);
}

exports.default = fn; //如果有人引用就把默认的fn传出去

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function fn() {
    console.log(2);
}

exports.default = fn; //如果有人引用就把默认的fn传出去

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(4);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(6)(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// Module
exports.push([module.i, "body{background-color:#EFEFEF}.topNavBar{padding:20px 0px;position:fixed;width:100%;transition:all 0.5s;color:#B7B7B7}.topNavBar.sticky{color:#3d4451;padding:10px 0px;position:fixed;width:100%;background:white;z-index:1;box-shadow:0px 0px 10px 0px rgba(0,0,0,0.25)}.topNavBar-inner{padding:0px 16px}.topNavBar .logo{font-family:'Arial Black';font-size:24px;text-decoration:none;padding-top:3px;padding-bottom:4px}*{margin:0px;padding:0px}[data-x].offset{transform:translateY(100px)}[data-x]{transform:translateY(0px);transition:all 0.5s}.topNavBar a .rs{color:#E6686A}.topNavBar a .card{color:#9A9DA2}body div div nav{padding-top:5px;float:right}body nav ul{margin:0px;padding:0px;position:relative}nav ul li a{position:relative}li.active>a::after,li.highlight>a::after{content:'';position:absolute;display:block;top:100%;left:0;width:100%;height:3px;background:#E06567;animation:meunSlide  0.3s}@keyframes meunSlide{0%{width:0%}100%{width:100%}}.topNavBar .menu>ul>li{list-style:none;float:left;padding:auto;margin-left:17px;margin-right:17px;position:relative}.topNavBar nav ul li a{font-weight:bold;font-size:12px;color:inherit;padding:5px;text-decoration:none;padding:5px 0px;border-top:3px solid transparent;border-bottom:3px solid transparent;display:block}.submenu{list-style:none;display:none;position:absolute;right:0;top:100%;background:white;color:#3d4451;box-shadow:0 0 5px 0 rgba(0,0,0,0.5)}li.active>.submenu{list-style:none;display:block;animation:submenuSlide 0.3s}@keyframes submenuSlide{0%{margin-right:100%}100%{margin-right:0%}}.submenu>li{white-space:nowrap;padding:5px 10px}.banner{height:515px;background-size:cover;background-position:center center}.mask{height:515px;background-color:rgba(0,0,0,0.8)}.userCard{max-width:940px;margin-left:auto;margin-right:auto;box-shadow:0px 1px 5px 0px rgba(0,0,0,0.5);margin-top:-340px}.puctureAndText{background-color:#FFFFFF;padding:50px}.picture{float:left}.text{float:left;margin-left:65px;width:470px}.welcome{color:#FFFFFF;background-color:#E6686A;padding:4px 16px;display:inline-block;position:relative;margin-bottom:10px}.triangle{border:10px solid red;display:block;border-right:10px solid green;border-left:10px solid blue;border-bottom:10px solid black;border-top:10px solid #E6686A;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-width:0px;position:absolute;left:4px;top:100%}h1{margin-top:18px}hr{height:0;border:none;border-top:1px solid #DEDEDE;margin:20px 0px}.text dt,.text dd{float:left;padding:5px 0px}.text dt{width:30%;font-weight:bold}.text dd{width:70%;color:#9DA0A7}.media{background-color:#E6686A;text-align:center}footer.media a{padding:5px 0px;margin:16px;display:inline-block;border-radius:50%;width:40px;line-height:30px}footer.media a:hover{background:#CF5D5F}.userCard svg{width:30px;height:30px;fill:white;vertical-align:top}.button{border:1px solid #CDCFD1;text-align:center;width:205px;font-weight:bold;font-size:14px;padding:19px 0px;margin:32px auto;display:block;color:#3D4451;text-decoration:none;transition:box-shadow 0.3s}.button:hover{box-shadow:0px 4px 13px 0px rgba(0,0,0,0.2)}.selfIntroduction{font-family:cursive;margin:auto;max-width:940px;text-align:center;font-size:21px;line-height:1.8}.skillT{margin-top:60px;max-width:940px;margin-left:auto;margin-right:auto}section h2{color:#3D4451;text-align:center;font-size:34px}section .skills{list-style:none;background:#FFFFFF;padding:42px 50px 10px;margin-top:30px;box-shadow:0px 1px 5px 0px rgba(0,0,0,0.5)}section .skills li{float:left;width:48%;box-sizing:border-box;overflow:hidden}section .skills li:nth-child(even){float:right}.bar1{height:5px;background:#FAE1E1;margin:4px 0px 40px 0px;border-radius:2px}.skillT .bar2{background:#E6686A;height:100%;width:40%;border-radius:2px;transform:translateX(0);transition:all 1s}.skillT.offset .bar2{transform:translateX(-100%)}h3{font-weight:normal;font-size:14px}.portfolio{text-align:center;max-width:940px;margin-left:auto;margin-right:auto;margin-top:60px}.portfolio ol{list-style:none}.portfolio nav{display:inline-block;margin-top:32px}.portfolio ol li{float:left;margin-left:40px;cursor:pointer}.portfolio ol li:first-child{margin-left:0px}section.portfolio .swiper-container{width:668px;height:501px;padding-bottom:30px}section.portfolio .swiper-slide{background:white}section.portfolio h2{margin-bottom:32px}section.portfolio .swiper-button-prev{background-color:white;width:44px;height:44px;border-radius:50%;top:48%;position:absolute;left:75px}section.portfolio .swiper-button-next{background-color:white;width:44px;height:44px;border-radius:50%;top:48%;position:absolute;right:75px}.swiper-pagination-bullet{width:20px;height:20px;text-align:center;line-height:20px;font-size:12px;color:#000;opacity:1;background:rgba(0,0,0,0.2)}.swiper-pagination-bullet-active{color:#fff;background:#007aff}.jobs{position:relative;height:597px}#postMessageForm{margin:100px auto;width:700px}section ol#messageList{max-width:700px;margin:0 auto;list-style:none;background:#F5F5F5;border-top:1px solid #CCC}section ol#messageList li{padding:16px;border-bottom:1px solid #CCC}.clearfix::after{content:'';display:block;clear:both}\n", ""]);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : null;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ })
/******/ ]);