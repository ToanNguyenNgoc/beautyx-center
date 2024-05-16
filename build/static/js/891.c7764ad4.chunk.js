"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[891],{92176:function(e){e.exports=function(e,t,n,i,o,r,a,s){if(!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,i,o,r,a,s],d=0;(l=new Error(t.replace(/%s/g,(function(){return c[d++]})))).name="Invariant Violation"}throw l.framesToPop=1,l}}},28488:function(e,t,n){n.d(t,{JN:function(){return ue},W8:function(){return ge},W6:function(){return ne}});var i=n(87462),o=n(70885),r=n(4942);function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&i.push.apply(i,Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach((function(t){(0,r.Z)(e,t,n[t])}))}return e}var s=n(15671),l=n(43144),c=n(82963),d=n(61120),h=n(60136),u=n(97326),f=n(72791),p=n(54164),g=n(92176),y=n.n(g),v=n(42982),x=n(52007),m=n.n(x),w=function(){function e(){(0,s.Z)(this,e),(0,r.Z)(this,"refs",{})}return(0,l.Z)(e,[{key:"add",value:function(e,t){this.refs[e]||(this.refs[e]=[]),this.refs[e].push(t)}},{key:"remove",value:function(e,t){var n=this.getIndex(e,t);-1!==n&&this.refs[e].splice(n,1)}},{key:"isActive",value:function(){return this.active}},{key:"getActive",value:function(){var e=this;return this.refs[this.active.collection].find((function(t){return t.node.sortableInfo.index==e.active.index}))}},{key:"getIndex",value:function(e,t){return this.refs[e].indexOf(t)}},{key:"getOrderedRefs",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.active.collection;return this.refs[e].sort(b)}}]),e}();function b(e,t){return e.node.sortableInfo.index-t.node.sortableInfo.index}function S(e,t){return Object.keys(e).reduce((function(n,i){return-1===t.indexOf(i)&&(n[i]=e[i]),n}),{})}var Z={end:["touchend","touchcancel","mouseup"],move:["touchmove","mousemove"],start:["touchstart","mousedown"]},C=function(){if("undefined"===typeof window||"undefined"===typeof document)return"";var e=window.getComputedStyle(document.documentElement,"")||["-moz-hidden-iframe"],t=(Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/)||""===e.OLink&&["","o"])[1];return"ms"===t?"ms":t&&t.length?t[0].toUpperCase()+t.substr(1):""}();function O(e,t){Object.keys(t).forEach((function(n){e.style[n]=t[n]}))}function T(e,t){e.style["".concat(C,"Transform")]=null==t?"":"translate3d(".concat(t.x,"px,").concat(t.y,"px,0)")}function k(e,t){e.style["".concat(C,"TransitionDuration")]=null==t?"":"".concat(t,"ms")}function I(e,t){for(;e;){if(t(e))return e;e=e.parentNode}return null}function E(e,t,n){return Math.max(e,Math.min(n,t))}function R(e){return"px"===e.substr(-2)?parseFloat(e):0}function D(e){var t=window.getComputedStyle(e);return{bottom:R(t.marginBottom),left:R(t.marginLeft),right:R(t.marginRight),top:R(t.marginTop)}}function N(e,t){var n=t.displayName||t.name;return n?"".concat(e,"(").concat(n,")"):e}function M(e,t){var n=e.getBoundingClientRect();return{top:n.top+t.top,left:n.left+t.left}}function W(e){return e.touches&&e.touches.length?{x:e.touches[0].pageX,y:e.touches[0].pageY}:e.changedTouches&&e.changedTouches.length?{x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY}:{x:e.pageX,y:e.pageY}}function A(e){return e.touches&&e.touches.length||e.changedTouches&&e.changedTouches.length}function L(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{left:0,top:0};if(e){var i={left:n.left+e.offsetLeft,top:n.top+e.offsetTop};return e.parentNode===t?i:L(e.parentNode,t,i)}}function H(e,t,n){return e<n&&e>t?e-1:e>n&&e<t?e+1:e}function K(e){var t=e.lockOffset,n=e.width,i=e.height,o=t,r=t,a="px";if("string"===typeof t){var s=/^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(t);y()(null!==s,'lockOffset value should be a number or a string of a number followed by "px" or "%". Given %s',t),o=parseFloat(t),r=parseFloat(t),a=s[1]}return y()(isFinite(o)&&isFinite(r),"lockOffset value should be a finite. Given %s",t),"%"===a&&(o=o*n/100,r=r*i/100),{x:o,y:r}}function P(e){var t=e.height,n=e.width,i=e.lockOffset,r=Array.isArray(i)?i:[i,i];y()(2===r.length,"lockOffset prop of SortableContainer should be a single value or an array of exactly two values. Given %s",i);var a=(0,o.Z)(r,2),s=a[0],l=a[1];return[K({height:t,lockOffset:s,width:n}),K({height:t,lockOffset:l,width:n})]}function G(e){return e instanceof HTMLElement?function(e){var t=window.getComputedStyle(e),n=/(auto|scroll)/;return["overflow","overflowX","overflowY"].find((function(e){return n.test(t[e])}))}(e)?e:G(e.parentNode):null}function B(e){var t=window.getComputedStyle(e);return"grid"===t.display?{x:R(t.gridColumnGap),y:R(t.gridRowGap)}:{x:0,y:0}}var j=27,X=32,U=37,Y=38,F=39,V=40,_="A",q="BUTTON",z="CANVAS",J="INPUT",$="OPTION",Q="TEXTAREA",ee="SELECT";function te(e){var t="input, textarea, select, canvas, [contenteditable]",n=e.querySelectorAll(t),i=e.cloneNode(!0);return(0,v.Z)(i.querySelectorAll(t)).forEach((function(e,t){("file"!==e.type&&(e.value=n[t].value),"radio"===e.type&&e.name&&(e.name="__sortableClone__".concat(e.name)),e.tagName===z&&n[t].width>0&&n[t].height>0)&&e.getContext("2d").drawImage(n[t],0,0)})),i}function ne(e){var t,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{withRef:!1};return n=t=function(t){function n(){var e,t;(0,s.Z)(this,n);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return t=(0,c.Z)(this,(e=(0,d.Z)(n)).call.apply(e,[this].concat(o))),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"wrappedInstance",(0,f.createRef)()),t}return(0,h.Z)(n,t),(0,l.Z)(n,[{key:"componentDidMount",value:function(){(0,p.findDOMNode)(this).sortableHandle=!0}},{key:"getWrappedInstance",value:function(){return y()(o.withRef,"To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call"),this.wrappedInstance.current}},{key:"render",value:function(){var t=o.withRef?this.wrappedInstance:null;return(0,f.createElement)(e,(0,i.Z)({ref:t},this.props))}}]),n}(f.Component),(0,r.Z)(t,"displayName",N("sortableHandle",e)),n}function ie(e){return null!=e.sortableHandle}var oe=function(){function e(t,n){(0,s.Z)(this,e),this.container=t,this.onScrollCallback=n}return(0,l.Z)(e,[{key:"clear",value:function(){null!=this.interval&&(clearInterval(this.interval),this.interval=null)}},{key:"update",value:function(e){var t=this,n=e.translate,i=e.minTranslate,o=e.maxTranslate,r=e.width,a=e.height,s={x:0,y:0},l={x:1,y:1},c=10,d=10,h=this.container,u=h.scrollTop,f=h.scrollLeft,p=h.scrollHeight,g=h.scrollWidth,y=0===u,v=p-u-h.clientHeight===0,x=0===f,m=g-f-h.clientWidth===0;n.y>=o.y-a/2&&!v?(s.y=1,l.y=d*Math.abs((o.y-a/2-n.y)/a)):n.x>=o.x-r/2&&!m?(s.x=1,l.x=c*Math.abs((o.x-r/2-n.x)/r)):n.y<=i.y+a/2&&!y?(s.y=-1,l.y=d*Math.abs((n.y-a/2-i.y)/a)):n.x<=i.x+r/2&&!x&&(s.x=-1,l.x=c*Math.abs((n.x-r/2-i.x)/r)),this.interval&&(this.clear(),this.isAutoScrolling=!1),0===s.x&&0===s.y||(this.interval=setInterval((function(){t.isAutoScrolling=!0;var e={left:l.x*s.x,top:l.y*s.y};t.container.scrollTop+=e.top,t.container.scrollLeft+=e.left,t.onScrollCallback(e)}),5))}}]),e}();var re={axis:m().oneOf(["x","y","xy"]),contentWindow:m().any,disableAutoscroll:m().bool,distance:m().number,getContainer:m().func,getHelperDimensions:m().func,helperClass:m().string,helperContainer:m().oneOfType([m().func,"undefined"===typeof HTMLElement?m().any:m().instanceOf(HTMLElement)]),hideSortableGhost:m().bool,keyboardSortingTransitionDuration:m().number,lockAxis:m().string,lockOffset:m().oneOfType([m().number,m().string,m().arrayOf(m().oneOfType([m().number,m().string]))]),lockToContainerEdges:m().bool,onSortEnd:m().func,onSortMove:m().func,onSortOver:m().func,onSortStart:m().func,pressDelay:m().number,pressThreshold:m().number,keyCodes:m().shape({lift:m().arrayOf(m().number),drop:m().arrayOf(m().number),cancel:m().arrayOf(m().number),up:m().arrayOf(m().number),down:m().arrayOf(m().number)}),shouldCancelStart:m().func,transitionDuration:m().number,updateBeforeSortStart:m().func,useDragHandle:m().bool,useWindowAsScrollContainer:m().bool},ae={lift:[X],drop:[X],cancel:[j],up:[Y,U],down:[V,F]},se={axis:"y",disableAutoscroll:!1,distance:0,getHelperDimensions:function(e){var t=e.node;return{height:t.offsetHeight,width:t.offsetWidth}},hideSortableGhost:!0,lockOffset:"50%",lockToContainerEdges:!1,pressDelay:0,pressThreshold:5,keyCodes:ae,shouldCancelStart:function(e){return-1!==[J,Q,ee,$,q].indexOf(e.target.tagName)||!!I(e.target,(function(e){return"true"===e.contentEditable}))},transitionDuration:300,useWindowAsScrollContainer:!1},le=Object.keys(re);function ce(e){y()(!(e.distance&&e.pressDelay),"Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.")}function de(e,t){try{var n=e()}catch(i){return t(!0,i)}return n&&n.then?n.then(t.bind(null,!1),t.bind(null,!0)):t(!1,value)}var he=(0,f.createContext)({manager:{}});function ue(e){var t,n,g=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{withRef:!1};return n=t=function(t){function n(e){var t;(0,s.Z)(this,n),t=(0,c.Z)(this,(0,d.Z)(n).call(this,e)),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"state",{}),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"handleStart",(function(e){var n=t.props,i=n.distance,o=n.shouldCancelStart;if(2!==e.button&&!o(e)){t.touched=!0,t.position=W(e);var r=I(e.target,(function(e){return null!=e.sortableInfo}));if(r&&r.sortableInfo&&t.nodeIsChild(r)&&!t.state.sorting){var a=t.props.useDragHandle,s=r.sortableInfo,l=s.index,c=s.collection;if(s.disabled)return;if(a&&!I(e.target,ie))return;t.manager.active={collection:c,index:l},A(e)||e.target.tagName!==_||e.preventDefault(),i||(0===t.props.pressDelay?t.handlePress(e):t.pressTimer=setTimeout((function(){return t.handlePress(e)}),t.props.pressDelay))}}})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"nodeIsChild",(function(e){return e.sortableInfo.manager===t.manager})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"handleMove",(function(e){var n=t.props,i=n.distance,o=n.pressThreshold;if(!t.state.sorting&&t.touched&&!t._awaitingUpdateBeforeSortStart){var r=W(e),a={x:t.position.x-r.x,y:t.position.y-r.y},s=Math.abs(a.x)+Math.abs(a.y);t.delta=a,i||o&&!(s>=o)?i&&s>=i&&t.manager.isActive()&&t.handlePress(e):(clearTimeout(t.cancelTimer),t.cancelTimer=setTimeout(t.cancel,0))}})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"handleEnd",(function(){t.touched=!1,t.cancel()})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"cancel",(function(){var e=t.props.distance;t.state.sorting||(e||clearTimeout(t.pressTimer),t.manager.active=null)})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"handlePress",(function(e){try{var n=t.manager.getActive(),i=function(){if(n){var i=function(){var n=f.sortableInfo.index,i=D(f),o=B(t.container),d=t.scrollContainer.getBoundingClientRect(),y=s({index:n,node:f,collection:p});if(t.node=f,t.margin=i,t.gridGap=o,t.width=y.width,t.height=y.height,t.marginOffset={x:t.margin.left+t.margin.right+t.gridGap.x,y:Math.max(t.margin.top,t.margin.bottom,t.gridGap.y)},t.boundingClientRect=f.getBoundingClientRect(),t.containerBoundingRect=d,t.index=n,t.newIndex=n,t.axis={x:r.indexOf("x")>=0,y:r.indexOf("y")>=0},t.offsetEdge=L(f,t.container),t.initialOffset=W(g?a({},e,{pageX:t.boundingClientRect.left,pageY:t.boundingClientRect.top}):e),t.initialScroll={left:t.scrollContainer.scrollLeft,top:t.scrollContainer.scrollTop},t.initialWindowScroll={left:window.pageXOffset,top:window.pageYOffset},t.helper=t.helperContainer.appendChild(te(f)),O(t.helper,{boxSizing:"border-box",height:"".concat(t.height,"px"),left:"".concat(t.boundingClientRect.left-i.left,"px"),pointerEvents:"none",position:"fixed",top:"".concat(t.boundingClientRect.top-i.top,"px"),width:"".concat(t.width,"px")}),g&&t.helper.focus(),c&&(t.sortableGhost=f,O(f,{opacity:0,visibility:"hidden"})),t.minTranslate={},t.maxTranslate={},g){var v=u?{top:0,left:0,width:t.contentWindow.innerWidth,height:t.contentWindow.innerHeight}:t.containerBoundingRect,x=v.top,m=v.left,w=v.width,b=x+v.height,S=m+w;t.axis.x&&(t.minTranslate.x=m-t.boundingClientRect.left,t.maxTranslate.x=S-(t.boundingClientRect.left+t.width)),t.axis.y&&(t.minTranslate.y=x-t.boundingClientRect.top,t.maxTranslate.y=b-(t.boundingClientRect.top+t.height))}else t.axis.x&&(t.minTranslate.x=(u?0:d.left)-t.boundingClientRect.left-t.width/2,t.maxTranslate.x=(u?t.contentWindow.innerWidth:d.left+d.width)-t.boundingClientRect.left-t.width/2),t.axis.y&&(t.minTranslate.y=(u?0:d.top)-t.boundingClientRect.top-t.height/2,t.maxTranslate.y=(u?t.contentWindow.innerHeight:d.top+d.height)-t.boundingClientRect.top-t.height/2);l&&l.split(" ").forEach((function(e){return t.helper.classList.add(e)})),t.listenerNode=e.touches?e.target:t.contentWindow,g?(t.listenerNode.addEventListener("wheel",t.handleKeyEnd,!0),t.listenerNode.addEventListener("mousedown",t.handleKeyEnd,!0),t.listenerNode.addEventListener("keydown",t.handleKeyDown)):(Z.move.forEach((function(e){return t.listenerNode.addEventListener(e,t.handleSortMove,!1)})),Z.end.forEach((function(e){return t.listenerNode.addEventListener(e,t.handleSortEnd,!1)}))),t.setState({sorting:!0,sortingIndex:n}),h&&h({node:f,index:n,collection:p,isKeySorting:g,nodes:t.manager.getOrderedRefs(),helper:t.helper},e),g&&t.keyMove(0)},o=t.props,r=o.axis,s=o.getHelperDimensions,l=o.helperClass,c=o.hideSortableGhost,d=o.updateBeforeSortStart,h=o.onSortStart,u=o.useWindowAsScrollContainer,f=n.node,p=n.collection,g=t.manager.isKeySorting,y=function(){if("function"===typeof d){t._awaitingUpdateBeforeSortStart=!0;var n=de((function(){var t=f.sortableInfo.index;return Promise.resolve(d({collection:p,index:t,node:f,isKeySorting:g},e)).then((function(){}))}),(function(e,n){if(t._awaitingUpdateBeforeSortStart=!1,e)throw n;return n}));if(n&&n.then)return n.then((function(){}))}}();return y&&y.then?y.then(i):i()}}();return Promise.resolve(i&&i.then?i.then((function(){})):void 0)}catch(o){return Promise.reject(o)}})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"handleSortMove",(function(e){var n=t.props.onSortMove;"function"===typeof e.preventDefault&&e.cancelable&&e.preventDefault(),t.updateHelperPosition(e),t.animateNodes(),t.autoscroll(),n&&n(e)})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"handleSortEnd",(function(e){var n=t.props,i=n.hideSortableGhost,o=n.onSortEnd,r=t.manager,a=r.active.collection,s=r.isKeySorting,l=t.manager.getOrderedRefs();t.listenerNode&&(s?(t.listenerNode.removeEventListener("wheel",t.handleKeyEnd,!0),t.listenerNode.removeEventListener("mousedown",t.handleKeyEnd,!0),t.listenerNode.removeEventListener("keydown",t.handleKeyDown)):(Z.move.forEach((function(e){return t.listenerNode.removeEventListener(e,t.handleSortMove)})),Z.end.forEach((function(e){return t.listenerNode.removeEventListener(e,t.handleSortEnd)})))),t.helper.parentNode.removeChild(t.helper),i&&t.sortableGhost&&O(t.sortableGhost,{opacity:"",visibility:""});for(var c=0,d=l.length;c<d;c++){var h=l[c],u=h.node;h.edgeOffset=null,h.boundingClientRect=null,T(u,null),k(u,null),h.translate=null}t.autoScroller.clear(),t.manager.active=null,t.manager.isKeySorting=!1,t.setState({sorting:!1,sortingIndex:null}),"function"===typeof o&&o({collection:a,newIndex:t.newIndex,oldIndex:t.index,isKeySorting:s,nodes:l},e),t.touched=!1})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"autoscroll",(function(){var e=t.props.disableAutoscroll,n=t.manager.isKeySorting;if(e)t.autoScroller.clear();else{if(n){var i=a({},t.translate),o=0,r=0;return t.axis.x&&(i.x=Math.min(t.maxTranslate.x,Math.max(t.minTranslate.x,t.translate.x)),o=t.translate.x-i.x),t.axis.y&&(i.y=Math.min(t.maxTranslate.y,Math.max(t.minTranslate.y,t.translate.y)),r=t.translate.y-i.y),t.translate=i,T(t.helper,t.translate),t.scrollContainer.scrollLeft+=o,void(t.scrollContainer.scrollTop+=r)}t.autoScroller.update({height:t.height,maxTranslate:t.maxTranslate,minTranslate:t.minTranslate,translate:t.translate,width:t.width})}})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"onAutoScroll",(function(e){t.translate.x+=e.left,t.translate.y+=e.top,t.animateNodes()})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"handleKeyDown",(function(e){var n=e.keyCode,i=t.props,o=i.shouldCancelStart,r=i.keyCodes,s=a({},ae,void 0===r?{}:r);t.manager.active&&!t.manager.isKeySorting||!(t.manager.active||s.lift.includes(n)&&!o(e)&&t.isValidSortingTarget(e))||(e.stopPropagation(),e.preventDefault(),s.lift.includes(n)&&!t.manager.active?t.keyLift(e):s.drop.includes(n)&&t.manager.active?t.keyDrop(e):s.cancel.includes(n)?(t.newIndex=t.manager.active.index,t.keyDrop(e)):s.up.includes(n)?t.keyMove(-1):s.down.includes(n)&&t.keyMove(1))})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"keyLift",(function(e){var n=e.target,i=I(n,(function(e){return null!=e.sortableInfo})).sortableInfo,o=i.index,r=i.collection;t.initialFocusedNode=n,t.manager.isKeySorting=!0,t.manager.active={index:o,collection:r},t.handlePress(e)})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"keyMove",(function(e){var n=t.manager.getOrderedRefs(),i=n[n.length-1].node.sortableInfo.index,o=t.newIndex+e,r=t.newIndex;if(!(o<0||o>i)){t.prevIndex=r,t.newIndex=o;var a=H(t.newIndex,t.prevIndex,t.index),s=n.find((function(e){return e.node.sortableInfo.index===a})),l=s.node,c=t.containerScrollDelta,d=s.boundingClientRect||M(l,c),h=s.translate||{x:0,y:0},u=d.top+h.y-c.top,f=d.left+h.x-c.left,p=r<o,g=p&&t.axis.x?l.offsetWidth-t.width:0,y=p&&t.axis.y?l.offsetHeight-t.height:0;t.handleSortMove({pageX:f+g,pageY:u+y,ignoreTransition:0===e})}})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"keyDrop",(function(e){t.handleSortEnd(e),t.initialFocusedNode&&t.initialFocusedNode.focus()})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"handleKeyEnd",(function(e){t.manager.active&&t.keyDrop(e)})),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"isValidSortingTarget",(function(e){var n=t.props.useDragHandle,i=e.target,o=I(i,(function(e){return null!=e.sortableInfo}));return o&&o.sortableInfo&&!o.sortableInfo.disabled&&(n?ie(i):i.sortableInfo)}));var i=new w;return ce(e),t.manager=i,t.wrappedInstance=(0,f.createRef)(),t.sortableContextValue={manager:i},t.events={end:t.handleEnd,move:t.handleMove,start:t.handleStart},t}return(0,h.Z)(n,t),(0,l.Z)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.useWindowAsScrollContainer,n=this.getContainer();Promise.resolve(n).then((function(n){e.container=n,e.document=e.container.ownerDocument||document;var i=e.props.contentWindow||e.document.defaultView||window;e.contentWindow="function"===typeof i?i():i,e.scrollContainer=t?e.document.scrollingElement||e.document.documentElement:G(e.container)||e.container,e.autoScroller=new oe(e.scrollContainer,e.onAutoScroll),Object.keys(e.events).forEach((function(t){return Z[t].forEach((function(n){return e.container.addEventListener(n,e.events[t],!1)}))})),e.container.addEventListener("keydown",e.handleKeyDown)}))}},{key:"componentWillUnmount",value:function(){var e=this;this.helper&&this.helper.parentNode&&this.helper.parentNode.removeChild(this.helper),this.container&&(Object.keys(this.events).forEach((function(t){return Z[t].forEach((function(n){return e.container.removeEventListener(n,e.events[t])}))})),this.container.removeEventListener("keydown",this.handleKeyDown))}},{key:"updateHelperPosition",value:function(e){var t=this.props,n=t.lockAxis,i=t.lockOffset,r=t.lockToContainerEdges,a=t.transitionDuration,s=t.keyboardSortingTransitionDuration,l=void 0===s?a:s,c=this.manager.isKeySorting,d=e.ignoreTransition,h=W(e),u={x:h.x-this.initialOffset.x,y:h.y-this.initialOffset.y};if(u.y-=window.pageYOffset-this.initialWindowScroll.top,u.x-=window.pageXOffset-this.initialWindowScroll.left,this.translate=u,r){var f=P({height:this.height,lockOffset:i,width:this.width}),p=(0,o.Z)(f,2),g=p[0],y=p[1],v={x:this.width/2-g.x,y:this.height/2-g.y},x={x:this.width/2-y.x,y:this.height/2-y.y};u.x=E(this.minTranslate.x+v.x,this.maxTranslate.x-x.x,u.x),u.y=E(this.minTranslate.y+v.y,this.maxTranslate.y-x.y,u.y)}"x"===n?u.y=0:"y"===n&&(u.x=0),c&&l&&!d&&k(this.helper,l),T(this.helper,u)}},{key:"animateNodes",value:function(){var e=this.props,t=e.transitionDuration,n=e.hideSortableGhost,i=e.onSortOver,o=this.containerScrollDelta,r=this.windowScrollDelta,a=this.manager.getOrderedRefs(),s=this.offsetEdge.left+this.translate.x+o.left,l=this.offsetEdge.top+this.translate.y+o.top,c=this.manager.isKeySorting,d=this.newIndex;this.newIndex=null;for(var h=0,u=a.length;h<u;h++){var f=a[h].node,p=f.sortableInfo.index,g=f.offsetWidth,y=f.offsetHeight,v={height:this.height>y?y/2:this.height/2,width:this.width>g?g/2:this.width/2},x=c&&p>this.index&&p<=d,m=c&&p<this.index&&p>=d,w={x:0,y:0},b=a[h].edgeOffset;b||(b=L(f,this.container),a[h].edgeOffset=b,c&&(a[h].boundingClientRect=M(f,o)));var S=h<a.length-1&&a[h+1],Z=h>0&&a[h-1];S&&!S.edgeOffset&&(S.edgeOffset=L(S.node,this.container),c&&(S.boundingClientRect=M(S.node,o))),p!==this.index?(t&&k(f,t),this.axis.x?this.axis.y?m||p<this.index&&(s+r.left-v.width<=b.left&&l+r.top<=b.top+v.height||l+r.top+v.height<=b.top)?(w.x=this.width+this.marginOffset.x,b.left+w.x>this.containerBoundingRect.width-v.width&&S&&(w.x=S.edgeOffset.left-b.left,w.y=S.edgeOffset.top-b.top),null===this.newIndex&&(this.newIndex=p)):(x||p>this.index&&(s+r.left+v.width>=b.left&&l+r.top+v.height>=b.top||l+r.top+v.height>=b.top+y))&&(w.x=-(this.width+this.marginOffset.x),b.left+w.x<this.containerBoundingRect.left+v.width&&Z&&(w.x=Z.edgeOffset.left-b.left,w.y=Z.edgeOffset.top-b.top),this.newIndex=p):x||p>this.index&&s+r.left+v.width>=b.left?(w.x=-(this.width+this.marginOffset.x),this.newIndex=p):(m||p<this.index&&s+r.left<=b.left+v.width)&&(w.x=this.width+this.marginOffset.x,null==this.newIndex&&(this.newIndex=p)):this.axis.y&&(x||p>this.index&&l+r.top+v.height>=b.top?(w.y=-(this.height+this.marginOffset.y),this.newIndex=p):(m||p<this.index&&l+r.top<=b.top+v.height)&&(w.y=this.height+this.marginOffset.y,null==this.newIndex&&(this.newIndex=p))),T(f,w),a[h].translate=w):n&&(this.sortableGhost=f,O(f,{opacity:0,visibility:"hidden"}))}null==this.newIndex&&(this.newIndex=this.index),c&&(this.newIndex=d);var C=c?this.prevIndex:d;i&&this.newIndex!==C&&i({collection:this.manager.active.collection,index:this.index,newIndex:this.newIndex,oldIndex:C,isKeySorting:c,nodes:a,helper:this.helper})}},{key:"getWrappedInstance",value:function(){return y()(g.withRef,"To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call"),this.wrappedInstance.current}},{key:"getContainer",value:function(){var e=this.props.getContainer;return"function"!==typeof e?(0,p.findDOMNode)(this):e(g.withRef?this.getWrappedInstance():void 0)}},{key:"render",value:function(){var t=g.withRef?this.wrappedInstance:null;return(0,f.createElement)(he.Provider,{value:this.sortableContextValue},(0,f.createElement)(e,(0,i.Z)({ref:t},S(this.props,le))))}},{key:"helperContainer",get:function(){var e=this.props.helperContainer;return"function"===typeof e?e():this.props.helperContainer||this.document.body}},{key:"containerScrollDelta",get:function(){return this.props.useWindowAsScrollContainer?{left:0,top:0}:{left:this.scrollContainer.scrollLeft-this.initialScroll.left,top:this.scrollContainer.scrollTop-this.initialScroll.top}}},{key:"windowScrollDelta",get:function(){return{left:this.contentWindow.pageXOffset-this.initialWindowScroll.left,top:this.contentWindow.pageYOffset-this.initialWindowScroll.top}}}]),n}(f.Component),(0,r.Z)(t,"displayName",N("sortableList",e)),(0,r.Z)(t,"defaultProps",se),(0,r.Z)(t,"propTypes",re),n}var fe={index:m().number.isRequired,collection:m().oneOfType([m().number,m().string]),disabled:m().bool},pe=Object.keys(fe);function ge(e){var t,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{withRef:!1};return n=t=function(t){function n(){var e,t;(0,s.Z)(this,n);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return t=(0,c.Z)(this,(e=(0,d.Z)(n)).call.apply(e,[this].concat(o))),(0,r.Z)((0,u.Z)((0,u.Z)(t)),"wrappedInstance",(0,f.createRef)()),t}return(0,h.Z)(n,t),(0,l.Z)(n,[{key:"componentDidMount",value:function(){this.register()}},{key:"componentDidUpdate",value:function(e){this.node&&(e.index!==this.props.index&&(this.node.sortableInfo.index=this.props.index),e.disabled!==this.props.disabled&&(this.node.sortableInfo.disabled=this.props.disabled)),e.collection!==this.props.collection&&(this.unregister(e.collection),this.register())}},{key:"componentWillUnmount",value:function(){this.unregister()}},{key:"register",value:function(){var e=this.props,t=e.collection,n=e.disabled,i=e.index,o=(0,p.findDOMNode)(this);o.sortableInfo={collection:t,disabled:n,index:i,manager:this.context.manager},this.node=o,this.ref={node:o},this.context.manager.add(t,this.ref)}},{key:"unregister",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.props.collection;this.context.manager.remove(e,this.ref)}},{key:"getWrappedInstance",value:function(){return y()(o.withRef,"To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call"),this.wrappedInstance.current}},{key:"render",value:function(){var t=o.withRef?this.wrappedInstance:null;return(0,f.createElement)(e,(0,i.Z)({ref:t},S(this.props,pe)))}}]),n}(f.Component),(0,r.Z)(t,"displayName",N("sortableElement",e)),(0,r.Z)(t,"contextType",he),(0,r.Z)(t,"propTypes",fe),(0,r.Z)(t,"defaultProps",{collection:0}),n}},73074:function(e,t,n){n.d(t,{q:function(){return r}});var i=n(42982),o=n(70885);function r(e,t,n){return function(e,t,n){var i=t<0?e.length+t:t;if(i>=0&&i<e.length){var r=n<0?e.length+n:n,a=e.splice(t,1),s=(0,o.Z)(a,1)[0];e.splice(r,0,s)}}(e=(0,i.Z)(e),t,n),e}}}]);
//# sourceMappingURL=891.c7764ad4.chunk.js.map