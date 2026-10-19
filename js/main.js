/* Amélioration facultative : le site fonctionne entièrement sans ce script
   (carrousel défilable au doigt/souris, menu en CSS). */
(function(){
  try{
    var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
    var track=document.getElementById('track'); if(!track) return;
    var slides=[].slice.call(track.children);
    var prev=document.getElementById('prev'), next=document.getElementById('next');
    var ctrl=document.getElementById('carCtrl'), dots=document.getElementById('dots');
    ctrl.className+=' on'; dots.className+=' on';
    slides.forEach(function(_,i){
      var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label','Projet '+(i+1));
      b.addEventListener('click',function(){go(i)}); dots.appendChild(b);
    });
    function step(){ return slides[0].getBoundingClientRect().width + 18; }
    function go(i){ track.scrollTo({left:Math.max(0,i*step()),behavior:'smooth'}); }
    function idx(){ return Math.round(track.scrollLeft/step()); }
    function update(){
      var i=Math.min(idx(),slides.length-1), max=track.scrollWidth-track.clientWidth-2;
      if(track.scrollLeft>=max) i=slides.length-1;
      [].forEach.call(dots.children,function(d,k){ d.setAttribute('aria-current',k===i?'true':'false'); });
      prev.disabled=track.scrollLeft<=2; next.disabled=track.scrollLeft>=max;
    }
    prev.addEventListener('click',function(){ track.scrollBy({left:-step(),behavior:'smooth'}); });
    next.addEventListener('click',function(){ track.scrollBy({left:step(),behavior:'smooth'}); });
    track.addEventListener('scroll',function(){ window.requestAnimationFrame(update); },{passive:true});
    track.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'){e.preventDefault();next.click();}
      if(e.key==='ArrowLeft'){e.preventDefault();prev.click();}
    });
    window.addEventListener('resize',update); update();
  }catch(e){}
})();
