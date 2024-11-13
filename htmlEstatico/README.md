# Pasta com htmls Estaticos 
Se atentem a isso quando forem criar.

### Padrões de Escrita recomendadas
#### Camel Case
Escreve sem separadores e a primeira palavra é toda minuscula e a letra inicial do resto de cada palavra é maiscula.

Usei para classes css, ids html e codigo javascript.

#### Pascal Case
Escreve sem separadores e a letra inicial de cada palavra é maiscula.

usei para nomes de functions.

### Javascript
Não use nada muito complexo que pode ser chato passar para typescript, ou tente usar logo typescript.

### Criar nova pagina
No React todo esse html estatico vai parar em um div, não em um body. Por isso sempre começe com um div dentro da tag body e de a esse div um id unico, ou classe, mesmo entre outras paginas.

### CSS
no React um css aplicado a uma pagina fica para todas, então para evitar conflitos sempre coloque um id unico ou classe unica, eu geralmente uso classe. Geralmente como padrão eu coloco "pag" e o nome da pagina, assim: "pagEditar". Isso é para que no CSS voce SEMPRE, SEMPRE mesmo, use esse id para aplicar estilo. Exemplo
``` css
/** Escolha id(#) ou classe unica(.) e sempre, SEMPRE, use ela antes de qualquer elemento html(tipo p, div, br) **/
#esseIdTemQueSerUnico{ /** estilos **/ }
.ouEssaClasseTemQueSerUnica{ /** estilos **/ }
```
``` html
<div id="esseIdTemQueSerUnico" class="areaConteudo ouEssaClasseTemQueSerUnica"> <!-- para exemplo coloquei pagNome -->
  <p>Conteudo aqui</p>```
</div>
```

### Pagina padrão com Header e Footer
A pagina [estruturaPadrão](htmlEstatico/estruturaPadrao.html) pode ser usuada par copiar e colar para mostrar outra pagina. mas adicione na seguinte div: 
``` html
<div id="" class="areaConteudo">
  <!-- Conteudo aqui, imagine isso aqui como o body / main -->
  <p>Conteudo aqui</p>```
</div>
```
um id unico ou classe unica, eu geralmente uso classe. Geralmente como padrão eu coloco "pag" e o nome da pagina, assim: "pagEditar". Exemplo no codigo:
``` html
<div class="areaConteudo pagNome"> <!-- para exemplo coloquei pagNome -->
  <p>Conteudo aqui</p>```
</div>
```
