define("arale-validator/0.10.1/src/core",["jquery","arale-widget/1.2.0/widget","arale-base/1.2.0/base","arale-class/1.2.0/class","arale-events/1.2.0/events"],function(e,t,r){function n(e,t){for(var r=0;r<t.length;r++)if(e===t[r])return t.splice(r,1),t}function a(e,t){var r;return i.each(t,function(t,n){return e.get(0)===n.element.get(0)?(r=n,!1):void 0}),r}var i=e("jquery"),l=e("arale-validator/0.10.1/src/async"),u=e("arale-widget/1.2.0/widget"),s=e("arale-validator/0.10.1/src/utils"),o=e("arale-validator/0.10.1/src/item"),c=[],f={value:i.noop,setter:function(e){return i.isFunction(e)?e:s.helper(e)}},d=u.extend({attrs:{triggerType:"blur",checkOnSubmit:!0,stopOnError:!1,autoSubmit:!0,checkNull:!0,onItemValidate:f,onItemValidated:f,onFormValidate:f,onFormValidated:f,displayHelper:function(e){var t,r,n=e.element.attr("id");return n&&(t=i('label[for="'+n+'"]').text(),t&&(t=t.replace(/^[\*\s\:\\uff1a]*/,"").replace(/[\*\s\:\\uff1a]*$/,""))),r=e.element.attr("name"),t||r},showMessage:f,hideMessage:f,autoFocus:!0,failSilently:!1,skipHidden:!1},setup:function(){var e=this;if(e.items=[],e.element.is("form")){e._novalidate_old=e.element.attr("novalidate");try{e.element.attr("novalidate","novalidate")}catch(t){}e.get("checkOnSubmit")&&e.element.on("submit.validator",function(t){t.preventDefault(),e.execute(function(t){!t&&e.get("autoSubmit")&&e.element.get(0).submit()})})}e.on("itemValidated",function(e,t,r,n){this.query(r).get(e?"showMessage":"hideMessage").call(this,t,r,n)}),c.push(e)},Statics:i.extend({helper:s.helper},e("arale-validator/0.10.1/src/rule"),{autoRender:function(e){var t=new this(e);i("input, textarea, select",t.element).each(function(e,r){r=i(r);var n=r.attr("type");if("button"==n||"submit"==n||"reset"==n)return!0;var a={};if(a.element="radio"==n||"checkbox"==n?i("[type="+n+"][name="+r.attr("name")+"]",t.element):r,!t.query(a.element)){var l=s.parseDom(r);if(!l.rule)return!0;i.extend(a,l),t.addItem(a)}})},query:function(e){return u.query(e)},validate:function(e){var t=i(e.element),r=new d({element:t.parents()});r.addItem(e),r.query(t).execute(),r.destroy()}}),addItem:function(e){var t=this;if(i.isArray(e))return i.each(e,function(e,r){t.addItem(r)}),this;if(e=i.extend({triggerType:t.get("triggerType"),checkNull:t.get("checkNull"),displayHelper:t.get("displayHelper"),showMessage:t.get("showMessage"),hideMessage:t.get("hideMessage"),failSilently:t.get("failSilently"),skipHidden:t.get("skipHidden")},e),"string"==typeof e.element&&(e.element=this.$(e.element)),!i(e.element).length){if(e.failSilently)return t;throw new Error("element does not exist")}var r=new o(e);return t.items.push(r),r._validator=t,r.delegateEvents(r.get("triggerType"),function(e){(this.get("checkNull")||this.element.val())&&this.execute(null,{event:e})}),r.on("all",function(){this.trigger.apply(this,[].slice.call(arguments))},t),t},removeItem:function(e){var t=this,r=e instanceof o?e:t.query(e);return r&&(r.get("hideMessage").call(t,null,r.element),n(r,t.items),r.destroy()),t},execute:function(e){var t=this,r=[],n=!1,a=null;return i.each(t.items,function(e,r){r.get("hideMessage").call(t,null,r.element)}),t.trigger("formValidate",t.element),l[t.get("stopOnError")?"forEachSeries":"forEach"](t.items,function(e,i){e.execute(function(e,l,u){e&&!n&&(n=!0,a=u),r.push([].slice.call(arguments,0)),i(t.get("stopOnError")?e:null)})},function(){t.get("autoFocus")&&n&&(t.trigger("autoFocus",a),a.focus()),t.trigger("formValidated",n,r,t.element),e&&e(n,r,t.element)}),t},destroy:function(){var e=this,t=e.items.length;if(e.element.is("form")){try{void 0==e._novalidate_old?e.element.removeAttr("novalidate"):e.element.attr("novalidate",e._novalidate_old)}catch(r){}e.element.off("submit.validator")}for(var a=t-1;a>=0;a--)e.removeItem(e.items[a]);n(e,c),d.superclass.destroy.call(this)},query:function(e){return a(this.$(e),this.items)}});r.exports=d}),define("arale-validator/0.10.1/src/async",[],function(e,t,r){var n={};r.exports=n;var a=function(e,t){if(e.forEach)return e.forEach(t);for(var r=0;r<e.length;r+=1)t(e[r],r,e)},i=function(e,t){if(e.map)return e.map(t);var r=[];return a(e,function(e,n,a){r.push(t(e,n,a))}),r},l=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(r);return t};n.forEach=function(e,t,r){if(r=r||function(){},!e.length)return r();var n=0;a(e,function(a){t(a,function(t){t?(r(t),r=function(){}):(n+=1,n===e.length&&r(null))})})},n.forEachSeries=function(e,t,r){if(r=r||function(){},!e.length)return r();var n=0,a=function(){t(e[n],function(t){t?(r(t),r=function(){}):(n+=1,n===e.length?r(null):a())})};a()};var u=function(e){return function(){var t=Array.prototype.slice.call(arguments);return e.apply(null,[n.forEach].concat(t))}},s=function(e){return function(){var t=Array.prototype.slice.call(arguments);return e.apply(null,[n.forEachSeries].concat(t))}},o=function(e,t,r,n){var a=[];t=i(t,function(e,t){return{index:t,value:e}}),e(t,function(e,t){r(e.value,function(r,n){a[e.index]=n,t(r)})},function(e){n(e,a)})};n.map=u(o),n.mapSeries=s(o),n.series=function(e,t){if(t=t||function(){},e.constructor===Array)n.mapSeries(e,function(e,t){e&&e(function(e){var r=Array.prototype.slice.call(arguments,1);r.length<=1&&(r=r[0]),t.call(null,e,r)})},t);else{var r={};n.forEachSeries(l(e),function(t,n){e[t](function(e){var a=Array.prototype.slice.call(arguments,1);a.length<=1&&(a=a[0]),r[t]=a,n(e)})},function(e){t(e,r)})}}}),define("arale-validator/0.10.1/src/utils",["jquery"],function(require,exports,module){function unique(){return"__anonymous__"+u_count++}function parseRules(e){return e?e.match(/[a-zA-Z0-9\-\_]+(\{[^\{\}]*\})?/g):null}function parseDom(e){var e=$(e),t={},r=[],n=e.attr("required");n&&(r.push("required"),t.required=!0);var a=e.attr("type");if(a&&"submit"!=a&&"cancel"!=a&&"checkbox"!=a&&"radio"!=a&&"select"!=a&&"select-one"!=a&&"file"!=a&&"hidden"!=a&&"textarea"!=a){if(!Rule.getRule(a))throw new Error('Form field with type "'+a+'" not supported!');r.push(a)}var i=e.attr("min");i&&r.push('min{"min":"'+i+'"}');var l=e.attr("max");l&&r.push("max{max:"+l+"}");var u=e.attr("minlength");u&&r.push("minlength{min:"+u+"}");var s=e.attr("maxlength");s&&r.push("maxlength{max:"+s+"}");var o=e.attr("pattern");if(o){var c=new RegExp(o),f=unique();Rule.addRule(f,c),r.push(f)}var d=e.attr("data-rule");return d=d&&parseRules(d),d&&(r=r.concat(d)),t.rule=0==r.length?null:r.join(" "),t}function parseJSON(str){function getValue(str){return'"'==str.charAt(0)&&'"'==str.charAt(str.length-1)||"'"==str.charAt(0)&&"'"==str.charAt(str.length-1)?eval(str):str}if(!str)return null;var NOTICE='Invalid option object "'+str+'".';str=str.slice(1,-1);var result={},arr=str.split(",");return $.each(arr,function(e,t){if(arr[e]=$.trim(t),!arr[e])throw new Error(NOTICE);var r=arr[e].split(":"),n=$.trim(r[0]),a=$.trim(r[1]);if(!n||!a)throw new Error(NOTICE);result[getValue(n)]=$.trim(getValue(a))}),result}function isHidden(e){var t=e[0].offsetWidth,r=e[0].offsetHeight,n="TR"===e.prop("tagName");return 0!==t||0!==r||n?0===t||0===r||n?"none"===e.css("display"):!1:!0}var $=require("jquery"),Rule=require("arale-validator/0.10.1/src/rule"),u_count=0,helpers={};module.exports={parseRule:function(e){var t=e.match(/([^{}:\s]*)(\{[^\{\}]*\})?/);return{name:t[1],param:parseJSON(t[2])}},parseRules:parseRules,parseDom:parseDom,isHidden:isHidden,helper:function(e,t){return t?(helpers[e]=t,this):helpers[e]}}}),define("arale-validator/0.10.1/src/rule",["jquery"],function(e,t,r){function n(e,t){var r=this;if(r.name=e,t instanceof RegExp)r.operator=function(e,r){var n=t.test(o(e.element).val());r(n?null:e.rule,i(e,n))};else{if(!o.isFunction(t))throw new Error("The second argument must be a regexp or a function.");r.operator=function(e,r){var n=t.call(this,e,function(t,n){r(t?null:e.rule,n||i(e,t))});void 0!==n&&r(n?null:e.rule,i(e,n))}}}function a(e,t,r){return o.isPlainObject(e)?(o.each(e,function(e,t){o.isArray(t)?a(e,t[0],t[1]):a(e,t)}),this):(c[e]=t instanceof n?new n(e,t.operator):new n(e,t),l(e,r),this)}function i(e,t){var r,n=e.rule;return e.message?o.isPlainObject(e.message)?(r=e.message[t?"success":"failure"],"undefined"==typeof r&&(r=f[n][t?"success":"failure"])):r=t?"":e.message:r=f[n][t?"success":"failure"],r?s(e,r):r}function l(e,t){return o.isPlainObject(e)?(o.each(e,function(e,t){l(e,t)}),this):(f[e]=o.isPlainObject(t)?t:{failure:t},this)}function u(e,t){if(t){var r=c[e];return new n(null,function(e,n){r.operator(o.extend(null,e,t),n)})}return c[e]}function s(e,t){var r=t,n=/\{\{[^\{\}]*\}\}/g,a=/\{\{(.*)\}\}/,i=t.match(n);return i&&o.each(i,function(t,n){var i=n.match(a)[1],l=e[o.trim(i)];r=r.replace(n,l)}),r}var o=e("jquery"),c={},f={};n.prototype.and=function(e,t){var r=e instanceof n?e:u(e,t);if(!r)throw new Error('No rule with name "'+e+'" found.');var a=this,l=function(e,t){a.operator.call(this,e,function(n){n?t(n,i(e,!n)):r.operator.call(this,e,t)})};return new n(null,l)},n.prototype.or=function(e,t){var r=e instanceof n?e:u(e,t);if(!r)throw new Error('No rule with name "'+e+'" found.');var a=this,l=function(e,t){a.operator.call(this,e,function(n){n?r.operator.call(this,e,t):t(null,i(e,!0))})};return new n(null,l)},n.prototype.not=function(e){var t=u(this.name,e),r=function(e,r){t.operator.call(this,e,function(t){t?r(null,i(e,!0)):r(!0,i(e,!1))})};return new n(null,r)},a("required",function(e){var t=o(e.element),r=t.attr("type");switch(r){case"checkbox":case"radio":var n=!1;return t.each(function(e,t){return o(t).prop("checked")?(n=!0,!1):void 0}),n;default:return Boolean(o.trim(t.val()))}},"\u8bf7\u8f93\u5165{{display}}"),a("email",/^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/,"{{display}}\u7684\u683c\u5f0f\u4e0d\u6b63\u786e"),a("text",/.*/),a("password",/.*/),a("radio",/.*/),a("checkbox",/.*/),a("url",/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,"{{display}}\u7684\u683c\u5f0f\u4e0d\u6b63\u786e"),a("number",/^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/,"{{display}}\u7684\u683c\u5f0f\u4e0d\u6b63\u786e"),a("digits",/^\s*\d+\s*$/,"{{display}}\u7684\u683c\u5f0f\u4e0d\u6b63\u786e"),a("date",/^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}\u5e74[01]?\d\u6708[0-3]?\d[\u65e5\u53f7]$/,"{{display}}\u7684\u683c\u5f0f\u4e0d\u6b63\u786e"),a("min",function(e){var t=e.element,r=e.min;return Number(t.val())>=Number(r)},"{{display}}\u5fc5\u987b\u5927\u4e8e\u6216\u8005\u7b49\u4e8e{{min}}"),a("max",function(e){var t=e.element,r=e.max;return Number(t.val())<=Number(r)},"{{display}}\u5fc5\u987b\u5c0f\u4e8e\u6216\u8005\u7b49\u4e8e{{max}}"),a("minlength",function(e){var t=e.element,r=t.val().length;return r>=Number(e.min)},"{{display}}\u7684\u957f\u5ea6\u5fc5\u987b\u5927\u4e8e\u6216\u7b49\u4e8e{{min}}"),a("maxlength",function(e){var t=e.element,r=t.val().length;return r<=Number(e.max)},"{{display}}\u7684\u957f\u5ea6\u5fc5\u987b\u5c0f\u4e8e\u6216\u7b49\u4e8e{{max}}"),a("mobile",/^1\d{10}$/,"\u8bf7\u8f93\u5165\u6b63\u786e\u7684{{display}}"),a("confirmation",function(e){var t=e.element,r=o(e.target);return t.val()==r.val()},"\u4e24\u6b21\u8f93\u5165\u7684{{display}}\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"),r.exports={addRule:a,setMessage:l,getMessage:function(e,t){return i(e,t)},getRule:u,getOperator:function(e){return c[e].operator}}}),define("arale-validator/0.10.1/src/item",["jquery","arale-widget/1.2.0/widget","arale-base/1.2.0/base","arale-class/1.2.0/class","arale-events/1.2.0/events"],function(e,t,r){function n(e){return(" "+e+" ").indexOf(" required ")>=0}function a(e,t,r){var n=u.extend({},e,{element:r.element,display:e&&e.display||r.get("display"),rule:t}),a=r.get("errormessage")||r.get("errormessage"+i(t));return a&&!n.message&&(n.message={failure:a}),n}function i(e){return e+="",e.charAt(0).toUpperCase()+e.slice(1)}function l(e,t,r){var n=e.element;if(!e.get("required")){var i=!1,l=n.attr("type");switch(l){case"checkbox":case"radio":var o=!1;n.each(function(e,t){return u(t).prop("checked")?(o=!0,!1):void 0}),i=o;break;default:i=!!n.val()}if(!i)return void(r&&r(null,null))}if(!u.isArray(t))throw new Error("No validation rule specified or not specified as an array.");var d=[];u.each(t,function(t,r){var n=s.parseRule(r),i=n.name,l=n.param,u=f.getOperator(i);if(!u)throw new Error('Validation rule with name "'+i+'" cannot be found.');var o=a(l,i,e);d.push(function(t){u.call(e._validator,o,t)})}),c.series(d,function(e,t){r&&r(e,t[t.length-1])})}var u=e("jquery"),s=e("arale-validator/0.10.1/src/utils"),o=e("arale-widget/1.2.0/widget"),c=e("arale-validator/0.10.1/src/async"),f=e("arale-validator/0.10.1/src/rule"),d={value:u.noop,setter:function(e){return u.isFunction(e)?e:s.helper(e)}},m=o.extend({attrs:{rule:{value:"",getter:function(e){return e=u.trim(e),this.get("required")?e&&n(e)||(e=u.trim("required "+e)):n(e)&&(e=u.trim((" "+e+" ").replace(" required "," "))),e}},display:null,displayHelper:null,triggerType:{getter:function(e){if(!e)return e;var t=this.element,r=t.attr("type"),n=t.is("select")||"radio"==r||"checkbox"==r;return n&&(e.indexOf("blur")>-1||e.indexOf("key")>-1)?"change":e}},required:{value:!1,getter:function(e){return u.isFunction(e)?e():e}},checkNull:!0,errormessage:null,onItemValidate:d,onItemValidated:d,showMessage:d,hideMessage:d},setup:function(){!this.get("display")&&u.isFunction(this.get("displayHelper"))&&this.set("display",this.get("displayHelper")(this))},execute:function(e,t){var r=this,n=!!r.element.attr("disabled");if(t=t||{},r.get("skipHidden")&&s.isHidden(r.element)||n)return e&&e(null,"",r.element),r;r.trigger("itemValidate",r.element,t.event);var a=s.parseRules(r.get("rule"));return a?l(r,a,function(n,a){r.trigger("itemValidated",n,a,r.element,t.event),e&&e(n,a,r.element)}):e&&e(null,"",r.element),r},getMessage:function(e,t,r){var n="",i=this,l=s.parseRules(i.get("rule"));return t=!!t,u.each(l,function(l,o){var c=s.parseRule(o),d=c.name,m=c.param;e===d&&(n=f.getMessage(u.extend(r||{},a(m,d,i)),t))}),n}});r.exports=m});