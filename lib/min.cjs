"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var y=require("msgpackr"),d=r=>{var e;return e=r.length,e?(1===e&&([e]=r,Array.isArray(e)||(r=e)),JSON.stringify(r)):""},v={"content-type":""};exports.default=(s,u)=>{var i,o=async(r,e,t)=>{var a,n=await fetch(u+e,{method:"POST",body:d(t),headers:r});return[200,304].includes(n.status)?(a=await n.arrayBuffer()).byteLength?(0,y.unpack)(new Uint8Array(a)):void 0:s(n,o,r,e,t)},a=n=>new Proxy(()=>{},{get:(r,e)=>{var t=n;return t&&(t+="."),a(t+e)},set:(r,e,t)=>((i=i||{...v})[e]=t,!0),apply:(r,e,t)=>{var a;return i?(a=i,i=void 0):a=v,o(a,n,t)}});return[a(""),r=>{u=r}]};