var a=t=>{var r;return r=t.length,r?(1===r&&([r]=t,Array.isArray(r)||(t=r)),JSON.stringify(t)):""};export default e=>{var n=async(t,r)=>{t=await fetch(e+t,{method:"POST",body:a(r),headers:{"content-type":"json"}});if(!t.ok)throw await t.text();if(r=await t.text())return JSON.parse(r)},i=a=>new Proxy(()=>{},{get:(t,r)=>(a&&(a+="."),i(a+r)),apply:(t,r,e)=>n(a,e)});return[t=>{e=t},i("")]};