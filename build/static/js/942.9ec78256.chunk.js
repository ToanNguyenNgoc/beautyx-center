"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[942],{22740:e=>{e.exports=function(e,t,n,i,o,r,a,l){if(!e){var s;if(void 0===t)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,i,o,r,a,l],d=0;(s=new Error(t.replace(/%s/g,(function(){return c[d++]})))).name="Invariant Violation"}throw s.framesToPop=1,s}}},33895:(e,t,n)=>{n.d(t,{q6:()=>ee,Zj:()=>ie,D:()=>V});var i=n(58168);var o=n(27800);function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var i,o,r,a,l=[],s=!0,c=!1;try{if(r=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(i=r.call(n)).done)&&(l.push(i.value),l.length!==t);s=!0);}catch(e){c=!0,o=e}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(c)throw o}}return l}}(e,t)||(0,o.A)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var a=n(64467);function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&i.push.apply(i,Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach((function(t){(0,a.A)(e,t,n[t])}))}return e}var s=n(23029),c=n(92901),d=n(56822),h=n(53954),u=n(85501),f=n(31798),p=n(65043),g=n(97950),y=n(22740),v=n.n(y),m=n(43145);function x(e){return function(e){if(Array.isArray(e))return(0,m.A)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,o.A)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var w=n(65173),b=n.n(w),A=function(){function e(){(0,s.A)(this,e),(0,a.A)(this,"refs",{})}return(0,c.A)(e,[{key:"add",value:function(e,t){this.refs[e]||(this.refs[e]=[]),this.refs[e].push(t)}},{key:"remove",value:function(e,t){var n=this.getIndex(e,t);-1!==n&&this.refs[e].splice(n,1)}},{key:"isActive",value:function(){return this.active}},{key:"getActive",value:function(){var e=this;return this.refs[this.active.collection].find((function(t){return t.node.sortableInfo.index==e.active.index}))}},{key:"getIndex",value:function(e,t){return this.refs[e].indexOf(t)}},{key:"getOrderedRefs",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.active.collection;return this.refs[e].sort(S)}}]),e}();function S(e,t){return e.node.sortableInfo.index-t.node.sortableInfo.index}function C(e,t){return Object.keys(e).reduce((function(n,i){return-1===t.indexOf(i)&&(n[i]=e[i]),n}),{})}var O={end:["touchend","touchcancel","mouseup"],move:["touchmove","mousemove"],start:["touchstart","mousedown"]},T=function(){if("undefined"===typeof window||"undefined"===typeof document)return"";var e=window.getComputedStyle(document.documentElement,"")||["-moz-hidden-iframe"],t=(Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/)||""===e.OLink&&["","o"])[1];return"ms"===t?"ms":t&&t.length?t[0].toUpperCase()+t.substr(1):""}();function I(e,t){Object.keys(t).forEach((function(n){e.style[n]=t[n]}))}function k(e,t){e.style["".concat(T,"Transform")]=null==t?"":"translate3d(".concat(t.x,"px,").concat(t.y,"px,0)")}function E(e,t){e.style["".concat(T,"TransitionDuration")]=null==t?"":"".concat(t,"ms")}function R(e,t){for(;e;){if(t(e))return e;e=e.parentNode}return null}function D(e,t,n){return Math.max(e,Math.min(n,t))}function N(e){return"px"===e.substr(-2)?parseFloat(e):0}function M(e,t){var n=t.displayName||t.name;return n?"".concat(e,"(").concat(n,")"):e}function W(e,t){var n=e.getBoundingClientRect();return{top:n.top+t.top,left:n.left+t.left}}function L(e){return e.touches&&e.touches.length?{x:e.touches[0].pageX,y:e.touches[0].pageY}:e.changedTouches&&e.changedTouches.length?{x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY}:{x:e.pageX,y:e.pageY}}function H(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{left:0,top:0};if(e){var i={left:n.left+e.offsetLeft,top:n.top+e.offsetTop};return e.parentNode===t?i:H(e.parentNode,t,i)}}function K(e){var t=e.lockOffset,n=e.width,i=e.height,o=t,r=t,a="px";if("string"===typeof t){var l=/^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(t);v()(null!==l,'lockOffset value should be a number or a string of a number followed by "px" or "%". Given %s',t),o=parseFloat(t),r=parseFloat(t),a=l[1]}return v()(isFinite(o)&&isFinite(r),"lockOffset value should be a finite. Given %s",t),"%"===a&&(o=o*n/100,r=r*i/100),{x:o,y:r}}function P(e){return e instanceof HTMLElement?function(e){var t=window.getComputedStyle(e),n=/(auto|scroll)/;return["overflow","overflowX","overflowY"].find((function(e){return n.test(t[e])}))}(e)?e:P(e.parentNode):null}var j=27,G=32,B=37,X=38,U=39,Y=40,F={Anchor:"A",Button:"BUTTON",Canvas:"CANVAS",Input:"INPUT",Option:"OPTION",Textarea:"TEXTAREA",Select:"SELECT"};function V(e){var t,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{withRef:!1};return n=t=function(t){function n(){var e,t;(0,s.A)(this,n);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return t=(0,d.A)(this,(e=(0,h.A)(n)).call.apply(e,[this].concat(o))),(0,a.A)((0,f.A)((0,f.A)(t)),"wrappedInstance",(0,p.createRef)()),t}return(0,u.A)(n,t),(0,c.A)(n,[{key:"componentDidMount",value:function(){(0,g.findDOMNode)(this).sortableHandle=!0}},{key:"getWrappedInstance",value:function(){return v()(o.withRef,"To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call"),this.wrappedInstance.current}},{key:"render",value:function(){var t=o.withRef?this.wrappedInstance:null;return(0,p.createElement)(e,(0,i.A)({ref:t},this.props))}}]),n}(p.Component),(0,a.A)(t,"displayName",M("sortableHandle",e)),n}function _(e){return null!=e.sortableHandle}var q=function(){function e(t,n){(0,s.A)(this,e),this.container=t,this.onScrollCallback=n}return(0,c.A)(e,[{key:"clear",value:function(){null!=this.interval&&(clearInterval(this.interval),this.interval=null)}},{key:"update",value:function(e){var t=this,n=e.translate,i=e.minTranslate,o=e.maxTranslate,r=e.width,a=e.height,l={x:0,y:0},s={x:1,y:1},c=10,d=10,h=this.container,u=h.scrollTop,f=h.scrollLeft,p=h.scrollHeight,g=h.scrollWidth,y=0===u,v=p-u-h.clientHeight===0,m=0===f,x=g-f-h.clientWidth===0;n.y>=o.y-a/2&&!v?(l.y=1,s.y=d*Math.abs((o.y-a/2-n.y)/a)):n.x>=o.x-r/2&&!x?(l.x=1,s.x=c*Math.abs((o.x-r/2-n.x)/r)):n.y<=i.y+a/2&&!y?(l.y=-1,s.y=d*Math.abs((n.y-a/2-i.y)/a)):n.x<=i.x+r/2&&!m&&(l.x=-1,s.x=c*Math.abs((n.x-r/2-i.x)/r)),this.interval&&(this.clear(),this.isAutoScrolling=!1),0===l.x&&0===l.y||(this.interval=setInterval((function(){t.isAutoScrolling=!0;var e={left:s.x*l.x,top:s.y*l.y};t.container.scrollTop+=e.top,t.container.scrollLeft+=e.left,t.onScrollCallback(e)}),5))}}]),e}();var z={axis:b().oneOf(["x","y","xy"]),contentWindow:b().any,disableAutoscroll:b().bool,distance:b().number,getContainer:b().func,getHelperDimensions:b().func,helperClass:b().string,helperContainer:b().oneOfType([b().func,"undefined"===typeof HTMLElement?b().any:b().instanceOf(HTMLElement)]),hideSortableGhost:b().bool,keyboardSortingTransitionDuration:b().number,lockAxis:b().string,lockOffset:b().oneOfType([b().number,b().string,b().arrayOf(b().oneOfType([b().number,b().string]))]),lockToContainerEdges:b().bool,onSortEnd:b().func,onSortMove:b().func,onSortOver:b().func,onSortStart:b().func,pressDelay:b().number,pressThreshold:b().number,keyCodes:b().shape({lift:b().arrayOf(b().number),drop:b().arrayOf(b().number),cancel:b().arrayOf(b().number),up:b().arrayOf(b().number),down:b().arrayOf(b().number)}),shouldCancelStart:b().func,transitionDuration:b().number,updateBeforeSortStart:b().func,useDragHandle:b().bool,useWindowAsScrollContainer:b().bool},Z={lift:[G],drop:[G],cancel:[j],up:[X,B],down:[Y,U]},$={axis:"y",disableAutoscroll:!1,distance:0,getHelperDimensions:function(e){var t=e.node;return{height:t.offsetHeight,width:t.offsetWidth}},hideSortableGhost:!0,lockOffset:"50%",lockToContainerEdges:!1,pressDelay:0,pressThreshold:5,keyCodes:Z,shouldCancelStart:function(e){return-1!==[F.Input,F.Textarea,F.Select,F.Option,F.Button].indexOf(e.target.tagName)||!!R(e.target,(function(e){return"true"===e.contentEditable}))},transitionDuration:300,useWindowAsScrollContainer:!1},J=Object.keys(z);var Q=(0,p.createContext)({manager:{}});function ee(e){var t,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{withRef:!1};return n=t=function(t){function n(e){var t;(0,s.A)(this,n),t=(0,d.A)(this,(0,h.A)(n).call(this,e)),(0,a.A)((0,f.A)((0,f.A)(t)),"state",{}),(0,a.A)((0,f.A)((0,f.A)(t)),"handleStart",(function(e){var n=t.props,i=n.distance,o=n.shouldCancelStart;if(2!==e.button&&!o(e)){t.touched=!0,t.position=L(e);var r=R(e.target,(function(e){return null!=e.sortableInfo}));if(r&&r.sortableInfo&&t.nodeIsChild(r)&&!t.state.sorting){var a=t.props.useDragHandle,l=r.sortableInfo,s=l.index,c=l.collection;if(l.disabled)return;if(a&&!R(e.target,_))return;t.manager.active={collection:c,index:s},function(e){return e.touches&&e.touches.length||e.changedTouches&&e.changedTouches.length}(e)||e.target.tagName!==F.Anchor||e.preventDefault(),i||(0===t.props.pressDelay?t.handlePress(e):t.pressTimer=setTimeout((function(){return t.handlePress(e)}),t.props.pressDelay))}}})),(0,a.A)((0,f.A)((0,f.A)(t)),"nodeIsChild",(function(e){return e.sortableInfo.manager===t.manager})),(0,a.A)((0,f.A)((0,f.A)(t)),"handleMove",(function(e){var n=t.props,i=n.distance,o=n.pressThreshold;if(!t.state.sorting&&t.touched&&!t._awaitingUpdateBeforeSortStart){var r=L(e),a={x:t.position.x-r.x,y:t.position.y-r.y},l=Math.abs(a.x)+Math.abs(a.y);t.delta=a,i||o&&!(l>=o)?i&&l>=i&&t.manager.isActive()&&t.handlePress(e):(clearTimeout(t.cancelTimer),t.cancelTimer=setTimeout(t.cancel,0))}})),(0,a.A)((0,f.A)((0,f.A)(t)),"handleEnd",(function(){t.touched=!1,t.cancel()})),(0,a.A)((0,f.A)((0,f.A)(t)),"cancel",(function(){var e=t.props.distance;t.state.sorting||(e||clearTimeout(t.pressTimer),t.manager.active=null)})),(0,a.A)((0,f.A)((0,f.A)(t)),"handlePress",(function(e){try{var n=t.manager.getActive(),i=function(){if(n){var i=function(){var n=f.sortableInfo.index,i=function(e){var t=window.getComputedStyle(e);return{bottom:N(t.marginBottom),left:N(t.marginLeft),right:N(t.marginRight),top:N(t.marginTop)}}(f),o=function(e){var t=window.getComputedStyle(e);return"grid"===t.display?{x:N(t.gridColumnGap),y:N(t.gridRowGap)}:{x:0,y:0}}(t.container),d=t.scrollContainer.getBoundingClientRect(),y=a({index:n,node:f,collection:p});if(t.node=f,t.margin=i,t.gridGap=o,t.width=y.width,t.height=y.height,t.marginOffset={x:t.margin.left+t.margin.right+t.gridGap.x,y:Math.max(t.margin.top,t.margin.bottom,t.gridGap.y)},t.boundingClientRect=f.getBoundingClientRect(),t.containerBoundingRect=d,t.index=n,t.newIndex=n,t.axis={x:r.indexOf("x")>=0,y:r.indexOf("y")>=0},t.offsetEdge=H(f,t.container),t.initialOffset=L(g?l({},e,{pageX:t.boundingClientRect.left,pageY:t.boundingClientRect.top}):e),t.initialScroll={left:t.scrollContainer.scrollLeft,top:t.scrollContainer.scrollTop},t.initialWindowScroll={left:window.pageXOffset,top:window.pageYOffset},t.helper=t.helperContainer.appendChild(function(e){var t="input, textarea, select, canvas, [contenteditable]",n=e.querySelectorAll(t),i=e.cloneNode(!0);return x(i.querySelectorAll(t)).forEach((function(e,t){"file"!==e.type&&(e.value=n[t].value),"radio"===e.type&&e.name&&(e.name="__sortableClone__".concat(e.name)),e.tagName===F.Canvas&&n[t].width>0&&n[t].height>0&&e.getContext("2d").drawImage(n[t],0,0)})),i}(f)),I(t.helper,{boxSizing:"border-box",height:"".concat(t.height,"px"),left:"".concat(t.boundingClientRect.left-i.left,"px"),pointerEvents:"none",position:"fixed",top:"".concat(t.boundingClientRect.top-i.top,"px"),width:"".concat(t.width,"px")}),g&&t.helper.focus(),c&&(t.sortableGhost=f,I(f,{opacity:0,visibility:"hidden"})),t.minTranslate={},t.maxTranslate={},g){var v=u?{top:0,left:0,width:t.contentWindow.innerWidth,height:t.contentWindow.innerHeight}:t.containerBoundingRect,m=v.top,w=v.left,b=v.width,A=m+v.height,S=w+b;t.axis.x&&(t.minTranslate.x=w-t.boundingClientRect.left,t.maxTranslate.x=S-(t.boundingClientRect.left+t.width)),t.axis.y&&(t.minTranslate.y=m-t.boundingClientRect.top,t.maxTranslate.y=A-(t.boundingClientRect.top+t.height))}else t.axis.x&&(t.minTranslate.x=(u?0:d.left)-t.boundingClientRect.left-t.width/2,t.maxTranslate.x=(u?t.contentWindow.innerWidth:d.left+d.width)-t.boundingClientRect.left-t.width/2),t.axis.y&&(t.minTranslate.y=(u?0:d.top)-t.boundingClientRect.top-t.height/2,t.maxTranslate.y=(u?t.contentWindow.innerHeight:d.top+d.height)-t.boundingClientRect.top-t.height/2);s&&s.split(" ").forEach((function(e){return t.helper.classList.add(e)})),t.listenerNode=e.touches?e.target:t.contentWindow,g?(t.listenerNode.addEventListener("wheel",t.handleKeyEnd,!0),t.listenerNode.addEventListener("mousedown",t.handleKeyEnd,!0),t.listenerNode.addEventListener("keydown",t.handleKeyDown)):(O.move.forEach((function(e){return t.listenerNode.addEventListener(e,t.handleSortMove,!1)})),O.end.forEach((function(e){return t.listenerNode.addEventListener(e,t.handleSortEnd,!1)}))),t.setState({sorting:!0,sortingIndex:n}),h&&h({node:f,index:n,collection:p,isKeySorting:g,nodes:t.manager.getOrderedRefs(),helper:t.helper},e),g&&t.keyMove(0)},o=t.props,r=o.axis,a=o.getHelperDimensions,s=o.helperClass,c=o.hideSortableGhost,d=o.updateBeforeSortStart,h=o.onSortStart,u=o.useWindowAsScrollContainer,f=n.node,p=n.collection,g=t.manager.isKeySorting,y=function(){if("function"===typeof d){t._awaitingUpdateBeforeSortStart=!0;var n=function(e,t){try{var n=e()}catch(i){return t(!0,i)}return n&&n.then?n.then(t.bind(null,!1),t.bind(null,!0)):t(!1,value)}((function(){var t=f.sortableInfo.index;return Promise.resolve(d({collection:p,index:t,node:f,isKeySorting:g},e)).then((function(){}))}),(function(e,n){if(t._awaitingUpdateBeforeSortStart=!1,e)throw n;return n}));if(n&&n.then)return n.then((function(){}))}}();return y&&y.then?y.then(i):i()}}();return Promise.resolve(i&&i.then?i.then((function(){})):void 0)}catch(o){return Promise.reject(o)}})),(0,a.A)((0,f.A)((0,f.A)(t)),"handleSortMove",(function(e){var n=t.props.onSortMove;"function"===typeof e.preventDefault&&e.cancelable&&e.preventDefault(),t.updateHelperPosition(e),t.animateNodes(),t.autoscroll(),n&&n(e)})),(0,a.A)((0,f.A)((0,f.A)(t)),"handleSortEnd",(function(e){var n=t.props,i=n.hideSortableGhost,o=n.onSortEnd,r=t.manager,a=r.active.collection,l=r.isKeySorting,s=t.manager.getOrderedRefs();t.listenerNode&&(l?(t.listenerNode.removeEventListener("wheel",t.handleKeyEnd,!0),t.listenerNode.removeEventListener("mousedown",t.handleKeyEnd,!0),t.listenerNode.removeEventListener("keydown",t.handleKeyDown)):(O.move.forEach((function(e){return t.listenerNode.removeEventListener(e,t.handleSortMove)})),O.end.forEach((function(e){return t.listenerNode.removeEventListener(e,t.handleSortEnd)})))),t.helper.parentNode.removeChild(t.helper),i&&t.sortableGhost&&I(t.sortableGhost,{opacity:"",visibility:""});for(var c=0,d=s.length;c<d;c++){var h=s[c],u=h.node;h.edgeOffset=null,h.boundingClientRect=null,k(u,null),E(u,null),h.translate=null}t.autoScroller.clear(),t.manager.active=null,t.manager.isKeySorting=!1,t.setState({sorting:!1,sortingIndex:null}),"function"===typeof o&&o({collection:a,newIndex:t.newIndex,oldIndex:t.index,isKeySorting:l,nodes:s},e),t.touched=!1})),(0,a.A)((0,f.A)((0,f.A)(t)),"autoscroll",(function(){var e=t.props.disableAutoscroll,n=t.manager.isKeySorting;if(e)t.autoScroller.clear();else{if(n){var i=l({},t.translate),o=0,r=0;return t.axis.x&&(i.x=Math.min(t.maxTranslate.x,Math.max(t.minTranslate.x,t.translate.x)),o=t.translate.x-i.x),t.axis.y&&(i.y=Math.min(t.maxTranslate.y,Math.max(t.minTranslate.y,t.translate.y)),r=t.translate.y-i.y),t.translate=i,k(t.helper,t.translate),t.scrollContainer.scrollLeft+=o,void(t.scrollContainer.scrollTop+=r)}t.autoScroller.update({height:t.height,maxTranslate:t.maxTranslate,minTranslate:t.minTranslate,translate:t.translate,width:t.width})}})),(0,a.A)((0,f.A)((0,f.A)(t)),"onAutoScroll",(function(e){t.translate.x+=e.left,t.translate.y+=e.top,t.animateNodes()})),(0,a.A)((0,f.A)((0,f.A)(t)),"handleKeyDown",(function(e){var n=e.keyCode,i=t.props,o=i.shouldCancelStart,r=i.keyCodes,a=l({},Z,void 0===r?{}:r);t.manager.active&&!t.manager.isKeySorting||!(t.manager.active||a.lift.includes(n)&&!o(e)&&t.isValidSortingTarget(e))||(e.stopPropagation(),e.preventDefault(),a.lift.includes(n)&&!t.manager.active?t.keyLift(e):a.drop.includes(n)&&t.manager.active?t.keyDrop(e):a.cancel.includes(n)?(t.newIndex=t.manager.active.index,t.keyDrop(e)):a.up.includes(n)?t.keyMove(-1):a.down.includes(n)&&t.keyMove(1))})),(0,a.A)((0,f.A)((0,f.A)(t)),"keyLift",(function(e){var n=e.target,i=R(n,(function(e){return null!=e.sortableInfo})).sortableInfo,o=i.index,r=i.collection;t.initialFocusedNode=n,t.manager.isKeySorting=!0,t.manager.active={index:o,collection:r},t.handlePress(e)})),(0,a.A)((0,f.A)((0,f.A)(t)),"keyMove",(function(e){var n=t.manager.getOrderedRefs(),i=n[n.length-1].node.sortableInfo.index,o=t.newIndex+e,r=t.newIndex;if(!(o<0||o>i)){t.prevIndex=r,t.newIndex=o;var a=function(e,t,n){return e<n&&e>t?e-1:e>n&&e<t?e+1:e}(t.newIndex,t.prevIndex,t.index),l=n.find((function(e){return e.node.sortableInfo.index===a})),s=l.node,c=t.containerScrollDelta,d=l.boundingClientRect||W(s,c),h=l.translate||{x:0,y:0},u=d.top+h.y-c.top,f=d.left+h.x-c.left,p=r<o,g=p&&t.axis.x?s.offsetWidth-t.width:0,y=p&&t.axis.y?s.offsetHeight-t.height:0;t.handleSortMove({pageX:f+g,pageY:u+y,ignoreTransition:0===e})}})),(0,a.A)((0,f.A)((0,f.A)(t)),"keyDrop",(function(e){t.handleSortEnd(e),t.initialFocusedNode&&t.initialFocusedNode.focus()})),(0,a.A)((0,f.A)((0,f.A)(t)),"handleKeyEnd",(function(e){t.manager.active&&t.keyDrop(e)})),(0,a.A)((0,f.A)((0,f.A)(t)),"isValidSortingTarget",(function(e){var n=t.props.useDragHandle,i=e.target,o=R(i,(function(e){return null!=e.sortableInfo}));return o&&o.sortableInfo&&!o.sortableInfo.disabled&&(n?_(i):i.sortableInfo)}));var i=new A;return function(e){v()(!(e.distance&&e.pressDelay),"Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.")}(e),t.manager=i,t.wrappedInstance=(0,p.createRef)(),t.sortableContextValue={manager:i},t.events={end:t.handleEnd,move:t.handleMove,start:t.handleStart},t}return(0,u.A)(n,t),(0,c.A)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.useWindowAsScrollContainer,n=this.getContainer();Promise.resolve(n).then((function(n){e.container=n,e.document=e.container.ownerDocument||document;var i=e.props.contentWindow||e.document.defaultView||window;e.contentWindow="function"===typeof i?i():i,e.scrollContainer=t?e.document.scrollingElement||e.document.documentElement:P(e.container)||e.container,e.autoScroller=new q(e.scrollContainer,e.onAutoScroll),Object.keys(e.events).forEach((function(t){return O[t].forEach((function(n){return e.container.addEventListener(n,e.events[t],!1)}))})),e.container.addEventListener("keydown",e.handleKeyDown)}))}},{key:"componentWillUnmount",value:function(){var e=this;this.helper&&this.helper.parentNode&&this.helper.parentNode.removeChild(this.helper),this.container&&(Object.keys(this.events).forEach((function(t){return O[t].forEach((function(n){return e.container.removeEventListener(n,e.events[t])}))})),this.container.removeEventListener("keydown",this.handleKeyDown))}},{key:"updateHelperPosition",value:function(e){var t=this.props,n=t.lockAxis,i=t.lockOffset,o=t.lockToContainerEdges,a=t.transitionDuration,l=t.keyboardSortingTransitionDuration,s=void 0===l?a:l,c=this.manager.isKeySorting,d=e.ignoreTransition,h=L(e),u={x:h.x-this.initialOffset.x,y:h.y-this.initialOffset.y};if(u.y-=window.pageYOffset-this.initialWindowScroll.top,u.x-=window.pageXOffset-this.initialWindowScroll.left,this.translate=u,o){var f=function(e){var t=e.height,n=e.width,i=e.lockOffset,o=Array.isArray(i)?i:[i,i];v()(2===o.length,"lockOffset prop of SortableContainer should be a single value or an array of exactly two values. Given %s",i);var a=r(o,2),l=a[0],s=a[1];return[K({height:t,lockOffset:l,width:n}),K({height:t,lockOffset:s,width:n})]}({height:this.height,lockOffset:i,width:this.width}),p=r(f,2),g=p[0],y=p[1],m={x:this.width/2-g.x,y:this.height/2-g.y},x={x:this.width/2-y.x,y:this.height/2-y.y};u.x=D(this.minTranslate.x+m.x,this.maxTranslate.x-x.x,u.x),u.y=D(this.minTranslate.y+m.y,this.maxTranslate.y-x.y,u.y)}"x"===n?u.y=0:"y"===n&&(u.x=0),c&&s&&!d&&E(this.helper,s),k(this.helper,u)}},{key:"animateNodes",value:function(){var e=this.props,t=e.transitionDuration,n=e.hideSortableGhost,i=e.onSortOver,o=this.containerScrollDelta,r=this.windowScrollDelta,a=this.manager.getOrderedRefs(),l=this.offsetEdge.left+this.translate.x+o.left,s=this.offsetEdge.top+this.translate.y+o.top,c=this.manager.isKeySorting,d=this.newIndex;this.newIndex=null;for(var h=0,u=a.length;h<u;h++){var f=a[h].node,p=f.sortableInfo.index,g=f.offsetWidth,y=f.offsetHeight,v={height:this.height>y?y/2:this.height/2,width:this.width>g?g/2:this.width/2},m=c&&p>this.index&&p<=d,x=c&&p<this.index&&p>=d,w={x:0,y:0},b=a[h].edgeOffset;b||(b=H(f,this.container),a[h].edgeOffset=b,c&&(a[h].boundingClientRect=W(f,o)));var A=h<a.length-1&&a[h+1],S=h>0&&a[h-1];A&&!A.edgeOffset&&(A.edgeOffset=H(A.node,this.container),c&&(A.boundingClientRect=W(A.node,o))),p!==this.index?(t&&E(f,t),this.axis.x?this.axis.y?x||p<this.index&&(l+r.left-v.width<=b.left&&s+r.top<=b.top+v.height||s+r.top+v.height<=b.top)?(w.x=this.width+this.marginOffset.x,b.left+w.x>this.containerBoundingRect.width-v.width&&A&&(w.x=A.edgeOffset.left-b.left,w.y=A.edgeOffset.top-b.top),null===this.newIndex&&(this.newIndex=p)):(m||p>this.index&&(l+r.left+v.width>=b.left&&s+r.top+v.height>=b.top||s+r.top+v.height>=b.top+y))&&(w.x=-(this.width+this.marginOffset.x),b.left+w.x<this.containerBoundingRect.left+v.width&&S&&(w.x=S.edgeOffset.left-b.left,w.y=S.edgeOffset.top-b.top),this.newIndex=p):m||p>this.index&&l+r.left+v.width>=b.left?(w.x=-(this.width+this.marginOffset.x),this.newIndex=p):(x||p<this.index&&l+r.left<=b.left+v.width)&&(w.x=this.width+this.marginOffset.x,null==this.newIndex&&(this.newIndex=p)):this.axis.y&&(m||p>this.index&&s+r.top+v.height>=b.top?(w.y=-(this.height+this.marginOffset.y),this.newIndex=p):(x||p<this.index&&s+r.top<=b.top+v.height)&&(w.y=this.height+this.marginOffset.y,null==this.newIndex&&(this.newIndex=p))),k(f,w),a[h].translate=w):n&&(this.sortableGhost=f,I(f,{opacity:0,visibility:"hidden"}))}null==this.newIndex&&(this.newIndex=this.index),c&&(this.newIndex=d);var C=c?this.prevIndex:d;i&&this.newIndex!==C&&i({collection:this.manager.active.collection,index:this.index,newIndex:this.newIndex,oldIndex:C,isKeySorting:c,nodes:a,helper:this.helper})}},{key:"getWrappedInstance",value:function(){return v()(o.withRef,"To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call"),this.wrappedInstance.current}},{key:"getContainer",value:function(){var e=this.props.getContainer;return"function"!==typeof e?(0,g.findDOMNode)(this):e(o.withRef?this.getWrappedInstance():void 0)}},{key:"render",value:function(){var t=o.withRef?this.wrappedInstance:null;return(0,p.createElement)(Q.Provider,{value:this.sortableContextValue},(0,p.createElement)(e,(0,i.A)({ref:t},C(this.props,J))))}},{key:"helperContainer",get:function(){var e=this.props.helperContainer;return"function"===typeof e?e():this.props.helperContainer||this.document.body}},{key:"containerScrollDelta",get:function(){return this.props.useWindowAsScrollContainer?{left:0,top:0}:{left:this.scrollContainer.scrollLeft-this.initialScroll.left,top:this.scrollContainer.scrollTop-this.initialScroll.top}}},{key:"windowScrollDelta",get:function(){return{left:this.contentWindow.pageXOffset-this.initialWindowScroll.left,top:this.contentWindow.pageYOffset-this.initialWindowScroll.top}}}]),n}(p.Component),(0,a.A)(t,"displayName",M("sortableList",e)),(0,a.A)(t,"defaultProps",$),(0,a.A)(t,"propTypes",z),n}var te={index:b().number.isRequired,collection:b().oneOfType([b().number,b().string]),disabled:b().bool},ne=Object.keys(te);function ie(e){var t,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{withRef:!1};return n=t=function(t){function n(){var e,t;(0,s.A)(this,n);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return t=(0,d.A)(this,(e=(0,h.A)(n)).call.apply(e,[this].concat(o))),(0,a.A)((0,f.A)((0,f.A)(t)),"wrappedInstance",(0,p.createRef)()),t}return(0,u.A)(n,t),(0,c.A)(n,[{key:"componentDidMount",value:function(){this.register()}},{key:"componentDidUpdate",value:function(e){this.node&&(e.index!==this.props.index&&(this.node.sortableInfo.index=this.props.index),e.disabled!==this.props.disabled&&(this.node.sortableInfo.disabled=this.props.disabled)),e.collection!==this.props.collection&&(this.unregister(e.collection),this.register())}},{key:"componentWillUnmount",value:function(){this.unregister()}},{key:"register",value:function(){var e=this.props,t=e.collection,n=e.disabled,i=e.index,o=(0,g.findDOMNode)(this);o.sortableInfo={collection:t,disabled:n,index:i,manager:this.context.manager},this.node=o,this.ref={node:o},this.context.manager.add(t,this.ref)}},{key:"unregister",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.props.collection;this.context.manager.remove(e,this.ref)}},{key:"getWrappedInstance",value:function(){return v()(o.withRef,"To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call"),this.wrappedInstance.current}},{key:"render",value:function(){var t=o.withRef?this.wrappedInstance:null;return(0,p.createElement)(e,(0,i.A)({ref:t},C(this.props,ne)))}}]),n}(p.Component),(0,a.A)(t,"displayName",M("sortableElement",e)),(0,a.A)(t,"contextType",Q),(0,a.A)(t,"propTypes",te),(0,a.A)(t,"defaultProps",{collection:0}),n}},12172:(e,t,n)=>{function i(e,t,n){return function(e,t,n){const i=t<0?e.length+t:t;if(i>=0&&i<e.length){const i=n<0?e.length+n:n,[o]=e.splice(t,1);e.splice(i,0,o)}}(e=[...e],t,n),e}n.d(t,{p:()=>i})}}]);
//# sourceMappingURL=942.9ec78256.chunk.js.map