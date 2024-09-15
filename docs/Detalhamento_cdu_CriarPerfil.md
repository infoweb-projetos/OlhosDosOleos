# Projeto Olhos Dos Óleos

## Especificação do caso de uso - Criar Perfil

### Histórico da Revisão 

|  Data  | Versão | Descrição | Autor |
|:-------|:-------|:----------|:------|
| 13/09/2024 | **1.00** | Versão Inicial  | Rita de Cassia |

### 1. Resumo 

Nesse caso de uso um visitante se cadastra no site, o possibilitando visualizar feed, post, interagir na plataforma(fazendo comentarios, curtindo, salvando publicações e submetendo posts)e tambem editar seu perfil no site.

### 2. Atores 

Usuários visitante.

### 3. Pré-condições

O visitante deve acessar o link do site e ir em "Cadastre-se", atravez do feed do site.

### 4. Pós-condições

O sistema mostra o formulario de cadastro por etapas do perfil.

### 5. Fluxos de Evento

#### 5.1. Fluxo Básico

| Ator   | Sistema |
|:-------|:--------|
| 1.O visitante acessa a pagina de "Criar Perfil" por meio do botão de "CADASTRE-SE", localizado no feed do site | 2. O sistema exibe o formulario de Cadastro com a etapa obrigatoria (Informações essenciais), com os seguintes campos; nome, email, nome de usuario e senha e a opçãos de "CADASTRE-SE COM O GOOGLE" e "PROXIMO PASSO".  |
| 3.O visitante preenche os campos corretamente, e clica em "PROXIMO PASSO" | 4.O sistema exibe o formulario de Cadastro com a etapa opcional (Informações de localização), com os seguintes campos; Estado e cidade e as opções de "PASSO ANTERIOR" e "PROXIMO PASSO". |
| 5.O visitante preenche os campos corretamente, e clica em "PROXIMO PASSO" | 6. O sistema exibe o formulario de Cadastro com a etapa opcional (Informações de contato), com os seguintes campos; Instragram, Whatsapp, facebook e youtube as opções de "PASSO ANTERIOR" e "PROXIMO PASSO". |
| 7.O visitante preenche os campos corretamente, e clica em "PROXIMO PASSO" | 8.  O sistema exibe o formulario de Cadastro com a etapa opcional (Informações de personalização e apresentação), com os seguintes campos; Minha foto, minhas cores, biogafria e sou um artista...(tipo de artista) e as opções de "PASSO ANTERIOR" e "PROXIMO PASSO".|
| 9.O visitante preenche os campos corretamente, e clica em "PROXIMO PASSO" | 10. O sistema pede uma confirmação de cadastro exibindo a opção de "ENVIAR" e "PASSO ANTERIOR" |
| 11.O visitante clica em "ENVIAR" | 12.O sistema registra as informaçoes no banco de dados e exibe a pagina de Feed|


#### 5.2. Fluxo alternativo

### Fluxo Alternativo 1: Cadastre-se com o Google

| Ator | Sistema |
|:--------|:--------|
|1. O visitante escolhe a opção de login "CADASTRA-SE COM O GOOGLE" | O sistema redireciona o visitante para a página de autenticação do Google.|
|2. O Visitante insere suas credenciais ou escolhe uma conta Google existente. | O Google solicita permissão para compartilhar dados (nome, e-mail).|
|3. O Visitante o permite compartilhar seus dados(nome, e-mail) | O Sistema cria um perfil com os dados fornecidos pelo Google e redereciona o usuario para pagina de feed.|

### Fluxo Alternativo 2: O Visitante Pula Etapas Opcionais

| Ator | Sistema |
|:--------|:--------|
|1. O visitante preenche corretamete a primeira etapa obrigatoria de informações essenciais(nome, email, nome de usuario e senha), e clica em "PROXIMO PASSO".) | O sistema exibe o formulario de Cadastro com a etapa opcional (Informações de localização), com os seguintes campos; Estado e cidade e as opções de "PASSO ANTERIOR" e "PROXIMO PASSO".|
|2. O visitante escolhe pular a etapa opcional de informações de localização (Estado e cidade), ciclando no botão de "PROXIMO PASSO" | O sistema exibe o formulario de Cadastro com a etapa opcional (Informações de contato), com os seguintes campos; Instragram, Whatsapp, facebook e youtube as opções de "PASSO ANTERIOR" e "PROXIMO PASSO".|
|3. O visitante escolhe pular a etapa opcional de informações de contato (Instagram, Whatsapp, Facebook e youtube), clicando no botão "PROXIMO PASSO" | O sistema exibe o formulario de Cadastro com a etapa opcional (Informações de personalização e apresentação), com os seguintes campos; Minha foto, minhas cores, biogafria e sou um artista...(tipo de artista) e as opções de "PASSO ANTERIOR" e "PROXIMO PASSO".|
|4. O visitante escolhe pular a etapa opcional de Informações de personalização e apresentação(Minha foto, minhas cores, biogafria e sou um artista...(tipo de artista)), ciclando no botão de "PROXIMO PASSO" |O sistema pede uma confirmação de cadastro exibindo a opção de "ENVIAR" e "PASSO ANTERIOR"|
|5.O visitante clica em "ENVIAR" | O sistema registra as informaçoes no banco de dados e exibe a pagina de Feed|



#### 5.3. Fluxos de Exceção

| Exceção | Sistema |
|:--------|:--------|
|1. Erro nas credenciais | Se o usuario colocar uma informação invalida ( Informações essenciais (nome, email, nome de usuario e senha)) ou um campo em branco(no caso das informações essenciais ), vai da erro e retornar a mensagem "Informações invalidas"|



### 6. Protótipos de Interface

https://www.figma.com/proto/ZQxFkLwyHV7kfOODrm58KK/olhosdosoleos?node-id=725-83&node-type=frame&t=cCuzHkpQlCPiHAz9-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=536%3A291

https://www.figma.com/proto/ZQxFkLwyHV7kfOODrm58KK/olhosdosoleos?node-id=767-262&node-type=frame&t=cCuzHkpQlCPiHAz9-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=536%3A291

https://www.figma.com/proto/ZQxFkLwyHV7kfOODrm58KK/olhosdosoleos?node-id=767-435&node-type=frame&t=cCuzHkpQlCPiHAz9-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=536%3A291

https://www.figma.com/proto/ZQxFkLwyHV7kfOODrm58KK/olhosdosoleos?node-id=767-763&node-type=frame&t=cCuzHkpQlCPiHAz9-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=536%3A291

https://www.figma.com/proto/ZQxFkLwyHV7kfOODrm58KK/olhosdosoleos?node-id=788-179&node-type=frame&t=cCuzHkpQlCPiHAz9-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=536%3A291
