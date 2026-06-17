// Cursor glow
(function(){var g=document.getElementById('cursor-glow');if(!g)return;document.addEventListener('mousemove',function(e){g.style.left=e.clientX+'px';g.style.top=e.clientY+'px';});})();
// Scroll reveal
(function(){
  document.querySelectorAll('.section-tag,.section-title,.section-sub').forEach(function(el){el.classList.add('reveal');});
  document.querySelectorAll('.service-card').forEach(function(el,i){el.classList.add('reveal');el.classList.add('delay-'+((i%6)+1));});
  document.querySelectorAll('.how-step').forEach(function(el,i){el.classList.add('reveal');el.classList.add('delay-'+(i+1));});
  document.querySelectorAll('.pv-card').forEach(function(el,i){el.classList.add('reveal');el.classList.add('delay-'+(i+1));});
  document.querySelectorAll('.region-card').forEach(function(el,i){el.classList.add('reveal');el.classList.add('delay-'+(i+1));});
  document.querySelectorAll('.insight-card').forEach(function(el,i){el.classList.add('reveal');el.classList.add('delay-'+(i+1));});
  var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:0.12});
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(function(el){io.observe(el);});
})();
// Active nav
(function(){
  var page=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    var href=a.getAttribute('href');
    if(href===page||(page===''&&href==='index.html')){a.classList.add('active');}
  });
})();
