"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var u=require("msgpackr"),i=e=>{var r;return r=e.length,r?(1===r&&([r]=e,Array.isArray(r)||(e=r)),JSON.stringify(e)):""};exports.default=(t,a)=>{var n=async(e,r)=>{e=await fetch(a+e,{method:"POST",body:i(r),headers:{"content-type":"json"}});return[200,304].includes(e.status)?(r=await e.arrayBuffer()).byteLength?(0,u.unpack)(new Uint8Array(r)):void 0:t(e)},s=a=>new Proxy(()=>{},{get:(e,r)=>{var t=a;return t&&(t+="."),s(t+r)},apply:(e,r,t)=>n(a,t)});return[s(""),e=>{a=e}]};