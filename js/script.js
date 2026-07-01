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
  }, 500); // igual ao tempo do CSS (.jump)
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

  // Colisão real: só conta se as caixas realmente se sobrepõem,
  // com uma margem pequena de tolerância (10px) para não punir
  // por 1px de erro visual.
  const margem = 30;
  const colidiu =
    princesaRect.right - margem > pipeRect.left &&
    princesaRect.left + margem < pipeRect.right &&
    princesaRect.bottom - margem > pipeRect.top;

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
