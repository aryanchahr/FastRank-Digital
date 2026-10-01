(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var root=document.documentElement;
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var hasG=!!window.gsap&&!!window.ScrollTrigger;
var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
var wasPT=root.classList.contains('pt-in');
var lenis=null;
try{sessionStorage.removeItem('frt')}catch(e){}

/* ---------- theme ---------- */
try{var st=localStorage.getItem('rf-theme');if(st)root.setAttribute('data-theme',st)}catch(e){}
var themeBtn=$('#theme');
if(themeBtn)themeBtn.addEventListener('click',function(){
  var cur=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  var nx=cur==='dark'?'light':'dark';root.setAttribute('data-theme',nx);
  try{localStorage.setItem('rf-theme',nx)}catch(e){}
});

/* ---------- data (generated from data.json at build time) ---------- */
var PLANS=[["SEO","Core SEO","Advanced SEO","Enterprise SEO"],["Local SEO","1 location","Up to 5 locations","Multi-location"],["Google Ads / PPC","","Search + Maps","Full funnel"],["Website development","Landing pages","Full website","Custom platform"],["Social media marketing","","2 channels","Paid + organic"],["AI automation","Lead alerts","CRM workflows","Custom agents"],["Lead generation","","Forms + tracking","Inbound + outbound"],["Performance marketing","Reporting","Monthly optimisation","Weekly experiments"]],PNOTE=["Best for small businesses that need a solid foundation and a first set of rankings.","Best for growing businesses that want search, ads and automation working together.","Best for multi-location or high-competition brands that need full-funnel growth."],CASES=[{"id":"c1","f":"local","cl":"Harbor & Pine Dental","k":"Local SEO","m":"+312%","s":"calls from Google Maps in 6 months","series":[8,10,12,15,21,28,34,41,49,55,60,66],"kw":[["dentist near me",31,3],["emergency dentist",24,2],["teeth whitening",18,4],["invisalign consultation",45,7]],"st":"Harbor & Pine was invisible outside their own street. We rebuilt their Google Business Profile, cleaned up citations and built location pages that matched how patients search.","q":"We stopped worrying about the phone ringing. It just does.","by":"Practice manager"},{"id":"c2","f":"seo","cl":"Northwind Logistics","k":"SEO","m":"+486%","s":"organic traffic in 9 months","series":[12,13,15,18,24,33,45,60,78,96,118,140],"kw":[["freight forwarding uk",38,4],["pallet delivery quote",27,3],["same day courier",52,9],["warehouse storage rates",41,5]],"st":"A technically sound site with thin content. We mapped buyer intent, rebuilt service pages and earned links from trade publications.","q":"Sales finally sees marketing as a source of pipeline, not a cost.","by":"Head of growth"},{"id":"c3","f":"ads","cl":"Lumen Skincare","k":"Google Ads","m":"4.8x","s":"return on ad spend","series":[18,20,22,30,38,46,55,60,68,72,80,88],"kw":[["vitamin c serum",12,2],["best retinol cream",29,6],["sensitive skin moisturiser",22,3],["skincare routine set",34,5]],"st":"Spend was scattered across broad terms. We restructured by product margin, tightened negatives and moved budget to what paid back.","q":"For the first time we knew exactly what each pound of ad spend returned.","by":"Founder"},{"id":"c4","f":"ads","cl":"Brightside Solar","k":"Lead generation","m":"-54%","s":"cost per qualified lead","series":[90,86,80,72,66,60,54,50,46,44,42,41],"kw":[["solar panels installation",26,3],["solar quote",33,4],["battery storage cost",48,8],["solar grants",21,2]],"st":"Plenty of leads, most of them poor. We added qualification steps to the forms and rebuilt targeting around homeowners ready to buy.","q":"Fewer leads, far better ones. Our installers are booked out.","by":"Sales director"},{"id":"c5","f":"web","cl":"Atlas Legal","k":"Web development","m":"+68%","s":"enquiry conversion after a 5-week rebuild","series":[20,22,21,26,34,42,50,58,64,70,74,78],"kw":[["employment lawyer",36,6],["unfair dismissal advice",29,4],["settlement agreement solicitor",44,5],["workplace discrimination claim",39,7]],"st":"A slow, dated site was losing enquiries. The new build loads in under a second and puts the enquiry form where people look for it.","q":"It feels like a different firm online. Clients tell us so.","by":"Managing partner"},{"id":"c6","f":"ai","cl":"Kite Realty","k":"AI automation","m":"90s","s":"average lead response, down from 4 hours","series":[100,96,90,70,50,34,22,14,9,6,4,3],"kw":[["homes for sale",28,5],["property valuation",35,4],["rent to buy",47,11],["sell my house fast",31,3]],"st":"Leads were going cold in the inbox. We built an automation that replies instantly, qualifies the enquiry and books a viewing.","q":"Buyers get an answer before they have closed the tab.","by":"Sales manager"}],TL=[["2018","Founded","Started with one local business, a spreadsheet and a simple promise: rankings you can measure."],["2020","Ads arrive","Clients wanted faster wins, so we added Google Ads and learned how search and paid work best together."],["2022","Web team","We brought design and development in-house so rankings and conversions are built together."],["2024","AI automation","Launched lead follow-up automations that respond in seconds instead of hours."],["2026","Performance marketing","Full-funnel growth across search, maps, social and automation for clients in 12 countries."]];

/* ---------- components (markup is pre-rendered at build time for SEO) ---------- */
var sl=$('#svclist'),svcs=[];
if(sl){
  svcs=$$('.svc',sl);
  var openSvc=function(el){svcs.forEach(function(b){var on=b===el;b.classList.toggle('open',on);b.setAttribute('aria-expanded',on)})};
  svcs.forEach(function(b){
    b.addEventListener('mouseenter',function(){if(matchMedia('(min-width:901px)').matches)openSvc(b)});
    b.addEventListener('click',function(){openSvc(b)});
    b.addEventListener('focus',function(){openSvc(b)});
  });
}
var plan=1;
function renderTbl(){
  var h='<div class="tr-row"><div>Service</div>'+['Starter','Growth','Scale'].map(function(p,i){return '<div class="'+(plan===i+1?'sel':'')+'">'+p+'</div>'}).join('')+'</div>';
  PLANS.forEach(function(r){h+='<div class="tr-row"><div>'+r[0]+'</div>'+[1,2,3].map(function(i){return '<div class="'+(plan===i?'sel ':'')+(r[i]?'yes':'no')+'">'+(r[i]||'Not included')+'</div>'}).join('')+'</div>'});
  $('#tbl').innerHTML=h;$('#cmpnote').textContent=PNOTE[plan-1];
}
if($('#tbl')){$$('#seg button').forEach(function(b){b.addEventListener('click',function(){plan=+b.dataset.p;$$('#seg button').forEach(function(x){x.classList.toggle('on',x===b)});renderTbl()})})}
var cg=$('#cases-grid'),bg=$('#bloggrid');
function filterable(chipsSel,itemSel,parent){
  var chips=$$(chipsSel+' button');if(!chips.length)return;
  chips.forEach(function(b){b.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.toggle('on',x===b)});
    var f=b.dataset.f,vis=[];
    $$(itemSel,parent).forEach(function(c){var show=f==='all'||c.dataset.f===f;c.style.display=show?'':'none';if(show)vis.push(c)});
    if(hasG&&!reduce)gsap.fromTo(vis,{opacity:0,y:40,scale:.96},{opacity:1,y:0,scale:1,duration:.7,stagger:.08,ease:'power3.out',onComplete:function(){ScrollTrigger.refresh()}});
  })});
}
filterable('#chips','.case',cg);
filterable('#bchips','.post',bg);
$$('.qa button').forEach(function(b){b.addEventListener('click',function(){var p=b.parentNode,on=!p.classList.contains('on');$$('.qa').forEach(function(x){x.classList.remove('on');$('button',x).setAttribute('aria-expanded','false')});if(on){p.classList.add('on');b.setAttribute('aria-expanded','true')}setTimeout(function(){if(hasG)ScrollTrigger.refresh()},600)})});

/* timeline */
var tlb=$('#tlbar'),tlbody=$('#tlbody');
if(tlb&&tlbody){
  tlb.insertAdjacentHTML('beforeend',TL.map(function(t,i){return '<button data-i="'+i+'">'+t[0]+'</button>'}).join(''));
  var setTL=function(i){$$('button',tlb).forEach(function(b,j){b.classList.toggle('on',j===i);b.classList.toggle('past',j<i)});$('i',tlb).style.width=(i/(TL.length-1)*100)+'%';
    tlbody.innerHTML='<h2>'+TL[i][1]+'</h2><p>'+TL[i][2]+'</p>';
    if(hasG&&!reduce)gsap.from(tlbody.children,{y:20,opacity:0,duration:.5,stagger:.08,ease:'power3.out'})};
  $$('button',tlb).forEach(function(b){b.addEventListener('click',function(){setTL(+b.dataset.i)})});setTL(0);
}

/* calendar */
var dEl=$('#days'),sEl=$('#slots'),chosenDay=null,chosenSlot=null;
if(dEl&&sEl){
  var d=new Date(),n=0,fmt=new Intl.DateTimeFormat('en',{weekday:'short'}),fm2=new Intl.DateTimeFormat('en',{weekday:'long',day:'numeric',month:'long'});
  while(n<8){d=new Date(d.getTime()+864e5);if(d.getDay()===0||d.getDay()===6)continue;n++;(function(dd){var b=document.createElement('button');b.type='button';b.innerHTML=fmt.format(dd)+'<b>'+dd.getDate()+'</b>';b.addEventListener('click',function(){$$('button',dEl).forEach(function(x){x.classList.remove('on')});b.classList.add('on');chosenDay=fm2.format(dd)});dEl.appendChild(b)})(d)}
  ['09:30','11:00','13:30','15:00','16:30'].forEach(function(t){var b=document.createElement('button');b.type='button';b.textContent=t;b.addEventListener('click',function(){$$('button',sEl).forEach(function(x){x.classList.remove('on')});b.classList.add('on');chosenSlot=t});sEl.appendChild(b)});
  $('button',dEl).click();$('button',sEl).click();
}

/* ---------- forms: every enquiry is emailed to the address below ---------- */
var FORM_ENDPOINT='https://formsubmit.co/ajax/'+'aryanchahar711@gmail.com';
var FALLBACK_EMAIL='aryanchahar711@gmail.com';
function sendForm(kind,fields){
  var payload={};Object.keys(fields).forEach(function(k){payload[k]=fields[k]});
  payload._subject='Ranks Fuel website: '+kind;payload._template='table';payload._captcha='false';payload.Page=window.location.href;payload.Form=kind;
  return fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)})
    .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok||j.success===false||j.success==='false')throw new Error(j.message||'send failed');return j})});
}
function formFields(f){var o={};$$('input,select,textarea',f).forEach(function(i){if(!i.name||i.type==='submit')return;o[i.name]=i.value.trim()});return o}
function wire(id,kind,extra,cb){
  var f=$(id);if(!f)return;
  var btn=$('button[type=submit]',f),label=btn?$('span',btn).textContent:'',err=document.createElement('p');
  err.className='form-err';err.setAttribute('role','alert');f.appendChild(err);
  f.addEventListener('submit',function(e){
    e.preventDefault();err.classList.remove('on');var ok=true;
    $$('[required]',f).forEach(function(i){var v=i.value.trim();var bad=!v||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(v));i.setAttribute('aria-invalid',bad);i.style.borderColor=bad?'#ef4444':'';if(bad)ok=false});
    if(!ok)return;
    var data=formFields(f);if(data._honey){cb(f);return}delete data._honey;
    if(extra){var x=extra();if(x===false)return;Object.keys(x).forEach(function(k){data[k]=x[k]})}
    if(btn){btn.disabled=true;$('span',btn).textContent='Sending...'}
    sendForm(kind,data).then(function(){cb(f)}).catch(function(){
      err.innerHTML='We could not send that just now. Please try again, or email us directly at <a href="mailto:'+FALLBACK_EMAIL+'?subject='+encodeURIComponent('Ranks Fuel: '+kind)+'">'+FALLBACK_EMAIL+'</a>.';err.classList.add('on');
    }).then(function(){if(btn){btn.disabled=false;$('span',btn).textContent=label}});
  });
}
wire('#cform','Contact enquiry',null,function(f){$('#cok').classList.add('on');f.reset()});
wire('#nl','Newsletter signup',null,function(f){$('#nlok').style.display='block';f.reset()});
wire('#bform','Call booking request',function(){if(!chosenDay||!chosenSlot)return false;return {Day:chosenDay,Time:chosenSlot,Timezone:Intl.DateTimeFormat().resolvedOptions().timeZone}},function(f){var o=$('#bookok');o.textContent='Thanks! We have your request for '+chosenDay+' at '+chosenSlot+' ('+Intl.DateTimeFormat().resolvedOptions().timeZone+'). We will confirm by email.';o.classList.add('on');f.reset()});
wire('#auditform','Free SEO audit request',null,function(f){
  var fb=$('#afb');fb.classList.add('on');var li=$$('#asteps li');li.forEach(function(x){x.classList.remove('ok')});$('#adone').style.display='none';
  li.forEach(function(x,i){setTimeout(function(){x.classList.add('ok');if(i===li.length-1)$('#adone').style.display='block'},500+i*450)});f.reset();
});

/* chat */
var chat=$('#chat'),chb=$('#chb');
function say(t,me){var m=document.createElement('div');m.className='msg '+(me?'me':'bot');m.textContent=t;chb.appendChild(m);chb.scrollTop=chb.scrollHeight;return m}
function qr(list){var dv=document.createElement('div');dv.className='qr';list.forEach(function(l){var b=document.createElement('button');b.type='button';b.textContent=l;b.addEventListener('click',function(){dv.remove();ask(l)});dv.appendChild(b)});chb.appendChild(dv);chb.scrollTop=chb.scrollHeight}
function reply(q){q=q.toLowerCase();
  if(/price|cost|quote|how much|budget/.test(q))return['Every plan is scoped to your market and goals, so we quote after a free audit. Want to start one?',['Get free audit','Book a call']];
  if(/service|seo|ads|ppc|web|social|ai|automat|lead/.test(q))return['We run SEO, Local SEO, Google Ads, websites, social media, AI automation, lead generation and performance marketing. Which matters most right now?',['Local SEO','Google Ads','AI automation']];
  if(/audit/.test(q))return['Our free audit covers technical, content and local issues. It takes one minute to request.',['Get free audit']];
  if(/book|call|meet|talk/.test(q))return['Pick a time in the calendar on the contact page and we will confirm by email.',['Book a call']];
  if(/long|time|result/.test(q))return['Most clients see early movement in 8 to 12 weeks. Competitive searches take longer.',['Get free audit','Book a call']];
  return['I can help with services, results and getting started. Or book a call and talk to a person.',['Our services','Get free audit','Book a call']]}
function goTo(sel,page){var el=$(sel);if(el){if(lenis)lenis.scrollTo(el,{offset:-20});else el.scrollIntoView({behavior:'smooth'})}else navigate(page)}
function ask(t){say(t,true);
  if(t==='Get free audit'){chat.classList.remove('on');goTo('#audit','/contact#audit');return}
  if(t==='Book a call'){chat.classList.remove('on');goTo('#bookbox','/contact#bookbox');return}
  var ty=document.createElement('div');ty.className='msg bot typing';ty.innerHTML='<i></i><i></i><i></i>';chb.appendChild(ty);chb.scrollTop=chb.scrollHeight;
  setTimeout(function(){ty.remove();var r=reply(t);say(r[0]);qr(r[1])},700)}
if(chat){
  $('#chat-btn').addEventListener('click',function(){var on=chat.classList.toggle('on');this.setAttribute('aria-expanded',on);if(on&&!chb.children.length){say('Hi! I\'m the Ranks Fuel assistant. I can answer quick questions about our services, or get you a free audit.');qr(['Our services','How much does it cost?','Get free audit'])}});
  $('#chf').addEventListener('submit',function(e){e.preventDefault();var i=$('#chi'),v=i.value.trim();if(v){i.value='';ask(v)}});
}

/* case modal */
var modal=$('#modal'),sheet=$('#sheet'),lastFocus=null;
function chartSVG(series){var w=460,h=200,mx=Math.max.apply(0,series)*1.1,pts=series.map(function(v,i){return [i/(series.length-1)*(w-20)+10,h-20-(v/mx)*(h-40)]}),dd=pts.map(function(p,i){return (i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)}).join('');
  var mos=['J','F','M','A','M','J','J','A','S','O','N','D'];
  return '<svg viewBox="0 0 '+w+' '+(h+18)+'" role="img" aria-label="Traffic growth chart"><defs><linearGradient id="ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2563EB" stop-opacity=".35"/><stop offset="1" stop-color="#2563EB" stop-opacity="0"/></linearGradient></defs><path class="ar" d="'+dd+'L'+(w-10)+' '+(h-20)+'L10 '+(h-20)+'Z" fill="url(#ga)" opacity="0"/><path class="ln" d="'+dd+'" fill="none" stroke="#2563EB" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'+pts.map(function(p,i){return '<text x="'+p[0]+'" y="'+(h+10)+'" text-anchor="middle" font-size="10" fill="#94A3B8">'+mos[i]+'</text>'}).join('')+'<circle class="dot" cx="'+pts[pts.length-1][0]+'" cy="'+pts[pts.length-1][1]+'" r="7" fill="#06B6D4" stroke="#fff" stroke-width="3" opacity="0"/></svg>'}
function closeModal(){modal.classList.remove('on');if(lenis)lenis.start();if(lastFocus)lastFocus.focus()}
function openCase(id){var c=CASES.filter(function(x){return x.id===id})[0];lastFocus=document.activeElement;
  sheet.innerHTML='<button class="x" aria-label="Close">×</button><img class="cover" src="/assets/img/case-'+c.id.slice(1)+'.svg" alt="Illustration for the '+c.cl+' case study" width="800" height="600"><div class="tag"><i></i>'+c.k+'</div><h3 id="mt">'+c.cl+': '+c.m+' '+c.s+'</h3><p class="lead">'+c.st+'</p><div class="two"><div><h4>Before vs after: Google rankings</h4>'+c.kw.map(function(k){return '<div class="kw"><div class="h"><span>'+k[0]+'</span><span class="pos" data-from="'+k[1]+'" data-to="'+k[2]+'">#'+k[1]+'</span></div><div class="tk"><i data-w0="'+Math.max(4,(51-k[1])/50*100)+'" data-w1="'+Math.max(4,(51-k[2])/50*100)+'"></i></div></div>'}).join('')+'</div><div><h4>Traffic growth over 12 months</h4><div class="chart">'+chartSVG(c.series)+'</div></div></div><div class="quote">“'+c.q+'”<small>'+c.by+', '+c.cl+'</small></div>';
  modal.classList.add('on');if(lenis)lenis.stop();
  $('.x',sheet).focus();$('.x',sheet).addEventListener('click',closeModal);
  var bars=$$('.kw .tk i',sheet);bars.forEach(function(b){b.style.width=b.dataset.w0+'%'});
  var ln=$('.ln',sheet),len=ln.getTotalLength();
  if(hasG&&!reduce){
    gsap.from(sheet,{y:80,opacity:0,duration:.7,ease:'power4.out'});
    $$('.kw .pos',sheet).forEach(function(p,i){var o={v:+p.dataset.from};gsap.to(o,{v:+p.dataset.to,duration:1.4,delay:.4+i*.12,ease:'power3.inOut',onUpdate:function(){p.textContent='#'+Math.round(o.v)}});gsap.to(bars[i],{width:bars[i].dataset.w1+'%',duration:1.4,delay:.4+i*.12,ease:'power3.inOut'})});
    gsap.fromTo(ln,{strokeDasharray:len,strokeDashoffset:len},{strokeDashoffset:0,duration:1.8,delay:.3,ease:'power2.inOut'});
    gsap.to($('.ar',sheet),{opacity:1,duration:1,delay:1.4});gsap.to($('.dot',sheet),{opacity:1,duration:.4,delay:2});
  }else{bars.forEach(function(b){b.style.width=b.dataset.w1+'%'});$$('.kw .pos',sheet).forEach(function(p){p.textContent='#'+p.dataset.to});$('.ar',sheet).setAttribute('opacity',1);$('.dot',sheet).setAttribute('opacity',1)}
}
if(modal&&cg){
  cg.addEventListener('click',function(e){var b=e.target.closest('.case');if(b)openCase(b.dataset.id)});
  modal.addEventListener('click',function(e){if(e.target===modal)closeModal()});
}
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(modal&&modal.classList.contains('on'))closeModal();if(chat)chat.classList.remove('on')}});

/* map tooltips */
var mp=$('#map');
if(mp){var tip=$('#tip');$$('.pin',mp).forEach(function(p){function show(){var r=p.getBoundingClientRect(),mr=mp.getBoundingClientRect();tip.textContent=p.dataset.tip;tip.style.left=(r.left+r.width/2-mr.left)+'px';tip.style.top=(r.top-mr.top)+'px';tip.style.opacity=1}p.addEventListener('mouseenter',show);p.addEventListener('mouseleave',function(){tip.style.opacity=0});p.setAttribute('tabindex','0');p.addEventListener('focus',show);p.addEventListener('blur',function(){tip.style.opacity=0})})}

/* calculator */
if($('#r1')){
  var r1=$('#r1'),r2=$('#r2'),r3=$('#r3'),cur={b:0,a:0};
  var upd=function(){var v=+r1.value,c=+r2.value/100,g=+r3.value/100,b=Math.round(v*c),a=Math.round(v*(1+g)*c),mx=Math.max(a,1);
    $('#o1').textContent=v.toLocaleString();$('#o2').textContent=(+r2.value).toFixed(1)+'%';$('#o3').textContent='+'+r3.value+'%';
    $('#ib').style.height=Math.max(3,b/mx*72)+'%';$('#ia').style.height='72%';
    $('#cn').textContent='That is about '+(a-b).toLocaleString()+' extra enquiries a month at your current conversion rate.';
    if(hasG&&!reduce){gsap.to(cur,{b:b,a:a,duration:.6,ease:'power2.out',onUpdate:function(){$('#lb').textContent=Math.round(cur.b).toLocaleString();$('#la').textContent=Math.round(cur.a).toLocaleString()}})}else{$('#lb').textContent=b.toLocaleString();$('#la').textContent=a.toLocaleString()}};
  [r1,r2,r3].forEach(function(r){r.addEventListener('input',upd)});upd();
}

/* mobile nav */
var mob=$('#mob'),burger=$('#burger');
function toggleMob(open){mob.classList.toggle('on',open);root.classList.toggle('menu-open',open);burger.innerHTML=open?'<svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>';burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Close menu':'Open menu');if(lenis)open?lenis.stop():lenis.start();
  document.body.style.overflow=open?'hidden':'';
  if(open){if(hasG&&!reduce)gsap.fromTo(mob,{clipPath:'circle(0% at calc(100% - 2.6rem) 2.6rem)'},{clipPath:'circle(150% at calc(100% - 2.6rem) 2.6rem)',duration:.8,ease:'power3.inOut'});else mob.style.clipPath='none'}else mob.style.clipPath=''}
if(mob&&burger){
  burger.addEventListener('click',function(){toggleMob(!mob.classList.contains('on'))});
  window.addEventListener('resize',function(){if(window.innerWidth>1000&&mob.classList.contains('on'))toggleMob(false)});
}

/* ---------- SERP (home hero) ---------- */
var srows=$('#srows'),rowEls=[],RH=78,serpTL=null;
var SR=[['citypro-plumbing.com','C','CityPro Plumbing | Local Plumbers','Fixed-price call-outs across the city. Book online in two minutes.'],['quickfix-plumbers.co','Q','QuickFix Plumbers, Open 24 Hours','Leaks, blocked drains and boiler repairs. Fast response.'],['homeflow-services.com','H','HomeFlow Services: Plumbing and Heating','Trusted by homeowners. See our latest reviews.'],['plumbersnearyou.net','P','Find Plumbers Near You | Compare Quotes','Compare prices from local tradespeople in your area.'],['yourbusiness.com','Y','Your Business | Emergency Plumber, 24/7','★★★★★ 4.9 (312 reviews) · Same-day call-outs · Free quotes']];
function placeRows(pos,animate,dur){var order=[0,1,2,3];order.splice(pos,0,4);rowEls.forEach(function(el,i){var y=order.indexOf(i)*RH;if(!hasG)el.style.transform='translateY('+y+'px)';else if(animate)gsap.to(el,{y:y,duration:dur,ease:'power3.inOut',overwrite:true});else gsap.set(el,{y:y})})}
function typeQuery(){var q='emergency plumber near me',el=$('#sq'),i=0;el.textContent='';if(reduce){el.textContent=q;return}var t=setInterval(function(){el.textContent=q.slice(0,++i);if(i>=q.length)clearInterval(t)},45)}
function serpFinal(){$('#fi').style.width='100%';$('#fp').textContent='100%';$('#sq').textContent='emergency plumber near me';placeRows(0,false);rowEls[4].classList.add('win');$('#sp').textContent='1'}
function climb(){
  if(!hasG){serpFinal();return}
  if(serpTL)serpTL.kill();typeQuery();rowEls[4].classList.remove('win');placeRows(4,false);$('#sp').textContent='5';gsap.set(['#rb','#ch1','#ch2'],{opacity:0,scale:.6});
  serpTL=gsap.timeline({delay:.9});var fo={v:0};gsap.set('#fi',{width:'0%'});$('#fp').textContent='0%';
  for(var p=3;p>=0;p--){(function(p){serpTL.add(function(){placeRows(p,true,.7);$('#sp').textContent=String(p+1)},'+='+(p===3?0:.4))})(p)}
  serpTL.to('#fi',{width:'100%',duration:2.4,ease:'power1.inOut'},0).to(fo,{v:100,duration:2.4,ease:'power1.inOut',onUpdate:function(){$('#fp').textContent=Math.round(fo.v)+'%'}},0);
  serpTL.add(function(){rowEls[4].classList.add('win')},'+=.8').to('#rb',{opacity:1,scale:1,duration:.6,ease:'back.out(2.4)'},'<').to('#ch1',{opacity:1,scale:1,duration:.6,ease:'back.out(1.8)'},'<.15').to('#ch2',{opacity:1,scale:1,duration:.6,ease:'back.out(1.8)'},'<.25');
  if(reduce)serpTL.progress(1)}
if(srows){
  rowEls=SR.map(function(r,i){var dv=document.createElement('div');dv.className='row'+(i===4?' me':'');dv.innerHTML='<div class="fv">'+r[1]+'</div><div><div class="d">'+r[0]+'</div><div class="t">'+r[2]+'</div><div class="s">'+r[3]+'</div></div>';srows.appendChild(dv);return dv});
  placeRows(4,false);$('#replay').addEventListener('click',climb);
}

/* embers */
var cv=$('#embers');
if(cv&&!reduce){
  var cx=cv.getContext('2d'),W=0,H=0,P=[],dpr=Math.min(window.devicePixelRatio||1,2),run=false;
  var size=function(){var r=cv.parentNode.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)};
  var mk=function(init){var q=Math.random();return {x:Math.random()*W,y:init?Math.random()*H:H+10,r:Math.random()*2.4+.9,vy:Math.random()*.7+.25,ph:Math.random()*6.28,a:Math.random()*.5+.35,c:q<.6?'249,115,22':(q<.8?'6,182,212':'37,99,235')}};
  var initE=function(){size();P=[];var n=window.innerWidth<700?22:46;for(var i=0;i<n;i++)P.push(mk(true))};
  var tickE=function(){if(!run)return;cx.clearRect(0,0,W,H);for(var i=0;i<P.length;i++){var p=P[i];p.y-=p.vy;p.ph+=.02;p.x+=Math.sin(p.ph)*.35;if(p.y<-10){P[i]=mk(false);continue}var al=p.a*Math.min(1,p.y/H*1.7);cx.beginPath();cx.fillStyle='rgba('+p.c+','+al.toFixed(3)+')';cx.arc(p.x,p.y,p.r,0,6.283);cx.fill()}requestAnimationFrame(tickE)};
  initE();window.addEventListener('resize',initE);
  if('IntersectionObserver' in window)new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!run){run=true;tickE()}else if(!v)run=false}).observe($('#hero'));else{run=true;tickE()}
}

/* navigation helper (used by chat and page transitions) */
function navigate(href){
  if(reduce||!hasG){window.location.href=href;return}
  try{sessionStorage.setItem('frt','1')}catch(e){}
  if(lenis)lenis.stop();
  gsap.set('#curtain',{y:0,yPercent:101});
  gsap.to('#curtain',{yPercent:0,duration:.6,ease:'power3.inOut',onComplete:function(){window.location.href=href}});
  setTimeout(function(){window.location.href=href},1800);
}
function normPath(p){return p.replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/$/,'')||'/'}
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('a[href]');
  if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0||a.target==='_blank'||a.hasAttribute('download'))return;
  var u;try{u=new URL(a.getAttribute('href'),window.location.href)}catch(x){return}
  if(u.protocol!==window.location.protocol||u.origin!==window.location.origin)return;
  var same=normPath(u.pathname)===normPath(window.location.pathname);
  if(same){
    e.preventDefault();
    if(mob&&mob.classList.contains('on'))toggleMob(false);
    var t=u.hash?$(u.hash):null;
    if(lenis)lenis.scrollTo(t||0,{duration:1.6,easing:function(x){return x<.5?8*x*x*x*x:1-Math.pow(-2*x+2,4)/2}});
    else if(t)t.scrollIntoView({behavior:'smooth'});else window.scrollTo({top:0,behavior:'smooth'});
    return;
  }
  if(/\.(pdf|zip|png|jpe?g|svg|xml|txt)$/i.test(u.pathname))return;
  e.preventDefault();
  if(mob&&mob.classList.contains('on'))document.body.style.overflow='';
  navigate(u.href);
});
window.addEventListener('pageshow',function(e){if(e.persisted&&hasG){gsap.set('#curtain',{y:0,yPercent:101});document.body.style.overflow='';if(lenis)lenis.start()}});

/* ---------- fallback when GSAP failed to load ---------- */
var hero=$('#hero'),loader=$('#loader');
if(!hasG){
  if(loader)loader.style.display='none';
  $$('.wd').forEach(function(w){w.style.opacity=1});
  $$('[data-count]').forEach(function(el){el.textContent=(el.dataset.pre||'')+(+el.dataset.count).toLocaleString()+(el.dataset.suf||'')});
  if(srows)serpFinal();
  return;
}

gsap.registerPlugin(ScrollTrigger);

/* ---------- text splitting ---------- */
function splitWords(el){var out='';el.childNodes.forEach(function(n){if(n.nodeType===3){out+=n.textContent.split(/(\s+)/).map(function(w){return /^\s+$/.test(w)||!w?w:'<span class="w"><span>'+w+'</span></span>'}).join('')}else if(n.nodeName==='BR'){out+='<br>'}else{out+=n.outerHTML}});el.innerHTML=out}
$$('[data-split]').forEach(splitWords);
var ap=$('#aboutp');if(ap)ap.innerHTML=ap.textContent.split(' ').map(function(w){return '<span class="wd">'+w+'</span> '}).join('');

/* fuel gauge (results page) */
var gt=$('#gticks');
if(gt){var gh='';for(var ga=-90;ga<=90;ga+=22.5){var gr=ga*Math.PI/180;gh+='<line x1="'+(120+Math.sin(gr)*80).toFixed(1)+'" y1="'+(120-Math.cos(gr)*80).toFixed(1)+'" x2="'+(120+Math.sin(gr)*90).toFixed(1)+'" y2="'+(120-Math.cos(gr)*90).toFixed(1)+'" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>'}gt.innerHTML=gh;
  gsap.set('#gneedle',{svgOrigin:'120 120',rotation:-90});
  if(reduce){gsap.set('#gneedle',{rotation:78});gsap.set('#garc',{strokeDashoffset:21})}
  else ScrollTrigger.create({trigger:'.gauge',start:'top 85%',once:true,onEnter:function(){gsap.to('#gneedle',{rotation:78,duration:2.6,ease:'elastic.out(1,.45)'});gsap.to('#garc',{strokeDashoffset:21,duration:2.2,ease:'power3.out'})}});
}
if(reduce&&$('#wm'))$('#wm').style.setProperty('--f','100%');
if(reduce)$$('.wd').forEach(function(w){w.style.opacity=1});

/* ---------- Lenis ---------- */
if(!reduce&&window.Lenis){lenis=new Lenis({duration:1.15,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}

/* progress + nav behaviour */
var nav=$('#nav'),lastY=0;
gsap.set('#progress',{scaleX:0});
ScrollTrigger.create({start:0,end:'max',onUpdate:function(s){gsap.set('#progress',{scaleX:s.progress});var y=s.scroll();nav.classList.toggle('solid',y>60);nav.classList.toggle('hide',y>lastY&&y>500&&!(mob&&mob.classList.contains('on')));lastY=y}});

/* cursor */
if(!reduce&&fine){
  root.classList.add('cursor-on');
  var dot=$('#cur-dot'),ring=$('#cur-ring'),rx=gsap.quickTo(ring,'x',{duration:.4,ease:'power3'}),ry=gsap.quickTo(ring,'y',{duration:.4,ease:'power3'}),dx=gsap.quickTo(dot,'x',{duration:.08}),dy=gsap.quickTo(dot,'y',{duration:.08}),lx=0,ly=0;
  window.addEventListener('mousemove',function(e){rx(e.clientX);ry(e.clientY);dx(e.clientX);dy(e.clientY);
    var ddx=e.clientX-lx,ddy=e.clientY-ly;if(ddx*ddx+ddy*ddy<500)return;lx=e.clientX;ly=e.clientY;
    var s=document.createElement('i'),z=Math.random()*5+3,col=Math.random()<.65?'#F97316':'#06B6D4';s.className='ember';s.style.cssText='width:'+z+'px;height:'+z+'px;background:'+col+';color:'+col;document.body.appendChild(s);
    gsap.fromTo(s,{x:e.clientX-z/2,y:e.clientY-z/2,opacity:.95,scale:1},{x:e.clientX-z/2+(Math.random()*26-13),y:e.clientY-z/2-(Math.random()*34+14),opacity:0,scale:0,duration:.9,ease:'power2.out',onComplete:function(){s.remove()}})});
  document.addEventListener('mouseover',function(e){var l=e.target.closest('[data-cursor-label]'),h=e.target.closest('a,button,input,select,textarea,summary');
    ring.classList.toggle('lbl',!!l);ring.classList.toggle('hov',!!h&&!l);if(l)$('span',ring).textContent=l.dataset.cursorLabel;
    gsap.to(ring,{scale:l?2.2:(h?1.5:1),duration:.3})});
}

/* magnetic buttons */
if(!reduce&&fine){$$('[data-mag]').forEach(function(b){var bx=gsap.quickTo(b,'x',{duration:.6,ease:'elastic.out(1,.4)'}),by=gsap.quickTo(b,'y',{duration:.6,ease:'elastic.out(1,.4)'});
  b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();bx((e.clientX-r.left-r.width/2)*.35);by((e.clientY-r.top-r.height/2)*.5)});
  b.addEventListener('mouseleave',function(){bx(0);by(0)})})}

/* hover distortion on blog art */
$$('.post').forEach(function(p){var im=$('img',p);if(!im)return;p.addEventListener('mouseenter',function(){if(reduce||!$('#dm'))return;im.style.filter='url(#dist)';gsap.fromTo('#dm',{attr:{scale:0}},{attr:{scale:38},duration:.5,ease:'power2.out',yoyo:true,repeat:1,onComplete:function(){im.style.filter=''}})})});

/* ---------- page transition arrival ---------- */
gsap.set('#curtain',{y:0,yPercent:101});
var introDelay=0;
if(wasPT){
  gsap.set('#curtain',{yPercent:0});root.classList.remove('pt-in');
  gsap.to('#curtain',{yPercent:-101,duration:.8,delay:.12,ease:'power3.inOut'});introDelay=.55;
}

/* ---------- hero (home) ---------- */
function initHero(){gsap.set('#h1 .w>span',{yPercent:115});gsap.set(['#pill','#hsub','#hcta','#serp'],{opacity:0,y:40})}
function intro(delay){
  var tl=gsap.timeline({defaults:{ease:'power4.out'},delay:delay||0});
  tl.to('#pill',{opacity:1,y:0,duration:.8}).to('#h1 .w>span',{yPercent:0,duration:1.2,stagger:.09},'-=.6')
    .to('#hsub',{opacity:1,y:0,duration:.9},'-=.7').to('#hcta',{opacity:1,y:0,duration:.9},'-=.7')
    .to('#serp',{opacity:1,y:0,duration:1.1,rotate:-2.5},'-=1').add(climb,'-=.4');
}
if(hero){
  var seenLoader=false;try{seenLoader=!!sessionStorage.getItem('frl')}catch(e){}
  var showLoader=loader&&!wasPT&&!seenLoader&&!reduce;
  if(reduce){if(loader)loader.style.display='none';serpFinal();['#rb','#ch1','#ch2'].forEach(function(s){gsap.set(s,{opacity:1,scale:1})})}
  else{
    initHero();
    if(showLoader){
      try{sessionStorage.setItem('frl','1')}catch(e){}
      var o={v:0},lt=gsap.timeline();
      lt.to(o,{v:100,duration:1.2,ease:'power2.inOut',onUpdate:function(){$('#pct').textContent=Math.round(o.v);$('#liqg').setAttribute('transform','translate(0 '+(64-o.v*.62).toFixed(1)+')')}})
        .to('#loader',{yPercent:-100,duration:.9,ease:'expo.inOut'},'+=.15').set('#loader',{display:'none'}).add(function(){intro(0)},'-=.55');
    }else{if(loader)loader.style.display='none';intro(introDelay+.15)}
  }
  $$('.shape').forEach(function(s){var dpt=+s.dataset.depth,qx=gsap.quickTo(s,'x',{duration:1.2,ease:'power3'}),qy=gsap.quickTo(s,'y',{duration:1.2,ease:'power3'});s._q=[qx,qy,dpt]});
  if(!reduce){
    hero.addEventListener('mousemove',function(e){var cx2=e.clientX/innerWidth-.5,cy2=e.clientY/innerHeight-.5;$$('.shape').forEach(function(s){s._q[0](cx2*s._q[2]*2);s._q[1](cy2*s._q[2]*2)})});
    gsap.to('#hero .hero-in',{yPercent:-8,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('#hero .b1',{y:180,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  }
}

/* ---------- page header (inner pages) ---------- */
var ph=$('.ph');
if(ph&&!reduce){
  var pw=$$('.w>span',ph);gsap.set(pw,{yPercent:115});gsap.set($$('.tag,.lead,.btn-row',ph),{opacity:0,y:30});
  var ptl=gsap.timeline({delay:introDelay+.15,defaults:{ease:'power4.out'}});
  ptl.to($('.tag',ph),{opacity:1,y:0,duration:.7}).to(pw,{yPercent:0,duration:1.2,stagger:.07},'-=.5').to($$('.lead,.btn-row',ph),{opacity:1,y:0,duration:.9,stagger:.1},'-=.8');
  if($('.ph-img'))gsap.from('.ph-img',{opacity:0,y:60,scale:.92,duration:1.3,delay:introDelay+.45,ease:'power3.out'});
  gsap.to($('.b1',ph),{y:140,ease:'none',scrollTrigger:{trigger:ph,start:'top top',end:'bottom top',scrub:true}});
}

/* parallax + footer wordmark */
if(!reduce){
  $$('[data-speed]').forEach(function(el){gsap.to(el,{y:+el.dataset.speed,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}})});
  if($('#wm'))gsap.fromTo('#wm',{yPercent:30,'--f':'0%'},{yPercent:-5,'--f':'100%',ease:'none',scrollTrigger:{trigger:'footer',start:'top bottom',end:'bottom bottom',scrub:true}});
}

/* marquee band reacts to scroll speed */
if($('#bandtr')){
  var btw=gsap.to('#bandtr',{xPercent:-50,duration:34,ease:'none',repeat:-1}),dirn=1,target=1;
  if(reduce)btw.pause();
  else{ScrollTrigger.create({onUpdate:function(s){var v=s.getVelocity();if(Math.abs(v)>60)dirn=v<0?-1:1;target=dirn*(1+Math.min(Math.abs(v)/300,6))}});
    gsap.ticker.add(function(){target+=(dirn-target)*.06;btw.timeScale(target)})}
}

/* ---------- scroll reveals ---------- */
if(!reduce){
  $$('[data-split]').forEach(function(h){if(h.closest('.ph'))return;var sp=$$('.w>span',h);gsap.set(sp,{yPercent:115});ScrollTrigger.create({trigger:h,start:'top 88%',once:true,onEnter:function(){gsap.to(sp,{yPercent:0,duration:1.1,stagger:.05,ease:'power4.out'})}})});
  if(ap)gsap.to('.wd',{opacity:1,stagger:.5,ease:'none',scrollTrigger:{trigger:'#aboutp',start:'top 80%',end:'bottom 45%',scrub:true}});
  gsap.utils.toArray('.stat,.tl,.res,.calc,.post,.cbox,.qa,.tbl,.cardx,.st,.nlbox').forEach(function(el){gsap.from(el,{y:60,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}})});
  if($('.case'))ScrollTrigger.batch('.case',{start:'top 92%',once:true,onEnter:function(b){gsap.from(b,{y:80,opacity:0,scale:.95,stagger:.12,duration:1,ease:'power3.out'})}});
  if(sl)gsap.from('.svc',{y:80,opacity:0,stagger:.09,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#svclist',start:'top 85%',once:true}});
  if($('.audit'))gsap.from('.audit',{scale:.94,borderRadius:'120px',duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'.audit',start:'top 92%',end:'top 40%',scrub:true}});
}
$$('[data-count]').forEach(function(el){var end=+el.dataset.count,pre=el.dataset.pre||'',suf=el.dataset.suf||'',co={v:0};
  function set(v){el.textContent=pre+Math.round(v).toLocaleString()+suf}
  if(reduce){set(end);return}
  ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:function(){gsap.to(co,{v:end,duration:2.2,ease:'power3.out',onUpdate:function(){set(co.v)}})}})});

/* ---------- horizontal process scroll ---------- */
if($('#pin')){
  ScrollTrigger.matchMedia({'(min-width: 901px)':function(){
    if(reduce)return;
    var track=$('#track'),pin=$('#pin'),bars=$$('#dots i b');
    var dist=function(){return track.scrollWidth-window.innerWidth+40};
    gsap.to(track,{x:function(){return -dist()},ease:'none',scrollTrigger:{trigger:pin,pin:true,scrub:1,start:'top top',end:function(){return '+='+dist()},invalidateOnRefresh:true,anticipatePin:1,
      onUpdate:function(s){var p=s.progress*5;bars.forEach(function(b,i){gsap.set(b,{width:Math.max(0,Math.min(1,p-i))*100+'%'})})}}});
  }});
}

window.addEventListener('load',function(){ScrollTrigger.refresh()});
})();
