"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var o=require("msgpackr"),y=e=>{var r;return r=e.length,r?(1===r&&([r]=e,Array.isArray(r)||(e=r)),JSON.stringify(e)):""},d={"content-type":"-"};exports.default=(a,n)=>{var s,u=async(e,r)=>{var t;return s?(t=s,s=void 0):t=d,e=await fetch(n+e,{method:"POST",body:y(r),headers:t}),[200,304].includes(e.status)?(r=await e.arrayBuffer()).byteLength?(0,o.unpack)(new Uint8Array(r)):void 0:a(e)},i=a=>new Proxy(()=>{},{get:(e,r)=>{var t=a;return t&&(t+="."),i(t+r)},set:(e,r,t)=>{(s=s||{...d})[r]=t},apply:(e,r,t)=>u(a,t)});return[i(""),e=>{n=e}]};