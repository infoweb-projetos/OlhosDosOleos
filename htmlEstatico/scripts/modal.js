function AbrirFecharModal(id,  display = 'block'){
    let modal = document.getElementById(id);
    if (modal.style.opacity != 1){ 
        modal.style.display = display;
        setTimeout(function () {
            modal.style.opacity = 1;
        }, 20);
    }
    else {
        modal.style.opacity = 0;
        setTimeout(function () {
            modal.style.display = "none"; 
        }, 500);
    }
    
}