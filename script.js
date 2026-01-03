/* =========================
   PARTE 1 – GERAR LINK
========================= */
function gerar() {
  const acoes = [];
  const yt = ytInput().value;
  const tt = ttInput().value;
  const ig = igInput().value;
  const wa = waInput().value;

  if (yt) acoes.push({ plat: "YouTube", url: yt, app: "vnd.youtube://" });
  if (tt) acoes.push({ plat: "TikTok", url: tt, app: "snssdk1233://" });
  if (ig) acoes.push({ plat: "Instagram", url: ig, app: "instagram://" });
  if (wa) acoes.push({ plat: "WhatsApp", url: wa, app: "whatsapp://" });

  if (!acoes.length) {
    alert("Adicione pelo menos um link");
    return;
  }

  const data = { titulo: "Complete as ações", acoes };
  const encoded = btoa(encodeURIComponent(JSON.stringify(data)));

  const link = location.origin +
    location.pathname.replace("index.html","") +
    "go.html?d=" + encoded;

  navigator.clipboard.writeText(link);
  document.getElementById("out").innerText = "✅ Link copiado automaticamente!";
}

const ytInput = () => document.getElementById("yt");
const ttInput = () => document.getElementById("tt");
const igInput = () => document.getElementById("ig");
const waInput = () => document.getElementById("wa");

/* =========================
   PARTE 2 – EXECUTAR AÇÕES
========================= */
(function () {
  const p = new URLSearchParams(location.search).get("d");
  if (!p) return;

  let data;
  try {
    data = JSON.parse(decodeURIComponent(atob(p)));
  } catch {
    alert("Link inválido");
    location.href = "index.html";
    return;
  }

  let passo = 0;
  let cooldown = false;

  const info = document.getElementById("info");
  const btn = document.getElementById("acaoBtn");
  const timer = document.getElementById("timer");
  document.getElementById("titulo").innerText = data.titulo;

  function next() {
    if (passo >= data.acoes.length) {
      location.href = data.acoes[data.acoes.length - 1].url;
      return;
    }

    const a = data.acoes[passo];
    info.innerText = `Ação ${passo + 1} de ${data.acoes.length}`;
    btn.innerText = `Abrir ${a.plat}`;

    btn.onclick = () => {
      if (cooldown) return;
      cooldown = true;

      const start = Date.now();
      location.href = a.app;

      setTimeout(() => {
        if (Date.now() - start < 1500) {
          window.open(a.url, "_blank");
        }
      }, 1000);

      let t = 3;
      timer.innerText = `Aguarde ${t}s...`;
      const int = setInterval(() => {
        t--;
        timer.innerText = `Aguarde ${t}s...`;
        if (t <= 0) {
          clearInterval(int);
          cooldown = false;
          passo++;
          next();
        }
      }, 1000);
    };
  }
  next();
})();

/* =========================
   PARTÍCULAS + LINHAS
========================= */
const canvas = document.getElementById("bg");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h;

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const pts = Array.from({ length: 60 }, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    vx:(Math.random()-0.5)*0.6,
    vy:(Math.random()-0.5)*0.6
  }));

  (function anim(){
    ctx.clearRect(0,0,w,h);
    pts.forEach((p,i)=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1;
      if(p.y<0||p.y>h)p.vy*=-1;
      ctx.fillStyle="#fff";
      ctx.fillRect(p.x,p.y,2,2);
      for(let j=i+1;j<pts.length;j++){
        const q=pts[j];
        const d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<120){
          ctx.strokeStyle="rgba(255,255,255,0.15)";
          ctx.beginPath();
          ctx.moveTo(p.x,p.y);
          ctx.lineTo(q.x,q.y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(anim);
  })();
}
