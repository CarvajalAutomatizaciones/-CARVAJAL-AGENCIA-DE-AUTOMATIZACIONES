/* Escena procedural original: geometría y luz locales, sin recursos remotos. */
(() => {
  'use strict';
  const canvas=document.getElementById('hero-canvas'),fallback=document.getElementById('hero-fallback'),button=document.getElementById('hero-motion');
  if(!canvas||!fallback||!button)return;
  const vertexSource=`attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
  const fragmentSource=`
precision highp float;
uniform vec2 resolution;
uniform float time;
mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
float box(vec3 p,vec3 b,float r){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r;}
float ell(vec3 p,vec3 r){return (length(p/r)-1.)*min(r.x,min(r.y,r.z));}
float tor(vec3 p,vec2 r){return length(vec2(length(p.xz)-r.x,p.y))-r.y;}
vec2 add(vec2 a,vec2 b){return a.x<b.x?a:b;}
vec2 model(vec3 p){
 vec2 d=vec2(p.y+1.05,0.);
 vec3 q=p; q.xz=rot(.12*sin(time*.3))*q.xz;
 d=add(d,vec2(ell(q-vec3(0.,-.48,0.),vec3(.47,.50,.33)),1.));
 d=add(d,vec2(box(q-vec3(0.,.35,0.),vec3(.42,.31,.26),.15),1.));
 d=add(d,vec2(box(q-vec3(0.,.37,.36),vec3(.34,.21,.018),.09),2.));
 d=add(d,vec2(length(q-vec3(-.17,.42,.44))-.052,3.));
 d=add(d,vec2(length(q-vec3(.17,.42,.44))-.052,3.));
 vec3 m=q-vec3(0.,.25,.489);float smile=max(abs(m.y-1.4*m.x*m.x)-.013,max(abs(m.x)-.17,abs(m.z)-.016));
 d=add(d,vec2(smile,3.));
 d=add(d,vec2(length(q-vec3(.63,.36,0.))-.13,4.));
 d=add(d,vec2(length(q-vec3(-.63,.36,0.))-.13,4.));
 d=add(d,vec2(ell(q-vec3(-.43,-.89,.14),vec3(.23,.16,.29)),2.));
 d=add(d,vec2(ell(q-vec3(.43,-.89,.14),vec3(.23,.16,.29)),2.));
 d=add(d,vec2(length(q-vec3(0.,-.42,.31))-.11,4.));
 float t=time*.25;vec3 s1=vec3(1.13,.65+.12*sin(t),.25+.2*sin(t));
 d=add(d,vec2(ell(p-s1,vec3(.33,.055,.28)),1.));
 d=add(d,vec2(tor(p-s1,vec2(.23,.025)),4.));
 d=add(d,vec2(ell(p-s1-vec3(0.,.08,0.),vec3(.12,.055,.13)),3.));
 vec3 s2=p-vec3(-1.08,.83+.1*cos(t),-.12);s2.xy=rot(-.22+.15*sin(t))*s2.xy;
 d=add(d,vec2(box(s2,vec3(.20,.22,.075),.055),4.));
 d=add(d,vec2(box(s2-vec3(0.,.03,.133),vec3(.11,.015,.008),.007),1.));
 d=add(d,vec2(box(s2-vec3(0.,-.05,.133),vec3(.08,.015,.008),.007),1.));
 vec3 s3=p-vec3(1.04,-.48+.12*sin(t+.8),.3);s3.xy=rot(.4+.2*cos(t))*s3.xy;
 d=add(d,vec2(box(s3,vec3(.31,.035,.035),.025),2.));
 d=add(d,vec2(box(s3-vec3(.23,0.,0.),vec3(.045,.17,.12),.035),4.));
 d=add(d,vec2(box(s3+vec3(.23,0.,0.),vec3(.045,.17,.12),.035),4.));
 return d;
}
vec3 normal(vec3 p){vec2 e=vec2(.0015,0.);return normalize(vec3(model(p+e.xyy).x-model(p-e.xyy).x,model(p+e.yxy).x-model(p-e.yxy).x,model(p+e.yyx).x-model(p-e.yyx).x));}
float shadow(vec3 p,vec3 l){float v=1.;float t=.03;for(int i=0;i<16;i++){float h=model(p+l*t).x;v=min(v,9.*h/t);t+=clamp(h,.025,.16);}return clamp(v,.2,1.);}
void main(){
 vec2 uv=(2.*gl_FragCoord.xy-resolution)/resolution.y;
 vec3 ro=vec3(0.,.65,4.65);vec3 target=vec3(0.,.0,0.);
 vec3 w=normalize(target-ro),u=normalize(cross(w,vec3(0.,1.,0.))),v=cross(u,w);
 vec3 rd=normalize(u*uv.x+v*uv.y+w*2.2);float depth=0.;vec2 hit=vec2(0.);
 for(int i=0;i<72;i++){hit=model(ro+rd*depth);if(hit.x<.002||depth>9.)break;depth+=hit.x*.85;}
 vec3 color=mix(vec3(.94,.94,.83),vec3(.985,.96,.90),clamp(uv.y*.5+.5,0.,1.));
 if(depth<9.){
  vec3 p=ro+rd*depth,n=normal(p),light=normalize(vec3(-3.,5.,4.));
  float id=hit.y;vec3 base=vec3(.89,.87,.79);
  if(id>.5)base=vec3(.97,.95,.88);if(id>1.5)base=vec3(.045,.19,.15);if(id>2.5)base=vec3(.60,.78,.29);if(id>3.5)base=vec3(.76,.26,.15);
  float diffuse=max(dot(n,light),0.),sh=shadow(p+n*.012,light);
  float ao=clamp(model(p+n*.09).x/.09,.35,1.);
  vec3 halfdir=normalize(light-rd);float spec=pow(max(dot(n,halfdir),0.),48.)*.48;
  float rim=pow(1.-max(dot(n,-rd),0.),3.)*.15;
  color=base*(.35*ao+diffuse*.70*sh)+vec3(spec*sh+rim);
  color=mix(color,vec3(.97,.95,.88),smoothstep(5.,9.,depth));
 }
 color=pow(clamp(color,0.,1.),vec3(.92));gl_FragColor=vec4(color,1.);
}`;
  let gl,program,frame=0,paused=false,visible=true,lost=false,last=-Infinity,elapsed=0,previous=0;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  function showFallback(){lost=true;cancelAnimationFrame(frame);frame=0;canvas.hidden=true;fallback.hidden=false;button.hidden=true;}
  try{
    gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power',preserveDrawingBuffer:false});
    if(!gl)return;
    const compile=(type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);throw new Error('shader');}return shader;};
    const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
    program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('program');
    gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  }catch(e){showFallback();return;}
  const uResolution=gl.getUniformLocation(program,'resolution'),uTime=gl.getUniformLocation(program,'time');
  function draw(){if(lost)return;const width=canvas.parentElement.getBoundingClientRect().width||420;const n=Math.max(1,Math.min(600,Math.round(width*Math.min(window.devicePixelRatio||1,1.5))));if(canvas.width!==n){canvas.width=n;canvas.height=n;}gl.viewport(0,0,n,n);gl.uniform2f(uResolution,n,n);gl.uniform1f(uTime,elapsed);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);}
  function running(){return !paused&&!media.matches&&!document.hidden&&visible&&!lost;}
  function tick(now){frame=0;if(!running())return;if(now-last>=1000/24){elapsed+=previous?Math.min((now-previous)/1000,.1):0;previous=now;last=now;draw();}frame=requestAnimationFrame(tick);}
  function update(){cancelAnimationFrame(frame);frame=0;previous=0;button.setAttribute('aria-pressed',String(paused||media.matches));button.textContent=media.matches?'Movimiento reducido':paused?'Reanudar animación':'Pausar animación';button.disabled=media.matches;draw();if(running())frame=requestAnimationFrame(tick);}
  canvas.hidden=false;fallback.hidden=true;button.hidden=false;
  button.addEventListener('click',()=>{paused=!paused;update();});
  document.addEventListener('visibilitychange',update);
  window.addEventListener('resize',update);
  if(media.addEventListener)media.addEventListener('change',update);
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.03}).observe(canvas);}
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();showFallback();});
  try{update();}catch(e){showFallback();}
})();
