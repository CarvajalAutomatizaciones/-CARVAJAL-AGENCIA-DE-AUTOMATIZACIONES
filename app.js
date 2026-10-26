const $=s=>document.querySelector(s);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let paused=reduced,time=0,last=performance.now();
const journey=$('#funcionamiento'),canvas=document.createElement('canvas');$('#world').append(canvas);
const ctx=canvas.getContext('2d');let w=0,h=0;
function resize(){w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio,2);canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);}
resize();addEventListener('resize',resize,{passive:true});
function update(){const r=journey.getBoundingClientRect();$('.nav').classList.toggle('is-dark',r.top<80&&r.bottom>80);$('.scroll-progress i').style.height=(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100)+'%';}
addEventListener('scroll',update,{passive:true});update();
$('#impulse').addEventListener('click',()=>journey.scrollIntoView({behavior:reduced?'instant':'smooth'}));
$('#year').textContent=new Date().getFullYear();
const points=[];for(let i=0;i<2400;i++){const y=1-2*(i+.5)/2400,a=i*Math.PI*(3-Math.sqrt(5)),r=Math.sqrt(1-y*y);points.push([r*Math.cos(a),y,r*Math.sin(a)]);}
function draw(now){requestAnimationFrame(draw);const dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden)return;if(!paused)time+=dt;const bounds=journey.getBoundingClientRect();if(bounds.top>h||bounds.bottom<0)return;
 ctx.clearRect(0,0,w,h);const mobile=w<761,cx=w*(mobile?.85:.82),cy=h*.52,r=Math.min(h*.56,w*(mobile?.88:.38)),rot=time*.075;
 const glow=ctx.createRadialGradient(cx,cy,r*.6,cx,cy,r*1.2);glow.addColorStop(0,'#d7ad5500');glow.addColorStop(.65,'#d7ad5515');glow.addColorStop(1,'#d7ad5500');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
 for(const p of points){const x=p[0]*Math.cos(rot)+p[2]*Math.sin(rot),z=p[2]*Math.cos(rot)-p[0]*Math.sin(rot);if(z<-.2)continue;const density=.3+.7*Math.max(0,z);ctx.fillStyle=`rgba(215,173,85,${density*.7})`;ctx.beginPath();ctx.arc(cx+x*r,cy+p[1]*r,Math.max(.55,density*1.25),0,Math.PI*2);ctx.fill();}
 ctx.strokeStyle='#d7ad5538';ctx.lineWidth=.65;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();
 // A quiet holographic scan, entirely contained by the journey background.
 const scan=Math.sin(time*.18)*r;ctx.strokeStyle='#d7ad5520';ctx.beginPath();ctx.ellipse(cx,cy+scan,Math.sqrt(r*r-scan*scan),r*.025,0,0,Math.PI*2);ctx.stroke();
}
requestAnimationFrame(draw);

const hero=document.querySelector('.hero'),heroLogo=document.querySelector('.hero-logo');
function fadeLogo(){
 const mobile=innerWidth<761;
 const start=hero.offsetTop+(mobile?Math.max(0,heroLogo.offsetTop-innerHeight*.6):0);
 const distance=innerHeight*(mobile?.42:.48);
 const progress=Math.max(0,Math.min(1,(scrollY-start)/distance));
 heroLogo.style.opacity=String(1-progress);
 heroLogo.style.visibility=progress===1?'hidden':'visible';
 heroLogo.style.setProperty('--logo-exit',String(progress));
}
addEventListener('scroll',fadeLogo,{passive:true});addEventListener('resize',fadeLogo,{passive:true});fadeLogo();
if(!reduced&&matchMedia('(hover:hover)').matches)document.querySelectorAll('.plan-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*9+'deg');card.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*7+'deg');});card.addEventListener('pointerleave',()=>{card.style.setProperty('--ry','0deg');card.style.setProperty('--rx','0deg');});});
// The simulated conversation repeats using a shared CSS timeline.
const chat=document.querySelector('.chat-body');
const observer=new IntersectionObserver(entries=>{chat.classList.toggle('demo-out-of-view',!entries[0].isIntersecting);},{threshold:0});
observer.observe(chat);
addEventListener('visibilitychange',()=>chat.classList.toggle('demo-page-hidden',document.hidden));
