const princesa = document.querySelector('.princesa');
const pipe = document.querySelector('.pipe');
const gameOverImg = document.querySelector('.gameover');
const btnReiniciar = document.querySelector('.btn-reiniciar');
const gameBoard = document.querySelector('.game-board');

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
  }, 1500);
}

// --- CONTROLES: TECLADO (PC) ---
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    pular();
  }
});

// --- CONTROLES: TOQUE (CELULAR) ---
// Escuta direto no game-board, que é maior e mais confiável que document
gameBoard.addEventListener('touchstart', (e) => {
  e.preventDefault();
  pular();
}, { passive: false });

// --- CONTROLES: CLIQUE (PC e fallback mobile) ---
gameBoard.addEventListener('click', () => {
  pular();
});

// --- DETECÇÃO DE COLISÃO ---
setInterval(() => {
  if (gameOver) return;

  const princesaRect = princesa.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();

  const colidiu =
    princesaRect.right > pipeRect.left + 15 &&
    princesaRect.left < pipeRect.right - 15 &&
    princesaRect.bottom > pipeRect.top + 10;

  if (colidiu) {
    gameOver = true;

    pipe.style.animationPlayState = 'paused';

    const boardRect = gameBoard.getBoundingClientRect();
    const leftPos = princesaRect.left - boardRect.left;
    const bottomPos = boardRect.bottom - princesaRect.bottom;

    princesa.style.display = 'none';

    gameOverImg.style.display = 'block';
    gameOverImg.style.left = leftPos + 'px';
    gameOverImg.style.bottom = bottomPos + 'px';
    gameOverImg.style.transform = 'none';
    gameOverImg.style.top = 'auto';

    btnReiniciar.style.display = 'block';
  }
}, 10);
