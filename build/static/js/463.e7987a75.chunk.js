"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[463],{56463:function(e,n,a){a.r(n),a.d(n,{default:function(){return T}});var i=a(1413),r=a(15861),l=a(70885),t=a(64687),s=a.n(t),o=a(72791),c=a(11838),d=a(16871),h=a(16229),p=a(65298),u=a(35036),v=a(6991),m=a(66305),x="contract-detail_title_page__V2Ihe",j="contract-detail_container__NLq74",f="contract-detail_head__uQxkl",g="contract-detail_head_left__Uo4Pt",N="contract-detail_head_item__GaXJg",_="contract-detail_head_item_title__U4j4V",b="contract-detail_contract_table__0nj7u",k="contract-detail_contract_table_item__tTKhO",Z="contract-detail_contract_table_item_left__uPsXu",y="contract-detail_contract_table_item_right__QVrCm",W=a(97892),S=a.n(W),w=a(77356),C=a(29818),P=a(80184),D={include:"approve|organization"};var T=function(){var e,n,a,t,W,C,T,B,R,A,Y,E,F,I,O,z,K,X,H,L,V,G,U,Q,q=(0,d.UO)(),J=(0,o.useState)(!1),$=(0,l.Z)(J,2),ee=$[0],ne=$[1],ae=(0,p.YE)(q.id,h.NK.CONTRACTS_BY_ID(q.id),D),ie=ae.response,re=ae.error,le=ae.mutate,te=ie,se=(0,p.YE)(null===te||void 0===te?void 0:te.organization_id,h.NK.ORGANIZATIONS_ID(null===te||void 0===te?void 0:te.organization_id)).response;null!==te&&void 0!==te&&null!==(e=te.extra)&&void 0!==e&&e.ecommerce_branch&&null!==se&&void 0!==se&&se.branches&&(null===te||void 0===te||null===(U=te.extra)||void 0===U||null===(Q=U.ecommerce_branch)||void 0===Q||Q.map((function(e){var n;return null===se||void 0===se||null===(n=se.branches)||void 0===n?void 0:n.find((function(n){return n.id===parseInt(e)}))})).filter(Boolean));var oe=(0,p.D3)(),ce=oe.noti,de=oe.firstLoad,he=oe.resultLoad,pe=oe.onCloseNoti,ue=function(){var e=(0,r.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return de(),e.prev=1,e.next=4,w.yR.putApprove(te.approve.id,{log:"",status:"APPROVED"});case 4:he("\u0110\xe3 l\u01b0u thay \u0111\u1ed5i"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),he("C\xf3 l\u1ed7i x\u1ea3y ra");case 10:le((0,i.Z)((0,i.Z)({},ie),{},{approve:(0,i.Z)((0,i.Z)({},ie.approve),{},{status:"APPROVED"})}),!0);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(){return e.apply(this,arguments)}}();return console.log(te),(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(m.vv,{title:ce.message,open:ce.openAlert,onClose:pe}),(0,P.jsx)(c.Z,{title:"Chi ti\u1ebft h\u1ee3p \u0111\u1ed3ng ".concat(null!==(n=null===te||void 0===te?void 0:te.company_name)&&void 0!==n?n:"..."),element:(0,P.jsxs)("div",{className:x,children:[(0,P.jsx)(m.Rb,{title:"Xem h\u1ee3p \u0111\u1ed3ng",onClick:function(){return ne(!0)}}),(0,P.jsx)(m.Rb,{title:"Thay \u0111\u1ed5i th\xf4ng tin"}),(0,P.jsx)(m.Rb,{loading:ce.load,color:"success",title:"Duy\u1ec7t",onClick:ue})]})}),te&&(0,P.jsxs)("div",{className:j,children:[(0,P.jsxs)("div",{className:f,children:[(0,P.jsxs)("div",{className:g,children:[(0,P.jsxs)("div",{className:N,children:[(0,P.jsx)("span",{className:_,children:"H\u1ee3p \u0111\u1ed3ng c\u1ee7a"}),(0,P.jsx)(v.M_,{type:null===(a=te.approve)||void 0===a?void 0:a.type})]}),(0,P.jsxs)("div",{className:N,children:[(0,P.jsx)("span",{className:_,children:"Tr\u1ea1ng th\xe1i"}),(0,P.jsx)(v.zT,{status:null===(t=te.approve)||void 0===t?void 0:t.status})]})]}),(0,P.jsxs)("div",{className:N,children:[(0,P.jsx)("span",{className:_,children:"Ng\xe0y t\u1ea1o:"}),S()(te.created_at).format("HH:mm DD/MM/YYYY")]})]}),(0,P.jsxs)("div",{className:b,children:[(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"M\xe3 h\u1ee3p \u0111\u1ed3ng"}),(0,P.jsx)("div",{className:y,children:null!==(W=null===(C=te.extra)||void 0===C?void 0:C.corporate_tax_code)&&void 0!==W?W:(0,P.jsx)("h6",{children:"Tr\u1ed1ng"})})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"G\xf3i \u0111\u0103ng k\xfd"}),(0,P.jsx)("div",{className:y,children:te.package_name})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"T\xean doanh nghi\u1ec7p"}),(0,P.jsx)("div",{className:y,children:null===(T=te.organization)||void 0===T?void 0:T.name})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"Link gian h\xe0ng"}),(0,P.jsx)("div",{className:y,children:(0,P.jsx)("span",{onClick:function(){return(0,u.h4)(null===se||void 0===se?void 0:se.subdomain)},style:{cursor:"pointer"},children:"https://beautyx.vn/cua-hang/".concat(null===se||void 0===se?void 0:se.subdomain)})})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"Chi nh\xe1nh \u0111\u0103ng k\xfd"}),(0,P.jsxs)("div",{className:y,children:[null===(B=te.extra)||void 0===B||null===(R=B.ecommerce_branch)||void 0===R?void 0:R.length,(null===(A=te.extra)||void 0===A||null===(Y=A.ecommerce_branch)||void 0===Y?void 0:Y.length)>0&&(0,P.jsx)("span",{children:(0,P.jsx)("i",{className:"bi bi-eye fs-4"})})]})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i"}),(0,P.jsx)("div",{className:y,children:null!==(E=te.telephone)&&void 0!==E?E:(0,P.jsx)("h6",{children:"Tr\u1ed1ng"})})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"\u0110\u1ecba ch\u1ec9 doanh nghi\u1ec7p"}),(0,P.jsx)("div",{className:y,children:null===(F=te.organization)||void 0===F?void 0:F.full_address})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"Ng\u01b0\u1eddi \u0111\u1ea1i di\u1ec7n"}),(0,P.jsx)("div",{className:y,children:null!==(I=null===(O=te.extra)||void 0===O?void 0:O.accountant_name)&&void 0!==I?I:(0,P.jsx)("h6",{children:"Tr\u1ed1ng"})})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"Email li\xean h\u1ec7"}),(0,P.jsx)("div",{className:y,children:null===(z=te.email)||void 0===z?void 0:z.join(", ")})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"\u0110\u1ecba ch\u1ec9 c\xf4ng ty"}),(0,P.jsx)("div",{className:y,children:null!==(K=te.address)&&void 0!==K?K:(0,P.jsx)("h6",{children:"Tr\u1ed1ng"})})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"M\xe3 s\u1ed1 thu\u1ebf"}),(0,P.jsx)("div",{className:y,children:null!==(X=null===(H=te.extra)||void 0===H?void 0:H.corporate_tax_code)&&void 0!==X?X:(0,P.jsx)("h6",{children:"Tr\u1ed1ng"})})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"T\xean ng\xe2n h\xe0ng"}),(0,P.jsx)("div",{className:y,children:null!==(L=te.bank_name)&&void 0!==L?L:(0,P.jsx)("h6",{children:"Tr\u1ed1ng"})})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"T\xean ch\u1ee7 th\u1ebb"}),(0,P.jsx)("div",{className:y,children:null!==(V=te.bank_owner_name)&&void 0!==V?V:(0,P.jsx)("h6",{children:"Tr\u1ed1ng"})})]}),(0,P.jsxs)("div",{className:k,children:[(0,P.jsx)("div",{className:Z,children:"S\u1ed1 t\xe0i kho\u1ea3n"}),(0,P.jsx)("div",{className:y,children:null!==(G=te.bank_number)&&void 0!==G?G:(0,P.jsx)("h6",{children:"Tr\u1ed1ng"})})]})]})]}),te&&(0,P.jsx)(M,{open:ee,setOpen:ne,contract:te}),re&&(0,P.jsx)(d.Fg,{to:"/error/404"})]})},M=function(e){return(0,P.jsx)(C.Z,{open:e.open,onClose:function(){return e.setOpen(!1)},children:(0,P.jsx)("div",{style:{width:"800px",height:"1000px"}})})}},11838:function(e,n,a){a.d(n,{Z:function(){return r}});a(72791);var i=a(80184);var r=function(e){var n=e.title,a=e.element;return(0,i.jsx)("div",{className:"toolbar",id:"kt_toolbar",children:(0,i.jsxs)("div",{id:"kt_toolbar_container",className:"container-fluid d-flex flex-stack",children:[(0,i.jsx)("h1",{className:"d-flex align-items-center text-dark fw-bolder my-1 fs-3",children:n}),a]})})}},29818:function(e,n,a){a.d(n,{Z:function(){return C}});var i=a(4942),r=a(63366),l=a(87462),t=a(72791),s=a(41025),o=a(94419),c=a(96248),d=a(14036),h=a(49143),p=a(60627),u=a(35527),v=a(61046),m=a(47630),x=a(75878),j=a(21217);function f(e){return(0,j.Z)("MuiDialog",e)}var g=(0,x.Z)("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]);var N=t.createContext({}),_=a(52739),b=a(13967),k=a(80184),Z=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],y=(0,m.ZP)(_.Z,{name:"MuiDialog",slot:"Backdrop",overrides:function(e,n){return n.backdrop}})({zIndex:-1}),W=(0,m.ZP)(h.Z,{name:"MuiDialog",slot:"Root",overridesResolver:function(e,n){return n.root}})({"@media print":{position:"absolute !important"}}),S=(0,m.ZP)("div",{name:"MuiDialog",slot:"Container",overridesResolver:function(e,n){var a=e.ownerState;return[n.container,n["scroll".concat((0,d.Z)(a.scroll))]]}})((function(e){var n=e.ownerState;return(0,l.Z)({height:"100%","@media print":{height:"auto"},outline:0},"paper"===n.scroll&&{display:"flex",justifyContent:"center",alignItems:"center"},"body"===n.scroll&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})})),w=(0,m.ZP)(u.Z,{name:"MuiDialog",slot:"Paper",overridesResolver:function(e,n){var a=e.ownerState;return[n.paper,n["scrollPaper".concat((0,d.Z)(a.scroll))],n["paperWidth".concat((0,d.Z)(String(a.maxWidth)))],a.fullWidth&&n.paperFullWidth,a.fullScreen&&n.paperFullScreen]}})((function(e){var n=e.theme,a=e.ownerState;return(0,l.Z)({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},"paper"===a.scroll&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},"body"===a.scroll&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!a.maxWidth&&{maxWidth:"calc(100% - 64px)"},"xs"===a.maxWidth&&(0,i.Z)({maxWidth:"px"===n.breakpoints.unit?Math.max(n.breakpoints.values.xs,444):"".concat(n.breakpoints.values.xs).concat(n.breakpoints.unit)},"&.".concat(g.paperScrollBody),(0,i.Z)({},n.breakpoints.down(Math.max(n.breakpoints.values.xs,444)+64),{maxWidth:"calc(100% - 64px)"})),a.maxWidth&&"xs"!==a.maxWidth&&(0,i.Z)({maxWidth:"".concat(n.breakpoints.values[a.maxWidth]).concat(n.breakpoints.unit)},"&.".concat(g.paperScrollBody),(0,i.Z)({},n.breakpoints.down(n.breakpoints.values[a.maxWidth]+64),{maxWidth:"calc(100% - 64px)"})),a.fullWidth&&{width:"calc(100% - 64px)"},a.fullScreen&&(0,i.Z)({margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0},"&.".concat(g.paperScrollBody),{margin:0,maxWidth:"100%"}))})),C=t.forwardRef((function(e,n){var a=(0,v.Z)({props:e,name:"MuiDialog"}),i=(0,b.Z)(),h={enter:i.transitions.duration.enteringScreen,exit:i.transitions.duration.leavingScreen},m=a["aria-describedby"],x=a["aria-labelledby"],j=a.BackdropComponent,g=a.BackdropProps,_=a.children,C=a.className,P=a.disableEscapeKeyDown,D=void 0!==P&&P,T=a.fullScreen,M=void 0!==T&&T,B=a.fullWidth,R=void 0!==B&&B,A=a.maxWidth,Y=void 0===A?"sm":A,E=a.onBackdropClick,F=a.onClose,I=a.open,O=a.PaperComponent,z=void 0===O?u.Z:O,K=a.PaperProps,X=void 0===K?{}:K,H=a.scroll,L=void 0===H?"paper":H,V=a.TransitionComponent,G=void 0===V?p.Z:V,U=a.transitionDuration,Q=void 0===U?h:U,q=a.TransitionProps,J=(0,r.Z)(a,Z),$=(0,l.Z)({},a,{disableEscapeKeyDown:D,fullScreen:M,fullWidth:R,maxWidth:Y,scroll:L}),ee=function(e){var n=e.classes,a=e.scroll,i=e.maxWidth,r=e.fullWidth,l=e.fullScreen,t={root:["root"],container:["container","scroll".concat((0,d.Z)(a))],paper:["paper","paperScroll".concat((0,d.Z)(a)),"paperWidth".concat((0,d.Z)(String(i))),r&&"paperFullWidth",l&&"paperFullScreen"]};return(0,o.Z)(t,f,n)}($),ne=t.useRef(),ae=(0,c.Z)(x),ie=t.useMemo((function(){return{titleId:ae}}),[ae]);return(0,k.jsx)(W,(0,l.Z)({className:(0,s.Z)(ee.root,C),closeAfterTransition:!0,components:{Backdrop:y},componentsProps:{backdrop:(0,l.Z)({transitionDuration:Q,as:j},g)},disableEscapeKeyDown:D,onClose:F,open:I,ref:n,onClick:function(e){ne.current&&(ne.current=null,E&&E(e),F&&F(e,"backdropClick"))},ownerState:$},J,{children:(0,k.jsx)(G,(0,l.Z)({appear:!0,in:I,timeout:Q,role:"presentation"},q,{children:(0,k.jsx)(S,{className:(0,s.Z)(ee.container),onMouseDown:function(e){ne.current=e.target===e.currentTarget},ownerState:$,children:(0,k.jsx)(w,(0,l.Z)({as:z,elevation:24,role:"dialog","aria-describedby":m,"aria-labelledby":ae},X,{className:(0,s.Z)(ee.paper,X.className),ownerState:$,children:(0,k.jsx)(N.Provider,{value:ie,children:_})}))})}))}))}))}}]);
//# sourceMappingURL=463.e7987a75.chunk.js.map