/* ============================================================================
   SCRUPLES — App logic (vanilla, zero-dependency)
   ============================================================================ */
(function () {
  const D = window.SCRUPLES;
  const $ = (s, r=document) => r.querySelector(s);
  const el = (s) => document.getElementById(s);

  /* ---------- Icon set ---------- */
  const ICON = {
    grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>',
    plug:'<path d="M9 2v6m6-6v6M5 8h14v3a7 7 0 0 1-14 0zM12 18v4"/>',
    alert:'<path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    sparkle:'<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
  };
  const ic = (n, cls='ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[n]||''}</svg>`;
  const platDot = (k) => { const p=D.platforms[k]; return `<span class="plat" style="background:${p.color}" title="${p.label}">${p.short}</span>`; };
  const fmt = (n)=> n.toLocaleString('en-US');

  /* ---------- Toasts ---------- */
  function toast(title, desc, icon='check'){
    const t=document.createElement('div'); t.className='toast';
    t.innerHTML=`<div class="toast__ico">${ic(icon)}</div><div><div class="toast__t">${title}</div><div class="toast__d">${desc}</div></div>`;
    el('toasts').appendChild(t);
    setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),350)},3600);
  }

  /* ---------- Charts ---------- */
  function areaChart(data){
    const w=560,h=200,pad=10; const max=Math.max(...data)*1.12;
    const step=(w-pad*2)/(data.length-1);
    const pts=data.map((v,i)=>[pad+i*step, h-pad-(v/max)*(h-pad*2)]);
    const line=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
    const area=`M${pad} ${h-pad} `+pts.map(p=>'L'+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ')+` L${w-pad} ${h-pad} Z`;
    return `<svg class="chart-area" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <defs><linearGradient id="grad-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--gold)" stop-opacity=".34"/><stop offset="100%" stop-color="var(--gold)" stop-opacity="0"/>
      </linearGradient></defs>
      <path class="area" d="${area}"/><path class="line" d="${line}"/></svg>`;
  }
  function barChart(data){
    const max=Math.max(...data.map(d=>d.v));
    return `<div class="bars">${data.map(d=>`<div class="bar" style="height:0" data-h="${(d.v/max*100).toFixed(0)}"><span>${d.h}</span></div>`).join('')}</div>`;
  }
  function donut(parts){ // parts: [{label,val,color}]
    const total=parts.reduce((s,p)=>s+p.val,0); const r=52,c=2*Math.PI*r; let off=0;
    const segs=parts.map(p=>{const frac=p.val/total;const dash=frac*c;const s=`<circle r="${r}" cx="70" cy="70" fill="none" stroke="${p.color}" stroke-width="20" stroke-dasharray="${dash} ${c-dash}" stroke-dashoffset="${-off}" transform="rotate(-90 70 70)"/>`;off+=dash;return s;}).join('');
    return `<div class="donut-wrap"><svg width="140" height="140" viewBox="0 0 140 140">${segs}
      <text x="70" y="66" text-anchor="middle" font-family="var(--serif)" font-size="22" font-weight="600" fill="var(--text)">94%</text>
      <text x="70" y="86" text-anchor="middle" font-size="10" fill="var(--muted)">auto</text></svg>
      <div class="legend">${parts.map(p=>`<div><i style="background:${p.color}"></i>${p.label} · <b>${p.val}%</b></div>`).join('')}</div></div>`;
  }

  /* ---------- Count-up ---------- */
  function countUp(node, target, prefix='', suffix=''){
    const dur=1100, t0=performance.now();
    function tick(t){ const p=Math.min(1,(t-t0)/dur); const e=1-Math.pow(1-p,3);
      const val=Math.round(target*e); node.textContent=prefix+fmt(val)+suffix; if(p<1)requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }
  function animateNumbers(scope){
    scope.querySelectorAll('[data-count]').forEach(n=>countUp(n,+n.dataset.count,n.dataset.prefix||'',n.dataset.suffix||''));
    scope.querySelectorAll('.bar').forEach((b,i)=>setTimeout(()=>b.style.height=b.dataset.h+'%',80+i*45));
  }

  /* ---------- VIEWS ---------- */
  const sysbar=(icon,title,sub,live)=>`<div class="sysbar"><div class="sysbar__ico">${ic(icon)}</div>
    <div><h3>${title}</h3><p>${sub}</p></div>${live?`<span class="live"><span class="dot"></span>${live}</span>`:''}</div>`;
  const statRow=(stats)=>`<div class="statrow">${stats.map(s=>`<div class="card stat"><div class="stat__v">${s.value}</div><div class="stat__l">${s.label}</div><div class="stat__s">${s.sub}</div></div>`).join('')}</div>`;

  const VIEWS = {
    overview(){
      const k=D.kpis.map(x=>`<div class="card kpi"><div class="kpi__label">${x.label}</div>
        <div class="kpi__val mono" data-count="${x.value}" data-prefix="${x.prefix}" data-suffix="${x.suffix}">${x.prefix}0${x.suffix}</div>
        <div class="kpi__sub">${x.sub}</div><span class="kpi__delta up">${x.delta}</span></div>`).join('');
      const feed=D.activity.map(a=>`<div class="feed__item"><div class="feed__ico">${ic(a.icon)}</div>
        <div><div class="feed__txt">${a.text}</div><div class="feed__meta"><span class="tag">${a.system}</span>${a.t}</div></div></div>`).join('');
      return `
      <div class="view">
        <div class="view__head"><div><h2>Good afternoon, Scruples ✨</h2><p class="lede">Here's what your AI handled while you ran the spa. Everything below is live demo data.</p></div>
        <button class="btn btn-gold" id="simCall">${ic('phone')} Simulate an incoming call</button></div>
        <div class="grid g-kpi" id="kpis">${k}</div>
        <div class="grid g-2 section-gap">
          <div class="card"><div class="card__title"><h3>Booked appointment value</h3><span class="meta">last 14 days · demo</span></div>
            <div class="card-pad">${areaChart(D.revenueTrend)}</div></div>
          <div class="card"><div class="card__title"><h3>Comments handled</h3><span class="meta">this month</span></div>
            <div class="card-pad">${donut([{label:'Auto-replied',val:94,color:'var(--forest)'},{label:'To your team',val:6,color:'var(--gold)'}])}</div></div>
        </div>
        <div class="grid g-2 section-gap">
          <div class="card"><div class="card__title"><h3>What your AI did today</h3><span class="meta">live feed</span></div>
            <div class="card-pad"><div class="feed">${feed}</div></div></div>
          <div class="card"><div class="card__title"><h3>Calls by hour</h3><span class="meta">today</span></div>
            <div class="card-pad">${barChart(D.callsByHour)}<div style="height:14px"></div></div></div>
        </div>
      </div>`;
    },

    voice(){
      const calls=D.voice.recent.map(c=>{const sp=c.sentiment==='positive'?'pos':c.sentiment==='negative'?'neg':'neu';
        return `<tr><td><b>${c.caller}</b></td><td>${c.intent}</td><td>${c.outcome}</td><td class="mono">${c.dur}</td>
        <td><span class="pill pill--${sp}">${c.sentiment}</span></td><td class="mono muted">${c.booking}</td><td class="mono muted">${c.time}</td></tr>`}).join('');
      const bookings=D.voice.todayBookings.map(b=>`<tr><td class="mono"><b>${b.time}</b></td><td>${b.service}</td><td>${b.staff}</td><td>${b.client}</td>
        <td><span class="pill ${b.source==='AI'?'pill--gold':'pill--neu'}">${b.source}</span></td></tr>`).join('');
      const lcPill={booking:'gold',active:'pos',ringing:'neu',transfer:'info',voicemail:'neu'};
      const liveFleet=(D.voice.liveCalls||[]).map(c=>{
        const lbl=c.status.charAt(0).toUpperCase()+c.status.slice(1);
        const num=(c.id||'').split('-')[1]||'';
        return `<div class="live-call live-call--${c.status}">
          <div class="live-call__row"><span class="dot"></span><span class="live-call__name">${c.name}</span><span class="pill pill--${lcPill[c.status]||'neu'}">${lbl}</span></div>
          <div class="live-call__caller mono small muted">${c.caller}</div>
          <div class="live-call__svc"><b>${c.service}</b> · ${c.stylist}</div>
          <div class="live-call__snippet small">${c.snippet}</div>
          <div class="live-call__foot small muted"><span>⏱ ${c.elapsed}</span><span>AI instance #${num}</span></div>
        </div>`;}).join('');
      return `<div class="view">
        ${sysbar('phone','AI Voice Receptionist','Picks up every call in parallel — never busy, never on hold. Books into Phorest, transfers to your front desk.','8 calls live now')}
        ${statRow(D.voice.stats)}
        <div class="card section-gap"><div class="card__title"><h3>Live calls right now</h3><span class="meta">${(D.voice.liveCalls||[]).length} concurrent · every line answered in parallel</span></div>
          <div class="card-pad"><div class="live-grid">${liveFleet}</div></div></div>
        <div class="grid g-2">
          <div class="card"><div class="card__title"><h3>Recent calls</h3><span class="meta">auto-logged with transcript</span></div>
            <div class="card-pad" style="overflow:auto"><table class="table"><thead><tr><th>Caller</th><th>Intent</th><th>Outcome</th><th>Length</th><th>Sentiment</th><th>Booking</th><th>Time</th></tr></thead><tbody>${calls}</tbody></table></div></div>
          <div class="card"><div class="card__title"><h3>Test the receptionist</h3></div>
            <div class="card-pad"><p class="small muted" style="margin-bottom:14px">See a real call play out — the AI answers, books into Phorest, and logs it.</p>
            <button class="btn btn-primary" id="simCall2" style="width:100%;justify-content:center">${ic('phone')} Simulate an incoming call</button>
            <div style="height:18px"></div><div class="small" style="font-weight:600;margin-bottom:8px">Built-in guardrails</div>
            ${D.voice.guardrails.map(g=>`<div class="feed__item" style="padding:9px 0"><div class="feed__ico" style="background:color-mix(in srgb,var(--pos) 14%,transparent);color:var(--pos)">${ic('check','ico')}</div><div class="feed__txt">${g}</div></div>`).join('')}
            </div></div>
        </div>
        <div class="card section-gap"><div class="card__title"><h3>Today's bookings</h3><span class="meta">into Phorest</span></div>
          <div class="card-pad"><table class="table"><thead><tr><th>Time</th><th>Service</th><th>With</th><th>Client</th><th>Source</th></tr></thead><tbody>${bookings}</tbody></table></div></div>
      </div>`;
    },

    social(){
      const q=D.social.approvalQueue.map(p=>`<div class="card qcard">
        <div class="qcard__thumb ${p.thumb}">${ic('calendar')}&nbsp; ${p.title}</div>
        <div class="platforms">${p.platforms.map(platDot).join('')}</div>
        <div class="qcard__cap">${p.caption}</div>
        ${p.note?`<div class="qcard__note">${ic('alert','ico')} ${p.note}</div>`:''}
        <div class="qcard__actions"><button class="btn btn-primary btn-sm approve">${ic('check')} Approve</button><button class="btn btn-ghost btn-sm">Edit</button></div></div>`).join('');
      const sched=D.social.scheduled.map(s=>`<tr><td class="mono"><b>${s.when}</b></td><td>${s.title}</td>
        <td><div class="platforms">${s.platforms.map(platDot).join('')}</div></td><td><span class="pill pill--info">${s.status}</span></td></tr>`).join('');
      return `<div class="view">
        ${sysbar('calendar','Social Scheduler','One video becomes posts on Instagram, Facebook, TikTok & YouTube — captioned and scheduled.','Connected via Publer')}
        ${statRow(D.social.stats)}
        <div class="card" style="margin-bottom:18px"><div class="card-pad" style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
          <div style="flex:1;min-width:220px"><div style="font-family:var(--serif);font-size:18px;font-weight:600">Drop a finished video</div>
          <div class="small muted">We transcribe it, write a caption per platform in your brand voice, and queue it for your approval.</div></div>
          <button class="btn btn-gold">${ic('sparkle')} Upload video</button></div></div>
        <div class="row-between" style="margin-bottom:12px"><h3 style="font-size:18px">Awaiting your approval</h3><span class="pill pill--gold">3 in queue</span></div>
        <div class="grid g-3">${q}</div>
        <div class="card section-gap"><div class="card__title"><h3>Scheduled posts</h3><span class="meta">nothing publishes without a yes</span></div>
          <div class="card-pad"><table class="table"><thead><tr><th>When</th><th>Post</th><th>Platforms</th><th>Status</th></tr></thead><tbody>${sched}</tbody></table></div></div>
      </div>`;
    },

    comments(){
      const feed=D.comments.feed.map(c=>{const cls=c.status==='human'?'human':c.status==='draft'?'draft':'';
        const badge=c.status==='auto'?'<span class="pill pill--pos">Auto-replied</span>':c.status==='draft'?'<span class="pill pill--gold">Draft · 1 tap</span>':'<span class="pill pill--neg">Sent to your team</span>';
        return `<div class="comment"><div class="comment__top">${platDot(c.platform)}<span class="comment__user">${c.user}</span>${badge}</div>
        <div class="comment__txt">${c.text}</div><div class="comment__reply ${cls}">${c.reply}</div></div>`}).join('');
      return `<div class="view">
        ${sysbar('chat','Comment Reply AI','Reads every comment, answers from your knowledge base, and routes anything sensitive to your team.','Watching 4 platforms')}
        ${statRow(D.comments.stats)}
        <div class="chiprow" style="margin-bottom:14px"><span class="chip on">All</span>${Object.keys(D.platforms).map(k=>`<span class="chip">${D.platforms[k].label}</span>`).join('')}</div>
        <div class="card"><div class="card__title"><h3>Comment activity</h3><span class="meta">complaints & health questions never auto-reply</span></div>
          <div class="feed" style="padding:4px 0">${feed}</div></div>
      </div>`;
    },

    knowledge(){
      const docs=D.knowledge.docs.map(d=>`<tr><td><b>${d.name}</b></td><td><span class="pill pill--neu">${d.type}</span></td>
        <td class="muted">${d.updated}</td><td class="mono muted">${d.chunks} chunks</td><td><span class="pill pill--pos">${ic('check','ico')} synced</span></td>
        <td><button class="btn btn-ghost btn-sm">Edit</button></td></tr>`).join('');
      const faqs=D.knowledge.faqs.map(f=>`<div class="feed__item"><div class="feed__ico">${ic('book')}</div>
        <div><div class="feed__txt"><b>${f.q}</b></div><div class="feed__meta" style="color:var(--muted)">${f.a}</div></div></div>`).join('');
      return `<div class="view">
        ${sysbar('book','Shared Knowledge Base','The one brain behind every system.','In sync')}
        <div class="card" style="margin-bottom:18px"><div class="card-pad" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <div style="flex:1;min-width:240px"><div style="font-family:var(--serif);font-size:17px">Ask your knowledge base</div>
          <div class="small muted">${D.knowledge.blurb}</div></div>
          <div class="search" style="max-width:340px"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="kbAsk" placeholder="e.g. Do you do gel removal?"></div></div>
          <div id="kbAnswer" class="card-pad hide" style="border-top:1px solid var(--line)"></div></div>
        <div class="grid g-2">
          <div class="card"><div class="card__title"><h3>Documents</h3><button class="btn btn-gold btn-sm">${ic('sparkle')} Add document</button></div>
            <div class="card-pad" style="overflow:auto"><table class="table"><thead><tr><th>Document</th><th>Type</th><th>Updated</th><th>Indexed</th><th>Status</th><th></th></tr></thead><tbody>${docs}</tbody></table></div></div>
          <div class="card"><div class="card__title"><h3>Top FAQs</h3><span class="meta">seeds both agents</span></div>
            <div class="card-pad"><div class="feed">${faqs}</div></div></div>
        </div>
      </div>`;
    },

    integrations(){
      const groups={};D.integrations.forEach(i=>{(groups[i.group]=groups[i.group]||[]).push(i)});
      const card=(i)=>{ const initials=i.name.split('—')[0].trim().slice(0,2).toUpperCase();
        const st=i.status==='connected'?`<span class="pill pill--pos">${ic('check','ico')} Connected</span>`
              :i.status==='draft'?`<span class="pill pill--gold">Draft mode</span>`
              :`<span class="pill pill--neu">Not connected</span>`;
        const btn=i.status==='connect'?`<button class="btn btn-primary btn-sm connect" data-name="${i.name}">Connect</button>`
              :i.status==='draft'?`<button class="btn btn-ghost btn-sm connect" data-name="${i.name}">Set up</button>`
              :`<button class="btn btn-ghost btn-sm">Manage</button>`;
        return `<div class="card intg"><div class="intg__ico">${initials}</div><div class="intg__body">
          <div class="intg__name">${i.name}</div><div class="intg__desc">${i.desc}</div>
          <div class="intg__foot">${st}${btn}</div></div></div>`; };
      const sections=Object.keys(groups).map(g=>`<div class="row-between section-gap" style="margin-bottom:10px"><h3 style="font-size:17px">${g}</h3></div>
        <div class="grid g-2">${groups[g].map(card).join('')}</div>`).join('');
      return `<div class="view">
        <div class="view__head"><div><h2>Integrations</h2><p class="lede">Connect your tools and the systems light up. The core is wired for this demo — plug in voice and social when you're ready.</p></div></div>
        ${sections}
      </div>`;
    },
  };

  /* ---------- Live call modal ---------- */
  function runLiveCall(){
    const lc=D.voice.liveCall;
    const m=document.createElement('div'); m.className='modal-bg';
    m.innerHTML=`<div class="modal"><div class="modal__head"><div class="ring">${ic('phone')}</div>
      <div><div style="font-weight:600">Incoming call</div><div class="small" style="color:rgba(255,255,255,.7)">${lc.caller} · Scruples AI answering</div></div>
      <span class="live" style="margin-left:auto"><span class="dot"></span>Live</span></div>
      <div class="modal__body" id="callBody"></div>
      <div class="modal__foot"><button class="btn btn-ghost btn-sm" id="closeCall">Close</button></div></div>`;
    el('modalMount').appendChild(m);
    const body=$('#callBody',m); let i=0;
    (function next(){ if(i>=lc.lines.length){
        toast('Appointment booked','Gel manicure + removal, Thursday 1:00pm · logged to Phorest','calendar'); return; }
      const ln=lc.lines[i++]; const b=document.createElement('div');
      b.className='bubble '+(ln.who==='ai'?'bubble--ai':'bubble--cust'); b.textContent=ln.text;
      body.appendChild(b); body.scrollTop=body.scrollHeight; setTimeout(next, ln.who==='ai'?1400:1000);
    })();
    m.addEventListener('click',e=>{if(e.target===m||e.target.id==='closeCall')m.remove()});
  }

  /* ---------- Router ---------- */
  function go(id){
    const item=D.nav.find(n=>n.id===id)||D.nav[0];
    document.querySelectorAll('.nav__item').forEach(n=>n.classList.toggle('active',n.dataset.id===id));
    el('pageTitle').textContent=item.label;
    el('pageSub').textContent = id==='overview'? D.brand.location : item.label+' · '+D.brand.full;
    const view=el('view'); view.innerHTML=VIEWS[id]();
    animateNumbers(view);
    // wire per-view interactions
    const sim=$('#simCall',view)||$('#simCall2',view);
    view.querySelectorAll('#simCall,#simCall2').forEach(b=>b.addEventListener('click',runLiveCall));
    view.querySelectorAll('.approve').forEach(b=>b.addEventListener('click',e=>{toast('Post approved','Scheduled to publish via Publer','check');e.target.closest('.qcard').style.opacity=.5;}));
    view.querySelectorAll('.connect').forEach(b=>b.addEventListener('click',()=>toast('Ready to connect',b.dataset.name+' — opens the secure setup','plug')));
    const kbAsk=$('#kbAsk',view); if(kbAsk){kbAsk.addEventListener('keydown',e=>{if(e.key==='Enter'){const a=el('kbAnswer');
      a.classList.remove('hide'); a.innerHTML=`<div class="small" style="font-weight:600;color:var(--gold-deep);margin-bottom:6px">Answer (from your documents)</div>
      <div class="comment__reply">${(D.knowledge.faqs.find(f=>kbAsk.value.toLowerCase().split(' ').some(w=>w.length>3&&f.q.toLowerCase().includes(w)))||D.knowledge.faqs[0]).a}</div>`;}});}
  }

  /* ---------- Boot ---------- */
  function buildNav(){
    el('nav').innerHTML=D.nav.map(n=>`<a class="nav__item" data-id="${n.id}">${ic(n.icon)}<span>${n.label}</span></a>`).join('');
    document.querySelectorAll('.nav__item').forEach(n=>n.addEventListener('click',()=>go(n.dataset.id)));
  }
  function enterApp(){
    el('login').classList.add('hide'); el('app').classList.remove('hide');
    el('avatar').textContent=D.auth.user.initials;
    buildNav(); go('overview');
    setTimeout(()=>toast('Welcome to Scruples','Your AI handled 1,184 calls this month','sparkle'),700);
  }
  // login handlers
  el('loginForm').addEventListener('submit',e=>{e.preventDefault();
    if(D.auth.accept(el('email').value,el('pass').value)) enterApp();
    else { el('pass').style.borderColor='var(--neg)'; toast('Try the demo login','password: demo','alert'); }
  });
  el('demoBtn').addEventListener('click',enterApp);
  // theme
  el('themeBtn').addEventListener('click',()=>{const r=document.documentElement;
    r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';});

  // brand title
  document.title='Scruples — '+D.brand.tagline;
})();
