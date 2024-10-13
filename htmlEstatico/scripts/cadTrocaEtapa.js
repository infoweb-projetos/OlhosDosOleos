function TrocaEtapa(idAtual, idProx, ehParaVoltar, etapaAtual, idNumEtapaAtual, idNumEtapaProx,  idBarraAtual, idBarraProx){
    let divAtual = document.getElementById(idAtual);
    let divProx = document.getElementById(idProx);
    divAtual.style.display = "none";
    divProx.style.display = "flex";

    let barraProx = document.getElementById(idBarraProx);
    let barraAtual = document.getElementById(idBarraAtual);
    let numEtapaProx = document.getElementById(idNumEtapaProx);
    let numEtapaAtual = document.getElementById(idNumEtapaAtual);

    if(ehParaVoltar){
        numEtapaAtual.style.transitionDelay = "100ms";
        if (idBarraAtual) barraAtual.style.transitionDelay = "0ms";
        numEtapaProx.style.transitionDelay = "300ms";
        if (idBarraProx) barraProx.style.transitionDelay = "200ms";
        switch (etapaAtual) {
            case 2:
                barraAtual.className = "";
                numEtapaAtual.classList.remove(["etapaNumeroAzul"]);
                barraProx.className = "";
                barraProx.classList.add(["cadBarraVermelhaMetade"]);
                break;
            case 3:
                barraAtual.className = "";
                numEtapaAtual.classList.remove(["etapaNumeroVerde"]);
                barraProx.className = "";
                barraProx.classList.add(["cadBarraAzulMetade"]);
                break;
            case 4:
                barraAtual.className = "";
                numEtapaAtual.classList.remove(["etapaNumeroAmarelo"]);
                barraProx.className = "";
                barraProx.classList.add(["cadBarraVerdeMetade"]);
                break;
            case 5:
                numEtapaAtual.classList.remove(["etapaNumeroVermelho"]);
                barraProx.className = "";
                barraProx.classList.add(["cadBarraAmarelaMetade"]);
                break;
            default:
                break;
        }
    }
    else{
        numEtapaAtual.style.transitionDelay = "0ms";
        if (idBarraAtual) barraAtual.style.transitionDelay = "0ms";
        numEtapaProx.style.transitionDelay = "100ms";
        if (idBarraProx) barraProx.style.transitionDelay = "200ms";
        switch (etapaAtual) {
            case 1:
                barraAtual.className = "";
                barraAtual.classList.add(["cadBarraVermelhaCompleta"]);
                numEtapaProx.classList.add(["etapaNumeroAzul"]);
                barraProx.className = "";
                barraProx.classList.add(["cadBarraAzulMetade"]);
                break;
            case 2:
                barraAtual.className = "";
                barraAtual.classList.add(["cadBarraAzulCompleta"]);
                numEtapaProx.classList.add(["etapaNumeroVerde"]);
                barraProx.className = "";
                barraProx.classList.add(["cadBarraVerdeMetade"]);
                break;
            case 3:
                barraAtual.className = "";
                barraAtual.classList.add(["cadBarraVerdeCompleta"]);
                numEtapaProx.classList.add(["etapaNumeroAmarelo"]);
                barraProx.className = "";
                barraProx.classList.add(["cadBarraAmarelaMetade"]);
                break;
            case 4:
                barraAtual.className = "";
                barraAtual.classList.add(["cadBarraAmarelaCompleta"]);
                numEtapaProx.classList.add(["etapaNumeroVermelho"]);
                break;
            default:
                break;
        }
    }
    

}