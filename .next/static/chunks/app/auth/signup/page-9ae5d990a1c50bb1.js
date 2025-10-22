(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[271],{4179:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(7068).Z)("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]])},1238:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(7068).Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]])},2080:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,s(7068).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},9256:function(e,t,s){Promise.resolve().then(s.bind(s,5780))},5780:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return m}});var a=s(7821),r=s(8078),i=s(6871),o=s.n(i),n=s(4179),l=s(1238),c=s(2080),d=s(9944),u=s(7485);function m(){let{signInWithGoogle:e,loading:t}=(0,d.a)(),[s,i]=(0,r.useState)(!1),[m,p]=(0,r.useState)(!1),[f,h]=(0,r.useState)({firstName:"",lastName:"",email:"",password:"",confirmPassword:""}),g=async()=>{try{await e(),u.ZP.success("Successfully signed up with Google!")}catch(e){console.error("Google sign-in error:",e),u.ZP.error(e.message||"Failed to sign up with Google")}};return(0,a.jsxs)("div",{className:"min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8",children:[(0,a.jsxs)("div",{className:"sm:mx-auto sm:w-full sm:max-w-md",children:[(0,a.jsx)("div",{className:"flex justify-center",children:(0,a.jsx)(n.Z,{className:"h-12 w-12 text-blue-600"})}),(0,a.jsx)("h2",{className:"mt-6 text-center text-3xl font-bold text-gray-900",children:"Create your account"}),(0,a.jsxs)("p",{className:"mt-2 text-center text-sm text-gray-600",children:["Or"," ",(0,a.jsx)(o(),{href:"/auth/login",className:"font-medium text-blue-600 hover:text-blue-500",children:"sign in to your existing account"})]})]}),(0,a.jsx)("div",{className:"mt-8 sm:mx-auto sm:w-full sm:max-w-md",children:(0,a.jsxs)("div",{className:"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10",children:[(0,a.jsxs)("form",{className:"space-y-6",onSubmit:e=>{e.preventDefault(),console.log("Signup attempt:",f)},children:[(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"firstName",className:"block text-sm font-medium text-gray-700",children:"First name"}),(0,a.jsx)("div",{className:"mt-1",children:(0,a.jsx)("input",{id:"firstName",name:"firstName",type:"text",autoComplete:"given-name",required:!0,className:"input",value:f.firstName,onChange:e=>h({...f,firstName:e.target.value})})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"lastName",className:"block text-sm font-medium text-gray-700",children:"Last name"}),(0,a.jsx)("div",{className:"mt-1",children:(0,a.jsx)("input",{id:"lastName",name:"lastName",type:"text",autoComplete:"family-name",required:!0,className:"input",value:f.lastName,onChange:e=>h({...f,lastName:e.target.value})})})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email address"}),(0,a.jsx)("div",{className:"mt-1",children:(0,a.jsx)("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0,className:"input",value:f.email,onChange:e=>h({...f,email:e.target.value})})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,a.jsxs)("div",{className:"mt-1 relative",children:[(0,a.jsx)("input",{id:"password",name:"password",type:s?"text":"password",autoComplete:"new-password",required:!0,className:"input pr-10",value:f.password,onChange:e=>h({...f,password:e.target.value})}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:()=>i(!s),children:s?(0,a.jsx)(l.Z,{className:"h-5 w-5 text-gray-400"}):(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400"})})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700",children:"Confirm password"}),(0,a.jsxs)("div",{className:"mt-1 relative",children:[(0,a.jsx)("input",{id:"confirmPassword",name:"confirmPassword",type:m?"text":"password",autoComplete:"new-password",required:!0,className:"input pr-10",value:f.confirmPassword,onChange:e=>h({...f,confirmPassword:e.target.value})}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 pr-3 flex items-center",onClick:()=>p(!m),children:m?(0,a.jsx)(l.Z,{className:"h-5 w-5 text-gray-400"}):(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400"})})]})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("input",{id:"agree-terms",name:"agree-terms",type:"checkbox",required:!0,className:"h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"}),(0,a.jsxs)("label",{htmlFor:"agree-terms",className:"ml-2 block text-sm text-gray-900",children:["I agree to the"," ",(0,a.jsx)(o(),{href:"/terms",className:"text-blue-600 hover:text-blue-500",children:"Terms of Service"})," ","and"," ",(0,a.jsx)(o(),{href:"/privacy",className:"text-blue-600 hover:text-blue-500",children:"Privacy Policy"})]})]}),(0,a.jsx)("div",{children:(0,a.jsx)("button",{type:"submit",className:"btn-primary w-full",children:"Create account"})})]}),(0,a.jsxs)("div",{className:"mt-6",children:[(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("div",{className:"absolute inset-0 flex items-center",children:(0,a.jsx)("div",{className:"w-full border-t border-gray-300"})}),(0,a.jsx)("div",{className:"relative flex justify-center text-sm",children:(0,a.jsx)("span",{className:"px-2 bg-white text-gray-500",children:"Or continue with"})})]}),(0,a.jsx)("div",{className:"mt-6",children:(0,a.jsx)("button",{type:"button",onClick:g,disabled:t,className:"btn-outline w-full disabled:opacity-50 disabled:cursor-not-allowed",children:t?(0,a.jsxs)("div",{className:"flex items-center justify-center",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"}),(0,a.jsx)("span",{className:"ml-2",children:"Signing up..."})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("svg",{className:"h-5 w-5 mr-2",viewBox:"0 0 24 24",children:[(0,a.jsx)("path",{fill:"currentColor",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),(0,a.jsx)("path",{fill:"currentColor",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),(0,a.jsx)("path",{fill:"currentColor",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),(0,a.jsx)("path",{fill:"currentColor",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]}),"Sign up with Google"]})})})]})]})})]})}},9944:function(e,t,s){"use strict";s.d(t,{a:function(){return o}});var a=s(8078),r=s(8772),i=s(6179);function o(){let[e,t]=(0,a.useState)(null),[s,o]=(0,a.useState)(null),[n,l]=(0,a.useState)(!0),c=(0,i.useRouter)();return(0,a.useEffect)(()=>{r.OQ.auth.getSession().then(e=>{var s;let{data:{session:a}}=e;o(a),t(null!==(s=null==a?void 0:a.user)&&void 0!==s?s:null),l(!1)});let{data:{subscription:e}}=r.OQ.auth.onAuthStateChange((e,s)=>{var a;console.log("Auth state changed:",s?"User signed in":"No user"),o(s),t(null!==(a=null==s?void 0:s.user)&&void 0!==a?a:null),l(!1)});return()=>e.unsubscribe()},[]),{user:e,session:s,loading:n,signInWithGoogle:async()=>{try{l(!0),console.log("Attempting Google sign-in...");let{data:e,error:t}=await r.OQ.auth.signInWithOAuth({provider:"google",options:{redirectTo:"".concat(window.location.origin,"/dashboard")}});if(t)throw console.error("Google sign-in error:",t),Error(t.message||"Failed to sign in with Google");return console.log("Google sign-in successful:",e),e}catch(e){throw console.error("Google sign-in error:",e),Error(e.message||"Failed to sign in with Google")}finally{l(!1)}},signOut:async()=>{try{console.log("Signing out...");let{error:e}=await r.OQ.auth.signOut();if(e)throw console.error("Sign out error:",e),e;console.log("Sign out successful"),c.push("/auth/login")}catch(e){console.error("Sign out error:",e)}},isAuthenticated:!!e}}},8772:function(e,t,s){"use strict";s.d(t,{$6:function(){return r},OQ:function(){return a}});let a=(0,s(8211).eI)("https://mxrmubpangcsaqcfvxcx.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cm11YnBhbmdjc2FxY2Z2eGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMjA1MDIsImV4cCI6MjA3MDY5NjUwMn0.6BJZHRJJlv_3Jeg1nX5jSWWauPHrMGMEuyJf1DT_rTA",{auth:{autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0}}),r="files"},7485:function(e,t,s){"use strict";let a,r;s.d(t,{x7:function(){return eu},ZP:function(){return em}});var i,o=s(8078);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let s="",a="",r="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":a+="f"==i[1]?m(o,i):i+"{"+m(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=m(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,o):i+":"+o+";")}return s+(t&&r?t+"{"+r+"}":r)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+f(e[s]);return t}return e},h=(e,t,s,a,r)=>{var i;let o=f(e),n=p[o]||(p[o]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,s,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(s=t[3].replace(u," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[n]=m(r?{["@keyframes "+n]:t}:t,s?"":"."+n)}let l=s&&p.g?p.g:null;return s&&(p.g=p[n]),i=p[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),n},g=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function x(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?g(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let y,b,v,w=x.bind({k:1});function j(e,t){let s=this||{};return function(){let a=arguments;function r(i,o){let n=Object.assign({},i),l=n.className||r.className;s.p=Object.assign({theme:b&&b()},n),s.o=/ *go\d+/.test(l),n.className=x.apply(s,a)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(r):r}}var N=e=>"function"==typeof e,C=(e,t)=>N(e)?e(t):e,k=(a=0,()=>(++a).toString()),E=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return I(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},O=[],S={toasts:[],pausedAt:void 0},M=e=>{S=I(S,e),O.forEach(e=>{e(S)})},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Z=(e={})=>{let[t,s]=(0,o.useState)(S),a=(0,o.useRef)(S);(0,o.useEffect)(()=>(a.current!==S&&s(S),O.push(s),()=>{let e=O.indexOf(s);e>-1&&O.splice(e,1)}),[]);let r=t.toasts.map(t=>{var s,a,r;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||P[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...t,toasts:r}},$=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||k()}),z=e=>(t,s)=>{let a=$(t,e,s);return M({type:2,toast:a}),a.id},A=(e,t)=>z("blank")(e,t);A.error=z("error"),A.success=z("success"),A.loading=z("loading"),A.custom=z("custom"),A.dismiss=e=>{M({type:3,toastId:e})},A.remove=e=>M({type:4,toastId:e}),A.promise=(e,t,s)=>{let a=A.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?C(t.success,e):void 0;return r?A.success(r,{id:a,...s,...null==s?void 0:s.success}):A.dismiss(a),e}).catch(e=>{let r=t.error?C(t.error,e):void 0;r?A.error(r,{id:a,...s,...null==s?void 0:s.error}):A.dismiss(a)}),e};var F=(e,t)=>{M({type:1,toast:{id:e,height:t}})},D=()=>{M({type:5,time:Date.now()})},G=new Map,_=1e3,J=(e,t=_)=>{if(G.has(e))return;let s=setTimeout(()=>{G.delete(e),M({type:4,toastId:e})},t);G.set(e,s)},T=e=>{let{toasts:t,pausedAt:s}=Z(e);(0,o.useEffect)(()=>{if(s)return;let e=Date.now(),a=t.map(t=>{if(t.duration===1/0)return;let s=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(s<0){t.visible&&A.dismiss(t.id);return}return setTimeout(()=>A.dismiss(t.id),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[t,s]);let a=(0,o.useCallback)(()=>{s&&M({type:6,time:Date.now()})},[s]),r=(0,o.useCallback)((e,s)=>{let{reverseOrder:a=!1,gutter:r=8,defaultPosition:i}=s||{},o=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+r,0)},[t]);return(0,o.useEffect)(()=>{t.forEach(e=>{if(e.dismissed)J(e.id,e.removeDelay);else{let t=G.get(e.id);t&&(clearTimeout(t),G.delete(e.id))}})},[t]),{toasts:t,handlers:{updateHeight:F,startPause:D,endPause:a,calculateOffset:r}}},H=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${q} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Q=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,R=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Q} 1s linear infinite;
`,Y=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,W=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,X=j("div")`
  position: absolute;
`,V=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(ee,null,t):t:"blank"===s?null:o.createElement(V,null,o.createElement(R,{...a}),"loading"!==s&&o.createElement(X,null,"error"===s?o.createElement(L,{...a}):o.createElement(W,{...a})))},es=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,er=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ei=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,eo=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[es(s),ea(s)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=o.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?eo(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(et,{toast:e}),n=o.createElement(ei,{...e.ariaProps},C(e.message,e));return o.createElement(er,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,m.p=void 0,y=i,b=void 0,v=void 0;var el=({id:e,className:t,style:s,onHeightUpdate:a,children:r})=>{let i=o.useCallback(t=>{if(t){let s=()=>{a(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:i,className:t,style:s},r)},ec=(e,t)=>{let s=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...a}},ed=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:a,children:r,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:c}=T(s);return o.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(s=>{let i=s.position||t,n=ec(i,c.calculateOffset(s,{reverseOrder:e,gutter:a,defaultPosition:t}));return o.createElement(el,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?ed:"",style:n},"custom"===s.type?C(s.message,s):r?r(s):o.createElement(en,{toast:s,position:i}))}))},em=A}},function(e){e.O(0,[936,226,115,141,744],function(){return e(e.s=9256)}),_N_E=e.O()}]);