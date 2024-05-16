"use strict";(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[76],{6076:function(e,t,a){a.r(t),a.d(t,{default:function(){return xe}});var s=a(16871),r=a(14880),n=a(70885),l=a(72791),i=a(72930),o=a(1413),c=a(91933),d=a(74569),u=a.n(d),m="".concat("","/user"),p="".concat("","/users/query"),x=function(e){return u().put(m,e).then((function(e){return e.data})).then((function(e){return e.data}))},h=function(e){return u().post("".concat(m,"/").concat(e.id),e).then((function(e){return e.data})).then((function(e){return e.data}))},f=a(80184),v=(0,l.createContext)(i.vv),b=function(e){var t=e.children,a=(0,l.useState)(i.vv.state),s=(0,n.Z)(a,2),r=s[0],c=s[1];return(0,f.jsx)(v.Provider,{value:{state:r,updateState:function(e){var t=(0,o.Z)((0,o.Z)({},r),e);c(t)}},children:t})},j=function(){return(0,l.useContext)(v)},g=(0,i.gl)(i.B2),N=function(e){var t=e.children,a=j().state,s=(0,l.useState)((0,i.gJ)(a)),r=(0,n.Z)(s,2),o=r[0],d=r[1],m=(0,l.useMemo)((function(){return(0,i.gJ)(a)}),[a]);(0,l.useEffect)((function(){o!==m&&d(m)}),[m]);var x=(0,c.useQuery)("".concat(i.vb.USERS_LIST,"-").concat(o),(function(){return function(e){return u().get("".concat(p,"?").concat(e)).then((function(e){return e.data}))}(o)}),{cacheTime:0,keepPreviousData:!0,refetchOnWindowFocus:!1}),h=x.isFetching,v=x.refetch,b=x.data;return(0,f.jsx)(g.Provider,{value:{isLoading:h,refetch:v,response:b,query:o},children:t})},k=function(){return(0,l.useContext)(g)},y=function(){var e=k().response;return e&&(null===e||void 0===e?void 0:e.data)||[]},w=function(){return k().isLoading},_=(0,l.createContext)(i.px),S=function(e){var t=e.children,a=(0,l.useState)(i.px.selected),s=(0,n.Z)(a,2),r=s[0],o=s[1],c=(0,l.useState)(i.px.itemIdForUpdate),d=(0,n.Z)(c,2),u=d[0],m=d[1],p=k().isLoading,x=y(),h=(0,l.useMemo)((function(){return(0,i.Qx)(p,x)}),[p,x]),v=(0,l.useMemo)((function(){return(0,i.HX)(x,r)}),[x,r]);return(0,f.jsx)(_.Provider,{value:{selected:r,itemIdForUpdate:u,setItemIdForUpdate:m,disabled:h,isAllSelected:v,onSelect:function(e){(0,i.G8)(e,r,o)},onSelectAll:function(){(0,i.ir)(v,o,x)},clearSelected:function(){o([])}},children:t})},Z=function(){return(0,l.useContext)(_)},F=a(65899),P=function(){var e=j().updateState,t=k().isLoading,a=(0,l.useState)(),s=(0,n.Z)(a,2),r=s[0],c=s[1],d=(0,l.useState)(),u=(0,n.Z)(d,2),m=u[0],p=u[1];(0,l.useEffect)((function(){F.Mn.reinitialization()}),[]);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("button",{disabled:t,type:"button",className:"btn btn-light-primary me-3","data-kt-menu-trigger":"click","data-kt-menu-placement":"bottom-end",children:[(0,f.jsx)(i.D8,{path:"/media/icons/duotune/general/gen031.svg",className:"svg-icon-2"}),"Filter"]}),(0,f.jsxs)("div",{className:"menu menu-sub menu-sub-dropdown w-300px w-md-325px","data-kt-menu":"true",children:[(0,f.jsx)("div",{className:"px-7 py-5",children:(0,f.jsx)("div",{className:"fs-5 text-dark fw-bolder",children:"Filter Options"})}),(0,f.jsx)("div",{className:"separator border-gray-200"}),(0,f.jsxs)("div",{className:"px-7 py-5","data-kt-user-table-filter":"form",children:[(0,f.jsxs)("div",{className:"mb-10",children:[(0,f.jsx)("label",{className:"form-label fs-6 fw-bold",children:"Role:"}),(0,f.jsxs)("select",{className:"form-select form-select-solid fw-bolder","data-kt-select2":"true","data-placeholder":"Select option","data-allow-clear":"true","data-kt-user-table-filter":"role","data-hide-search":"true",onChange:function(e){return c(e.target.value)},value:r,children:[(0,f.jsx)("option",{value:""}),(0,f.jsx)("option",{value:"Administrator",children:"Administrator"}),(0,f.jsx)("option",{value:"Analyst",children:"Analyst"}),(0,f.jsx)("option",{value:"Developer",children:"Developer"}),(0,f.jsx)("option",{value:"Support",children:"Support"}),(0,f.jsx)("option",{value:"Trial",children:"Trial"})]})]}),(0,f.jsxs)("div",{className:"mb-10",children:[(0,f.jsx)("label",{className:"form-label fs-6 fw-bold",children:"Last login:"}),(0,f.jsxs)("select",{className:"form-select form-select-solid fw-bolder","data-kt-select2":"true","data-placeholder":"Select option","data-allow-clear":"true","data-kt-user-table-filter":"two-step","data-hide-search":"true",onChange:function(e){return p(e.target.value)},value:m,children:[(0,f.jsx)("option",{value:""}),(0,f.jsx)("option",{value:"Yesterday",children:"Yesterday"}),(0,f.jsx)("option",{value:"20 mins ago",children:"20 mins ago"}),(0,f.jsx)("option",{value:"5 hours ago",children:"5 hours ago"}),(0,f.jsx)("option",{value:"2 days ago",children:"2 days ago"})]})]}),(0,f.jsxs)("div",{className:"d-flex justify-content-end",children:[(0,f.jsx)("button",{type:"button",disabled:t,onClick:function(){e((0,o.Z)({filter:{role:r,last_login:m}},i.Xw))},className:"btn btn-light btn-active-light-primary fw-bold me-2 px-6","data-kt-menu-dismiss":"true","data-kt-user-table-filter":"reset",children:"Reset"}),(0,f.jsx)("button",{disabled:t,type:"button",onClick:function(){e((0,o.Z)({filter:void 0},i.Xw))},className:"btn btn-primary fw-bold px-6","data-kt-menu-dismiss":"true","data-kt-user-table-filter":"filter",children:"Apply"})]})]})]})]})},C=function(){var e=Z().setItemIdForUpdate;return(0,f.jsxs)("div",{className:"d-flex justify-content-end","data-kt-user-table-toolbar":"base",children:[(0,f.jsx)(P,{}),(0,f.jsxs)("button",{type:"button",className:"btn btn-light-primary me-3",children:[(0,f.jsx)(i.D8,{path:"/media/icons/duotune/arrows/arr078.svg",className:"svg-icon-2"}),"Export"]}),(0,f.jsxs)("button",{type:"button",className:"btn btn-primary",onClick:function(){e(null)},children:[(0,f.jsx)(i.D8,{path:"/media/icons/duotune/arrows/arr075.svg",className:"svg-icon-2"}),"Add User"]})]})},A=a(15861),I=a(64687),U=a.n(I),E=function(){var e=Z(),t=e.selected,a=e.clearSelected,s=(0,c.useQueryClient)(),r=k().query,n=(0,c.useMutation)((function(){return function(e){var t=e.map((function(e){return u().delete("".concat(m,"/").concat(e))}));return u().all(t).then((function(){}))}(t)}),{onSuccess:function(){s.invalidateQueries(["".concat(i.vb.USERS_LIST,"-").concat(r)]),a()}});return(0,f.jsxs)("div",{className:"d-flex justify-content-end align-items-center",children:[(0,f.jsxs)("div",{className:"fw-bolder me-5",children:[(0,f.jsx)("span",{className:"me-2",children:t.length})," Selected"]}),(0,f.jsx)("button",{type:"button",className:"btn btn-danger",onClick:(0,A.Z)(U().mark((function e(){return U().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.mutateAsync();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),children:"Delete Selected"})]})},M=function(){var e=j().updateState,t=(0,l.useState)(""),a=(0,n.Z)(t,2),s=a[0],r=a[1],c=(0,i.Nr)(s,150);return(0,l.useEffect)((function(){void 0!==c&&void 0!==s&&e((0,o.Z)({search:c},i.Xw))}),[c]),(0,f.jsx)("div",{className:"card-title",children:(0,f.jsxs)("div",{className:"d-flex align-items-center position-relative my-1",children:[(0,f.jsx)(i.D8,{path:"/media/icons/duotune/general/gen021.svg",className:"svg-icon-1 position-absolute ms-6"}),(0,f.jsx)("input",{type:"text","data-kt-user-table-filter":"search",className:"form-control form-control-solid w-250px ps-14",placeholder:"Search user",value:s,onChange:function(e){return r(e.target.value)}})]})})},T=function(){var e=Z().selected;return(0,f.jsxs)("div",{className:"card-header border-0 pt-6",children:[(0,f.jsx)(M,{}),(0,f.jsx)("div",{className:"card-toolbar",children:e.length>0?(0,f.jsx)(E,{}):(0,f.jsx)(C,{})})]})},D=a(71358),L=function(e){var t=e.column;return(0,f.jsx)(f.Fragment,{children:t.Header&&"string"===typeof t.Header?(0,f.jsx)("th",(0,o.Z)((0,o.Z)({},t.getHeaderProps()),{},{children:t.render("Header")})):t.render("Header")})},H=a(28182),q=function(e){var t=e.row;return(0,f.jsx)("tr",(0,o.Z)((0,o.Z)({},t.getRowProps()),{},{children:t.cells.map((function(e){return(0,f.jsx)("td",(0,o.Z)((0,o.Z)({},e.getCellProps()),{},{className:(0,H.Z)({"text-end min-w-100px":"actions"===e.column.id}),children:e.render("Cell")}))}))}))},R=function(e){var t,a,s,r=e.user;return(0,f.jsxs)("div",{className:"d-flex align-items-center",children:[(0,f.jsx)("div",{className:"symbol symbol-circle symbol-50px overflow-hidden me-3",children:(0,f.jsx)("a",{href:"#",children:r.avatar?(0,f.jsx)("div",{className:"symbol-label",children:(0,f.jsx)("img",{src:(0,i.BY)("/media/".concat(r.avatar)),alt:r.name,className:"w-100"})}):(0,f.jsx)("div",{className:(0,H.Z)("symbol-label fs-3","bg-light-".concat(null===(t=r.initials)||void 0===t?void 0:t.state),"text-".concat(null===(a=r.initials)||void 0===a?void 0:a.state)),children:null===(s=r.initials)||void 0===s?void 0:s.label})})}),(0,f.jsxs)("div",{className:"d-flex flex-column",children:[(0,f.jsx)("a",{href:"#",className:"text-gray-800 text-hover-primary mb-1",children:r.name}),(0,f.jsx)("span",{children:r.email})]})]})},B=function(e){var t=e.last_login;return(0,f.jsx)("div",{className:"badge badge-light fw-bolder",children:t})},O=function(e){var t=e.two_steps;return(0,f.jsxs)(f.Fragment,{children:[" ",t&&(0,f.jsx)("div",{className:"badge badge-light-success fw-bolder",children:"Enabled"})]})},X=function(e){var t=e.id,a=Z().setItemIdForUpdate,s=k().query,r=(0,c.useQueryClient)();(0,l.useEffect)((function(){F.Mn.reinitialization()}),[]);var n=(0,c.useMutation)((function(){return e=t,u().delete("".concat(m,"/").concat(e)).then((function(){}));var e}),{onSuccess:function(){r.invalidateQueries(["".concat(i.vb.USERS_LIST,"-").concat(s)])}});return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("a",{href:"#",className:"btn btn-light btn-active-light-primary btn-sm","data-kt-menu-trigger":"click","data-kt-menu-placement":"bottom-end",children:["Actions",(0,f.jsx)(i.D8,{path:"/media/icons/duotune/arrows/arr072.svg",className:"svg-icon-5 m-0"})]}),(0,f.jsxs)("div",{className:"menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4","data-kt-menu":"true",children:[(0,f.jsx)("div",{className:"menu-item px-3",children:(0,f.jsx)("a",{className:"menu-link px-3",onClick:function(){a(t)},children:"Edit"})}),(0,f.jsx)("div",{className:"menu-item px-3",children:(0,f.jsx)("a",{className:"menu-link px-3","data-kt-users-table-filter":"delete_row",onClick:(0,A.Z)(U().mark((function e(){return U().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.mutateAsync();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),children:"Delete"})})]})]})},Q=function(e){var t=e.id,a=Z(),s=a.selected,r=a.onSelect,n=(0,l.useMemo)((function(){return s.includes(t)}),[t,s]);return(0,f.jsx)("div",{className:"form-check form-check-custom form-check-solid",children:(0,f.jsx)("input",{className:"form-check-input",type:"checkbox","data-kt-check":n,"data-kt-check-target":"#kt_table_users .form-check-input",checked:n,onChange:function(){return r(t)}})})},W=function(e){var t=e.className,a=e.title,s=e.tableProps,r=s.column.id,n=j(),c=n.state,d=n.updateState,u=(0,l.useMemo)((function(){return c.sort&&c.sort===r}),[c,r]),m=(0,l.useMemo)((function(){return c.order}),[c]);return(0,f.jsx)("th",(0,o.Z)((0,o.Z)({},s.column.getHeaderProps()),{},{className:(0,H.Z)(t,u&&void 0!==m&&"table-sort-".concat(m)),style:{cursor:"pointer"},onClick:function(){if("actions"!==r&&"selection"!==r)if(u){if(u&&void 0!==m){if("asc"===m)return void d((0,o.Z)({sort:r,order:"desc"},i.Xw));d((0,o.Z)({sort:void 0,order:void 0},i.Xw))}}else d((0,o.Z)({sort:r,order:"asc"},i.Xw))},children:a}))},Y=function(e){var t=e.tableProps,a=Z(),s=a.isAllSelected,r=a.onSelectAll;return(0,f.jsx)("th",(0,o.Z)((0,o.Z)({},t.column.getHeaderProps()),{},{className:"w-10px pe-2",children:(0,f.jsx)("div",{className:"form-check form-check-sm form-check-custom form-check-solid me-3",children:(0,f.jsx)("input",{className:"form-check-input",type:"checkbox","data-kt-check":s,"data-kt-check-target":"#kt_table_users .form-check-input",checked:s,onChange:r})})}))},V=[{Header:function(e){return(0,f.jsx)(Y,{tableProps:e})},id:"selection",Cell:function(e){var t=Object.assign({},e);return(0,f.jsx)(Q,{id:t.data[t.row.index].id})}},{Header:function(e){return(0,f.jsx)(W,{tableProps:e,title:"Name",className:"min-w-125px"})},id:"name",Cell:function(e){var t=Object.assign({},e);return(0,f.jsx)(R,{user:t.data[t.row.index]})}},{Header:function(e){return(0,f.jsx)(W,{tableProps:e,title:"Role",className:"min-w-125px"})},accessor:"role"},{Header:function(e){return(0,f.jsx)(W,{tableProps:e,title:"Last login",className:"min-w-125px"})},id:"last_login",Cell:function(e){var t=Object.assign({},e);return(0,f.jsx)(B,{last_login:t.data[t.row.index].last_login})}},{Header:function(e){return(0,f.jsx)(W,{tableProps:e,title:"Two steps",className:"min-w-125px"})},id:"two_steps",Cell:function(e){var t=Object.assign({},e);return(0,f.jsx)(O,{two_steps:t.data[t.row.index].two_steps})}},{Header:function(e){return(0,f.jsx)(W,{tableProps:e,title:"Joined day",className:"min-w-125px"})},accessor:"joined_day"},{Header:function(e){return(0,f.jsx)(W,{tableProps:e,title:"Actions",className:"text-end min-w-100px"})},id:"actions",Cell:function(e){var t=Object.assign({},e);return(0,f.jsx)(X,{id:t.data[t.row.index].id})}}],J=function(){return(0,f.jsx)("div",{style:(0,o.Z)((0,o.Z)({},{borderRadius:"0.475rem",boxShadow:"0 0 50px 0 rgb(82 63 105 / 15%)",backgroundColor:"#fff",color:"#7e8299",fontWeight:"500",margin:"0",width:"auto",padding:"1rem 2rem",top:"calc(50% - 2rem)",left:"calc(50% - 4rem)"}),{},{position:"absolute",textAlign:"center"}),children:"Processing..."})},z=function(e){return"&laquo; Previous"===e?"Previous":"Next &raquo;"===e?"Next":e},G=function(){var e,t=function(){var e=(0,o.Z)({links:[]},i.Xw),t=k().response;return t&&t.payload&&t.payload.pagination?t.payload.pagination:e}(),a=w(),s=j().updateState;return(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)("div",{className:"col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"}),(0,f.jsx)("div",{className:"col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end",children:(0,f.jsx)("div",{id:"kt_table_users_paginate",children:(0,f.jsx)("ul",{className:"pagination",children:null===(e=t.links)||void 0===e?void 0:e.map((function(e){return(0,o.Z)((0,o.Z)({},e),{},{label:z(e.label)})})).map((function(e){return(0,f.jsx)("li",{className:(0,H.Z)("page-item",{active:t.page===e.page,disabled:a,previous:"Previous"===e.label,next:"Next"===e.label}),children:(0,f.jsx)("a",{className:(0,H.Z)("page-link",{"page-text":"Previous"===e.label||"Next"===e.label,"me-5":"Previous"===e.label}),onClick:function(){var r;(r=e.page)&&!a&&t.page!==r&&s({page:r,items_per_page:t.items_per_page||10})},style:{cursor:"pointer"},children:z(e.label)})},e.label)}))})})})]})},K=function(){var e=y(),t=w(),a=(0,l.useMemo)((function(){return e}),[e]),s=(0,l.useMemo)((function(){return V}),[]),r=(0,D.useTable)({columns:s,data:a}),n=r.getTableProps,c=r.getTableBodyProps,d=r.headers,u=r.rows,m=r.prepareRow;return(0,f.jsxs)(i.mN,{className:"py-4",children:[(0,f.jsx)("div",{className:"table-responsive",children:(0,f.jsxs)("table",(0,o.Z)((0,o.Z)({id:"kt_table_users",className:"table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"},n()),{},{children:[(0,f.jsx)("thead",{children:(0,f.jsx)("tr",{className:"text-start text-muted fw-bolder fs-7 text-uppercase gs-0",children:d.map((function(e){return(0,f.jsx)(L,{column:e},e.id)}))})}),(0,f.jsx)("tbody",(0,o.Z)((0,o.Z)({className:"text-gray-600 fw-bold"},c()),{},{children:u.length>0?u.map((function(e,t){return m(e),(0,f.jsx)(q,{row:e},"row-".concat(t,"-").concat(e.id))})):(0,f.jsx)("tr",{children:(0,f.jsx)("td",{colSpan:7,children:(0,f.jsx)("div",{className:"d-flex text-center w-100 align-content-center justify-content-center",children:"No matching records found"})})})}))]}))}),(0,f.jsx)(G,{}),t&&(0,f.jsx)(J,{})]})},$=function(){var e=Z().setItemIdForUpdate;return(0,f.jsxs)("div",{className:"modal-header",children:[(0,f.jsx)("h2",{className:"fw-bolder",children:"Add User"}),(0,f.jsx)("div",{className:"btn btn-icon btn-sm btn-active-icon-primary","data-kt-users-modal-action":"close",onClick:function(){return e(void 0)},style:{cursor:"pointer"},children:(0,f.jsx)(i.D8,{path:"/media/icons/duotune/arrows/arr061.svg",className:"svg-icon-1"})})]})},ee=a(76863),te=a(92506),ae="avatars/300-6.jpg",se="Art Director",re="Administrator",ne="",le="",ie=ee.Ry().shape({email:ee.Z_().email("Wrong email format").min(3,"Minimum 3 symbols").max(50,"Maximum 50 symbols").required("Email is required"),name:ee.Z_().min(3,"Minimum 3 symbols").max(50,"Maximum 50 symbols").required("Name is required")}),oe=function(e){var t=e.user,a=e.isUserLoading,s=Z().setItemIdForUpdate,r=k().refetch,c=(0,l.useState)((0,o.Z)((0,o.Z)({},t),{},{avatar:t.avatar||ae,role:t.role||re,position:t.position||se,name:t.name||ne,email:t.email||le})),d=(0,n.Z)(c,1)[0],u=function(e){e&&r(),s(void 0)},m=(0,i.BY)("/media/svg/avatars/blank.svg"),p=(0,i.BY)("/media/".concat(d.avatar)),v=(0,te.TA)({initialValues:d,validationSchema:ie,onSubmit:function(){var e=(0,A.Z)(U().mark((function e(t,a){var s;return U().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((s=a.setSubmitting)(!0),e.prev=2,!(0,i.UE)(t.id)){e.next=8;break}return e.next=6,h(t);case 6:e.next=10;break;case 8:return e.next=10,x(t);case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),console.error(e.t0);case 15:return e.prev=15,s(!0),u(!0),e.finish(15);case 19:case"end":return e.stop()}}),e,null,[[2,12,15,19]])})));return function(t,a){return e.apply(this,arguments)}}()});return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("form",{id:"kt_modal_add_user_form",className:"form",onSubmit:v.handleSubmit,noValidate:!0,children:[(0,f.jsxs)("div",{className:"d-flex flex-column scroll-y me-n7 pe-7",id:"kt_modal_add_user_scroll","data-kt-scroll":"true","data-kt-scroll-activate":"{default: false, lg: true}","data-kt-scroll-max-height":"auto","data-kt-scroll-dependencies":"#kt_modal_add_user_header","data-kt-scroll-wrappers":"#kt_modal_add_user_scroll","data-kt-scroll-offset":"300px",children:[(0,f.jsxs)("div",{className:"fv-row mb-7",children:[(0,f.jsx)("label",{className:"d-block fw-bold fs-6 mb-5",children:"Avatar"}),(0,f.jsx)("div",{className:"image-input image-input-outline","data-kt-image-input":"true",style:{backgroundImage:"url('".concat(m,"')")},children:(0,f.jsx)("div",{className:"image-input-wrapper w-125px h-125px",style:{backgroundImage:"url('".concat(p,"')")}})})]}),(0,f.jsxs)("div",{className:"fv-row mb-7",children:[(0,f.jsx)("label",{className:"required fw-bold fs-6 mb-2",children:"Full Name"}),(0,f.jsx)("input",(0,o.Z)((0,o.Z)({placeholder:"Full name"},v.getFieldProps("name")),{},{type:"text",name:"name",className:(0,H.Z)("form-control form-control-solid mb-3 mb-lg-0",{"is-invalid":v.touched.name&&v.errors.name},{"is-valid":v.touched.name&&!v.errors.name}),autoComplete:"off",disabled:v.isSubmitting||a})),v.touched.name&&v.errors.name&&(0,f.jsx)("div",{className:"fv-plugins-message-container",children:(0,f.jsx)("div",{className:"fv-help-block",children:(0,f.jsx)("span",{role:"alert",children:v.errors.name})})})]}),(0,f.jsxs)("div",{className:"fv-row mb-7",children:[(0,f.jsx)("label",{className:"required fw-bold fs-6 mb-2",children:"Email"}),(0,f.jsx)("input",(0,o.Z)((0,o.Z)({placeholder:"Email"},v.getFieldProps("email")),{},{className:(0,H.Z)("form-control form-control-solid mb-3 mb-lg-0",{"is-invalid":v.touched.email&&v.errors.email},{"is-valid":v.touched.email&&!v.errors.email}),type:"email",name:"email",autoComplete:"off",disabled:v.isSubmitting||a})),v.touched.email&&v.errors.email&&(0,f.jsx)("div",{className:"fv-plugins-message-container",children:(0,f.jsx)("span",{role:"alert",children:v.errors.email})})]}),(0,f.jsxs)("div",{className:"mb-7",children:[(0,f.jsx)("label",{className:"required fw-bold fs-6 mb-5",children:"Role"}),(0,f.jsx)("div",{className:"d-flex fv-row",children:(0,f.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,f.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},v.getFieldProps("role")),{},{name:"role",type:"radio",value:"Administrator",id:"kt_modal_update_role_option_0",checked:"Administrator"===v.values.role,disabled:v.isSubmitting||a})),(0,f.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_0",children:[(0,f.jsx)("div",{className:"fw-bolder text-gray-800",children:"Administrator"}),(0,f.jsx)("div",{className:"text-gray-600",children:"Best for business owners and company administrators"})]})]})}),(0,f.jsx)("div",{className:"separator separator-dashed my-5"}),(0,f.jsx)("div",{className:"d-flex fv-row",children:(0,f.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,f.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},v.getFieldProps("role")),{},{name:"role",type:"radio",value:"Developer",id:"kt_modal_update_role_option_1",checked:"Developer"===v.values.role,disabled:v.isSubmitting||a})),(0,f.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_1",children:[(0,f.jsx)("div",{className:"fw-bolder text-gray-800",children:"Developer"}),(0,f.jsx)("div",{className:"text-gray-600",children:"Best for developers or people primarily using the API"})]})]})}),(0,f.jsx)("div",{className:"separator separator-dashed my-5"}),(0,f.jsx)("div",{className:"d-flex fv-row",children:(0,f.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,f.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},v.getFieldProps("role")),{},{name:"role",type:"radio",value:"Analyst",id:"kt_modal_update_role_option_2",checked:"Analyst"===v.values.role,disabled:v.isSubmitting||a})),(0,f.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_2",children:[(0,f.jsx)("div",{className:"fw-bolder text-gray-800",children:"Analyst"}),(0,f.jsx)("div",{className:"text-gray-600",children:"Best for people who need full access to analytics data, but don't need to update business settings"})]})]})}),(0,f.jsx)("div",{className:"separator separator-dashed my-5"}),(0,f.jsx)("div",{className:"d-flex fv-row",children:(0,f.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,f.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},v.getFieldProps("role")),{},{name:"role",type:"radio",value:"Support",id:"kt_modal_update_role_option_3",checked:"Support"===v.values.role,disabled:v.isSubmitting||a})),(0,f.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_3",children:[(0,f.jsx)("div",{className:"fw-bolder text-gray-800",children:"Support"}),(0,f.jsx)("div",{className:"text-gray-600",children:"Best for employees who regularly refund payments and respond to disputes"})]})]})}),(0,f.jsx)("div",{className:"separator separator-dashed my-5"}),(0,f.jsx)("div",{className:"d-flex fv-row",children:(0,f.jsxs)("div",{className:"form-check form-check-custom form-check-solid",children:[(0,f.jsx)("input",(0,o.Z)((0,o.Z)({className:"form-check-input me-3"},v.getFieldProps("role")),{},{name:"role",type:"radio",id:"kt_modal_update_role_option_4",value:"Trial",checked:"Trial"===v.values.role,disabled:v.isSubmitting||a})),(0,f.jsxs)("label",{className:"form-check-label",htmlFor:"kt_modal_update_role_option_4",children:[(0,f.jsx)("div",{className:"fw-bolder text-gray-800",children:"Trial"}),(0,f.jsx)("div",{className:"text-gray-600",children:"Best for people who need to preview content data, but don't need to make any updates"})]})]})})]})]}),(0,f.jsxs)("div",{className:"text-center pt-15",children:[(0,f.jsx)("button",{type:"reset",onClick:function(){return u()},className:"btn btn-light me-3","data-kt-users-modal-action":"cancel",disabled:v.isSubmitting||a,children:"Discard"}),(0,f.jsxs)("button",{type:"submit",className:"btn btn-primary","data-kt-users-modal-action":"submit",disabled:a||v.isSubmitting||!v.isValid||!v.touched,children:[(0,f.jsx)("span",{className:"indicator-label",children:"Submit"}),(v.isSubmitting||a)&&(0,f.jsxs)("span",{className:"indicator-progress",children:["Please wait..."," ",(0,f.jsx)("span",{className:"spinner-border spinner-border-sm align-middle ms-2"})]})]})]})]}),(v.isSubmitting||a)&&(0,f.jsx)(J,{})]})},ce=function(){var e=Z(),t=e.itemIdForUpdate,a=e.setItemIdForUpdate,s=(0,i.UE)(t),r=(0,c.useQuery)("".concat(i.vb.USERS_LIST,"-user-").concat(t),(function(){return e=t,u().get("".concat(m,"/").concat(e)).then((function(e){return e.data})).then((function(e){return e.data}));var e}),{cacheTime:0,enabled:s,onError:function(e){a(void 0),console.error(e)}}),n=r.isLoading,l=r.data,o=r.error;return t?n||o||!l?null:(0,f.jsx)(oe,{isUserLoading:n,user:l}):(0,f.jsx)(oe,{isUserLoading:n,user:{id:void 0}})},de=function(){return(0,l.useEffect)((function(){return document.body.classList.add("modal-open"),function(){document.body.classList.remove("modal-open")}}),[]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:"modal fade show d-block",id:"kt_modal_add_user",role:"dialog",tabIndex:-1,"aria-modal":"true",children:(0,f.jsx)("div",{className:"modal-dialog modal-dialog-centered mw-650px",children:(0,f.jsxs)("div",{className:"modal-content",children:[(0,f.jsx)($,{}),(0,f.jsx)("div",{className:"modal-body scroll-y mx-5 mx-xl-15 my-7",children:(0,f.jsx)(ce,{})})]})})}),(0,f.jsx)("div",{className:"modal-backdrop fade show"})]})},ue=function(){var e=Z().itemIdForUpdate;return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(i.O7,{children:[(0,f.jsx)(T,{}),(0,f.jsx)(K,{})]}),void 0!==e&&(0,f.jsx)(de,{})]})},me=function(){return(0,f.jsx)(b,{children:(0,f.jsx)(N,{children:(0,f.jsx)(S,{children:(0,f.jsx)(ue,{})})})})},pe=[{title:"User Management",path:"/apps/user-management/users",isSeparator:!1,isActive:!1},{title:"",path:"",isSeparator:!0,isActive:!1}],xe=function(){return(0,f.jsxs)(s.Z5,{children:[(0,f.jsx)(s.AW,{element:(0,f.jsx)(s.j3,{}),children:(0,f.jsx)(s.AW,{path:"users",element:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(r.V1,{breadcrumbs:pe,children:"Users list"}),(0,f.jsx)(me,{})]})})}),(0,f.jsx)(s.AW,{index:!0,element:(0,f.jsx)(s.Fg,{to:"/apps/user-management/users"})})]})}}}]);
//# sourceMappingURL=76.3de6c47a.chunk.js.map