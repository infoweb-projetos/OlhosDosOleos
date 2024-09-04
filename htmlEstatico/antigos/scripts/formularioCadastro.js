const btCadastrar = document.getElementById('signUp');
const btLogar = document.getElementById('signIn');
const container = document.getElementById('container');

const checkArtista = document.getElementById('artistaCheck');
const camposContato = document.getElementById('areaCamposContato');

btCadastrar.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

btLogar.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

checkArtista.addEventListener("change", () => {
    const valorSelecionado = checkArtista.checked;
    if (valorSelecionado == true) {
        camposContato.style.display = "block";
    }
	else{
		camposContato.style.display = "none";
	}
});
