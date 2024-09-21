// Selecionar elementos importantes
const anteBtn = document.getElementById('anteBtn');
const proxBtn = document.getElementById('proxBtn');
const slides = document.querySelectorAll('.carroselSlide');

let slideAtual = 0;
const totalSlides = slides.length;

// Função para detectar quantas imagens estão visíveis
function calcularImagensVisiveis() {
    const larguraCarrosel = document.querySelector('.carrosel').clientWidth; // Largura do contêiner
    const larguraSlide = slides[0].clientWidth; // Largura de cada slide
    const imagensVisiveis = Math.floor(larguraCarrosel / larguraSlide); // Quantidade de imagens visíveis
    return imagensVisiveis;
}

// Função para mostrar o slide correto
function mostrarSlide(index) {
    if (index >= totalSlides / calcularImagensVisiveis()){
        slideAtual = 0;
    }
    else if (index >= 0 && index < totalSlides){
        slideAtual = index;
    }

    const offset = -slideAtual * 100; // Move o carrossel
    document.querySelector('.imagemCarrosel').style.transform = `translateX(${offset}%)`;
}

// Função para avançar para o próximo slide
function proxSlide() {
    mostrarSlide(slideAtual + 1);
}

// Função para retroceder para o slide anterior
function anteSlide() {
    mostrarSlide(slideAtual - 1);
}

// Botão "Próximo"
proxBtn.addEventListener('click', proxSlide);

// Botão "Anterior"
anteBtn.addEventListener('click', anteSlide);

// Iniciar o carrossel no slide inicial
mostrarSlide(slideAtual);

// Passar o slide automaticamente a cada 5 segundos (5000ms)
const intervaloSlideAutomatico = setInterval(proxSlide, 5000);