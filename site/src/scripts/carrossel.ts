export function CarroselComum(idAnteBtn  : string, idProxBtn  : string, classeItemSlide  : string, idCarrosel  : string, idListaItem : string): void {
    // Selecionar elementos importantes
    const anteBtn = document.getElementById(idAnteBtn);
    const proxBtn = document.getElementById(idProxBtn);
    const slides = document.querySelectorAll('.'+classeItemSlide);
    let slideAtual = 0;
    const totalSlides = slides.length;
    // Função para detectar quantas imagens estão visíveis
    function calcularImagensVisiveis(): number {
        const elementos = document.getElementById(idCarrosel);
        if (elementos && slides.length > 0) {
            const larguraCarrosel = elementos.clientWidth; // Largura do contêiner
            const larguraSlide = slides[0].clientWidth; // Largura de cada slide
            const imagensVisiveis = Math.floor(larguraCarrosel / larguraSlide); // Quantidade de imagens visíveis
            return imagensVisiveis;
        }
        return 1;
    }
    // Função para mostrar o slide correto
    function mostrarSlide(index: number): void {
        if (index >= totalSlides / calcularImagensVisiveis()) {
            slideAtual = 0;
        }
        else if (index >= 0 && index < totalSlides) {
            slideAtual = index;
        }
        const offset = -slideAtual * 100; // Move o carrossel
        let elemento = document.getElementById(idListaItem);
        if (elemento) elemento.style.transform = `translateX(${offset}%)`;
    }
    // Função para avançar para o próximo slide
    function proxSlide(): void {
        mostrarSlide(slideAtual + 1);
    }
    // Função para retroceder para o slide anterior
    function anteSlide(): void {
        mostrarSlide(slideAtual - 1);
    }
    if (proxBtn) proxBtn.addEventListener('click', proxSlide);
    if (anteBtn) anteBtn.addEventListener('click', anteSlide);
    mostrarSlide(slideAtual);
    //passar slide sozinho a cada 7 segundos
    const intervaloSlideAutomatico = setInterval(proxSlide, 7000);
}