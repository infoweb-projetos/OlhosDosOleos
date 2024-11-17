import { useNavigate } from 'react-router-dom';
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/verPastas.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../apiUrl';
import { Pasta, PastaImagem } from '../interfaces/Pasta';

let lengthPasta = 3;
let nomePost = "MORANGO";
let nomeArtista = "ritaLee";
let nome = 'inspirações';


const VerPastas: React.FC = () => {

    const navegar = useNavigate();
    const [pastas, setPastas] = useState<Array<PastaImagem>>([]);

    const CarregarPastas = useCallback(async(token : string | null) => {
        const url = api + 'pastas/minhas';
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const pastasBD = response.data.dados;
            console.log(pastasBD); 
            // setPastas(pastas);
            const pastaLista: Array<PastaImagem> = pastasBD.map((p: PastaImagem) => {
                const obj: PastaImagem = {
                    id: p.id,
                    nome: p.nome,
                    posts: p.posts,
                    imagemUrl: '',
                };
                const postimagem = obj.posts[0].post;
                console.log(postimagem);
                if (postimagem.imagem && postimagem.imagemtipo) {
                    const blob = new Blob([new Uint8Array(postimagem.imagem.data)], { type: postimagem.imagemtipo });
                    const urlImagem = URL.createObjectURL(blob);
                    obj.imagemUrl = urlImagem;
                }
                return obj;
            });
            setPastas(pastaLista);
            
        })
        .catch(error => {
            console.log(error);
            console.log('Token inválido ou expirado');
        });
    }, []);


    useEffect(() => {
        const token = localStorage.getItem('tokenODO');

        if (!token) navegar('/');

        if(token){   
            axios.get(api + 'autenticacao/verificatoken', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                localStorage.removeItem('tokenODO');
                console.log(error);
                navegar(0);
            });
            CarregarPastas(token);
        }
    }, [CarregarPastas, navegar]);

    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            <div className="pagPastas">
                <section className="pastas" >
                    <h2>Minhas pastas</h2>
                    <div className='carrosel'>
                        <div className="new-project-card">
                            <a href="" className="new-project-button">
                                <span className="new-project-icon dmSansThin">+</span>
                                <span className="new-project-text dmSansThin">Criar um Projeto</span>
                            </a>
                            <p className="new-project-description dmSans">
                                Exiba sua arte, receba curtidas e comentários, e chame a atenção de compradores em potencial.
                            </p>
                        </div>
                        {
                                pastas.length < 1 ?
                                (
                                    null
                                )
                                :
                                (
                                    pastas.map((pasta, index) => 
                                    (
                                        <div className='card-pasta' key={index}>
                                        <img className='card-capa' src={pasta.imagemUrl} alt='icone de carregamento' />
                                            <p><strong>{pasta.nome}</strong></p>
                                            <img className='icone' src='../public/imgs/pastas/iconeImg.svg' alt='icone de imagem' /> <span>{pasta.posts.length} publicações</span>
                                        </div>
                                    ))
                                )
                            }
                        <div className='card-pasta'>
                        <img className='card-capa' src='../public/imgs/feed/iconeCarregamento.png' alt='icone de carregamento' />
                            <p><strong>{nome}</strong></p>
                            <img className='icone' src='../public/imgs/pastas/iconeImg.svg' alt='icone de imagem' /> <span>{lengthPasta} publicações</span>
                        </div>
                    </div>
                    <h2>inspirações v</h2>
                    <div className='item-pasta'>
                        <img src="../public/imgs/pastas/vermais-icon.svg" alt="ver mais" />
                        <picture>
                            <img src="../public/imgs/verPerfil/MorangoArt.png" alt="arte da pasta" />
                        </picture>
                        <p>{nomePost}</p>
                        <img src="../public/imgs/verPerfil/perfil.png" alt="" />
                        <span>{nomeArtista}</span>
                    </div>
                    <div className='item-pasta'>
                        <picture>
                            <img src="../public/imgs/verPerfil/MorangoArt.png" alt="arte da pasta" />
                        </picture>
                    </div>
                </section>
            </div>
            <RodapeSite />
        </div>
    );
}
export default VerPastas;