// Hania Jewels – scroll reveals, sparkles, micro-interactions
(function(){
  document.documentElement.classList.add("js-anim");
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function settle(el){const d=parseFloat(el.style.getPropertyValue("--d"))||0;setTimeout(()=>el.classList.add("settled"),(d+0.95)*1000)}
  const io="IntersectionObserver" in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");settle(e.target);io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"}):null;
  const sel=".section-heading,.page-banner>*,.hero-copy>*,.category-card,.product-card,.review-card,.feature-inner>*,.offer-card,.faq-item,.write-review,.cart-summary,.empty-state";
  function prep(root){
    root.querySelectorAll(sel).forEach(el=>{
      if(el.dataset.rv)return;el.dataset.rv="1";
      if(el.closest(".modal-shell"))return;
      el.classList.add("reveal");
      const sib=[...(el.parentElement?.children||[])].indexOf(el);
      el.style.setProperty("--d",Math.min(sib%6,5)*0.08+"s");
      if(el.matches(".feature-inner>*"))el.classList.add(sib===0?"from-left":"from-right");
      io?io.observe(el):(el.classList.add("in"),settle(el));
    });
  }
  const store=document.getElementById("store");
  prep(document);
  new MutationObserver(()=>prep(store)).observe(store,{childList:true,subtree:true});
  // Re-check on page switches (hidden pages become visible)
  document.addEventListener("click",()=>setTimeout(()=>prep(store),60));

  // Floating sparkles
  const field=document.getElementById("sparkleField");
  if(field&&!reduce){
    const glyphs=["✧","✦","♡","·","✧"];
    for(let i=0;i<16;i++){
      const s=document.createElement("span");s.className="sparkle";
      s.textContent=glyphs[i%glyphs.length];
      s.style.left=Math.random()*100+"%";
      s.style.fontSize=(10+Math.random()*16)+"px";
      s.style.animationDuration=(12+Math.random()*14)+"s";
      s.style.animationDelay=(-Math.random()*20)+"s";
      field.appendChild(s);
    }
  }
  // Heart pop + cart/wishlist badge bump
  document.addEventListener("click",e=>{
    const w=e.target.closest("[data-wish]");
    if(w)setTimeout(()=>{const b=document.querySelector('[data-wish="'+w.dataset.wish+'"]');b&&(b.classList.add("pop"),setTimeout(()=>b.classList.remove("pop"),500));bump("wishCount")},30);
    if(e.target.closest("[data-quick],#detailsAddBtn"))setTimeout(()=>bump("cartCount"),30);
  });
  const cf=document.getElementById("customForm");cf&&cf.addEventListener("submit",()=>setTimeout(()=>bump("cartCount"),60));
  function bump(id){const n=document.getElementById(id);if(!n)return;n.classList.remove("bump");void n.offsetWidth;n.classList.add("bump")}
  // Gentle parallax on hero photo
  const hero=document.querySelector(".hero-photo img");
  if(hero&&!reduce)window.addEventListener("scroll",()=>{hero.style.transform="translateY("+Math.min(window.scrollY*0.06,30)+"px) scale(1.06)"},{passive:true});
})();
