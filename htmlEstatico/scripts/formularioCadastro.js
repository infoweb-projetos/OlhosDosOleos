const btCadastrar = document.getElementById('signUp');
const btLogar = document.getElementById('signIn');
const container = document.getElementById('container');
const selectTipoUsuario = document.getElementById('tipoUsuarioSelect');
const camposContato = document.getElementById('areaCamposContato');

btCadastrar.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

btLogar.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

selectTipoUsuario.addEventListener("change", () => {
    const valorSelecionado = selectTipoUsuario.value;
    if (valorSelecionado != "usuarioComum") {
        camposContato.style.display = "block";
    }
	else{
		camposContato.style.display = "none";
	}
});
