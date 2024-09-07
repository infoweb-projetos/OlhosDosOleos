function mostrarSenha(id) {
  let input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text'; // Mostrar a senha
  } else {
    input.type = 'password'; // Voltar para o modo de senha
  }
}