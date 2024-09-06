function AbrirFecharModal(id){
    let modal = document.getElementById(id);
    if (modal.style.opacity != 1) modal.style.opacity = 1;
    else modal.style.opacity = 0;
    
}