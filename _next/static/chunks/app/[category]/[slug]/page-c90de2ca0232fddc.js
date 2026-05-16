(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[621],{930:function(e,t,n){Promise.resolve().then(n.bind(n,7870))},8030:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(2265);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((e,t,n)=>!!e&&n.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,r.forwardRef)((e,t)=>{let{color:n="currentColor",size:o=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:c="",children:u,iconNode:d,...p}=e;return(0,r.createElement)("svg",{ref:t,...l,width:o,height:o,stroke:n,strokeWidth:s?24*Number(i)/Number(o):i,className:a("lucide",c),...p},[...d.map(e=>{let[t,n]=e;return(0,r.createElement)(t,n)}),...Array.isArray(u)?u:[u]])}),s=(e,t)=>{let n=(0,r.forwardRef)((n,l)=>{let{className:s,...c}=n;return(0,r.createElement)(i,{ref:l,iconNode:t,className:a("lucide-".concat(o(e)),s),...c})});return n.displayName="".concat(e),n}},7870:function(e,t,n){"use strict";n.d(t,{default:function(){return c}});var r=n(7437),o=n(8030);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,o.Z)("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]),l=(0,o.Z)("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]),i=(0,o.Z)("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);var s=n(2265);function c(e){let{title:t}=e,[n,o]=(0,s.useState)(!1),c=window.location.href;return(0,r.jsxs)("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[(0,r.jsxs)("button",{className:"btn",onClick:()=>{window.open("https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(t),"&url=").concat(encodeURIComponent(c)),"_blank")},style:{display:"flex",alignItems:"center",gap:"0.5rem",textTransform:"none",letterSpacing:"normal"},children:[(0,r.jsx)(a,{size:16})," Twitter"]}),(0,r.jsxs)("button",{className:"btn",onClick:()=>{window.open("https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent(c)),"_blank")},style:{display:"flex",alignItems:"center",gap:"0.5rem",textTransform:"none",letterSpacing:"normal"},children:[(0,r.jsx)(l,{size:16})," Facebook"]}),(0,r.jsxs)("button",{className:"btn",onClick:()=>{navigator.clipboard.writeText(c),o(!0),setTimeout(()=>o(!1),2e3)},style:{display:"flex",alignItems:"center",gap:"0.5rem",textTransform:"none",letterSpacing:"normal"},children:[(0,r.jsx)(i,{size:16})," ",n?"Copied!":"Copy Link"]})]})}}},function(e){e.O(0,[971,23,744],function(){return e(e.s=930)}),_N_E=e.O()}]);