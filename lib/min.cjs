"use strict";var o;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,o=e=>{var t;return t=e.length,t?(1===t&&([t]=e,Array.isArray(t)||(e=t)),JSON.stringify(e)):""};exports.default=(r,a)=>{var s=async(e,t)=>{e=await fetch(a+e,{method:"POST",body:o(t),headers:{"content-type":"json"}});return[200,304].includes(e.status)?(t=await e.text())?JSON.parse(t):void 0:r(e)},n=a=>new Proxy(()=>{},{get:(e,t)=>{var r=a;return r&&(r+="."),n(r+t)},apply:(e,t,r)=>s(a,r)});return[n(""),e=>{a=e}]};