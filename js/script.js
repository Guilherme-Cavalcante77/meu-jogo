const princesa = document.querySelector('.princesa');
const pipe = document.querySelector('.pipe');
const gameOverImg = document.querySelector('.gameover');
const btnReiniciar = document.querySelector('.btn-reiniciar');

let pulando = false;
let gameOver = false;

// --- PULO ---
function pular() {
  if (pulando || gameOver) return;

  pulando = true;
  princesa.classList.add('jump');

  setTimeout(() => {
    princesa.classList.remove('jump');
    pulando = false;
  }, 540);
}

// --- CONTROLES: TECLADO (PC) ---
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    pular();
  }
});

// --- CONTROLES: TOQUE (CELULAR) ---
document.addEventListener('touchstart', (e) => {
  e.preventDefault();
  pular();
}, { passive: false });

// --- CONTROLES: CLIQUE ---
document.addEventListener('mousedown', () => {
  pular();
});

// --- DETECÇÃO DE COLISÃO ---
setInterval(() => {
  if (gameOver) return;

  const princesaRect = princesa.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();

  const colidiu =
    princesaRect.right > pipeRect.left + 20 &&
    princesaRect.left < pipeRect.right - 20 &&
    princesaRect.bottom > pipeRect.top + 10;

  if (colidiu) {
    gameOver = true;

    // Para o cano
    pipe.style.animationPlayState = 'paused';

    // Posiciona game over onde estava a princesa
    const boardRect = document.querySelector('.game-board').getBoundingClientRect();
    const leftPos = princesaRect.left - boardRect.left;
    const bottomPos = boardRect.bottom - princesaRect.bottom;

    princesa.style.display = 'none';

    gameOverImg.style.display = 'block';
    gameOverImg.style.left = leftPos + 'px';
    gameOverImg.style.bottom = bottomPos + 'px';
    gameOverImg.style.transform = 'none';
    gameOverImg.style.top = 'auto';

    // Mostra botão de reiniciar
    btnReiniciar.style.display = 'block';
  }
}, 10);