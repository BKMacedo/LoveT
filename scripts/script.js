const botao = document.getElementById("verificar");
const modal = document.getElementById("modal");
const quiz = document.getElementById("quiz");
const respostas = document.querySelectorAll(".resposta");
const presentes = document.getElementById("presentes");
const barraProgressoContainer = document.getElementById("barraProgressoContainer");
const barraProgresso = document.getElementById("barraProgresso");
const mensagemFinal = document.getElementById("mensagemFinal");
const tentarNovamente = document.getElementById("tentarNovamente");
const tituloQuiz = document.getElementById("tituloQuiz");
const introQuiz = document.getElementById("introQuiz");

let acertos = 0;
let respondidas = 0;
const totalPerguntas = document.querySelectorAll(".pergunta").length;
const acertosNecessarios = 5;

// mostrar o modal e iniciar quiz
botao.addEventListener("click", () => {
  modal.style.display = "flex";
  botao.style.display = "none";
  quiz.style.display = "block";
  barraProgressoContainer.style.display = "block";
  tituloQuiz.style.display = "block";
  introQuiz.style.display = "block";
});

// salvar o texto original das respostas
respostas.forEach(resposta => {
  resposta.setAttribute("data-text-original", resposta.innerText);
  resposta.addEventListener("click", () => {
    if (resposta.classList.contains("respondido")) return;

    resposta.classList.add("respondido");
    const correta = resposta.dataset.certa === "true";
    respondidas++;

    if (correta) {
      acertos++;
      resposta.style.backgroundColor = "#33cc66";
      resposta.innerText = "Acertooou! 💚";
    } else {
      resposta.style.backgroundColor = "#ff4d4d";
      resposta.innerText = "Eita, errou 😅";
    }

    const progresso = Math.floor((acertos / acertosNecessarios) * 100);
    barraProgresso.style.width = `${progresso}%`;

    if (respondidas === totalPerguntas) {
      setTimeout(() => {
        quiz.style.display = "none";
        tituloQuiz.style.display = "none";
        introQuiz.style.display = "none";

        if (acertos >= acertosNecessarios) {
          mensagemFinal.innerText = "🎉 Parabéns! Você desbloqueou seus presentes misteriosos!";
          mensagemFinal.style.display = "block";
          presentes.style.display = "block";
          tentarNovamente.style.display = "none"; // não mostra o botão de tentar dnv se acertou tudo
        } else {
          mensagemFinal.innerText = "Você precisa acertar mais para desbloquear os presentes 😢";
          mensagemFinal.style.display = "block";
          tentarNovamente.style.display = "inline-block"; // só mostra aqui se não acertar tudo
        }
      }, 1500);
    }
  });
});

// resetar quiz
function resetarQuiz() {
  respostas.forEach(r => {
    r.classList.remove("respondido");
    r.style.backgroundColor = "";
    r.innerText = r.getAttribute("data-text-original");
  });

  acertos = 0;
  respondidas = 0;

  quiz.style.display = "block";
  tituloQuiz.style.display = "block";
  introQuiz.style.display = "block";
  presentes.style.display = "none";
  barraProgresso.style.width = "0%";
  mensagemFinal.style.display = "none";
  tentarNovamente.style.display = "none";
}

// abertura dos presentes
document.querySelectorAll('.btn-presente').forEach(botao => {
  botao.addEventListener('click', () => {
    const tipo = botao.getAttribute('data-presente');
    if (tipo === "imagem") {
      document.getElementById("modalImagem").style.display = "flex";
    } else if (tipo === "carta") {
      document.getElementById("modalCarta").style.display = "flex";
    }
  });
});

// fechar modais dos presentes
function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}


