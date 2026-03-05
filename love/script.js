/* ════════════════════════
   MUSIC — separate mp3 per page
════════════════════════ */
let activeBGM = null;
let pendingPageNum = null;

function playPageMusic(pageNum){
  if(activeBGM){
    activeBGM.pause();
    activeBGM.currentTime = 0;
    activeBGM = null;
  }
  const el = document.getElementById('bgm'+pageNum);
  if(!el) return;
  el.volume = 0.35;
  el.currentTime = 0;
  activeBGM = el;
  pendingPageNum = pageNum;
  const p = el.play();
  if(p && p.catch){
    p.catch(()=>{});
  }
}

// Resume pending music on ANY user interaction (covers all pages)
function resumePendingMusic(){
  if(pendingPageNum !== null){
    const el = document.getElementById('bgm'+pendingPageNum);
    if(el && el.paused){
      el.volume = 0.35;
      el.play().catch(()=>{});
    }
  }
}
document.addEventListener('click', resumePendingMusic);
document.addEventListener('touchstart', resumePendingMusic);

/* ════════════════════════
   TYPING WORD BY WORD
════════════════════════ */
function typeWords(elId, text, speed, onDone){
  const el = document.getElementById(elId);
  if(!el) return;
  el.innerHTML = '';
  // Split by spaces but preserve \n as line break tokens
  const parts = text.split(/(\n)/);
  const tokens = [];
  parts.forEach(p => {
    if(p === '\n') tokens.push('\n');
    else p.split(' ').forEach((w) => { if(w) tokens.push(w); });
  });
  let i = 0;
  let prevWasNewline = false;
  const cur = document.createElement('span');
  cur.className = 'cursor';
  el.appendChild(cur);
  const iv = setInterval(()=>{
    if(i >= tokens.length){ clearInterval(iv); cur.remove(); if(onDone) onDone(); return; }
    cur.remove();
    if(tokens[i] === '\n'){
      el.innerHTML += '<br/>';
      prevWasNewline = true;
    } else {
      el.innerHTML += (i > 0 && !prevWasNewline ? ' ' : '') + tokens[i];
      prevWasNewline = false;
    }
    el.appendChild(cur);
    i++;
  }, speed);
}

/* ════════════════════════
   PROGRESS BAR
════════════════════════ */
function runBar(id, total){
  const el = document.getElementById(id);
  if(!el) return;
  let e = 0;
  const iv = setInterval(()=>{
    e += 80;
    el.style.width = Math.min(100, e/total*100) + '%';
    if(e >= total) clearInterval(iv);
  }, 80);
}

/* ════════════════════════
   SHOW BUTTON
════════════════════════ */
function showBtn(id){
  const el = document.getElementById(id);
  if(el){ el.classList.remove('btn-hidden'); el.style.animation = 'popIn .4s cubic-bezier(.175,.885,.32,1.275) both'; }
}

/* ════════════════════════
   PAGE NAVIGATION
════════════════════════ */
function go(from, to){
  document.getElementById('p'+from).classList.replace('visible','hidden-left');
  document.getElementById('p'+to).classList.replace('hidden-right','visible');
  onEnter(to);
}

function onEnter(n){
  playPageMusic(n);

  if(n===1){
    runBar('bar1', 8000);
    typeWords('t1','Sun na, ek baat bolun… par pehle promise karo hasoge nahi 😄🤭', 110, ()=>showBtn('next1'));
  }
  if(n===2){
    buildP2FX();
    runBar('bar2', 9500);
    typeWords('t2','Teri baatein sunke mera dil muskurane lagta hai,\nTera naam aate hi har khwab sajne lagta hai.\nTu hansti hai to lagta hai mera saara jahaan chamak gaya,\nJaise andheri raat me koi saiyara achanak chamak gaya.\nTu mujhe pyaar kare ya na kare ye teri marzi hai yaar,\nPar mera dil to tujhe hi chahta hai… har pal, har baar. ❤️✨', 78, ()=>showBtn('next2'));
  }
  if(n===3){
    window.noReady=false;
    const no=document.getElementById('btn-no-el'); no.classList.remove('escaped'); no.removeAttribute('style'); hideCloud();
    setTimeout(()=>{ window.noReady=true; }, 900);
    typeWords('t3','Tujhe challenge karta hoon… tu aakhir me "pyaar karti hoon" hi bolegi.Abhi chahe kitna bhi deny kar le, par dil ka sach zyada der chhup nahi pata 😏', 100, ()=>
      typeWords('t3b','Soch ke jawab dena 😏', 90));
  }
  if(n===4){
    buildP4Day(); spawnConfetti(); runBar('bar4', 8000);
    typeWords('t4','Toh rishta pakka samjhu? 😅💍✨', 110, ()=>showBtn('next4'));
  }
  if(n===5){
    buildP5Stars(); runBar('bar5', 7000);
    typeWords('t5','Sachi bata 🫦', 100, ()=>
      typeWords('t5b','Mere liye feel kar rahi hai na? 😏Kya hua, ab itna sharma kyun rahi ho mujhse? 🤭', 80, ()=>showBtn('next5')));
  }
  if(n===6){
    buildP6Stars(); runBar('bar6', 7500);
    typeWords('t6','Ek baat batao 💌', 110, ()=>
      typeWords('t6b','Main tumhe hasil karne ka khwaab nahi dekhta…Main bas yeh chahta hoon ki tumhari har dua mein kabhi na kabhi mera naam aa jaaye. ❤️💕', 80, ()=>showBtn('next6')));
  }
  if(n===7){
    startEmojiRain(); buildBirds(); spawnConfetti();
    typeWords('t7','Chal bass karr! 😂', 115, ()=>
      typeWords('t7b','Mujhe patta tha tu next isliye dabaati rahi kyuki tujhe mujhse pyaar ho gaya hai 💕 Abb ja aur apna khayal rakh!', 75, ()=>
        typeWords('t7c','Take care, Byee Sweetheart ❤️', 100)));
  }
}

/* ════════════════════════
   PAGE 2 FX
════════════════════════ */
function buildP2FX(){
  const sw = document.getElementById('p2sparks'); sw.innerHTML='';
  for(let i=0;i<36;i++){
    const s=document.createElement('div'); s.className='sparkle';
    const sz=1.5+Math.random()*3.5;
    s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${sz}px;height:${sz}px;animation-duration:${1+Math.random()*2}s;animation-delay:${Math.random()*2}s;`;
    sw.appendChild(s);
  }
  const pw = document.getElementById('p2petals'); pw.innerHTML='';
  const petals=['🌸','🌹','🌺','💮'];
  for(let i=0;i<14;i++){
    const p=document.createElement('div'); p.className='petal';
    p.textContent=petals[Math.floor(Math.random()*petals.length)];
    p.style.left=Math.random()*100+'vw';
    p.style.animationDuration=(6+Math.random()*6)+'s';
    p.style.animationDelay=(Math.random()*5)+'s';
    p.style.fontSize=(0.8+Math.random()*0.8)+'rem';
    pw.appendChild(p);
  }
}

/* ════════════════════════
   PAGE 4 DAY
════════════════════════ */
function buildP4Day(){
  const cc=document.getElementById('p4clouds'); cc.innerHTML='';
  [[10,170,13,'16s'],[8,140,11,'21s']].forEach(([top,w,h,dur],idx)=>{
    const c=document.createElement('div'); c.className='deco-cloud';
    c.style.cssText=`top:${top+idx*30}px;width:${w}px;height:${h}px;opacity:0.72;animation-duration:${dur};animation-delay:${-idx*8}s;`;
    [[0,-9,50,50],[w*0.35,-16,60,60],[w*0.65,-10,46,46]].forEach(([l,t,pw,ph])=>{
      const p=document.createElement('div');
      p.style.cssText=`position:absolute;left:${l}px;top:${t}px;width:${pw}px;height:${ph}px;background:rgba(255,255,255,0.9);border-radius:50%;`;
      c.appendChild(p);
    });
    cc.appendChild(c);
  });
  const bb=document.getElementById('p4butterflies'); bb.innerHTML='';
  ['🦋','🌸','🌺','🦋'].forEach((e,i)=>{
    const b=document.createElement('div'); b.className='butterfly'; b.textContent=e;
    b.style.cssText=`top:${14+i*18}%;animation-duration:${12+i*3}s;animation-delay:${-i*3}s;`;
    bb.appendChild(b);
  });
  const ph=document.getElementById('p4hearts'); ph.innerHTML='';
  ['❤️','💕','💖','🌸','💓','✨','💗'].forEach(e=>{
    for(let j=0;j<3;j++){
      const h=document.createElement('div'); h.className='ph'; h.textContent=e;
      h.style.cssText=`left:${Math.random()*100}%;font-size:${0.9+Math.random()*1.1}rem;animation-duration:${5+Math.random()*5}s;animation-delay:${Math.random()*6}s;`;
      ph.appendChild(h);
    }
  });
}

/* ════════════════════════
   PAGE 5 STARS
════════════════════════ */
function buildP5Stars(){
  const sf=document.getElementById('p5starfield'); if(sf.childElementCount>2) return; sf.innerHTML='';
  for(let i=0;i<65;i++){
    const s=document.createElement('div'); s.className='star';
    const z=Math.random()*3+1;
    s.style.cssText=`width:${z}px;height:${z}px;top:${Math.random()*100}%;left:${Math.random()*100}%;animation-duration:${1+Math.random()*3}s;animation-delay:${Math.random()*3}s;`;
    sf.appendChild(s);
  }
  const fh=document.getElementById('p5floaty'); fh.innerHTML='';
  ['❤️','💕','💖','💗','🌸','✨','💝'].forEach(e=>{
    for(let j=0;j<3;j++){
      const h=document.createElement('div'); h.className='floaty-heart'; h.textContent=e;
      h.style.cssText=`left:${Math.random()*100}%;font-size:${1+Math.random()*1.1}rem;animation-duration:${5+Math.random()*5}s;animation-delay:${Math.random()*6}s;`;
      fh.appendChild(h);
    }
  });
}

/* ════════════════════════
   PAGE 6 NIGHT STARS
════════════════════════ */
function buildP6Stars(){
  const w=document.getElementById('p6stars'); if(w.childElementCount>2) return; w.innerHTML='';
  for(let i=0;i<60;i++){
    const s=document.createElement('div'); s.className='star';
    const z=Math.random()*3+1;
    s.style.cssText=`width:${z}px;height:${z}px;top:${Math.random()*100}%;left:${Math.random()*100}%;animation-duration:${1+Math.random()*3}s;animation-delay:${Math.random()*3}s;`;
    w.appendChild(s);
  }
}

/* ════════════════════════
   NO BUTTON
════════════════════════ */
const noMsgs=['Arey yess daba! 😤','Arey daba na yess! 🥺','Sachi bol — yes isliye nahi daba rahi kyuki tujhe mujhse pyaar ho jayega 😏💕','Chal chal main jaanta hoon 😂 YES DABA!','Itna shy kyun? 🙈 YESS daba! 💕'];
let cloudTimer=null;
function resetNo(){
  const no=document.getElementById('btn-no-el');
  if(no){ no.classList.remove('escaped'); no.removeAttribute('style'); }
}
function hideCloud(){ document.getElementById('cloud-wrap').classList.remove('show'); }
function showCloud(msg){
  const w=document.getElementById('cloud-wrap'), el=document.getElementById('cloud-msg');
  el.textContent=msg; w.classList.add('show');
  el.style.animation='none'; el.offsetHeight; el.style.animation='popIn .3s cubic-bezier(.175,.885,.32,1.275) both';
  clearTimeout(cloudTimer); cloudTimer=setTimeout(hideCloud,3200);
}
function runNo(e){
  if(e){ e.preventDefault(); e.stopPropagation(); }
  const no=document.getElementById('btn-no-el');
  const bw=no.offsetWidth; const bh=no.offsetHeight;
  const margin=16;
  const zone=Math.floor(Math.random()*4);
  let nx,ny;
  if(zone===0){      nx=margin+Math.random()*(window.innerWidth-bw-margin*2);  ny=margin+Math.random()*(window.innerHeight*0.25);}
  else if(zone===1){ nx=margin+Math.random()*(window.innerWidth-bw-margin*2);  ny=window.innerHeight*0.68+Math.random()*(window.innerHeight*0.25);}
  else if(zone===2){ nx=margin+Math.random()*(window.innerWidth*0.2);           ny=margin+Math.random()*(window.innerHeight-bh-margin*2);}
  else {             nx=window.innerWidth*0.68+Math.random()*(window.innerWidth*0.28); ny=margin+Math.random()*(window.innerHeight-bh-margin*2);}
  nx=Math.max(margin,Math.min(nx,window.innerWidth-bw-margin));
  ny=Math.max(margin,Math.min(ny,window.innerHeight-bh-margin));
  no.style.cssText=`position:fixed;left:${nx}px;top:${ny}px;width:${bw}px;height:${bh}px;z-index:9999;`;
  showCloud(noMsgs[Math.floor(Math.random()*noMsgs.length)]);
}

/* ════════════════════════
   EMOJI RAIN
════════════════════════ */
function startEmojiRain(){
  const wrap=document.getElementById('emojiRain');
  ['❤️','💕','💖','💗','💓','💝','😊','💌','🌸','✨','💘','😍','🌺','🌼'].forEach(e=>{
    for(let i=0;i<3;i++){
      const el=document.createElement('div'); el.className='rdrop'; el.textContent=e;
      el.style.left=Math.random()*100+'vw';
      el.style.fontSize=(1.2+Math.random()*1.4)+'rem';
      el.style.animationDuration=(3+Math.random()*5)+'s';
      el.style.animationDelay=(Math.random()*4)+'s';
      wrap.appendChild(el);
    }
  });
}

/* ════════════════════════
   BIRDS
════════════════════════ */
function buildBirds(){
  const wrap=document.getElementById('p7birds'); wrap.innerHTML='';
  ['🐦','🦜','🐦'].forEach((e,i)=>{
    const b=document.createElement('div'); b.className='bird'; b.textContent=e;
    b.style.cssText=`top:${8+i*11}%;animation-duration:${10+i*3}s;animation-delay:${-i*4}s;`;
    wrap.appendChild(b);
  });
}

/* ════════════════════════
   CONFETTI
════════════════════════ */
function spawnConfetti(){
  const wrap=document.getElementById('confWrap');
  const colors=['#ff6b9d','#ffe066','#e91e63','#c2185b','#ff80ab','#fff','#ffb6c1'];
  for(let i=0;i<80;i++){
    setTimeout(()=>{
      const el=document.createElement('div'); el.className='cp';
      el.style.left=Math.random()*100+'vw';
      el.style.background=colors[Math.floor(Math.random()*colors.length)];
      el.style.animationDuration=(1.5+Math.random()*2.5)+'s';
      el.style.animationDelay=Math.random()*0.8+'s';
      el.style.transform=`rotate(${Math.random()*360}deg)`;
      wrap.appendChild(el); setTimeout(()=>el.remove(),4500);
    },i*18);
  }
}

/* ════════════════════════
   HEARTS BG
════════════════════════ */
function buildHearts(){
  const wrap=document.getElementById('hbg');
  ['❤️','💕','💗','💓','💝','🌸','✨','💖'].forEach(e=>{
    for(let j=0;j<2;j++){
      const el=document.createElement('div'); el.className='hrt'; el.textContent=e;
      el.style.left=Math.random()*100+'vw';
      el.style.fontSize=(0.8+Math.random()*1.2)+'rem';
      el.style.animationDuration=(6+Math.random()*8)+'s';
      el.style.animationDelay=(Math.random()*8)+'s';
      wrap.appendChild(el);
    }
  });
}

/* ════════════════════════
   INIT
════════════════════════ */
function startApp(){
  const overlay = document.getElementById('tap-overlay');
  overlay.classList.add('gone');
  setTimeout(()=>{ overlay.style.display='none'; }, 500);
  buildHearts();
  setTimeout(()=>onEnter(1), 200);
}

window.onload=()=>{
  buildHearts();
};
