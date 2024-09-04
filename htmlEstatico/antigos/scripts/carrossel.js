// Variáveis globais
let index = 0;

// Função para mostrar o slide atual
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-images img');
    const dots = document.querySelectorAll('.dot');
    
    // Ajusta o índice para o intervalo correto
    if (n >= slides.length) index = 0;
    if (n < 0) index = slides.length - 1;
    
    // Desloca a imagem para a esquerda com base no índice
    const offset = -index * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
    
    // Atualiza os indicadores
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// Função para avançar para o próximo slide
function nextSlide() {
    index++;
    showSlide(index);
}

// Função para voltar para o slide anterior
function prevSlide() {
    index--;
    showSlide(index);
}

// Função para ir para um slide específico com base no índice do indicador
function currentSlide(n) {
    index = n - 1;
    showSlide(index);
}

// Inicializa o carrossel
document.addEventListener('DOMContentLoaded', () => {
    showSlide(index); // Mostra o slide inicial

    // Adiciona eventos de clique aos indicadores
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => currentSlide(i + 1));
    });
});
