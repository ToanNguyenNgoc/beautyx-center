"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[354],{68354:(e,l,a)=>{a.r(l),a.d(l,{default:()=>y});var i=a(93511),s=a(86971),n=a(84529),t=a(42807),o=a(56850),d=a(55854),r=a(63516),m=a(72812),c=a(86178),u=a.n(c),h=a(82025),p=a(81637),v=a(10611),x=a(82907),_=a(6171),g=a(73589),j=a(73033),f=a(53536),b=a(92823),N=a.n(b),F=(a(25884),a(70579));const y=function(){const e=(0,s.g)(),{handlePostMedia:l,isLoading:a}=(0,h._r)(),{handlePostMedia:c,isLoading:b}=(0,h._r)(),{resultLoad:y,noti:V,onCloseNoti:C}=(0,h.JX)(),{mutateAsync:D,isLoading:Y}=(0,x.useMutation)({mutationFn:l=>e.id?g.UI.put(e.id,l):g.UI.post(l),onSuccess:()=>y({message:e.id?"C\u1eadp nh\u1eadt promotion th\xe0nh c\xf4ng":"T\u1ea1o m\u1edbi promotion th\xe0nh c\xf4ng",color:"success"}),onError:e=>{var l;y({color:"error",message:`C\xf3 l\u1ed7i x\u1ea3y ra. M\xe3 l\u1ed7i ${null===e||void 0===e||null===(l=e.request)||void 0===l?void 0:l.status}`})}}),k=(0,r.Wx)({initialValues:{name:"",content:"",media_url:"",main_media_id:void 0,thumbnail_url:"",thumbnail_media_id:void 0,is_popup:!1,valid_from:u()().format("YYYY-MM-DD HH:mm:ss"),valid_util:u()().format("YYYY-MM-DD HH:mm:ss"),discounts:[],productables:[]},validationSchema:j.Ik({name:j.Yj().required("Nh\u1eadp t\xean c\u1ee7a promotion"),media_url:j.Yj().required("Upload h\xecnh c\u1ee7a promotion")}),onSubmit:async e=>{const l=(0,f.pickBy)({...e,productables:e.productables.map((e=>e.id)),discounts:e.discounts.map((e=>e.id))},f.identity);await D({...l,is_popup:e.is_popup?1:0})&&(k.setFieldValue("main_media_id",void 0),k.setFieldValue("thumbnail_media_id",void 0))}}),{refetch:M,isFetching:H}=(0,x.useQuery)({queryKey:[_.Eo.PROMOTION,e.id],queryFn:()=>g.UI.getDetail(e.id),enabled:!!e.id,onSuccess:e=>{k.setFieldValue("is_popup",1===e.context.is_popup),k.setFieldValue("name",e.context.name),k.setFieldValue("content",e.context.content),k.setFieldValue("media_url",e.context.media_url),k.setFieldValue("thumbnail_url",e.context.thumbnail_url),k.setFieldValue("valid_from",e.context.valid_from),k.setFieldValue("valid_util",e.context.valid_util),k.setFieldValue("productables",e.context.productables),k.setFieldValue("discounts",e.context.discounts)}});return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(d.ce,{severity:V.color,message:V.message,open:V.openAlert,close:C}),(0,F.jsx)(i.A,{title:e.id?"C\u1eadp nh\u1eadt promotion":"T\u1ea1o m\u1edbi promotion"}),(0,F.jsx)("div",{className:"post d-flex flex-column-fluid",id:"kt_post",children:(0,F.jsx)("div",{className:"promotion-form",children:(0,F.jsxs)("form",{autoComplete:"off",onSubmit:k.handleSubmit,className:"form",children:[(0,F.jsx)("div",{className:"flex-row-sp align-items-center input-wrap",children:(0,F.jsx)("div",{className:"wrap-item",children:(0,F.jsx)(d.Xg,{value:k.values.is_popup,onChange:e=>k.setFieldValue("is_popup",e.target.checked),label:"Is Popup"})})}),(0,F.jsxs)("div",{className:"column",children:[(0,F.jsx)("div",{className:"required form-label",children:"H\xecnh \u1ea3nh"}),(0,F.jsx)("div",{className:"drag-banner",children:(0,F.jsx)(n.l,{className:"form-input-file",style:{width:"100%"},multiple:!1,handleChange:e=>{k.setFieldValue("media_url","");l({e:{target:{files:[e]}},callBack(e){var l,a,i;k.setFieldValue("media_url",null!==(l=null===(a=e[0])||void 0===a?void 0:a.original_url)&&void 0!==l?l:""),k.setFieldValue("main_media_id",null===(i=e[0])||void 0===i?void 0:i.model_id)},version:"myspa"})},name:"file",types:t.Uv,children:(0,F.jsxs)("div",{className:"banner-form__img",children:[(0,F.jsx)("img",{src:""!==k.values.media_url?k.values.media_url:o.X.imgPlaceHolder,alt:"",className:"image-value"}),a&&(0,F.jsxs)("div",{className:"placeholder",children:[(0,F.jsx)("span",{children:"\u0110ang t\u1ea3i"}),(0,F.jsx)(p.A,{})]}),""===k.values.media_url&&(0,F.jsx)("div",{className:"placeholder",children:(0,F.jsx)("span",{children:"K\xe9o th\u1ea3 h\xecnh \u1ea3nh v\xe0o \u0111\xe2y ho\u1eb7c Click \u0111\u1ec3 ch\u1ecdn h\xecnh \u1ea3nh"})})]})})}),(0,F.jsx)("input",{type:"text",name:"image_url",className:"form-control form-control-solid mt-4 mb-2",placeholder:"Ho\u1eb7c link h\xecnh \u1ea3nh...."}),k.errors.media_url&&k.touched.media_url&&(0,F.jsx)("span",{className:"text-danger",children:k.errors.media_url})]}),(0,F.jsx)("div",{className:"required form-label",children:"Thumbnail"}),(0,F.jsx)("div",{className:"drag-banner",children:(0,F.jsx)(n.l,{className:"form-input-file",style:{width:"100%"},multiple:!1,handleChange:e=>{k.setFieldValue("","");c({e:{target:{files:[e]}},callBack(e){var l,a,i;k.setFieldValue("thumbnail_url",null!==(l=null===(a=e[0])||void 0===a?void 0:a.original_url)&&void 0!==l?l:""),k.setFieldValue("thumbnail_media_id",null===(i=e[0])||void 0===i?void 0:i.model_id)},version:"myspa"})},name:"thumbnail",types:t.Uv,children:(0,F.jsxs)("div",{className:"banner-form__img",children:[(0,F.jsx)("img",{src:""!==k.values.thumbnail_url?k.values.thumbnail_url:o.X.imgPlaceHolder,alt:"",className:"image-value"}),""===k.values.thumbnail_url&&(0,F.jsxs)("div",{className:"placeholder",children:[(0,F.jsx)("span",{children:b?"\u0110ang t\u1ea3i":"K\xe9o th\u1ea3 h\xecnh \u1ea3nh v\xe0o \u0111\xe2y ho\u1eb7c Click \u0111\u1ec3 ch\u1ecdn h\xecnh \u1ea3nh"}),b&&(0,F.jsx)(v.A,{})]})]})})}),(0,F.jsx)("input",{value:k.values.thumbnail_url,onChange:k.handleChange,type:"text",name:"thumbnail_url",className:"form-control form-control-solid mt-4 mb-2",placeholder:"Ho\u1eb7c link h\xecnh \u1ea3nh...."}),(0,F.jsxs)("div",{className:"column",children:[(0,F.jsx)("div",{className:"required form-label",children:"T\xean promotion"}),(0,F.jsx)("input",{value:k.values.name,onChange:k.handleChange,type:"text",name:"name",className:"form-control form-control-solid mt-4 mb-2",placeholder:"T\xean promotion...."}),k.errors.name&&k.touched.name&&(0,F.jsx)("span",{className:"text-danger",children:k.errors.name})]}),(0,F.jsxs)("div",{className:"column",children:[(0,F.jsx)("div",{className:"form-label",children:"M\xf4 t\u1ea3"}),(0,F.jsx)(N(),{theme:"snow",value:k.values.content,onChange:e=>k.setFieldValue("content",e)})]}),(0,F.jsx)("div",{className:"column",children:(0,F.jsx)(d.oG,{required:!0,minDate:new Date,startDate:new Date(k.values.valid_from),endDate:new Date(k.values.valid_util),onChange:e=>{k.setFieldValue("valid_from",u()(e.selection.startDate).format("YYYY-MM-DD HH:mm:ss")),k.setFieldValue("valid_util",u()(e.selection.endDate).format("YYYY-MM-DD HH:mm:ss"))}})}),(0,F.jsx)("div",{className:"column mt-6",children:(0,F.jsx)(d.a6,{productable:k.values.productables,onChangeProductable:e=>k.setFieldValue("productables",e)})}),(0,F.jsx)("div",{className:"column mt-6",children:(0,F.jsx)(d.Nv,{filterAll:!1,discounts:k.values.discounts,onChangeDiscounts:e=>k.setFieldValue("discounts",e)})}),(0,F.jsxs)("div",{className:"d-flex justify-content-end mt-8",children:[e.id&&(0,F.jsx)(m.A,{style:{marginRight:"8px"},loading:H,type:"submit",size:"large",color:"inherit",variant:"contained",onClick:()=>M(),children:"Kh\xf4i ph\u1ee5c"}),(0,F.jsx)(m.A,{loading:Y,type:"submit",size:"large",color:"success",variant:"contained",children:e.id?"C\u1eadp nh\u1eadt Promo":"T\u1ea1o m\u1edbi Promo"})]})]})})})]})}}}]);
//# sourceMappingURL=354.7cefed70.chunk.js.map