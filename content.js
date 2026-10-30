// Activa el modo oscuro de inmediato (evita el "flash" blanco) y aplica la configuración guardada
const root = document.documentElement;
root.classList.add("fdm-on");

// gray = qué tan claro es el fondo (0 = negro puro, 30 = gris medio-oscuro)
function applyGray(gray) {
  const p = 1 - gray / 100;               // cantidad de inversión
  const full = 1 / Math.abs(1 - 2 * p);   // contraste que compensaría por completo
  const c = 1 + (full - 1) * 0.5;         // compensación parcial: imágenes nítidas sin recortar sombras
  root.style.setProperty("--fdm-p", p.toFixed(3));
  root.style.setProperty("--fdm-c", c.toFixed(3));
}

applyGray(15);

chrome.storage.local.get({ enabled: true, gray: 15 }, ({ enabled, gray }) => {
  root.classList.toggle("fdm-on", enabled);
  applyGray(gray);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) root.classList.toggle("fdm-on", changes.enabled.newValue);
  if (changes.gray) applyGray(changes.gray.newValue);
});
