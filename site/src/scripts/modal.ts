export  function AbrirFecharModal(id: string, display: string = "block") : void {
    const modal = document.getElementById(id) as HTMLElement | null;
    if (modal) {
        // Alterna a opacidade do modal
        if (modal.style.opacity != "1"){ 
            modal.style.display = display;
            setTimeout(function () {
                modal.style.opacity = "1";
            }, 20);
        }
        else {
            modal.style.opacity = "0";
            setTimeout(function () {
                modal.style.display = "none"; 
            }, 500);
        }
    } else {
        console.warn(`Modal com id "${id}" não encontrado.`);
    }
}