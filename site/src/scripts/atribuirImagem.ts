// Exibe uma imagem(com base no imgId) colcada no input type file(com base no inputId)
export function AtribuirImagem(inputId : string, imgId :string) : void {
    const InputArquivo = document.getElementById(inputId);
    const Imagem = document.getElementById(imgId);

    if (InputArquivo && Imagem){
        InputArquivo.addEventListener("change", function (evento: Event) {
            if (evento){
                const target = evento.target as HTMLInputElement;
                if (target && target.files){
                    const Arquivo = target.files[0];
                    if (Arquivo) {
                        const LeitorDeArquivo = new FileReader();
                        LeitorDeArquivo.onload = function (e: ProgressEvent<FileReader>) {
                            if (e.target && e.target.result) {
                                Imagem.setAttribute('src', e.target.result as string);
                            }
                            
                        };
                        LeitorDeArquivo.readAsDataURL(Arquivo);
                    } else {
                        Imagem.removeAttribute('src');
                    }
                }
            }
        });
        InputArquivo.click();
    }
}