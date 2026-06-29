const princesa = document.querySelector('.princesa');
const pipe = document.querySelector('.pipe');
const gameOverImg = document.querySelector('.gameover');
const btnReiniciar = document.querySelector('.btn-reiniciar');

let pulando = false;
let gameOver = false;

function pular() {
    if (pulando || gameOver) return;

    pulando = true;
    princesa.classList.add('jump');

    princesa.addEventListener('animationend', () => {
        princesa.classList.remove('jump');
        pulando = false;
    }, { once: true });
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        pular();
    }
});

document.addEventListener('touchstart', (e) => {
    e.preventDefault();
    pular();
}, { passive: false });

document.addEventListener('mousedown', () => {
    pular();
});

const loop = setInterval(() => {
    if (gameOver) return;

    const princesaRect = princesa.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    // Colisão mais generosa
    const colidiu =
        princesaRect.right > pipeRect.left + 20 &&
        princesaRect.left < pipeRect.right - 20 &&
        princesaRect.bottom > pipeRect.top + 20;

    if (colidiu) {
        gameOver = true;

        clearInterval(loop);

        pipe.style.animationPlayState = 'paused';

        const boardRect = document.querySelector('.game-board').getBoundingClientRect();

        princesa.style.display = 'none';

        gameOverImg.style.display = 'block';
        gameOverImg.style.left = (princesaRect.left - boardRect.left) + 'px';
        gameOverImg.style.bottom = (boardRect.bottom - princesaRect.bottom) + 'px';
        gameOverImg.style.transform = 'none';
        gameOverImg.style.top = 'auto';

        btnReiniciar.style.display = 'block';
    }
}, 10);
