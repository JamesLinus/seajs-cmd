define("arale-base/1.2.0/base",["arale-class/1.2.0/class","arale-events/1.2.0/events"],function(t,r,e){e.exports=t("arale-base/1.2.0/src/base"),e.exports.outerBoxClass="arale-base-1_2_0"}),define("arale-base/1.2.0/src/base",["arale-class/1.2.0/class","arale-events/1.2.0/events"],function(t,r,e){function n(t,r){for(var e in r)if(r.hasOwnProperty(e)){var n="_onChange"+a(e);t[n]&&t.on("change:"+e,t[n])}}function a(t){return t.charAt(0).toUpperCase()+t.substring(1)}var i=t("arale-class/1.2.0/class"),s=t("arale-events/1.2.0/events"),o=t("arale-base/1.2.0/src/aspect"),c=t("arale-base/1.2.0/src/attribute");e.exports=i.create({Implements:[s,o,c],initialize:function(t){this.initAttrs(t),n(this,this.attrs)},destroy:function(){this.off();for(var t in this)this.hasOwnProperty(t)&&delete this[t];this.destroy=function(){}}}),e.exports.outerBoxClass="arale-base-1_2_0"}),define("arale-base/1.2.0/src/aspect",[],function(t,r,e){function n(t,r,e,n){for(var o,c,u=r.split(s);o=u.shift();)c=a(this,o),c.__isAspected||i.call(this,o),this.on(t+":"+o,e,n);return this}function a(t,r){var e=t[r];if(!e)throw new Error("Invalid method name: "+r);return e}function i(t){var r=this[t];this[t]=function(){var e=Array.prototype.slice.call(arguments),n=["before:"+t].concat(e);if(this.trigger.apply(this,n)!==!1){var a=r.apply(this,arguments),i=["after:"+t,a].concat(e);return this.trigger.apply(this,i),a}},this[t].__isAspected=!0}r.before=function(t,r,e){return n.call(this,"before",t,r,e)},r.after=function(t,r,e){return n.call(this,"after",t,r,e)};var s=/\s+/;e.exports.outerBoxClass="arale-base-1_2_0"}),define("arale-base/1.2.0/src/attribute",[],function(t,r,e){function n(t){return"[object String]"===j.call(t)}function a(t){return"[object Function]"===j.call(t)}function i(t){return null!=t&&t==t.window}function s(t){if(!t||"[object Object]"!==j.call(t)||t.nodeType||i(t))return!1;try{if(t.constructor&&!A.call(t,"constructor")&&!A.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}var e;if(w)for(e in t)return A.call(t,e);for(e in t);return void 0===e||A.call(t,e)}function o(t){if(!t||"[object Object]"!==j.call(t)||t.nodeType||i(t)||!t.hasOwnProperty)return!1;for(var r in t)if(t.hasOwnProperty(r))return!1;return!0}function c(t,r){var e;for(e in r)r.hasOwnProperty(e)&&(t[e]=u(r[e],t[e]));return t}function u(t,r){return P(t)?t=t.slice():s(t)&&(s(r)||(r={}),t=c(r,t)),t}function l(t,r,e){for(var n=[],a=r.constructor.prototype;a;)a.hasOwnProperty("attrs")||(a.attrs={}),h(e,a.attrs,a),o(a.attrs)||n.unshift(a.attrs),a=a.constructor.superclass;for(var i=0,s=n.length;s>i;i++)y(t,b(n[i]))}function f(t,r){y(t,b(r,!0),!0)}function h(t,r,e,n){for(var a=0,i=t.length;i>a;a++){var s=t[a];e.hasOwnProperty(s)&&(r[s]=n?r.get(s):e[s])}}function v(t,r){for(var e in r)if(r.hasOwnProperty(e)){var n,i=r[e].value;a(i)&&(n=e.match(m))&&(t[n[1]](p(n[2]),i),delete r[e])}}function p(t){var r=t.match(C),e=r[1]?"change:":"";return e+=r[2].toLowerCase()+r[3]}function g(t,r,e){var n={silent:!0};t.__initializingAttrs=!0;for(var a in e)e.hasOwnProperty(a)&&r[a].setter&&t.set(a,e[a],n);delete t.__initializingAttrs}function b(t,r){var e={};for(var n in t){var a=t[n];e[n]=!r&&s(a)&&d(a,S)?a:{value:a}}return e}function y(t,r,e){var n,a,i;for(n in r)if(r.hasOwnProperty(n)){if(a=r[n],i=t[n],i||(i=t[n]={}),void 0!==a.value&&(i.value=u(a.value,i.value)),e)continue;for(var s in B){var o=B[s];void 0!==a[o]&&(i[o]=a[o])}}return t}function d(t,r){for(var e=0,n=r.length;n>e;e++)if(t.hasOwnProperty(r[e]))return!0;return!1}function O(t){return null==t||(n(t)||P(t))&&0===t.length||o(t)}function _(t,r){if(t===r)return!0;if(O(t)&&O(r))return!0;var e=j.call(t);if(e!=j.call(r))return!1;switch(e){case"[object String]":return t==String(r);case"[object Number]":return t!=+t?r!=+r:0==t?1/t==1/r:t==+r;case"[object Date]":case"[object Boolean]":return+t==+r;case"[object RegExp]":return t.source==r.source&&t.global==r.global&&t.multiline==r.multiline&&t.ignoreCase==r.ignoreCase;case"[object Array]":var n=t.toString(),a=r.toString();return-1===n.indexOf("[object")&&-1===a.indexOf("[object")&&n===a}if("object"!=typeof t||"object"!=typeof r)return!1;if(s(t)&&s(r)){if(!_(x(t),x(r)))return!1;for(var i in t)if(t[i]!==r[i])return!1;return!0}return!1}r.initAttrs=function(t){var r=this.attrs={},e=this.propsInAttrs||[];l(r,this,e),t&&f(r,t),g(this,r,t),v(this,r),h(e,this,r,!0)},r.get=function(t){var r=this.attrs[t]||{},e=r.value;return r.getter?r.getter.call(this,e,t):e},r.set=function(t,r,e){var a={};n(t)?a[t]=r:(a=t,e=r),e||(e={});var i=e.silent,o=e.override,u=this.attrs,l=this.__changedAttrs||(this.__changedAttrs={});for(t in a)if(a.hasOwnProperty(t)){var f=u[t]||(u[t]={});if(r=a[t],f.readOnly)throw new Error("This attribute is readOnly: "+t);f.setter&&(r=f.setter.call(this,r,t));var h=this.get(t);!o&&s(h)&&s(r)&&(r=c(c({},h),r)),u[t].value=r,this.__initializingAttrs||_(h,r)||(i?l[t]=[r,h]:this.trigger("change:"+t,r,h,t))}return this},r.change=function(){var t=this.__changedAttrs;if(t){for(var r in t)if(t.hasOwnProperty(r)){var e=t[r];this.trigger("change:"+r,e[0],e[1],r)}delete this.__changedAttrs}return this},r._isPlainObject=s;var w,j=Object.prototype.toString,A=Object.prototype.hasOwnProperty;!function(){function t(){this.x=1}var r=[];t.prototype={valueOf:1,y:1};for(var e in new t)r.push(e);w="x"!==r[0]}();var P=Array.isArray||function(t){return"[object Array]"===j.call(t)},x=Object.keys;x||(x=function(t){var r=[];for(var e in t)t.hasOwnProperty(e)&&r.push(e);return r});var m=/^(on|before|after)([A-Z].*)$/,C=/^(Change)?([A-Z])(.*)/,S=["value","getter","setter","readOnly"],B=["setter","getter","readOnly"];e.exports.outerBoxClass="arale-base-1_2_0"});