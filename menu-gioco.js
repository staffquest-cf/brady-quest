/* Brady's Quest nel menu KEIK (www.keik.it/pages/menu-all-day-kitchen):
   pulsante in cima e in fondo al menu, popup dopo 30 secondi di scroll,
   niente pulsanti flottanti Prenota/WhatsApp su questa pagina. */
(function(){
  if(!/\/pages\/menu-all-day-kitchen\/?$/.test(location.pathname)) return;
  if(window.__bqMenu) return; window.__bqMenu=1;
  var SALA=/[?&](sala|qr)(=|&|$)/i.test(location.search);
  try{ if(SALA) sessionStorage.setItem('bq_sala','1'); else SALA=sessionStorage.getItem('bq_sala')==='1'; }catch(e){}
  var CSS="/* Brady's Quest: pulsanti e popup nel menu */\n#keik-menu .bq-card{display:flex;align-items:center;gap:12px;max-width:420px;margin:18px auto 0;padding:10px 16px 10px 10px;background:#121d33;border:3px solid #101826;border-radius:14px;box-shadow:0 4px 0 #8c1a72;color:#fff!important;text-decoration:none!important;text-align:left;font-family:'Montserrat',system-ui,sans-serif}\n#keik-menu .bq-card img{width:56px;height:56px;image-rendering:pixelated;flex:none;background:#ffc21a;border-radius:10px}\n#keik-menu .bq-card b{display:block;color:#ffc21a;font-weight:900;font-size:16px;line-height:1.2}\n#keik-menu .bq-card small{display:block;color:#dfe6f3;font-size:12.5px;line-height:1.35;margin-top:2px}\n#keik-menu .bq-card i{margin-left:auto;font-style:normal;font-weight:900;font-size:13px;background:#c2289f;color:#fff;padding:8px 12px;border-radius:999px;flex:none}\n#keik-menu .bq-card:active{transform:translateY(2px);box-shadow:0 2px 0 #8c1a72}\n#keik-menu .k-outro .bq-card{margin:22px auto 6px}\n#bq-pop{position:fixed;inset:0;z-index:2147483600;display:flex;align-items:flex-end;justify-content:center;padding:16px;background:rgba(43,10,46,.55);opacity:0;transition:opacity .25s}\n#bq-pop[hidden]{display:none}\n#bq-pop.bq-on{opacity:1}\n#bq-pop .bq-box{position:relative;width:100%;max-width:380px;background:#fff;border-radius:22px;padding:22px 20px 18px;text-align:center;font-family:'Montserrat',system-ui,sans-serif;color:#4b1650;box-shadow:0 18px 40px rgba(43,10,46,.35);transform:translateY(30px);transition:transform .3s cubic-bezier(.2,.9,.3,1.2)}\n#bq-pop.bq-on .bq-box{transform:none}\n#bq-pop .bq-ic{width:96px;height:96px;margin:-62px auto 6px;display:block;image-rendering:pixelated;background:#ffc21a;border:4px solid #fff;border-radius:22px;box-shadow:0 4px 0 #8c1a72}\n#bq-pop h3{margin:6px 0 6px;font-size:21px;font-weight:900;line-height:1.2;color:#4b1650;text-transform:none;letter-spacing:0}\n#bq-pop p{margin:0 0 16px;font-size:14.5px;line-height:1.45;color:#6f5274}\n#bq-pop .bq-go{display:block;background:#c2289f;color:#fff!important;font-weight:900;font-size:16px;padding:14px 20px;border-radius:999px;text-decoration:none!important;box-shadow:0 4px 0 #8c1a72}\n#bq-pop .bq-no{display:block;width:100%;margin-top:8px;background:none;border:0;color:#6f5274;font:600 14px 'Montserrat',system-ui,sans-serif;padding:10px;cursor:pointer;text-decoration:underline}\n#bq-pop .bq-no,#bq-pop .bq-x,#bq-pop .bq-go{text-transform:none!important;letter-spacing:0!important;min-height:0!important}\n#bq-pop .bq-x{position:absolute;top:10px;right:12px;background:none;border:0;font-size:20px;color:#6f5274;cursor:pointer;padding:6px;line-height:1}\n@media (min-width:700px){#bq-pop{align-items:center}}\n.prenota-bottone,.whatsapp-float{display:none!important}\n#keik-menu .k-bar,#keik-menu .k-top{bottom:calc(16px + env(safe-area-inset-bottom,0px))!important}\n#keik-menu.has-bar .k-outro{padding-bottom:96px!important}\n#keik-menu .k-hero a.k-cta[href*=\"/pages/prenota\"]{display:none!important}";
  var CARD="<a class=\"bq-card\" href=\"https://gioco.keik.it/\" data-bq=\"1\"><img src=\"https://gioco.keik.it/icon.png\" alt=\"\" width=\"56\" height=\"56\"><span><b>\ud83c\udfae Gioca a Brady's Quest</b><small>Il gioco che accompagna il tuo Viaggio col Gusto</small></span><i>Gioca</i></a>";
  var POP="<div id=\"bq-pop\" hidden role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"bq-t\"><div class=\"bq-box\"><button type=\"button\" class=\"bq-x\" aria-label=\"Chiudi\">\u2715</button><img class=\"bq-ic\" src=\"https://gioco.keik.it/icon.png\" alt=\"Brady il bradipo\"><h3 id=\"bq-t\">Vuoi provare Brady's Quest?</h3><p>Il gioco che accompagna il tuo Viaggio col Gusto da KEIK. Aiuta Brady a consegnare il caff\u00e8 prima che chiuda l'imbarco!</p><a class=\"bq-go\" href=\"https://gioco.keik.it/\" data-bq=\"1\">Gioca ora \ud83c\udfae</a><button type=\"button\" class=\"bq-no\">No, grazie</button></div></div>";
  if(SALA) CSS+="\n#keik-menu .k-pass-a .k-link{display:none!important}\n#keik-menu .k-gf a{display:none!important}";
  var st=document.createElement('style'); st.textContent=CSS; (document.head||document.documentElement).appendChild(st);
  function ready(f){ if(document.readyState!=='loading') f(); else document.addEventListener('DOMContentLoaded',f); }
  function card(){ var t=document.createElement('div'); t.innerHTML=CARD; return t.firstElementChild; }
  ready(function(){
    var root=document.getElementById('keik-menu'); if(!root) return;
    var top=document.getElementById('bq-top')||(function(){ var h=root.querySelector('.k-hero'); if(!h) return null; var d=document.createElement('div'); var r=h.querySelector('.k-route'); h.insertBefore(d,r||null); return d; })();
    if(top&&!top.querySelector('.bq-card')) top.appendChild(card());
    var bot=document.getElementById('bq-bottom')||(function(){ var o=root.querySelector('.k-outro'); if(!o) return null; var d=document.createElement('div'); var c=o.querySelector('.k-cta'); o.insertBefore(d,c?c.nextSibling:null); return d; })();
    if(bot&&!bot.querySelector('.bq-card')) bot.appendChild(card());
    if(!document.getElementById('bq-pop')){ var w=document.createElement('div'); w.innerHTML=POP; document.body.appendChild(w.firstElementChild); }
    if(SALA){
      [].forEach.call(document.querySelectorAll('.bq-card b'),function(b){ b.textContent='\ud83c\udfae Mentre aspetti, gioca con Brady'; });
      [].forEach.call(document.querySelectorAll('.bq-card small'),function(s){ s.textContent='Brady\u2019s Quest, il gioco del Viaggio col Gusto'; });
      var t=document.getElementById('bq-t'); if(t) t.textContent='Mentre aspetti il tuo piatto\u2026';
      var pp=document.querySelector('#bq-pop p'); if(pp) pp.textContent='\u2026gioca a Brady\u2019s Quest! Aiuta Brady a consegnare il caff\u00e8 a Erika prima che chiuda l\u2019imbarco.';
      var pn=document.querySelector('#keik-menu .k-pass-n'); if(pn) pn.textContent='Condividilo con chi vuoi portare con te nel tuo prossimo viaggio da KEIK.';
      var ep=document.querySelector('#keik-menu .k-exp-p'); if(ep) ep.innerHTML='Parti dal momento della giornata o da una destinazione. Tocca <b>Aggiungi</b> su quello che prenderesti: nasce il tuo itinerario, da condividere con chi vuoi portare la prossima volta.';
      var sm=document.querySelector('#keik-menu .k-share small'); if(sm) sm.textContent='con chi vuoi portare la prossima volta';
    }
    (function(){
      var pop=document.getElementById('bq-pop'); if(!pop) return;
      var KEY='bq_popup_visto', WAIT=SALA?45000:30000, started=false, acc=0, last=0, timer=null;
      function seen(){ try{ return sessionStorage.getItem(KEY)==='1'; }catch(e){ return false; } }
      function mark(){ try{ sessionStorage.setItem(KEY,'1'); }catch(e){} }
      function show(){ if(seen()) return; mark(); pop.hidden=false; requestAnimationFrame(function(){ pop.classList.add('bq-on'); }); }
      function hide(){ pop.classList.remove('bq-on'); setTimeout(function(){ pop.hidden=true; },250); }
      function tick(){ if(document.hidden){ last=Date.now(); return; } var n=Date.now(); acc+=n-last; last=n; if(acc>=WAIT){ clearInterval(timer); show(); } }
      function start(){ if(started||seen()) return; started=true; last=Date.now(); timer=setInterval(tick,500); window.removeEventListener('scroll',start); window.removeEventListener('touchmove',start); }
      window.addEventListener('scroll',start,{passive:true}); window.addEventListener('touchmove',start,{passive:true});
      pop.querySelector('.bq-no').addEventListener('click',hide);
      pop.querySelector('.bq-x').addEventListener('click',hide);
      pop.addEventListener('click',function(e){ if(e.target===pop) hide(); });
      document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!pop.hidden) hide(); });
      document.addEventListener('click',function(e){ var a=e.target.closest&&e.target.closest('[data-bq]'); if(a) mark(); });
      // prima di uscire: tasto/gesto Indietro sul telefono, mouse verso l'alto sul computer
      if(!seen()){
        try{ history.pushState({bq:1},'',location.href); }catch(e){}
        window.addEventListener('popstate',function(e){ if(seen()||(e.state&&e.state.bq)||location.hash) return; show(); });
        document.addEventListener('mouseout',function(e){ if(!e.relatedTarget&&e.clientY<=0&&!seen()) show(); });
      }
      window.bqShowNow=function(){ try{ sessionStorage.removeItem(KEY); }catch(e){} show(); };
    })();
  });
})();
