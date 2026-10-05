(function(){
  // Sembunyikan gambar proyek yang filenya belum ada
  document.querySelectorAll("img.foto").forEach(function(i){i.addEventListener("error",function(){i.remove()})});
  var toast=document.getElementById('toast'),timer;
  function show(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(function(){toast.classList.remove('show')},2200)}
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var text=b.getAttribute('data-copy');
      function ok(){show('Email disalin')}
      function fail(){show('Gagal menyalin, salin manual dari tautan')}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(ok,fail)}
      else{try{var t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);ok()}catch(e){fail()}}
    });
  });
})();

(function(){
  var root=document.documentElement;
  root.classList.add('js');

  // Muncul bertahap saat discroll
  var items=document.querySelectorAll('.block h2,.prose,.facts,.filter,.project,.timeline li,.contact-note,.contact-list');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  items.forEach(function(el,i){el.classList.add('reveal');el.style.setProperty('--d',((i%3)*.08)+'s');io.observe(el)});

  // Menu aktif sesuai bagian yang sedang dilihat
  var links={};
  document.querySelectorAll('nav a[href^="#"]').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
  var so=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting&&links[e.target.id]){Object.keys(links).forEach(function(k){links[k].classList.remove('active')});links[e.target.id].classList.add('active')}
  })},{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('section.block').forEach(function(s){so.observe(s)});

  // Garis kemajuan scroll
  var bar=document.getElementById('progress');
  function prog(){var h=root.scrollHeight-root.clientHeight;bar.style.transform='scaleX('+(h>0?root.scrollTop/h:0)+')'}
  window.addEventListener('scroll',prog,{passive:true});prog();

  // Saring proyek berdasarkan teknologi
  var btns=document.querySelectorAll('.chipbtn'),cards=document.querySelectorAll('.project');
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    var f=b.getAttribute('data-filter');
    cards.forEach(function(c){
      var ok=f==='semua'||c.getAttribute('data-tech').split(' ').indexOf(f)>-1;
      c.hidden=!ok;if(ok)c.classList.add('in');
    });
  })});

  // Perbesar gambar proyek
  var dlg=document.getElementById('lightbox'),big=dlg.querySelector('img');
  document.querySelectorAll('img.foto').forEach(function(img){
    img.tabIndex=0;img.setAttribute('role','button');
    function open(){big.src=img.src;big.alt=img.alt;if(dlg.showModal)dlg.showModal()}
    img.addEventListener('click',open);
    img.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  });
  dlg.addEventListener('click',function(e){if(e.target===dlg||e.target.tagName==='BUTTON')dlg.close()});
})();