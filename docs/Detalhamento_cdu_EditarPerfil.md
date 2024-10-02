# Projeto Olhos Dos Óleos

## Especificação do caso de uso - Editar Perfil

### Histórico da Revisão 

|  Data  | Versão | Descrição | Autor |
|:-------|:-------|:----------|:------|
| 17/09/2024 | **1.00** | Versão Inicial  | Rita de Cassia |

### 1. Resumo 

Nesse caso de uso um usuario cadastrado no site, edita o seu perfil.

### 2. Atores 

Usuários e Artistas.

### 3. Pré-condições

O usuario deve acessar o a opção de "editar informações de perfil" ou no quadro de "complete seu perfil", atravez da pagina de MeuPerfil no site.

### 4. Pós-condições

O sistema mostra o formulario de "edição de dados" e a aba de "personalização de perfil"

### 5. Fluxos de Evento

#### 5.1. Fluxo Básico

| Ator   | Sistema |
|:-------|:--------|
| 1.O usuario acessa o a opção de "editar informações de perfil" ou no quadro de "complete seu perfil", atravez da pagina de MeuPerfil no site.| 2. O sistema exibe um formulario de "edição de dados", organizado por etapas (Informações essenciais, localização, contatos Apresentação), com os botões "SALVAR" e "VOLTAR PARA O PERFIL" |
|3. O usuario seleciona a etapa que deseja editar | 4. O sistema sistema rola a pagina para a etapa desejada no fotrmulario de "edição de dados" |
|5.O usuario edita os dados corretamente e seleciona "SALVAR"  |6. O sistema atualiza as informações no banco de dados e exibe a pagina de perfil com as informações atualizadas |


#### 5.2. Fluxos de Exceção

| Exceção | Sistema |
|:--------|:--------|
|1. Erro nas credenciais | Se o usuario tentar editar com alguma informação invalida ( Informações essenciais (nome, email, nome de usuario e senha)) ou um campo em branco(no caso das informações essenciais ), vai da erro e retornar a mensagem "Informações invalidas"|



### 6. Protótipos de Interface

https://www.figma.com/proto/ZQxFkLwyHV7kfOODrm58KK/olhosdosoleos?node-id=892-200&node-type=frame&t=7Fm2zokK9LBWAlUy-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=536%3A291

