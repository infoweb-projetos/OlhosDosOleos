function SelecionarArquivoImg(inputId, imgId) {
    var InputArquivo = document.getElementById(inputId);
    const Imagem = document.getElementById(imgId);

    InputArquivo.addEventListener("change", function (evento) {
        const Arquivo = evento.target.files[0];
        if (Arquivo) {
            const LeitorDeArquivo = new FileReader();
            LeitorDeArquivo.onload = function (e) {
                Imagem.setAttribute('src', e.target.result);
            };
            LeitorDeArquivo.readAsDataURL(Arquivo);
        } else {
            Imagem.setAttribute('src', '~/img/EditarPerfil.png');
        }
    });
    InputArquivo.click();

}