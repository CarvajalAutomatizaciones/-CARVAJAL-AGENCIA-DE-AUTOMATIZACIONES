const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const source=fs.readFileSync(__dirname+'/dist/hero-3d.js','utf8');
function run({reduced=false,webgl=true,shader=true}={}) {
 const media={matches:reduced,addEventListener(type,fn){this.change=fn;}};
 const events={},canvasEvents={};let draws=0,queued=new Map(),next=1;
 const gl=new Proxy({VERTEX_SHADER:1,FRAGMENT_SHADER:2,COMPILE_STATUS:3,LINK_STATUS:4,
  createShader:()=>({}),createProgram:()=>({}),getShaderParameter:()=>shader,getProgramParameter:()=>true,
  drawArrays:()=>{draws++;}}, {get:(target,key)=>key in target?target[key]:(()=>{})});
 const canvas={hidden:true,width:500,height:500,parentElement:{getBoundingClientRect:()=>({width:420})},
  getContext:()=>webgl?gl:null,addEventListener:(type,fn)=>{canvasEvents[type]=fn;}};
 const fallback={hidden:false};const button={hidden:true,disabled:false,attributes:{},setAttribute(k,v){this.attributes[k]=v;},addEventListener(type,fn){this[type]=fn;}};
 const document={hidden:false,getElementById:id=>({'hero-canvas':canvas,'hero-fallback':fallback,'hero-motion':button}[id]),addEventListener:(type,fn)=>{events[type]=fn;}};
 let observer;
 class IntersectionObserver{constructor(fn){observer=fn;}observe(){}}
 const window={devicePixelRatio:3,matchMedia:()=>media,addEventListener:(type,fn)=>{events[type]=fn;},IntersectionObserver};
 const context={window,document,IntersectionObserver,requestAnimationFrame:fn=>{let id=next++;queued.set(id,fn);return id;},cancelAnimationFrame:id=>queued.delete(id)};
 vm.runInNewContext(source,context);
 const tick=time=>{const active=[...queued.values()];queued.clear();for(const fn of active)fn(time);};
 return {canvas,fallback,button,document,events,canvasEvents,media,tick,get draws(){return draws;},get queued(){return queued.size;},observe:value=>observer([{isIntersecting:value}])};
}
let h=run();assert.equal(h.canvas.hidden,false);assert.equal(h.fallback.hidden,true);assert.equal(h.button.hidden,false);assert.equal(h.canvas.width,600);assert.equal(h.queued,1);
h.tick(0);let before=h.draws;h.tick(10);assert.equal(h.draws,before);h.tick(42);assert.equal(h.draws,before+1);
h.button.click();assert.equal(h.queued,0);assert.equal(h.button.attributes['aria-pressed'],'true');h.button.click();assert.equal(h.queued,1);
h.document.hidden=true;h.events.visibilitychange();assert.equal(h.queued,0);h.document.hidden=false;h.events.visibilitychange();assert.equal(h.queued,1);
h.observe(false);assert.equal(h.queued,0);h.observe(true);assert.equal(h.queued,1);
h.media.matches=true;h.media.change();assert.equal(h.queued,0);assert.equal(h.button.disabled,true);
h.canvasEvents.webglcontextlost({preventDefault(){}});assert.equal(h.canvas.hidden,true);assert.equal(h.fallback.hidden,false);assert.equal(h.button.hidden,true);assert.equal(h.queued,0);
h=run({reduced:true});assert.ok(h.draws>=1);assert.equal(h.queued,0);assert.equal(h.button.disabled,true);
h=run({webgl:false});assert.equal(h.canvas.hidden,true);assert.equal(h.fallback.hidden,false);assert.equal(h.queued,0);
h=run({shader:false});assert.equal(h.canvas.hidden,true);assert.equal(h.fallback.hidden,false);assert.equal(h.queued,0);
console.log('PASS: 24fps, resolución limitada, pausa, visibilidad, movimiento reducido, pérdida de contexto y alternativa sin WebGL.');
