/* ============================================================================
   SCRUPLES — Demo data
   All data here is illustrative demo content for the sales demo. No live feeds.
   Grounded in the Scruples Spa implementation guide (3 systems + shared brain).
   ============================================================================ */
window.SCRUPLES = (function () {
  // ---- Brand -------------------------------------------------------------
  const brand = {
    name: "Scruples",
    full: "Scruples Spa",
    tagline: "Always on. Never misses a client.",
    location: "Scruples Spa — Main Street",
    poweredBy: "Powered by ApexRun AI",
  };

  // ---- Demo login --------------------------------------------------------
  const auth = {
    hintEmail: "owner@scruplesspa.com",
    hintPass: "demo",
    // any non-empty email + the password "demo" works (or the "Enter demo" button)
    accept: (email, pass) => !!email && (pass === "demo" || pass === ""),
    user: { name: "Demo Owner", role: "Owner", initials: "SO" },
  };

  // ---- Headline KPIs (this month, illustrative) --------------------------
  const kpis = [
    { id: "calls",   label: "Calls answered",        value: 1184, prefix: "",  suffix: "",   delta: "+18%", good: true,  sub: "100% answer rate, 24/7" },
    { id: "booked",  label: "Appointments booked",   value: 312,  prefix: "",  suffix: "",   delta: "+27%", good: true,  sub: "by the voice receptionist" },
    { id: "revenue", label: "Booked appt. value",    value: 61400,prefix: "$", suffix: "",   delta: "+22%", good: true,  sub: "into Phorest this month" },
    { id: "saved",   label: "After-hours saves",     value: 96,   prefix: "",  suffix: "",   delta: "+41%", good: true,  sub: "$18,900 would have been missed" },
    { id: "posts",   label: "Posts scheduled",       value: 84,   prefix: "",  suffix: "",   delta: "+12%", good: true,  sub: "across 4 platforms" },
    { id: "comments",label: "Comments handled",      value: 2143, prefix: "",  suffix: "",   delta: "+33%", good: true,  sub: "94% auto, 6% to your team" },
  ];

  // 14-day booked-value trend (for the area chart)
  const revenueTrend = [3100,2800,3600,4200,3900,5100,4700,5400,4900,6100,5800,6400,6900,7200];
  // calls per hour today (bar chart)
  const callsByHour = [
    {h:"8a",v:9},{h:"9a",v:22},{h:"10a",v:31},{h:"11a",v:28},{h:"12p",v:24},
    {h:"1p",v:19},{h:"2p",v:26},{h:"3p",v:33},{h:"4p",v:29},{h:"5p",v:21},
    {h:"6p",v:14},{h:"7p",v:8}
  ];

  // ---- "What the AI did today" activity feed -----------------------------
  const activity = [
    { t:"2 min ago",  icon:"phone", system:"Voice", text:"Booked <b>Signature Facial</b> for a returning client, Fri 2:00pm with Maria." },
    { t:"9 min ago",  icon:"chat",  system:"Comments", text:"Replied to an Instagram comment about <b>gel removal</b> pricing policy." },
    { t:"14 min ago", icon:"phone", system:"Voice", text:"After-hours caller booked <b>Hot Stone Massage</b>, Sat 11:30am." },
    { t:"22 min ago", icon:"calendar", system:"Social", text:"Scheduled a Reel to Instagram, Facebook & YouTube for 6:00pm." },
    { t:"31 min ago", icon:"alert", system:"Comments", text:"Flagged a <b>complaint</b> to your team — not auto-replied." },
    { t:"48 min ago", icon:"phone", system:"Voice", text:"Warm-transferred a refund question to Front Desk (Maria)." },
    { t:"1 hr ago",   icon:"book",  system:"Knowledge", text:"Knowledge base updated: new <b>holiday hours</b> picked up by both agents." },
    { t:"1 hr ago",   icon:"chat",  system:"Comments", text:"Sent a private DM with the booking link to a Facebook commenter." },
  ];

  // ---- SYSTEM 1: Voice Receptionist --------------------------------------
  const voice = {
    stats: [
      { label:"Answer rate",        value:"100%",  sub:"vs ~78% before" },
      { label:"Avg. handle time",   value:"2m 41s",sub:"per call" },
      { label:"Booked by AI",       value:"312",   sub:"this month" },
      { label:"Transferred to team",value:"73",    sub:"warm transfers" },
    ],
    // a simulated incoming call used for the "live" wow moment
    liveCall: {
      caller:"+1 (416) 555‑0148", name:"New caller",
      lines:[
        {who:"ai",  text:"Thank you for calling Scruples Spa, this is the front desk. This call may be recorded. How can I help you today?"},
        {who:"cust",text:"Hi, do you do gel removal, and could I book a manicure for Thursday?"},
        {who:"ai",  text:"We do offer gel removal. I can book you a gel manicure with removal on Thursday. We have 10:30am, 1:00pm, or 4:15pm open. Which works best?"},
        {who:"cust",text:"1 o'clock is perfect."},
        {who:"ai",  text:"Booked — Thursday at 1:00pm for a gel manicure with removal. Can I send a text confirmation to this number?"},
      ]
    },
    recent: [
      { caller:"Returning client", intent:"Booking", outcome:"Booked — Signature Facial", dur:"3m 12s", time:"2:58pm", sentiment:"positive", booking:"ZN‑48213" },
      { caller:"+1 (905) 555‑0192", intent:"Question", outcome:"Answered — hours & parking", dur:"1m 04s", time:"2:41pm", sentiment:"neutral", booking:"—" },
      { caller:"After-hours", intent:"Booking", outcome:"Booked — Hot Stone Massage", dur:"2m 49s", time:"9:12pm", sentiment:"positive", booking:"ZN‑48207" },
      { caller:"VIP — Mrs. Laurent", intent:"Reschedule", outcome:"Transferred to Maria", dur:"0m 52s", time:"1:33pm", sentiment:"neutral", booking:"—" },
      { caller:"+1 (647) 555‑0110", intent:"Complaint", outcome:"Flagged + transferred", dur:"1m 28s", time:"12:50pm", sentiment:"negative", booking:"—" },
      { caller:"+1 (416) 555‑0177", intent:"Booking", outcome:"Booked — HydraFacial", dur:"3m 41s", time:"11:20am", sentiment:"positive", booking:"ZN‑48190" },
    ],
    todayBookings: [
      { time:"10:30am", service:"HydraFacial", staff:"Maria", client:"R. Chen", source:"AI" },
      { time:"12:00pm", service:"Deep Tissue Massage", staff:"Sofia", client:"J. Patel", source:"AI" },
      { time:"1:00pm",  service:"Gel Manicure + Removal", staff:"Maria", client:"New caller", source:"AI" },
      { time:"2:00pm",  service:"Signature Facial", staff:"Maria", client:"Returning", source:"AI" },
      { time:"4:15pm",  service:"Lash Lift", staff:"Sofia", client:"A. Romano", source:"Front desk" },
    ],
    guardrails: ["Never quotes a price out loud","Never gives skin or medical advice","Only creates bookings, never cancels","Always discloses recording"],
  };

  // ---- SYSTEM 2: Social Scheduler ----------------------------------------
  const platforms = {
    instagram:{ label:"Instagram", short:"IG", color:"#E1306C" },
    facebook:{ label:"Facebook", short:"FB", color:"#1877F2" },
    tiktok:{ label:"TikTok", short:"TT", color:"#111111" },
    youtube:{ label:"YouTube", short:"YT", color:"#FF0000" },
  };
  const social = {
    stats:[
      { label:"Scheduled", value:"84", sub:"this month" },
      { label:"Awaiting approval", value:"3", sub:"in your queue" },
      { label:"Avg. engagement", value:"+38%", sub:"vs last month" },
      { label:"Platforms", value:"4", sub:"IG · FB · TikTok · YT" },
    ],
    approvalQueue:[
      { id:"a1", title:"Reel — HydraFacial glow", platforms:["instagram","facebook","youtube","tiktok"],
        caption:"That post‑HydraFacial glow ✨ Book your reset at Scruples. Link in bio.",
        note:"TikTok will post in draft‑and‑approve mode (one tap).", thumb:"facial" },
      { id:"a2", title:"Behind the scenes — hot stone", platforms:["instagram","facebook"],
        caption:"Melt into the week. Hot stone massage, now booking. ☎️ Call or DM us.", note:"", thumb:"massage" },
      { id:"a3", title:"Client favourite — gel mani", platforms:["instagram","tiktok"],
        caption:"Gel that lasts. Manicure + removal in one visit. Comment BOOK and we'll DM you.", note:"TikTok draft‑and‑approve.", thumb:"nails" },
    ],
    scheduled:[
      { when:"Today 6:00pm", title:"Reel — Signature Facial", platforms:["instagram","facebook","youtube"], status:"scheduled" },
      { when:"Tomorrow 9:00am", title:"Tip — aftercare for lashes", platforms:["instagram","tiktok"], status:"scheduled" },
      { when:"Tomorrow 5:30pm", title:"Promo — midweek massage", platforms:["facebook","youtube"], status:"scheduled" },
      { when:"Thu 11:00am", title:"Reel — the Scruples experience", platforms:["instagram","facebook","tiktok","youtube"], status:"scheduled" },
    ],
  };

  // ---- SYSTEM 3: Comment Reply AI ----------------------------------------
  const comments = {
    stats:[
      { label:"Handled", value:"2,143", sub:"this month" },
      { label:"Auto-replied", value:"94%", sub:"safe + confident" },
      { label:"To your team", value:"6%", sub:"sensitive / unsure" },
      { label:"Avg. reply time", value:"38s", sub:"around the clock" },
    ],
    feed:[
      { platform:"instagram", user:"@bella.m", text:"How much is the HydraFacial?", reply:"Great question! Pricing is best confirmed by our team — I've sent you a DM with the booking link so you can pick a time. 💆", status:"auto", sentiment:"neutral" },
      { platform:"facebook", user:"Dana R.", text:"Do you do gel removal or just application?", reply:"We do both — gel removal can be added to any manicure. Want me to DM you the booking link?", status:"auto", sentiment:"positive" },
      { platform:"youtube", user:"@wellnessjo", text:"What time do you close on Saturdays?", reply:"We're open Saturdays 9am–6pm. Hope to see you! ✨", status:"auto", sentiment:"neutral" },
      { platform:"tiktok", user:"@kayla", text:"omg need this, how do I book??", reply:"[Draft ready — one tap to post] Comment BOOK or tap the link in our bio and we'll get you in! 💕", status:"draft", sentiment:"positive" },
      { platform:"instagram", user:"@m.torres", text:"My last facial left my skin red, not happy.", reply:"— routed to your team (complaint, not auto-replied) —", status:"human", sentiment:"negative" },
      { platform:"facebook", user:"Priya S.", text:"Is the massage safe during pregnancy?", reply:"— routed to your team (health question, not auto-replied) —", status:"human", sentiment:"neutral" },
    ],
  };

  // ---- SHARED BRAIN: Knowledge Base --------------------------------------
  const knowledge = {
    blurb:"One brain, shared by every system. Edit it once — the voice receptionist and the comment AI both update instantly. No retraining, no developer.",
    docs:[
      { name:"Service menu", type:"Menu", updated:"Today", chunks:42, status:"synced" },
      { name:"Price list", type:"Pricing", updated:"Today", chunks:31, status:"synced" },
      { name:"Cancellation & deposit policy", type:"Policy", updated:"2 days ago", chunks:12, status:"synced" },
      { name:"Aftercare notes", type:"Care", updated:"5 days ago", chunks:18, status:"synced" },
      { name:"Hours, address & parking", type:"Info", updated:"Today", chunks:8, status:"synced" },
      { name:"Gift cards & memberships", type:"Policy", updated:"1 week ago", chunks:9, status:"synced" },
    ],
    faqs:[
      { q:"Do you do gel removal?", a:"Yes — gel removal can be added to any manicure." },
      { q:"Where are you located and is there parking?", a:"Main Street; free parking behind the building." },
      { q:"What are your hours?", a:"Mon–Fri 9am–8pm, Sat 9am–6pm, closed Sundays & holidays." },
      { q:"Do you take walk-ins?", a:"We recommend booking; walk-ins are welcome when we have space." },
      { q:"What is your cancellation policy?", a:"24 hours' notice; late cancels may incur a fee." },
    ],
  };

  // ---- Integrations (the connect-later panel) ----------------------------
  // status: "connected" (demo-wired) | "connect" (Artem wires these) | "draft"
  const integrations = [
    { id:"vapi",    name:"VAPI — Voice agent", group:"Voice", status:"connect", desc:"Phone number, voice, and call routing for the receptionist." },
    { id:"phorest",  name:"Phorest — Booking", group:"Voice", status:"connect", desc:"Live availability and appointment booking." },
    { id:"publer",  name:"Publer — Scheduling", group:"Social", status:"connect", desc:"Schedules video posts across all four platforms." },
    { id:"meta",    name:"Meta — Instagram & Facebook", group:"Comments", status:"connect", desc:"Read and reply to comments + DMs (needs app review)." },
    { id:"youtube", name:"YouTube — Comments", group:"Comments", status:"connect", desc:"Reply to comments within the daily quota." },
    { id:"tiktok",  name:"TikTok — Comments", group:"Comments", status:"draft", desc:"Read-only; replies run in draft-and-approve mode." },
    { id:"supabase",name:"Supabase — Data & knowledge base", group:"Core", status:"connected", desc:"Stores the knowledge base, logs, and queues." },
    { id:"anthropic",name:"Anthropic (Claude) — Reasoning", group:"Core", status:"connected", desc:"Powers replies, captions, and reasoning." },
  ];

  // ---- Nav ---------------------------------------------------------------
  const nav = [
    { id:"overview",   label:"Overview",            icon:"grid" },
    { id:"voice",      label:"Voice Receptionist",  icon:"phone" },
    { id:"social",     label:"Social Scheduler",    icon:"calendar" },
    { id:"comments",   label:"Comment Replies",     icon:"chat" },
    { id:"knowledge",  label:"Knowledge Base",      icon:"book" },
    { id:"integrations",label:"Integrations",       icon:"plug" },
  ];

  return { brand, auth, kpis, revenueTrend, callsByHour, activity, voice, platforms, social, comments, knowledge, integrations, nav };
})();
