"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[37],{87037:function(e,t,a){a.r(t),a.d(t,{default:function(){return Z}});var s=a(70885),o=a(1413),n=a(72791),l=a(11838),r=a(65298),i=a(26023),c=a(16229),d=a(72930),p=a(35036),m=a(97892),_=a.n(m),h=a(15861),u=a(64687),x=a.n(u),v=a(29818),g=a(77356),b={container:"style_container__+81jf",header:"style_header__zM1cn",header_title:"style_header_title__Na18B",header_created:"style_header_created__inFcF",body:"style_body__ygHJ1",body_head_cnt:"style_body_head_cnt__ydNQZ",body_org:"style_body_org__ks0kn",body_org_img:"style_body_org_img__u-856",body_org_detail:"style_body_org_detail__Tqs3N",org_name:"style_org_name__QGV+j",org_address:"style_org_address__vq-FB",org_contact:"style_org_contact__YXKFR",org_contact_title:"style_org_contact_title__KmmWm",body_approve_detail:"style_body_approve_detail__mhwUg",body_approve_section:"style_body_approve_section__qXLJ+",body_approve_title:"style_body_approve_title__NxpbT",body_approve_btn:"style_body_approve_btn__zzYaK",approve_list:"style_approve_list__5HUQL",approve_list_show:"style_approve_list_show__-MsYE",approve_list_item:"style_approve_list_item__iAYlh",body_log_cnt:"style_body_log_cnt__EcGgV",body_log_left:"style_body_log_left__r8uJC",body_log_right:"style_body_log_right__CoNIq",approve_logs:"style_approve_logs__tYunn",approve_logs_item:"style_approve_logs_item__gi-xC",log_item:"style_log_item__hDeI5",log_item_date:"style_log_item_date__roojc",approve_bot:"style_approve_bot__4+1-J"},y=a(6991),f=a(66305),j=a(80184);var N=function(e){var t,a,l,d=e.open,m=e.setOpen,u=e.approve,N=(0,r.RA)(),k=(0,n.useState)({log:"",status:u.status}),Z=(0,s.Z)(k,2),w=Z[0],S=Z[1],W=(0,r.D3)(),C=W.noti,D=W.firstLoad,P=W.resultLoad,Y=W.onCloseNoti,M=(0,n.useState)(!1),T=(0,s.Z)(M,2),A=T[0],R=T[1];(0,r.YE)(A&&d,c.NK.APPROVES,(0,o.Z)((0,o.Z)({},i.X3),{},{page:null!==(t=null===N||void 0===N?void 0:N.page)&&void 0!==t?t:1}));var z=function(){var e=(0,h.Z)(x().mark((function e(){return x().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(),e.prev=1,e.next=4,g.yR.putApprove(u.id,w);case 4:R(!0),P("\u0110\xe3 l\u01b0u thay \u0111\u1ed5i"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),P("C\xf3 l\u1ed7i x\u1ea3y ra");case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),B=(0,n.useRef)(),E=function(){var e,t;null===(e=B.current)||void 0===e||null===(t=e.classList)||void 0===t||t.toggle(b.approve_list_show)},F=!1;return"APPROVED"!==u.status&&"REJECT"!==u.status||(F=!0),(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(v.Z,{open:d,onClose:function(){R(!1),m(!1)},children:[(0,j.jsx)(f.vv,{title:C.message,open:C.openAlert,onClose:Y}),(0,j.jsxs)("div",{className:b.container,children:[(0,j.jsxs)("div",{className:b.header,children:[(0,j.jsx)("span",{className:b.header_title,children:"Chi ti\u1ebft ki\u1ec3m duy\u1ec7t"}),(0,j.jsxs)("span",{className:b.header_created,children:["Ng\xe0y t\u1ea1o:",_()(u.created_at).format("HH:mm DD/MM/YYYY")]})]}),u.organization&&(0,j.jsx)("div",{className:b.body,children:(0,j.jsxs)("div",{className:b.body_head_cnt,children:[(0,j.jsxs)("div",{className:b.body_org,children:[(0,j.jsx)("div",{className:b.body_org_img,children:(0,j.jsx)("img",{onError:function(e){return(0,p.bW)(e)},src:u.organization.image_url,alt:""})}),(0,j.jsxs)("div",{className:b.body_org_detail,children:[(0,j.jsx)("p",{title:"Xem gian h\xe0ng",className:b.org_name,children:u.organization.name}),(0,j.jsx)("p",{className:b.org_address,children:u.organization.full_address}),(0,j.jsxs)("div",{className:b.org_contact,children:[(0,j.jsx)("p",{className:b.org_contact_title,children:"Th\xf4ng tin li\xean l\u1ea1c"}),(0,j.jsx)("div",{className:b.org_contact_list,children:null===(a=u.organization.telephone)||void 0===a?void 0:a.map((function(e){return(0,j.jsx)("p",{className:b.org_contact_item,children:e},e)}))})]})]})]}),(0,j.jsxs)("div",{className:b.body_approve_detail,children:[(0,j.jsxs)("div",{className:b.body_approve_section,children:[(0,j.jsx)("p",{className:b.body_approve_title,children:"Ki\u1ec3m duy\u1ec7t cho"}),(0,j.jsx)(y.M_,{type:u.type})]}),(0,j.jsxs)("div",{className:b.body_approve_section,children:[(0,j.jsx)("p",{className:b.body_approve_title,children:"Tr\u1ea1ng th\xe1i"}),(0,j.jsx)(y.zT,{status:w.status}),(0,j.jsxs)("button",{style:F?{cursor:"not-allowed"}:{},disabled:F,onFocus:E,onBlur:E,className:b.body_approve_btn,children:[(0,j.jsx)("i",{className:"bi bi-pencil-fill fs-5"}),(0,j.jsx)("ul",{ref:B,className:b.approve_list,children:y.Oq.map((function(e){return(0,j.jsx)("li",{onClick:function(){return t=e.STATUS,S((0,o.Z)((0,o.Z)({},w),{},{status:t}));var t},className:b.approve_list_item,children:(0,j.jsx)(y.zT,{status:e.STATUS})},e.STATUS)}))})]})]})]})]})}),(0,j.jsxs)("div",{className:b.body_log_cnt,children:[(0,j.jsxs)("div",{className:b.body_log_left,children:[(0,j.jsx)("span",{className:b.body_approve_title,children:"Ghi ch\xfa"}),(0,j.jsx)("ul",{className:b.approve_logs,children:null===(l=u.logs)||void 0===l?void 0:l.map((function(e){return(0,j.jsxs)("li",{className:b.approve_logs_item,children:[(0,j.jsx)("div",{className:b.log_item,children:e.note}),(0,j.jsx)("span",{className:b.log_item_date,children:_()(e.created_at).format("HH:mm DD/MM/YYYY")})]},e.id)}))})]}),(0,j.jsxs)("div",{className:b.body_log_right,children:[(0,j.jsx)("span",{className:b.body_approve_title,children:"Vi\u1ebft ghi ch\xfa"}),(0,j.jsx)(f.Kx,{onChange:function(e){S((0,o.Z)((0,o.Z)({},w),{},{log:e.target.value}))},placeholder:"Vi\u1ebft ghi ch\xfa..."})]})]}),(0,j.jsx)("div",{className:b.approve_bot,children:(0,j.jsx)(f.Rb,{onClick:z,title:"L\u01b0u thay \u0111\u1ed5i",color:"success",loading:C.load,disable:F})})]})]})})},k=a(16871);var Z=function(){var e,t,a=(0,k.TH)(),s=(0,k.s0)(),n=(0,r.RA)(),p=(0,r.YE)(!0,c.NK.APPROVES,(0,o.Z)((0,o.Z)({},i.X3),{},{page:null!==(e=null===n||void 0===n?void 0:n.page)&&void 0!==e?e:1})),m=p.responseArray,_=p.totalItem,h=p.totalPage;return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(l.Z,{title:"Ki\u1ec3m duy\u1ec7t"}),(0,j.jsxs)("div",{className:"card mb-5 mb-xl-8",children:[(0,j.jsxs)("div",{className:"card-header border-0 pt-5",children:[(0,j.jsxs)("h3",{className:"card-title align-items-start flex-column",children:[(0,j.jsx)("span",{className:"card-label fw-bold fs-3 mb-1",children:"Danh s\xe1ch ki\u1ec3m duy\u1ec7t"}),(0,j.jsxs)("span",{className:"text-muted mt-1 fw-semobold fs-7",children:[_," ki\u1ec3m duy\u1ec7t"]})]}),(0,j.jsx)("div",{className:"card-toolbar",children:(0,j.jsx)("button",{type:"button",className:"btn btn-sm btn-icon btn-color-primary btn-active-light-primary","data-kt-menu-trigger":"click","data-kt-menu-placement":"bottom-end","data-kt-menu-flip":"top-end",children:(0,j.jsx)(d.D8,{path:"/media/icons/duotune/general/gen024.svg",className:"svg-icon-2"})})})]}),(0,j.jsx)("div",{className:"card-body py-3",children:(0,j.jsx)("div",{className:"table-responsive",children:(0,j.jsxs)("table",{className:"table align-middle gs-0 gy-4",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{className:"fw-bold text-muted bg-light",children:[(0,j.jsx)("th",{className:"ps-4 min-w-250px rounded-start",children:"Doanh nghi\u1ec7p"}),(0,j.jsx)("th",{className:"min-w-110px",children:"Duy\u1ec7t cho"}),(0,j.jsx)("th",{className:"min-w-110px",children:" Tr\u1ea1ng th\xe1i "}),(0,j.jsx)("th",{className:"min-w-150px",children:"Ghi ch\xfa"}),(0,j.jsx)("th",{className:"min-w-140px",children:"Ng\xe0y t\u1ea1o"}),(0,j.jsx)("th",{className:"min-w-140px",children:"C\u1eadp nh\u1eadt l\xfac"}),(0,j.jsx)("th",{className:"min-w-100px text-end rounded-end"})]})}),(0,j.jsx)("tbody",{children:null===m||void 0===m?void 0:m.map((function(e,t){return(0,j.jsx)(w,{item:e},t)}))})]})})})]}),(0,j.jsx)(f.Aw,{totalPage:h,onChangePage:function(e){s({pathname:a.pathname,search:"page=".concat(e)})},defaultPage:null!==(t=null===n||void 0===n?void 0:n.page)&&void 0!==t?t:1})]})},w=function(e){var t,a=e.item,o=(0,n.useState)(!1),l=(0,s.Z)(o,2),r=l[0],i=l[1];return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(N,{open:r,setOpen:i,approve:a}),(0,j.jsxs)("tr",{children:[a.organization&&(0,j.jsx)("td",{children:(0,j.jsxs)("div",{className:"d-flex align-items-center",children:[(0,j.jsx)("div",{className:"symbol symbol-50px me-5",children:(0,j.jsx)(f.qE,{src:a.organization.image_url})}),(0,j.jsxs)("div",{className:"d-flex justify-content-start flex-column",children:[(0,j.jsx)("span",{className:"text-dark fw-bold text-hover-primary mb-1 fs-6",children:a.organization.name}),(0,j.jsx)("span",{className:"text-muted fw-semobold text-muted d-block fs-7",children:a.organization.address})]})]})}),(0,j.jsx)("td",{children:(0,j.jsx)(p.M_,{type:a.type})}),(0,j.jsx)("td",{children:(0,j.jsx)(p.zT,{status:a.status})}),(0,j.jsx)("td",{children:a.logs.length>0&&(0,j.jsx)("span",{className:"text-muted fw-semobold text-muted d-block fs-7 mt-1",children:null===(t=a.logs[0])||void 0===t?void 0:t.note})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"text-muted fw-semobold text-muted d-block fs-7 mt-1",children:_()(a.created_at).format("HH:mm - DD/MM/YYYY")})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"text-muted fw-semobold text-muted d-block fs-7 mt-1",children:_()(a.updated_at).format("HH:mm - DD/MM/YYYY")})}),(0,j.jsx)("td",{className:"text-end",children:(0,j.jsx)("button",{onClick:function(){return i(!0)},className:"btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4",children:(0,j.jsx)("i",{className:"bi bi-pencil-fill fs-6"})})})]})]})}},11838:function(e,t,a){a.d(t,{Z:function(){return o}});a(72791);var s=a(80184);var o=function(e){var t=e.title,a=e.element;return(0,s.jsx)("div",{className:"toolbar",id:"kt_toolbar",children:(0,s.jsxs)("div",{id:"kt_toolbar_container",className:"container-fluid d-flex flex-stack",children:[(0,s.jsx)("h1",{className:"d-flex align-items-center text-dark fw-bolder my-1 fs-3",children:t}),a]})})}},29818:function(e,t,a){a.d(t,{Z:function(){return C}});var s=a(4942),o=a(63366),n=a(87462),l=a(72791),r=a(41025),i=a(94419),c=a(96248),d=a(14036),p=a(49143),m=a(60627),_=a(35527),h=a(61046),u=a(47630),x=a(75878),v=a(21217);function g(e){return(0,v.Z)("MuiDialog",e)}var b=(0,x.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);var y=l.createContext({}),f=a(52739),j=a(13967),N=a(80184),k=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],Z=(0,u.ZP)(f.Z,{name:"MuiDialog",slot:"Backdrop",overrides:function(e,t){return t.backdrop}})({zIndex:-1}),w=(0,u.ZP)(p.Z,{name:"MuiDialog",slot:"Root",overridesResolver:function(e,t){return t.root}})({"@media print":{position:"absolute !important"}}),S=(0,u.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:function(e,t){var a=e.ownerState;return[t.container,t["scroll".concat((0,d.Z)(a.scroll))]]}})((function(e){var t=e.ownerState;return(0,n.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===t.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===t.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),W=(0,u.ZP)(_.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:function(e,t){var a=e.ownerState;return[t.paper,t["scrollPaper".concat((0,d.Z)(a.scroll))],t["paperWidth".concat((0,d.Z)(String(a.maxWidth)))],a.fullWidth&&t.paperFullWidth,a.fullScreen&&t.paperFullScreen]}})((function(e){var t=e.theme,a=e.ownerState;return(0,n.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===a.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===a.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!a.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===a.maxWidth&&(0,s.Z)({maxWidth:"px"===t.breakpoints.unit?Math.max(t.breakpoints.values.xs,444):"".concat(t.breakpoints.values.xs).concat(t.breakpoints.unit)},"&.".concat(b.paperScrollBody),(0,s.Z)({},t.breakpoints.down(Math.max(t.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})),a.maxWidth&&"xs"!==a.maxWidth&&(0,s.Z)({maxWidth:"".concat(t.breakpoints.values[a.maxWidth]).concat(t.breakpoints.unit)},"&.".concat(b.paperScrollBody),(0,s.Z)({},t.breakpoints.down(t.breakpoints.values[a.maxWidth]+64),{maxWidth:"calc(100% - 64px)"})),a.fullWidth&&{width:"calc(100% - 64px)"},a.fullScreen&&(0,s.Z)({margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0},"&.".concat(b.paperScrollBody),{margin:0,maxWidth:"100%"}))})),C=l.forwardRef((function(e,t){var a=(0,h.Z)({props:e,name:"MuiDialog"}),s=(0,j.Z)(),p={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},u=a["aria-describedby"],x=a["aria-labelledby"],v=a.BackdropComponent,b=a.BackdropProps,f=a.children,C=a.className,D=a.disableEscapeKeyDown,P=void 0!==D&&D,Y=a.fullScreen,M=void 0!==Y&&Y,T=a.fullWidth,A=void 0!==T&&T,R=a.maxWidth,z=void 0===R?"sm":R,B=a.onBackdropClick,E=a.onClose,F=a.open,H=a.PaperComponent,K=void 0===H?_.Z:H,X=a.PaperProps,L=void 0===X?{}:X,V=a.scroll,q=void 0===V?"paper":V,I=a.TransitionComponent,O=void 0===I?m.Z:I,J=a.transitionDuration,U=void 0===J?p:J,G=a.TransitionProps,Q=(0,o.Z)(a,k),$=(0,n.Z)({},a,{disableEscapeKeyDown:P,fullScreen:M,fullWidth:A,maxWidth:z,scroll:q}),ee=function(e){var t=e.classes,a=e.scroll,s=e.maxWidth,o=e.fullWidth,n=e.fullScreen,l={root:["root"],container:["container","scroll".concat((0,d.Z)(a))],paper:["paper","paperScroll".concat((0,d.Z)(a)),"paperWidth".concat((0,d.Z)(String(s))),o&&"paperFullWidth",n&&"paperFullScreen"]};return(0,i.Z)(l,g,t)}($),te=l.useRef(),ae=(0,c.Z)(x),se=l.useMemo((function(){return{titleId:ae}}),[ae]);return(0,N.jsx)(w,(0,n.Z)({className:(0,r.Z)(ee.root,C),closeAfterTransition:!0,components:{Backdrop:Z},componentsProps:{backdrop:(0,n.Z)({transitionDuration:U,as:v},b)},disableEscapeKeyDown:P,onClose:E,open:F,ref:t,onClick:function(e){te.current&&(te.current=null,B&&B(e),E&&E(e,"backdropClick"))},ownerState:$},Q,{children:(0,N.jsx)(O,(0,n.Z)({appear:!0,in:F,timeout:U,role:"presentation"},G,{children:(0,N.jsx)(S,{className:(0,r.Z)(ee.container),onMouseDown:function(e){te.current=e.target===e.currentTarget},ownerState:$,children:(0,N.jsx)(W,(0,n.Z)({as:K,elevation:24,role:"dialog","aria-describedby":u,"aria-labelledby":ae},L,{className:(0,r.Z)(ee.paper,L.className),ownerState:$,children:(0,N.jsx)(y.Provider,{value:se,children:f})}))})}))}))}))}}]);
//# sourceMappingURL=37.b6bf27aa.chunk.js.map