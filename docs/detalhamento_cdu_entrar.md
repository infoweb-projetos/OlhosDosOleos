# Projeto Olhos Dos Óleos

## Especificação do caso de uso - Entrar

### Histórico da Revisão 

|  Data  | Versão | Descrição | Autor |
|:-------|:-------|:----------|:------|
| 13/09/2024 | **1.00** | Versão Inicial  | Rita de Cassia |

### 1. Resumo 

Nesse caso de uso um usuario cadastrado no site entra no sistema, o possibilitando visualizar feed, post, e editar seu perfil no site.

### 2. Atores 

Usuários e Artistas.

### 3. Pré-condições

O usuario deve acessar o link de login, atravez do feed do site.

### 4. Pós-condições

O sistema mostra o formulario de login de usuario.

### 5. Fluxos de Evento

#### 5.1. Fluxo Básico

| Ator   | Sistema |
|:-------|:--------|
| 1.O usuario acessa a pagina de login por meio do botão de "ENTRAR", localizado no feed do site | 2. O sistema exibe o formulario de login, com os seguintes campos; nome ou email, senha e a opção de "ENTRE COM O GOOGLE".  |
| 3.O usuario preenche os campos corretamente, e clica em "entrar" | 4.O sistema compara as informções com o banco de dados e retorna pagina de feed, logado na conta do usuario |


#### 5.2. Fluxo alternativo

| Ator | Sistema |
|:--------|:--------|
|1. O usuario escolhe a opção de login "ENTRE COM O GOOGLE" | O sistema compara as informções com o banco de dados e retorna pagina de feed, logado na conta do usuario |


#### 5.3. Fluxos de Exceção

| Exceção | Sistema |
|:--------|:--------|
|1. Erro nas credenciais | Se o usuario colocar uma informação invalida(email ou nome e senha ) ou um campo em branco, vai da erro e retornar a mensagem "Informações invalidas"|



### 6. Protótipos de Interface

https://www.figma.com/proto/ZQxFkLwyHV7kfOODrm58KK/olhosdosoleos?node-id=713-58&node-type=frame&t=LBhStOejHZniKXKz-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=536%3A291


