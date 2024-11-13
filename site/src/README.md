# Pasta src do Projeto React
É aqui que de fato fica onde codificaremos em react

### Arquivos importantes da Raiz do Src
Arquivo | Descrição 
:---- | :--- 
[main.tsx](main.tsx) | é onde coloqeui o CSS universal. É quem exibe o App.tsx
[App.tsx](App.tsx) | é onde fica estrutura de rotas, troca de paginas do site. Se quiser adicionar uma pagina, é aqui que deve mexer para deixar ela online.
[apiUrl.ts](apiUrl.ts) | arquivo que contem a URL atual da API. Era necessario para que em produção não desse problema, mas, como excedi a cota gratis, só serve para diminuir codigo e não ter que ficar copiando e colando https://linkgrande/. Já tem comentarios no arquivo que indicam em qual situação deve estar descomentada.

### Pastas da Raiz do Src
Pasta | Descrição 
:---- | :--- 
[paginas](paginas) | Onde ficam as paginas exibidas no site e que são organizadas no App.tsx.
[componentes](componentes) | Trechos de React que se repetem em outras telas frequentemente separados em um arquivo a parte para diminuir o codigo.
[interfaces](interfaces) | Classes que uso para que a API carregue os dados das tabelas neles.
[estilos](estilos) | E aqui que fica todo o CSS criado e as fontes que baixei para usar no projeto.
[scripts](scripts) | É onde fica todos os scripts que servem para fins mais esteticos. É aqui geralmente que deixo scripts que traduzi do javascript pro typescript.

### Adicionar nova pagina
Para adicionar primeiro voce deve criar um arquivo tsx na pasta paginas, PagNome.tsx(geralmente uso PascalCase para nomes de paginas ou componente). 

Com o arquivo criado voce tem adicionar o condeudo dela.  voce criar uma constante(```const```) que seja do tipo ```React.FC``` e no conteudo da função insira um ```return``` com seu html
``` javascript
const PagNome: React.FC = () => { // = () => se chama arrow function. Toda pagina no sistema é uma.
    //Pode adicionar logica aqui antes do return
    let ab = 1 + 2;
    return (
        <div className='tagPaiDeTodos'>
           <p>Conteudo aqui</p>
           <hr />
           {
             //para inserir typescript em react tem que usar essas chaves.
             ab;
           }
        </div>
    );
}
export default PagNome;
```
É importante lembrar que dentro do parente so pode ter uma tag pai, ou seja dentro do return não pode ser feito "```return(<div>a</div><div>b</div>)```". Apenas pode ter uma tag pai, mas dentro dessa tag pai voce pode colocar o que quiser.
No exemplo acima PagNome é o nome da pagina. e com ela criada basta ir no App.tsx e adicionar uma rota referente a essa pagina. So identificar os comentarios no codigo abaixo.
``` javascript
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entrar from './paginas/Entrar';
import Feed from './paginas/Feed'; 
import MeuPerfil from './paginas/MeuPerfil';
import Perfil from './paginas/Perfil';
import CriarPost from './paginas/CriarPost';
import Cadastro from './paginas/Cadastro';
import EditarPerfil from './paginas/EditarPefil';
import PagNome from './paginas/PagNome'; // nome da arrow function depois caminho do arquivo

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed/>}  />
        <Route path="/entrar"  element={<Entrar />} />
        <Route path="/cadastro"  element={<Cadastro />} />
        <Route path="/meuperfil"  element={<MeuPerfil />} />
        <Route path="/editar"  element={<EditarPerfil />} />
        <Route path="/editar/perfil"  element={<EditarPerfil />} />
        <Route path="/perfil/:perfilid"  element={<Perfil />} />
        <Route path="/postar"  element={<CriarPost />} />
        <Route path="/pagnomelink"  element={<CriarPost />} /> // É aqui que sua tela é adicionado ao site rodando e pode ser acessado no caminho indicaod no path /pagnomelink
      </Routes>
    </Router>
  );
};

export default App;
```
### Padronização Recomendadas 

#### Escrita
Não sigo muito padrão aqui, mas tento.

- Em nome de componente, nomes de interfaces, functions ou arrouw function, ou paginas, a forma do Pascal Case(Todas palavras com iniciais maiusculas, sem separadores como _ ou -) 

- Codigo typescript comum, classes CSS e Ids html uso Camel Case(primeira palavra sempre toda minuscula e as palavras seguintes com inicial Maiusculas, sem separadores).

- Em atributos de interfaces deixo tudo minusculo, sem separadores

#### Modelo limpo com Header e Footer
Na pasta de paginas tem um [Modelo limpo](site/paginas/ModeloLimpo.tsx) que serve justamente para copiar e colar e criar uma nova pagina na area indicada("Conteudo aqui")
``` javascript
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';

const NomePagina: React.FC = () => {
    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            <div className="areaConteudo">
                Conteudo aqui
            </div>
            <RodapeSite />
        </div>
    );
}
export default NomePagina;
```

#### Manter a tag pai com um ID unico ou classe mesmo em relação a outras paginas
Por algum motivo, sempre que importo um CSS em uma pagina especifica ele é aplicado pora todas as outras. Então para garantir que não vai ter conflito de css. Use um id ou classe UNICAS para que no CSS você possa especificar ela
 Exemplo:

``` css
/** Escolha id(#) ou classe unica(.) e sempre, SEMPRE, use ela antes de qualquer elemento html(tipo p, div, br) **/
#esseIdTemQueSerUnico{ }
.ouEssaClasseTemQueSerUnica{ }
```
``` javascript
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/algum.css'; // importe seu estilo aqui

const NomePagina: React.FC = () => {
    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            <div id="esseIdTemQueSerUnico"  className="areaConteudo ouEssaClasseTemQueSerUnica">
                Conteudo aqui
            </div>
            <RodapeSite />
        </div>
    );
}
export default NomePagina;
```
Sugiro isso porque caso seu CSS dê comflito em outra pagina, voce vai ter que concertar. para esses id ou classes, eu geralmente uso classes, eu boto o nome da pagina com "pag" antes. Exemplo: "pagEditar".


#### Axios
Para requisitar da api usamos Axios. No exemplo abaixo alem de estar mostrando uma requisição, tá mostrando como exibir imagem. Lembrando que para usar o Axios é necessario o import dele no inicio da pagina. O exemplo a baixo vem da [pagina de perfil](paginas/Perfil.tsx).
``` javascript
const MontarPerfil = useCallback (async (id : string | undefined) => {
        const url = api + `usuarios/outroperfil/${id}`; // api vem da apiUrl.ts, usaurios vem do controlador, e outroperfil é o endpont
        axios.get(url, {}) //usando get do axios
        .then(response => {
            const usu = response.data.dados;
            setUsuario(usu);

            if (!usu && !usuario){
                return;
            }

            if (usu.imagem && usu.imagem.data && usu.imagemtipo) {
                const blob = new Blob([new Uint8Array(usu.imagem.data)], { type: usu.imagemtipo }); // converte imagem em blob
                const urlImagem = URL.createObjectURL(blob); // converti imagem em url para poder ser usada em uma tag img
                setImagemUrl(urlImagem);
            } else {
                setImagemUrl("/imgs/verPerfil/perfil.png");
            }

            // Resto do coduigo.

            if (usu.cor1) setPainelPerfilCor("#" + usu.cor1);
        })
        .catch(error => {
            console.log(error);
            console.log('Token inválido ou expirado');
        });
    }, [usuario])
```


