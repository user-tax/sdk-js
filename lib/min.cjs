"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,Object.defineProperty(exports,"unpack",{enumerable:!0,get:function(){return f.unpack}});var f=require("msgpackr"),u=e=>{var r;return r=e.length,r?(1===r&&([r]=e,Array.isArray(r)||(e=r)),JSON.stringify(e)):""};exports.default=c=>{var i,o,d={"Content-Type":""},a=async(r,t)=>{var e,a,n,i,s,u;if(a=t["headers"],a)for(u of Object.entries(d))[n,s]=u,n in a||(a[n]=s);else t.headers=d;try{i=await fetch(o+r,t)}catch(e){return c(e,p,r,t)}return[200,304].includes(i.status)?(e=await i.arrayBuffer()).byteLength?(0,f.unpack)(new Uint8Array(e)):void 0:c(i,p,r,t)},n=[],p=(t,a)=>new Promise((e,r)=>n.unshift([t,a,e,r])),e=(e,r)=>{var t;for(o=e,d["Accept-Language"]=r||"",p=a;;){if(!(t=n.pop()))break;p(...t.slice(0,2)).then(...t.slice(2))}},s=n=>new Proxy(()=>{},{get:(e,r)=>{var t=n;return t&&(t+="."),s(t+r)},set:(e,r,t)=>((i=i||{})[r]=t,!0),apply:(e,r,t)=>{var a;return i&&(a=i,i=void 0),a={credentials:"include",headers:a,method:"POST"},t.length&&(a.body=u(t)),p(n,a)}});return[s(""),e]};