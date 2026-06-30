* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.game-board {
    width: 100%;
    height: 700px;
    border: 1px solid #333;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background-image: url('../images/enroladosty.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.pipe {
    position: absolute;
    bottom: 0;
    width: 50px;
    animation: pipe-animation 3s infinite linear;
}

.princesa {
    width: 150px;
    position: absolute;
    bottom: 0;
}

.gameover {
    display: none;
    position: absolute;
    width: 200px;
}

.btn-reiniciar {
    display: none;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #c9a0dc;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 14px 32px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    letter-spacing: 1px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.btn-reiniciar:hover {
    background-color: #b57bee;
}

.jump {
    animation: jump 1500ms ease-in-out;
}

@keyframes pipe-animation {
    from { right: -50px; }
    to   { right: 100%; }
}

@keyframes jump {
    0%   { bottom: 0; }
    25%  { bottom: 280px; }
    /* fica bastante tempo lá em cima */
    65%  { bottom: 280px; }
    /* cai devagar no final */
    100% { bottom: 0; }
}
