function gerar() {
  const acoes = [];

  const yt = document.getElementById("yt").value.trim();
  const tt = document.getElementById("tt").value.trim();
  const ig = document.getElementById("ig").value.trim();
  const wa = document.getElementById("wa").value.trim();
  const dl = document.getElementById("dl").value.trim();

  if (yt) acoes.push({ plat: "YouTube", url: yt, app: "vnd.youtube://" });
  if (tt) acoes.push({ plat: "TikTok", url: tt, app: "snssdk1233://" });
  if (ig) acoes.push({ plat: "Instagram", url: ig, app: "instagram://" });
  if (wa) acoes.push({ plat: "WhatsApp", url: wa, app: "whatsapp://" });

  if (acoes.length === 0) {
    alert("Adicione pelo menos uma ação");
    return;
  }

  if (!dl) {
    alert("Coloque o link de DOWNLOAD");
    return;
  }

  const data = {
    titulo: "Complete as ações",
    destino: dl,
    acoes
  };

  const encoded = btoa(encodeURIComponent(JSON.stringify(data)));

  const base = location.origin + location.pathname.replace("index.html", "");
  const finalLink = base + "go.html?d=" + encoded;

  navigator.clipboard.writeText(finalLink)
    .then(() => {
      document.getElementById("out").innerText = "✅ Link gerado e copiado!";
    })
    .catch(() => {
      document.getElementById("out").innerText = finalLink;
    });
}
