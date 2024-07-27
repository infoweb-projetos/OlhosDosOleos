function MudarImg(arquivo, foto) {
    var InputArquivo = document.getElementById(arquivo);
    const Imagem = document.getElementById(foto);

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