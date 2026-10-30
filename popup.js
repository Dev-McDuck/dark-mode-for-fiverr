const t = document.getElementById("toggle");
const g = document.getElementById("gray");
const val = document.getElementById("val");

const show = (v) => (val.textContent = v + "%");

chrome.storage.local.get({ enabled: true, gray: 15 }, ({ enabled, gray }) => {
  t.checked = enabled;
  g.value = gray;
  show(gray);
});

t.addEventListener("change", () => chrome.storage.local.set({ enabled: t.checked }));
g.addEventListener("input", () => {
  show(g.value);
  chrome.storage.local.set({ gray: Number(g.value) });
});
