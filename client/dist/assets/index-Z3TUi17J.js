import{r as i,g as p,j as e,N as f,u as v,a as N}from"./index-DmQD9T4h.js";import{G as g,F as w}from"./index-Cek4qtxg.js";import{g as u,S,l as z}from"./authService-4Hu2UIFX.js";const y="/assets/logo-reXvg9cO.png";function H(s){return g({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"},child:[]}]})(s)}function b(s){return g({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"},child:[]}]})(s)}const k=({sidebarData:s})=>{var h,r,x;const[l,d]=i.useState(!1),o=(r=(h=p())==null?void 0:h.user)==null?void 0:r.id,[t,a]=i.useState(null);return i.useEffect(()=>{(async()=>{const c=await u(o);a(c)})()},[o]),e.jsx("div",{className:`sidebar-upper ${l?"side-open":""}`,children:e.jsxs("div",{className:"sidebar",children:[e.jsxs("div",{className:" py-4 position-relative text-purple d-flex align-items-center justify-content-between",children:[!l&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{width:"50px"},children:e.jsx("img",{className:"w-100 h-100",src:y,alt:""})}),e.jsx("div",{className:"text-purple me-auto ps-2 fw-bold text-capitalize text-center",children:((x=t==null?void 0:t.name)==null?void 0:x.length)<10?t==null?void 0:t.name:(t==null?void 0:t.name)+"..."})]}),e.jsx(b,{onClick:()=>d(!l),className:l?"side-closer more":"side-closer",size:30})]}),e.jsx("ul",{className:"sidebar-list px-0",children:s==null?void 0:s.map((n,c)=>e.jsx(f,{to:n.path,className:({isActive:m})=>(m?"active":"")+" text-decoration-none",children:e.jsxs("li",{children:[e.jsx("span",{children:n==null?void 0:n.icon}),!l&&e.jsxs(e.Fragment,{children:[e.jsx("span",{children:n==null?void 0:n.name}),e.jsx("span",{className:"ms-auto  active-icon",children:e.jsx(w,{})})]})]})},c))})]})})};function M(s){return s.substring(s.lastIndexOf("/")+1).replace(/-/g," ").replace(/\b\w/g,t=>t.toUpperCase())}const E=()=>{var n,c;const[s,l]=i.useState(!1),d=v(),{pathname:o}=N(),t=M(o),[a,h]=i.useState(null),r=(c=(n=p())==null?void 0:n.user)==null?void 0:c.id,x=async()=>{await z()&&d("/auth/login")};return i.useEffect(()=>{(async()=>{const j=await u(r);h(j)})()},[r]),e.jsxs("div",{className:"d-flex  admin-header justify-content-between align-items-center",children:[e.jsx("h5",{className:"text-capitalize",children:t}),e.jsxs("div",{className:"right-profile  d-flex gap-4",children:[e.jsxs("div",{className:"d-flex  gap-2",children:[e.jsxs("div",{className:" text-purple flex-column d-flex my-auto fw-600",children:[e.jsxs("span",{className:"fw20",children:["  ",a==null?void 0:a.email," "]}),e.jsx("small",{className:"role fs12",children:a==null?void 0:a.role})]}),e.jsx("button",{className:"d-flex btn text-start",onClick:()=>l(!s),children:e.jsx("div",{className:"d-flex flex-column",children:e.jsx("div",{className:"pro-img rounded-circle",style:{width:"50px"},children:e.jsx("img",{src:S+(a==null?void 0:a.profile),className:"w-100 h-100 rounded-circle",alt:"profile"})})})})]}),e.jsx("ul",{className:`drop-down-list ${s&&"dropdown-toggles"} px-0 rounded d-flex flex-column gap-1`,children:e.jsxs("li",{className:"d-flex gap-2 text-purple",onClick:()=>x(),children:[e.jsx(H,{size:20})," ",e.jsx("span",{children:"Logout"})]})})]})]})};export{E as H,k as S};
