define("handlebars-helper-is/0.0.4/index",[],function(n,t,r){var e=function(n){return"[object Array]"===Object.prototype.toString.call(n)},i=function(){this.expressions=[]};i.prototype.add=function(n,t){this.expressions[n]=t},i.prototype.call=function(n,t,r){if(!this.expressions.hasOwnProperty(n))throw new Error('Unknown operator "'+n+'"');return this.expressions[n](t,r)};var o=new i;o.add("not",function(n,t){return n!=t}),o.add(">",function(n,t){return n>t}),o.add("<",function(n,t){return t>n}),o.add(">=",function(n,t){return n>=t}),o.add("<=",function(n,t){return t>=n}),o.add("===",function(n,t){return n===t}),o.add("!==",function(n,t){return n!==t}),o.add("in",function(n,t){return e(t)||(t=t.split(",")),-1!==t.indexOf(n)});var s=function(){var n=arguments,t=n[0],r=n[1],e=n[2],i=n[3];return 2==n.length?(i=n[1],t?i.fn(this):i.inverse(this)):3==n.length?(e=n[1],i=n[2],t==e?i.fn(this):i.inverse(this)):o.call(r,t,e)?i.fn(this):i.inverse(this)};r.exports=s});