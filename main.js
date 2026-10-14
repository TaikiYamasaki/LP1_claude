// Works carousel
let workIndex = 0;
let cardStep = 298;
let maxIndex = 3;
let maxScroll = null;
const faqState = [true, false, false, false];

function measure() {
  const v = document.getElementById('works-viewport');
  const t = document.getElementById('works-track');
  if (!v || !t) return;
  const cards = t.children;
  if (window.innerWidth <= 768 && cards.length) {
    // One full card per "page" on narrow viewports — the fixed 274px
    // card width otherwise never fits inside the viewport slot once the
    // nav buttons eat into the available width, leaving a permanently
    // cropped card and extra blank scroll past the last one.
    const w = v.clientWidth;
    for (const c of cards) c.style.width = w + 'px';
    cardStep = w + 24;
  } else {
    for (const c of cards) c.style.width = '';
    cardStep = 298;
  }
  const ms = Math.max(0, t.scrollWidth - v.clientWidth);
  maxScroll = ms;
  maxIndex = Math.max(0, Math.ceil(ms / cardStep));
  renderDots();
  renderTrack();
}

function renderTrack() {
  const t = document.getElementById('works-track');
  const wi = Math.min(workIndex, maxIndex);
  const shift = maxScroll == null ? wi * cardStep : Math.min(wi * cardStep, maxScroll);
  t.style.transform = 'translateX(' + (-shift) + 'px)';
}

function renderDots() {
  const container = document.getElementById('dots-container');
  container.innerHTML = '';
  for (let i = 0; i <= maxIndex; i++) {
    const btn = document.createElement('button');
    const active = i === workIndex;
    btn.style.cssText = 'width:' + (active ? '24px' : '8px') + ';height:8px;border-radius:5px;background:' + (active ? '#EF8D6E' : '#D8D2C4') + ';transition:all .3s;padding:0;border:none;cursor:pointer;';
    const idx = i;
    btn.onclick = function() { workIndex = idx; measure(); };
    container.appendChild(btn);
  }
}

function prevWork() {
  workIndex = Math.max(0, workIndex - 1);
  measure();
}

function nextWork() {
  workIndex = Math.min(maxIndex, workIndex + 1);
  measure();
}

// FAQ accordion
function toggleFaq(i) {
  faqState[i] = !faqState[i];
  const ans = document.getElementById('ans-' + i);
  const chev = document.getElementById('chev-' + i);
  ans.style.maxHeight = faqState[i] ? '150px' : '0px';
  ans.style.opacity = faqState[i] ? '1' : '0';
  chev.style.transform = faqState[i] ? 'rotate(180deg)' : 'rotate(0deg)';
}

window.addEventListener('load', measure);
window.addEventListener('resize', measure);
setTimeout(measure, 300);

// Hamburger menu
function toggleMenu() {
  const overlay   = document.getElementById('nav-overlay');
  const hamburger = document.getElementById('nav-hamburger');
  const isOpen    = overlay.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  overlay.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
