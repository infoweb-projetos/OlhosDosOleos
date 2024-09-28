function AbrirFecharModal(id,  display = 'block', idArea = null){
    let modal = document.getElementById(id);
    if (modal.style.opacity != 1){ 
        modal.style.display = display;
        if (idArea) document.getElementById(idArea).style.display = 'flex';
        setTimeout(function () {
            modal.style.opacity = 1;
        }, 20);
    }
    else {
        modal.style.opacity = 0;
        setTimeout(function () {
            modal.style.display = "none"; 
            if (idArea) document.getElementById(idArea).style.display = 'none';
        }, 500);
    }
    
}