"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var c=require("msgpackr"),y=e=>{var r;return r=e.length,r?(1===r&&([r]=e,Array.isArray(r)||(e=r)),JSON.stringify(e)):""};exports.default=s=>{var i,u,o={"content-type":""},e=(e,r,t)=>{u=e,e={"accept-language":r||""},t!==location.hostname?e.id=t:delete o.id,Object.assign(o,e)},d=async(e,r,t)=>{var a,n=await fetch(u+r,{method:"POST",body:y(t),headers:e});return[200,304].includes(n.status)?(a=await n.arrayBuffer()).byteLength?(0,c.unpack)(new Uint8Array(a)):void 0:s(n,d,e,r,t)},a=n=>new Proxy(()=>{},{get:(e,r)=>{var t=n;return t&&(t+="."),a(t+r)},set:(e,r,t)=>((i=i||{...o})[r]=t,!0),apply:(e,r,t)=>{var a;return i?(a=i,i=void 0):a=o,d(a,n,t)}});return[a(""),e]};