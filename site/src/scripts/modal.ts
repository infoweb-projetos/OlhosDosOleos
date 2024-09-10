export  function AbrirFecharModal(id: string): void {
    const modal = document.getElementById(id) as HTMLElement | null;

    if (modal) {
        // Alterna a opacidade do modal
        if (modal.style.opacity !== '1') {
            modal.style.opacity = '1';
        } else {
            modal.style.opacity = '0';
        }
    } else {
        console.warn(`Modal com id "${id}" não encontrado.`);
    }
}