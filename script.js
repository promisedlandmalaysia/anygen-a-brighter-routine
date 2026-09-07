// Motion's documented scroll, inView and stagger APIs. Essential page actions do not depend on this module.
import('https://cdn.jsdelivr.net/npm/motion@13.1.0/+esm').then(({animate,scroll,inView,stagger})=>{
 const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let animations=[],cancellers=[];
 const blocked=()=>reduce.matches||root.classList.contains('motion-paused');
 const add=a=>(animations.push(a),a);
 if(!blocked())add(animate('.hero-title-line',{opacity:[0,1],y:[45,0]},{duration:.9,delay:stagger(.12),ease:[.2,.8,.2,1]}));
 inView('.reveal',element=>{if(!blocked())add(animate(element,{opacity:[0,1],y:[28,0]},{duration:.8,ease:[.2,.8,.2,1]}))},{amount:.12});
 const progress=animate('.page-progress',{scaleX:[0,1]},{ease:'linear'});scroll(progress);
 function clearLinked(){cancellers.forEach(fn=>fn());cancellers=[];document.querySelector('.hero-product-wrap').style.transform='';document.querySelector('.ritual-floating').style.transform=''}
 function startLinked(){clearLinked();if(blocked())return;
  const hero=animate('.hero-product-wrap',{y:[0,-75],rotate:[0,-7]},{ease:'linear'});cancellers.push(scroll(hero,{target:document.querySelector('.hero'),offset:['start start','end start']}));
  if(matchMedia('(min-width:821px)').matches){const bottle=animate('.ritual-floating',{y:[15,-18],rotate:[-5,10]},{ease:'linear'});cancellers.push(scroll(bottle,{target:document.querySelector('.ritual'),offset:['start end','end start']}));}
 }
 startLinked();window.addEventListener('anygen-motion',()=>{if(blocked()){animations.forEach(a=>a.complete());clearLinked()}else startLinked()});
}).catch(()=>{/* Static content and CSS motion remain fully usable if the animation CDN is unavailable. */});