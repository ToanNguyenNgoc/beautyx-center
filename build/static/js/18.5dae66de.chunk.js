"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[18],{89018:(e,s,a)=>{a.r(s),a.d(s,{default:()=>j});var t=a(3717),l=a(897),i=a(16422),n=a(93511),c=a(65043),r=a(42807),o=a(86971),d=a(51318),m=a(70579);function h(e){let{item:s}=e;const a=(0,o.Zp)();return(0,m.jsxs)("tr",{className:"text-gray-400 fw-bold fs-7 gs-0",children:[(0,m.jsx)("td",{className:" sorting",tabIndex:0,"aria-controls":"kt_ecommerce_products_table",rowSpan:1,colSpan:1,children:(0,m.jsxs)("div",{className:"d-flex align-items-center",children:[(0,m.jsx)(d.N_,{to:"#",className:"symbol symbol-50px",children:(0,m.jsx)("img",{onError:e=>(0,r.pG)(e),className:"symbol-label",src:`${null===s||void 0===s?void 0:s.org_image}`,alt:""})}),(0,m.jsx)("div",{className:"ms-5",children:(0,m.jsx)("a",{href:"/metronic8/demo1/../demo1/apps/ecommerce/catalog/edit-product.html",className:"text-dark fs-5 fw-bold text-hover-success",children:null===s||void 0===s?void 0:s.service_name})})]})}),(0,m.jsx)("th",{className:"sorting text-gray-600",children:(0,r.$g)(null===s||void 0===s?void 0:s.price)}),(0,m.jsx)("th",{className:"sorting text-gray-800",children:(0,r.$g)((0,r.dw)(null===s||void 0===s?void 0:s.special_price,null===s||void 0===s?void 0:s.special_price_momo))}),(0,m.jsx)("th",{className:"sorting text-gray-600",children:null===s||void 0===s?void 0:s.org_name}),(0,m.jsx)("th",{className:" sorting",children:(0,m.jsx)(r.DH,{status:null===s||void 0===s?void 0:s.is_momo_ecommerce_enable})}),(0,m.jsxs)("th",{className:"text-end",children:[(0,m.jsx)("button",{onClick:()=>(e=>{a(`/pages/service-form/view_service/${null===e||void 0===e?void 0:e.service_id}`)})(s),style:{marginRight:"8px"},className:"btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4",children:(0,m.jsx)("i",{className:"bi bi-eye-fill fs-6"})}),(0,m.jsx)("button",{onClick:()=>(e=>{a(`/pages/service-form/${null===e||void 0===e?void 0:e.service_id}`)})(s),className:"btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4",children:(0,m.jsx)("i",{className:"bi bi-pencil-fill fs-6"})})]})]})}var x=a(95434),p=a(53536),v=a(17843),g=a(87561),u=a(88988),b=a(83521);function j(){var e,s,a;const r=(0,o.zy)(),d=(0,o.Zp)(),j=null!==(e=(0,t.S3)())&&void 0!==e?e:{},[f,w]=(0,c.useState)(),[N,y]=(0,c.useState)((null===j||void 0===j?void 0:j.sort)||""),[_,k]=(0,c.useState)("1"),[S,C]=(0,c.useState)(!0),A={page:null===j||void 0===j?void 0:j.page,sort:null===j||void 0===j?void 0:j.sort};let $=(0,c.useRef)();const I={...i.ZK,page:null!==(s=null===j||void 0===j?void 0:j.page)&&void 0!==s?s:1,"filter[keyword]":f,sort:N,"filter[is_momo_ecommerce_enable]":S},{responseArray:T,totalItem:P,totalPage:B}=(0,t.YJ)(!0,`${l.ts.SERVICES}`,I),D=(0,c.useCallback)((0,p.debounce)((e=>w(e)),600),[]),M=e=>{y(e);const s={...A,page:"1",sort:e},a=`${new URLSearchParams((0,p.pickBy)(s,p.identity)).toString()}`;d({pathname:r.pathname,search:a})};return(0,m.jsxs)("div",{children:[(0,m.jsx)(n.A,{title:"D\u1ecbch v\u1ee5",element:(0,m.jsxs)("div",{className:"d-flex align-items-center position-relative  search-service",children:[(0,m.jsx)("span",{className:"svg-icon svg-icon-1 position-absolute ms-4",children:(0,m.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,m.jsx)("rect",{opacity:"0.5",x:"17.0365",y:"15.1223",width:"8.15546",height:"2",rx:"1",transform:"rotate(45 17.0365 15.1223)",fill:"currentColor"}),(0,m.jsx)("path",{d:"M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z",fill:"currentColor"})]})}),(0,m.jsx)("input",{onChange:()=>(()=>{var e;D(null===$||void 0===$||null===(e=$.current)||void 0===e?void 0:e.value)})(),ref:$,type:"text","data-kt-ecommerce-product-filter":"search",className:"form-control form-control-solid w-200px ps-14",placeholder:"T\xecm ki\u1ebfm d\u1ecbch v\u1ee5"})]})}),(0,m.jsxs)("div",{className:"card mb-5 mb-xl-8",children:[(0,m.jsxs)("div",{className:"card-header border-0 pt-5",children:[(0,m.jsxs)("h3",{className:"card-title align-items-start flex-column",children:[(0,m.jsx)("span",{className:"card-label fw-bold fs-3 mb-1",children:"Danh s\xe1ch d\u1ecbch v\u1ee5"}),(0,m.jsxs)("span",{className:"text-muted mt-1 fw-semobold fs-7",children:[P," D\u1ecbch v\u1ee5"]})]}),(0,m.jsxs)("div",{className:"flex-row align-items-center table-responsive category-service gap-4",children:[(0,m.jsxs)("div",{className:"flex-row align-items-center gap-2",children:[(0,m.jsx)("span",{style:{whiteSpace:"nowrap"},className:"text-gray-400 fw-bold fs-7 gs-0",children:"B\u1eadt/t\u1eaft TM\u0110T:"}),(0,m.jsx)(v.A,{defaultChecked:!0,color:"success",onChange:()=>{C(!S)}})]}),(0,m.jsxs)("div",{className:"flex-row align-items-center",children:[(0,m.jsx)("span",{style:{whiteSpace:"nowrap"},className:"text-gray-400 fw-bold fs-7 gs-0",children:"B\u1ed9 l\u1ecdc:"}),(0,m.jsx)(g.A,{children:(0,m.jsxs)(b.A,{value:_,onChange:e=>{k(e.target.value)},children:[(0,m.jsx)(u.A,{onClick:()=>{y("");const e={...A,page:null===j||void 0===j?void 0:j.page,sort:""},s=`${new URLSearchParams((0,p.pickBy)(e,p.identity)).toString()}`;d({pathname:r.pathname,search:s})},value:1,children:"T\u1ea5t c\u1ea3"}),(0,m.jsx)(u.A,{onClick:()=>M("price"),value:2,children:"Gi\xe1 th\u1ea5p"}),(0,m.jsx)(u.A,{onClick:()=>M("bought_count"),value:3,children:"Mua nhi\u1ec1u nh\u1ea5t"}),(0,m.jsx)(u.A,{onClick:()=>M("created_date"),value:4,children:"M\u1edbi nh\u1ea5t"})]})})]})]})]}),(0,m.jsx)("div",{className:"card-body py-3",children:(0,m.jsx)("div",{className:"table-responsive",children:(0,m.jsxs)("table",{className:"table align-middle gs-0 gy-4 table-row-dashed ",children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{className:"text-gray-400 fw-bold fs-7 gs-0",children:[(0,m.jsx)("th",{className:"min-w-200px sorting",tabIndex:0,"aria-controls":"kt_ecommerce_products_table",rowSpan:1,colSpan:1,style:{width:"25%"},children:"D\u1ecbch v\u1ee5"}),(0,m.jsx)("th",{className:"min-w-50px sorting",tabIndex:0,"aria-controls":"kt_ecommerce_products_table",rowSpan:1,colSpan:1,style:{width:"10%"},children:"Gi\xe1 g\u1ed1c"}),(0,m.jsx)("th",{className:"min-w-70px sorting",tabIndex:0,"aria-controls":"kt_ecommerce_products_table",rowSpan:1,colSpan:1,style:{width:"10%"},children:"Gi\xe1 gi\u1ea3m"}),(0,m.jsx)("th",{className:"min-w-150px sorting",tabIndex:0,"aria-controls":"kt_ecommerce_products_table",rowSpan:1,colSpan:1,style:{width:"20%"},children:"Doanh nghi\u1ec7p"}),(0,m.jsx)("th",{className:"min-w-50px sorting",tabIndex:0,"aria-controls":"kt_ecommerce_products_table",rowSpan:1,colSpan:1,style:{width:"15%"},children:"Tr\u1ea1ng th\xe1i TM\u0110T"}),(0,m.jsx)("th",{className:"min-w-100px text-end",rowSpan:1,colSpan:1,style:{width:"10%"},children:"T\xf9y ch\u1ecdn"})]})}),(0,m.jsx)("tbody",{children:null===T||void 0===T?void 0:T.map(((e,s)=>(0,m.jsx)(h,{item:e},s)))})]})})})]}),(0,m.jsx)(x.f_,{totalPage:B,onChangePage:e=>{const s={...A,page:e},a=`${new URLSearchParams((0,p.pickBy)(s,p.identity)).toString()}`;d({pathname:r.pathname,search:a})},defaultPage:null!==(a=null===j||void 0===j?void 0:j.page)&&void 0!==a?a:1})]})}},93511:(e,s,a)=>{a.d(s,{A:()=>l});a(65043);var t=a(70579);const l=function(e){const{title:s,element:a}=e;return(0,t.jsx)("div",{className:"toolbar",id:"kt_toolbar",children:(0,t.jsxs)("div",{id:"kt_toolbar_container",className:"container-fluid d-flex flex-stack",children:[(0,t.jsx)("h1",{className:"d-flex align-items-center text-dark fw-bolder my-1 fs-3",children:s}),a]})})}}}]);
//# sourceMappingURL=18.5dae66de.chunk.js.map