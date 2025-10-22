(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[971],{2494:function(t){t.exports={style:{fontFamily:"'__Inter_f367f3', '__Inter_Fallback_f367f3'",fontStyle:"normal"},className:"__className_f367f3"}},935:function(t,e,s){"use strict";s.d(e,{S:function(){return R}});var i="undefined"==typeof window||"Deno"in globalThis;function r(){}function a(t,e){return"function"==typeof t?t(e):t}function n(t,e){let{type:s="all",exact:i,fetchStatus:r,predicate:a,queryKey:n,stale:o}=t;if(n){if(i){if(e.queryHash!==u(n,e.options))return!1}else if(!c(e.queryKey,n))return!1}if("all"!==s){let t=e.isActive();if("active"===s&&!t||"inactive"===s&&t)return!1}return("boolean"!=typeof o||e.isStale()===o)&&(!r||r===e.state.fetchStatus)&&(!a||!!a(e))}function o(t,e){let{exact:s,status:i,predicate:r,mutationKey:a}=t;if(a){if(!e.options.mutationKey)return!1;if(s){if(l(e.options.mutationKey)!==l(a))return!1}else if(!c(e.options.mutationKey,a))return!1}return(!i||e.state.status===i)&&(!r||!!r(e))}function u(t,e){return(e?.queryKeyHashFn||l)(t)}function l(t){return JSON.stringify(t,(t,e)=>d(e)?Object.keys(e).sort().reduce((t,s)=>(t[s]=e[s],t),{}):e)}function c(t,e){return t===e||typeof t==typeof e&&!!t&&!!e&&"object"==typeof t&&"object"==typeof e&&Object.keys(e).every(s=>c(t[s],e[s]))}function h(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function d(t){if(!f(t))return!1;let e=t.constructor;if(void 0===e)return!0;let s=e.prototype;return!!(f(s)&&s.hasOwnProperty("isPrototypeOf"))&&Object.getPrototypeOf(t)===Object.prototype}function f(t){return"[object Object]"===Object.prototype.toString.call(t)}function p(t,e,s=0){let i=[...t,e];return s&&i.length>s?i.slice(1):i}function y(t,e,s=0){let i=[e,...t];return s&&i.length>s?i.slice(0,-1):i}var m=Symbol();function g(t,e){return!t.queryFn&&e?.initialPromise?()=>e.initialPromise:t.queryFn&&t.queryFn!==m?t.queryFn:()=>Promise.reject(Error(`Missing queryFn: '${t.queryHash}'`))}var b=t=>setTimeout(t,0),v=function(){let t=[],e=0,s=t=>{t()},i=t=>{t()},r=b,a=i=>{e?t.push(i):r(()=>{s(i)})},n=()=>{let e=t;t=[],e.length&&r(()=>{i(()=>{e.forEach(t=>{s(t)})})})};return{batch:t=>{let s;e++;try{s=t()}finally{--e||n()}return s},batchCalls:t=>(...e)=>{a(()=>{t(...e)})},schedule:a,setNotifyFunction:t=>{s=t},setBatchNotifyFunction:t=>{i=t},setScheduler:t=>{r=t}}}(),w=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},C=new class extends w{#t;#e;#s;constructor(){super(),this.#s=t=>{if(!i&&window.addEventListener){let e=()=>t();return window.addEventListener("visibilitychange",e,!1),()=>{window.removeEventListener("visibilitychange",e)}}}}onSubscribe(){this.#e||this.setEventListener(this.#s)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#s=t,this.#e?.(),this.#e=t(t=>{"boolean"==typeof t?this.setFocused(t):this.onFocus()})}setFocused(t){this.#t!==t&&(this.#t=t,this.onFocus())}onFocus(){let t=this.isFocused();this.listeners.forEach(e=>{e(t)})}isFocused(){return"boolean"==typeof this.#t?this.#t:globalThis.document?.visibilityState!=="hidden"}},O=new class extends w{#i=!0;#e;#s;constructor(){super(),this.#s=t=>{if(!i&&window.addEventListener){let e=()=>t(!0),s=()=>t(!1);return window.addEventListener("online",e,!1),window.addEventListener("offline",s,!1),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",s)}}}}onSubscribe(){this.#e||this.setEventListener(this.#s)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#s=t,this.#e?.(),this.#e=t(this.setOnline.bind(this))}setOnline(t){this.#i!==t&&(this.#i=t,this.listeners.forEach(e=>{e(t)}))}isOnline(){return this.#i}};function x(t){return Math.min(1e3*2**t,3e4)}function q(t){return(t??"online")!=="online"||O.isOnline()}var S=class extends Error{constructor(t){super("CancelledError"),this.revert=t?.revert,this.silent=t?.silent}};function P(t){return t instanceof S}function E(t){let e,s=!1,r=0,a=!1,n=function(){let t,e;let s=new Promise((s,i)=>{t=s,e=i});function i(t){Object.assign(s,t),delete s.resolve,delete s.reject}return s.status="pending",s.catch(()=>{}),s.resolve=e=>{i({status:"fulfilled",value:e}),t(e)},s.reject=t=>{i({status:"rejected",reason:t}),e(t)},s}(),o=()=>C.isFocused()&&("always"===t.networkMode||O.isOnline())&&t.canRun(),u=()=>q(t.networkMode)&&t.canRun(),l=s=>{a||(a=!0,t.onSuccess?.(s),e?.(),n.resolve(s))},c=s=>{a||(a=!0,t.onError?.(s),e?.(),n.reject(s))},h=()=>new Promise(s=>{e=t=>{(a||o())&&s(t)},t.onPause?.()}).then(()=>{e=void 0,a||t.onContinue?.()}),d=()=>{let e;if(a)return;let n=0===r?t.initialPromise:void 0;try{e=n??t.fn()}catch(t){e=Promise.reject(t)}Promise.resolve(e).then(l).catch(e=>{if(a)return;let n=t.retry??(i?0:3),u=t.retryDelay??x,l="function"==typeof u?u(r,e):u,f=!0===n||"number"==typeof n&&r<n||"function"==typeof n&&n(r,e);if(s||!f){c(e);return}r++,t.onFail?.(r,e),new Promise(t=>{setTimeout(t,l)}).then(()=>o()?void 0:h()).then(()=>{s?c(e):d()})})};return{promise:n,cancel:e=>{a||(c(new S(e)),t.abort?.())},continue:()=>(e?.(),n),cancelRetry:()=>{s=!0},continueRetry:()=>{s=!1},canStart:u,start:()=>(u()?d():h().then(d),n)}}var F=class{#r;destroy(){this.clearGcTimeout()}scheduleGc(){var t;this.clearGcTimeout(),"number"==typeof(t=this.gcTime)&&t>=0&&t!==1/0&&(this.#r=setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(i?1/0:3e5))}clearGcTimeout(){this.#r&&(clearTimeout(this.#r),this.#r=void 0)}},D=class extends F{#a;#n;#o;#u;#l;#c;#h;constructor(t){super(),this.#h=!1,this.#c=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.#u=t.client,this.#o=this.#u.getQueryCache(),this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.#a=function(t){let e="function"==typeof t.initialData?t.initialData():t.initialData,s=void 0!==e,i=s?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:s?i??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}(this.options),this.state=t.state??this.#a,this.scheduleGc()}get meta(){return this.options.meta}get promise(){return this.#l?.promise}setOptions(t){this.options={...this.#c,...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.#o.remove(this)}setData(t,e){var s,i;let r=(s=this.state.data,"function"==typeof(i=this.options).structuralSharing?i.structuralSharing(s,t):!1!==i.structuralSharing?function t(e,s){if(e===s)return e;let i=h(e)&&h(s);if(i||d(e)&&d(s)){let r=i?e:Object.keys(e),a=r.length,n=i?s:Object.keys(s),o=n.length,u=i?[]:{},l=new Set(r),c=0;for(let r=0;r<o;r++){let a=i?r:n[r];(!i&&l.has(a)||i)&&void 0===e[a]&&void 0===s[a]?(u[a]=void 0,c++):(u[a]=t(e[a],s[a]),u[a]===e[a]&&void 0!==e[a]&&c++)}return a===o&&c===a?e:u}return s}(s,t):t);return this.#d({data:r,type:"success",dataUpdatedAt:e?.updatedAt,manual:e?.manual}),r}setState(t,e){this.#d({type:"setState",state:t,setStateOptions:e})}cancel(t){let e=this.#l?.promise;return this.#l?.cancel(t),e?e.then(r).catch(r):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.#a)}isActive(){return this.observers.some(t=>{var e;return!1!==("function"==typeof(e=t.options.enabled)?e(this):e)})}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===m||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0&&this.observers.some(t=>"static"===a(t.options.staleTime,this))}isStale(){return this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):void 0===this.state.data||this.state.isInvalidated}isStaleByTime(t=0){return void 0===this.state.data||"static"!==t&&(!!this.state.isInvalidated||!Math.max(this.state.dataUpdatedAt+(t||0)-Date.now(),0))}onFocus(){let t=this.observers.find(t=>t.shouldFetchOnWindowFocus());t?.refetch({cancelRefetch:!1}),this.#l?.continue()}onOnline(){let t=this.observers.find(t=>t.shouldFetchOnReconnect());t?.refetch({cancelRefetch:!1}),this.#l?.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),this.#o.notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(e=>e!==t),this.observers.length||(this.#l&&(this.#h?this.#l.cancel({revert:!0}):this.#l.cancelRetry()),this.scheduleGc()),this.#o.notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.#d({type:"invalidate"})}fetch(t,e){if("idle"!==this.state.fetchStatus){if(void 0!==this.state.data&&e?.cancelRefetch)this.cancel({silent:!0});else if(this.#l)return this.#l.continueRetry(),this.#l.promise}if(t&&this.setOptions(t),!this.options.queryFn){let t=this.observers.find(t=>t.options.queryFn);t&&this.setOptions(t.options)}let s=new AbortController,i=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(this.#h=!0,s.signal)})},r=()=>{let t=g(this.options,e),s=(()=>{let t={client:this.#u,queryKey:this.queryKey,meta:this.meta};return i(t),t})();return(this.#h=!1,this.options.persister)?this.options.persister(t,s,this):t(s)},a=(()=>{let t={fetchOptions:e,options:this.options,queryKey:this.queryKey,client:this.#u,state:this.state,fetchFn:r};return i(t),t})();this.options.behavior?.onFetch(a,this),this.#n=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==a.fetchOptions?.meta)&&this.#d({type:"fetch",meta:a.fetchOptions?.meta});let n=t=>{P(t)&&t.silent||this.#d({type:"error",error:t}),P(t)||(this.#o.config.onError?.(t,this),this.#o.config.onSettled?.(this.state.data,t,this)),this.scheduleGc()};return this.#l=E({initialPromise:e?.initialPromise,fn:a.fetchFn,abort:s.abort.bind(s),onSuccess:t=>{if(void 0===t){n(Error(`${this.queryHash} data is undefined`));return}try{this.setData(t)}catch(t){n(t);return}this.#o.config.onSuccess?.(t,this),this.#o.config.onSettled?.(t,this.state.error,this),this.scheduleGc()},onError:n,onFail:(t,e)=>{this.#d({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#d({type:"pause"})},onContinue:()=>{this.#d({type:"continue"})},retry:a.options.retry,retryDelay:a.options.retryDelay,networkMode:a.options.networkMode,canRun:()=>!0}),this.#l.start()}#d(t){this.state=(e=>{switch(t.type){case"failed":return{...e,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...e,fetchStatus:"paused"};case"continue":return{...e,fetchStatus:"fetching"};case"fetch":var s;return{...e,...(s=e.data,{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:q(this.options.networkMode)?"fetching":"paused",...void 0===s&&{error:null,status:"pending"}}),fetchMeta:t.meta??null};case"success":return this.#n=void 0,{...e,data:t.data,dataUpdateCount:e.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":let i=t.error;if(P(i)&&i.revert&&this.#n)return{...this.#n,fetchStatus:"idle"};return{...e,error:i,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,fetchFailureReason:i,fetchStatus:"idle",status:"error"};case"invalidate":return{...e,isInvalidated:!0};case"setState":return{...e,...t.state}}})(this.state),v.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate()}),this.#o.notify({query:this,type:"updated",action:t})})}},A=class extends w{constructor(t={}){super(),this.config=t,this.#f=new Map}#f;build(t,e,s){let i=e.queryKey,r=e.queryHash??u(i,e),a=this.get(r);return a||(a=new D({client:t,queryKey:i,queryHash:r,options:t.defaultQueryOptions(e),state:s,defaultOptions:t.getQueryDefaults(i)}),this.add(a)),a}add(t){this.#f.has(t.queryHash)||(this.#f.set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){let e=this.#f.get(t.queryHash);e&&(t.destroy(),e===t&&this.#f.delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){v.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return this.#f.get(t)}getAll(){return[...this.#f.values()]}find(t){let e={exact:!0,...t};return this.getAll().find(t=>n(e,t))}findAll(t={}){let e=this.getAll();return Object.keys(t).length>0?e.filter(e=>n(t,e)):e}notify(t){v.batch(()=>{this.listeners.forEach(e=>{e(t)})})}onFocus(){v.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){v.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},M=class extends F{#p;#y;#l;constructor(t){super(),this.mutationId=t.mutationId,this.#y=t.mutationCache,this.#p=[],this.state=t.state||{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0},this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#p.includes(t)||(this.#p.push(t),this.clearGcTimeout(),this.#y.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#p=this.#p.filter(e=>e!==t),this.scheduleGc(),this.#y.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#p.length||("pending"===this.state.status?this.scheduleGc():this.#y.remove(this))}continue(){return this.#l?.continue()??this.execute(this.state.variables)}async execute(t){let e=()=>{this.#d({type:"continue"})};this.#l=E({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(Error("No mutationFn found")),onFail:(t,e)=>{this.#d({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#d({type:"pause"})},onContinue:e,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#y.canRun(this)});let s="pending"===this.state.status,i=!this.#l.canStart();try{if(s)e();else{this.#d({type:"pending",variables:t,isPaused:i}),await this.#y.config.onMutate?.(t,this);let e=await this.options.onMutate?.(t);e!==this.state.context&&this.#d({type:"pending",context:e,variables:t,isPaused:i})}let r=await this.#l.start();return await this.#y.config.onSuccess?.(r,t,this.state.context,this),await this.options.onSuccess?.(r,t,this.state.context),await this.#y.config.onSettled?.(r,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(r,null,t,this.state.context),this.#d({type:"success",data:r}),r}catch(e){try{throw await this.#y.config.onError?.(e,t,this.state.context,this),await this.options.onError?.(e,t,this.state.context),await this.#y.config.onSettled?.(void 0,e,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,e,t,this.state.context),e}finally{this.#d({type:"error",error:e})}}finally{this.#y.runNext(this)}}#d(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),v.batch(()=>{this.#p.forEach(e=>{e.onMutationUpdate(t)}),this.#y.notify({mutation:this,type:"updated",action:t})})}},k=class extends w{constructor(t={}){super(),this.config=t,this.#m=new Set,this.#g=new Map,this.#b=0}#m;#g;#b;build(t,e,s){let i=new M({mutationCache:this,mutationId:++this.#b,options:t.defaultMutationOptions(e),state:s});return this.add(i),i}add(t){this.#m.add(t);let e=j(t);if("string"==typeof e){let s=this.#g.get(e);s?s.push(t):this.#g.set(e,[t])}this.notify({type:"added",mutation:t})}remove(t){if(this.#m.delete(t)){let e=j(t);if("string"==typeof e){let s=this.#g.get(e);if(s){if(s.length>1){let e=s.indexOf(t);-1!==e&&s.splice(e,1)}else s[0]===t&&this.#g.delete(e)}}}this.notify({type:"removed",mutation:t})}canRun(t){let e=j(t);if("string"!=typeof e)return!0;{let s=this.#g.get(e),i=s?.find(t=>"pending"===t.state.status);return!i||i===t}}runNext(t){let e=j(t);if("string"!=typeof e)return Promise.resolve();{let s=this.#g.get(e)?.find(e=>e!==t&&e.state.isPaused);return s?.continue()??Promise.resolve()}}clear(){v.batch(()=>{this.#m.forEach(t=>{this.notify({type:"removed",mutation:t})}),this.#m.clear(),this.#g.clear()})}getAll(){return Array.from(this.#m)}find(t){let e={exact:!0,...t};return this.getAll().find(t=>o(e,t))}findAll(t={}){return this.getAll().filter(e=>o(t,e))}notify(t){v.batch(()=>{this.listeners.forEach(e=>{e(t)})})}resumePausedMutations(){let t=this.getAll().filter(t=>t.state.isPaused);return v.batch(()=>Promise.all(t.map(t=>t.continue().catch(r))))}};function j(t){return t.options.scope?.id}function Q(t){return{onFetch:(e,s)=>{let i=e.options,r=e.fetchOptions?.meta?.fetchMore?.direction,a=e.state.data?.pages||[],n=e.state.data?.pageParams||[],o={pages:[],pageParams:[]},u=0,l=async()=>{let s=!1,l=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(e.signal.aborted?s=!0:e.signal.addEventListener("abort",()=>{s=!0}),e.signal)})},c=g(e.options,e.fetchOptions),h=async(t,i,r)=>{if(s)return Promise.reject();if(null==i&&t.pages.length)return Promise.resolve(t);let a=(()=>{let t={client:e.client,queryKey:e.queryKey,pageParam:i,direction:r?"backward":"forward",meta:e.options.meta};return l(t),t})(),n=await c(a),{maxPages:o}=e.options,u=r?y:p;return{pages:u(t.pages,n,o),pageParams:u(t.pageParams,i,o)}};if(r&&a.length){let t="backward"===r,e={pages:a,pageParams:n},s=(t?function(t,{pages:e,pageParams:s}){return e.length>0?t.getPreviousPageParam?.(e[0],e,s[0],s):void 0}:T)(i,e);o=await h(e,s,t)}else{let e=t??a.length;do{let t=0===u?n[0]??i.initialPageParam:T(i,o);if(u>0&&null==t)break;o=await h(o,t),u++}while(u<e)}return o};e.options.persister?e.fetchFn=()=>e.options.persister?.(l,{client:e.client,queryKey:e.queryKey,meta:e.options.meta,signal:e.signal},s):e.fetchFn=l}}}function T(t,{pages:e,pageParams:s}){let i=e.length-1;return e.length>0?t.getNextPageParam(e[i],e,s[i],s):void 0}var R=class{#v;#y;#c;#w;#C;#O;#x;#q;constructor(t={}){this.#v=t.queryCache||new A,this.#y=t.mutationCache||new k,this.#c=t.defaultOptions||{},this.#w=new Map,this.#C=new Map,this.#O=0}mount(){this.#O++,1===this.#O&&(this.#x=C.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#v.onFocus())}),this.#q=O.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#v.onOnline())}))}unmount(){this.#O--,0===this.#O&&(this.#x?.(),this.#x=void 0,this.#q?.(),this.#q=void 0)}isFetching(t){return this.#v.findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return this.#y.findAll({...t,status:"pending"}).length}getQueryData(t){let e=this.defaultQueryOptions({queryKey:t});return this.#v.get(e.queryHash)?.state.data}ensureQueryData(t){let e=this.defaultQueryOptions(t),s=this.#v.build(this,e),i=s.state.data;return void 0===i?this.fetchQuery(t):(t.revalidateIfStale&&s.isStaleByTime(a(e.staleTime,s))&&this.prefetchQuery(e),Promise.resolve(i))}getQueriesData(t){return this.#v.findAll(t).map(({queryKey:t,state:e})=>[t,e.data])}setQueryData(t,e,s){let i=this.defaultQueryOptions({queryKey:t}),r=this.#v.get(i.queryHash),a=r?.state.data,n="function"==typeof e?e(a):e;if(void 0!==n)return this.#v.build(this,i).setData(n,{...s,manual:!0})}setQueriesData(t,e,s){return v.batch(()=>this.#v.findAll(t).map(({queryKey:t})=>[t,this.setQueryData(t,e,s)]))}getQueryState(t){let e=this.defaultQueryOptions({queryKey:t});return this.#v.get(e.queryHash)?.state}removeQueries(t){let e=this.#v;v.batch(()=>{e.findAll(t).forEach(t=>{e.remove(t)})})}resetQueries(t,e){let s=this.#v;return v.batch(()=>(s.findAll(t).forEach(t=>{t.reset()}),this.refetchQueries({type:"active",...t},e)))}cancelQueries(t,e={}){let s={revert:!0,...e};return Promise.all(v.batch(()=>this.#v.findAll(t).map(t=>t.cancel(s)))).then(r).catch(r)}invalidateQueries(t,e={}){return v.batch(()=>(this.#v.findAll(t).forEach(t=>{t.invalidate()}),t?.refetchType==="none")?Promise.resolve():this.refetchQueries({...t,type:t?.refetchType??t?.type??"active"},e))}refetchQueries(t,e={}){let s={...e,cancelRefetch:e.cancelRefetch??!0};return Promise.all(v.batch(()=>this.#v.findAll(t).filter(t=>!t.isDisabled()&&!t.isStatic()).map(t=>{let e=t.fetch(void 0,s);return s.throwOnError||(e=e.catch(r)),"paused"===t.state.fetchStatus?Promise.resolve():e}))).then(r)}fetchQuery(t){let e=this.defaultQueryOptions(t);void 0===e.retry&&(e.retry=!1);let s=this.#v.build(this,e);return s.isStaleByTime(a(e.staleTime,s))?s.fetch(e):Promise.resolve(s.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(r).catch(r)}fetchInfiniteQuery(t){return t.behavior=Q(t.pages),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(r).catch(r)}ensureInfiniteQueryData(t){return t.behavior=Q(t.pages),this.ensureQueryData(t)}resumePausedMutations(){return O.isOnline()?this.#y.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#v}getMutationCache(){return this.#y}getDefaultOptions(){return this.#c}setDefaultOptions(t){this.#c=t}setQueryDefaults(t,e){this.#w.set(l(t),{queryKey:t,defaultOptions:e})}getQueryDefaults(t){let e=[...this.#w.values()],s={};return e.forEach(e=>{c(t,e.queryKey)&&Object.assign(s,e.defaultOptions)}),s}setMutationDefaults(t,e){this.#C.set(l(t),{mutationKey:t,defaultOptions:e})}getMutationDefaults(t){let e=[...this.#C.values()],s={};return e.forEach(e=>{c(t,e.mutationKey)&&Object.assign(s,e.defaultOptions)}),s}defaultQueryOptions(t){if(t._defaulted)return t;let e={...this.#c.queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return e.queryHash||(e.queryHash=u(e.queryKey,e)),void 0===e.refetchOnReconnect&&(e.refetchOnReconnect="always"!==e.networkMode),void 0===e.throwOnError&&(e.throwOnError=!!e.suspense),!e.networkMode&&e.persister&&(e.networkMode="offlineFirst"),e.queryFn===m&&(e.enabled=!1),e}defaultMutationOptions(t){return t?._defaulted?t:{...this.#c.mutations,...t?.mutationKey&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){this.#v.clear(),this.#y.clear()}}},9188:function(t,e,s){"use strict";s.d(e,{aH:function(){return n}});var i=s(8078),r=s(7821),a=i.createContext(void 0),n=({client:t,children:e})=>(i.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),(0,r.jsx)(a.Provider,{value:t,children:e}))},7485:function(t,e,s){"use strict";let i,r;s.d(e,{x7:function(){return th},ZP:function(){return td}});var a,n=s(8078);let o={data:""},u=t=>"object"==typeof window?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||o,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,h=/\n+/g,d=(t,e)=>{let s="",i="",r="";for(let a in t){let n=t[a];"@"==a[0]?"i"==a[1]?s=a+" "+n+";":i+="f"==a[1]?d(n,a):a+"{"+d(n,"k"==a[1]?"":e)+"}":"object"==typeof n?i+=d(n,e?e.replace(/([^,])+/g,t=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,e=>/&/.test(e)?e.replace(/&/g,t):t?t+" "+e:e)):a):null!=n&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=d.p?d.p(a,n):a+":"+n+";")}return s+(e&&r?e+"{"+r+"}":r)+i},f={},p=t=>{if("object"==typeof t){let e="";for(let s in t)e+=s+p(t[s]);return e}return t},y=(t,e,s,i,r)=>{var a;let n=p(t),o=f[n]||(f[n]=(t=>{let e=0,s=11;for(;e<t.length;)s=101*s+t.charCodeAt(e++)>>>0;return"go"+s})(n));if(!f[o]){let e=n!==t?t:(t=>{let e,s,i=[{}];for(;e=l.exec(t.replace(c,""));)e[4]?i.shift():e[3]?(s=e[3].replace(h," ").trim(),i.unshift(i[0][s]=i[0][s]||{})):i[0][e[1]]=e[2].replace(h," ").trim();return i[0]})(t);f[o]=d(r?{["@keyframes "+o]:e}:e,s?"":"."+o)}let u=s&&f.g?f.g:null;return s&&(f.g=f[o]),a=f[o],u?e.data=e.data.replace(u,a):-1===e.data.indexOf(a)&&(e.data=i?a+e.data:e.data+a),o},m=(t,e,s)=>t.reduce((t,i,r)=>{let a=e[r];if(a&&a.call){let t=a(s),e=t&&t.props&&t.props.className||/^go/.test(t)&&t;a=e?"."+e:t&&"object"==typeof t?t.props?"":d(t,""):!1===t?"":t}return t+i+(null==a?"":a)},"");function g(t){let e=this||{},s=t.call?t(e.p):t;return y(s.unshift?s.raw?m(s,[].slice.call(arguments,1),e.p):s.reduce((t,s)=>Object.assign(t,s&&s.call?s(e.p):s),{}):s,u(e.target),e.g,e.o,e.k)}g.bind({g:1});let b,v,w,C=g.bind({k:1});function O(t,e){let s=this||{};return function(){let i=arguments;function r(a,n){let o=Object.assign({},a),u=o.className||r.className;s.p=Object.assign({theme:v&&v()},o),s.o=/ *go\d+/.test(u),o.className=g.apply(s,i)+(u?" "+u:""),e&&(o.ref=n);let l=t;return t[0]&&(l=o.as||t,delete o.as),w&&l[0]&&w(o),b(l,o)}return e?e(r):r}}var x=t=>"function"==typeof t,q=(t,e)=>x(t)?t(e):t,S=(i=0,()=>(++i).toString()),P=()=>{if(void 0===r&&"u">typeof window){let t=matchMedia("(prefers-reduced-motion: reduce)");r=!t||t.matches}return r},E=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,20)};case 1:return{...t,toasts:t.toasts.map(t=>t.id===e.toast.id?{...t,...e.toast}:t)};case 2:let{toast:s}=e;return E(t,{type:t.toasts.find(t=>t.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=e;return{...t,toasts:t.toasts.map(t=>t.id===i||void 0===i?{...t,dismissed:!0,visible:!1}:t)};case 4:return void 0===e.toastId?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(t=>t.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let r=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(t=>({...t,pauseDuration:t.pauseDuration+r}))}}},F=[],D={toasts:[],pausedAt:void 0},A=t=>{D=E(D,t),F.forEach(t=>{t(D)})},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},k=(t={})=>{let[e,s]=(0,n.useState)(D),i=(0,n.useRef)(D);(0,n.useEffect)(()=>(i.current!==D&&s(D),F.push(s),()=>{let t=F.indexOf(s);t>-1&&F.splice(t,1)}),[]);let r=e.toasts.map(e=>{var s,i,r;return{...t,...t[e.type],...e,removeDelay:e.removeDelay||(null==(s=t[e.type])?void 0:s.removeDelay)||(null==t?void 0:t.removeDelay),duration:e.duration||(null==(i=t[e.type])?void 0:i.duration)||(null==t?void 0:t.duration)||M[e.type],style:{...t.style,...null==(r=t[e.type])?void 0:r.style,...e.style}}});return{...e,toasts:r}},j=(t,e="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...s,id:(null==s?void 0:s.id)||S()}),Q=t=>(e,s)=>{let i=j(e,t,s);return A({type:2,toast:i}),i.id},T=(t,e)=>Q("blank")(t,e);T.error=Q("error"),T.success=Q("success"),T.loading=Q("loading"),T.custom=Q("custom"),T.dismiss=t=>{A({type:3,toastId:t})},T.remove=t=>A({type:4,toastId:t}),T.promise=(t,e,s)=>{let i=T.loading(e.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof t&&(t=t()),t.then(t=>{let r=e.success?q(e.success,t):void 0;return r?T.success(r,{id:i,...s,...null==s?void 0:s.success}):T.dismiss(i),t}).catch(t=>{let r=e.error?q(e.error,t):void 0;r?T.error(r,{id:i,...s,...null==s?void 0:s.error}):T.dismiss(i)}),t};var R=(t,e)=>{A({type:1,toast:{id:t,height:e}})},I=()=>{A({type:5,time:Date.now()})},U=new Map,_=1e3,H=(t,e=_)=>{if(U.has(t))return;let s=setTimeout(()=>{U.delete(t),A({type:4,toastId:t})},e);U.set(t,s)},K=t=>{let{toasts:e,pausedAt:s}=k(t);(0,n.useEffect)(()=>{if(s)return;let t=Date.now(),i=e.map(e=>{if(e.duration===1/0)return;let s=(e.duration||0)+e.pauseDuration-(t-e.createdAt);if(s<0){e.visible&&T.dismiss(e.id);return}return setTimeout(()=>T.dismiss(e.id),s)});return()=>{i.forEach(t=>t&&clearTimeout(t))}},[e,s]);let i=(0,n.useCallback)(()=>{s&&A({type:6,time:Date.now()})},[s]),r=(0,n.useCallback)((t,s)=>{let{reverseOrder:i=!1,gutter:r=8,defaultPosition:a}=s||{},n=e.filter(e=>(e.position||a)===(t.position||a)&&e.height),o=n.findIndex(e=>e.id===t.id),u=n.filter((t,e)=>e<o&&t.visible).length;return n.filter(t=>t.visible).slice(...i?[u+1]:[0,u]).reduce((t,e)=>t+(e.height||0)+r,0)},[e]);return(0,n.useEffect)(()=>{e.forEach(t=>{if(t.dismissed)H(t.id,t.removeDelay);else{let e=U.get(t.id);e&&(clearTimeout(e),U.delete(t.id))}})},[e]),{toasts:e,handlers:{updateHeight:R,startPause:I,endPause:i,calculateOffset:r}}},N=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=C`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=C`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=O("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${N} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,z=C`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=O("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,Z=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,J=C`
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
}`,W=O("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${J} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Y=O("div")`
  position: absolute;
`,V=O("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=C`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,tt=O("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,te=({toast:t})=>{let{icon:e,type:s,iconTheme:i}=t;return void 0!==e?"string"==typeof e?n.createElement(tt,null,e):e:"blank"===s?null:n.createElement(V,null,n.createElement(B,{...i}),"loading"!==s&&n.createElement(Y,null,"error"===s?n.createElement(G,{...i}):n.createElement(W,{...i})))},ts=t=>`
0% {transform: translate3d(0,${-200*t}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ti=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*t}%,-1px) scale(.6); opacity:0;}
`,tr=O("div")`
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
`,ta=O("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,tn=(t,e)=>{let s=t.includes("top")?1:-1,[i,r]=P()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ts(s),ti(s)];return{animation:e?`${C(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${C(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},to=n.memo(({toast:t,position:e,style:s,children:i})=>{let r=t.height?tn(t.position||e||"top-center",t.visible):{opacity:0},a=n.createElement(te,{toast:t}),o=n.createElement(ta,{...t.ariaProps},q(t.message,t));return n.createElement(tr,{className:t.className,style:{...r,...s,...t.style}},"function"==typeof i?i({icon:a,message:o}):n.createElement(n.Fragment,null,a,o))});a=n.createElement,d.p=void 0,b=a,v=void 0,w=void 0;var tu=({id:t,className:e,style:s,onHeightUpdate:i,children:r})=>{let a=n.useCallback(e=>{if(e){let s=()=>{i(t,e.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(e,{subtree:!0,childList:!0,characterData:!0})}},[t,i]);return n.createElement("div",{ref:a,className:e,style:s},r)},tl=(t,e)=>{let s=t.includes("top"),i=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:P()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...i}},tc=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,th=({reverseOrder:t,position:e="top-center",toastOptions:s,gutter:i,children:r,containerStyle:a,containerClassName:o})=>{let{toasts:u,handlers:l}=K(s);return n.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...a},className:o,onMouseEnter:l.startPause,onMouseLeave:l.endPause},u.map(s=>{let a=s.position||e,o=tl(a,l.calculateOffset(s,{reverseOrder:t,gutter:i,defaultPosition:e}));return n.createElement(tu,{id:s.id,key:s.id,onHeightUpdate:l.updateHeight,className:s.visible?tc:"",style:o},"custom"===s.type?q(s.message,s):r?r(s):n.createElement(to,{toast:s,position:a}))}))},td=T}}]);