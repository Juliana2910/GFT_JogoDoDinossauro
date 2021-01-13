const dinossauro = document.querySelector('.dino');
const fundo = document.querySelector('.background');

let estaPulando = false;
let fimDeJogo = false;
let posicao = 0;
let pontos = 0;

function escutaKeyUp(event) {
  if (event.keyCode === 32) {
    if (!estaPulando) {
      Pular();
    }
  }
}

function Pular() {
  estaPulando = true;

  let intervaloAcima = setInterval(() => {
    if (posicao >= 150) {
      // Descendo
      clearInterval(intervaloAcima);

      let intervaloAbaixo = setInterval(() => {
        if (posicao <= 0) {
          clearInterval(intervaloAbaixo);
          estaPulando = false;
        } else {
          posicao -= 20;
          dinossauro.style.bottom = posicao + 'px';
        }
      }, 20);
    } else {
      // Subindo
      posicao += 20;
      dinossauro.style.bottom = posicao + 'px';
    }
    pontos = pontos + 100;
    document.getElementById("placar").innerText = pontos;
  }, 20);
}

function criarCactos() {
  const cactos = document.createElement('div');
  let posicaoDosCactos = 1000;
  let tempoAleatorio = Math.random() * 6000;

  if (fimDeJogo) return;

  cactos.classList.add('cactus');
  fundo.appendChild(cactos);
  cactos.style.left = posicaoDosCactos + 'px';

  let TempoEsquerda = setInterval(() => {
    if (posicaoDosCactos < -60) {
      // Saiu da tela
      clearInterval(TempoEsquerda);
      fundo.removeChild(cactos);
    } else if (posicaoDosCactos > 0 && posicaoDosCactos < 60 && posicao < 60) {
      // Game over
      clearInterval(TempoEsquerda);
      fimDeJogo = true;
      document.body.innerHTML = '<h1 class="game-over">Buuaaa. Fim de Jogo. <br /><br/>Sua pontuação total foi ' + pontos + ' pontos.</h1>';
    } else {
      posicaoDosCactos -= 10;
      cactos.style.left = posicaoDosCactos + 'px';
    }
  }, 20);

  setTimeout(criarCactos, tempoAleatorio);
}

criarCactos();
document.addEventListener('keyup', escutaKeyUp);
