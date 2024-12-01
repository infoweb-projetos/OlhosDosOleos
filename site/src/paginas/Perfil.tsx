import HeaderSite from '../componentes/header';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Usuario } from '../interfaces/Usuario';
import { Post } from '../interfaces/Post';
import {api} from '../apiUrl.ts';
import '../estilos/verPerfil.css';
import { VerificaToken } from '../scripts/uteis.tsx';

const Perfil: React.FC = () => {
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [imagemUrl, setImagemUrl] = useState<string>("/imgs/verPerfil/perfil.png");
    const [bannerUrl, setBannerUrl] = useState<string | undefined>(undefined);
    const [posts, setPosts] = useState<Array<Post>>([]);

    const [painelPerfilCor, setPainelPerfilCor] = useState<string>('');

    const ehMeuPerfil  = false;
    const { perfilid } = useParams();

    const MontarPerfil = async (id : string | undefined) => {
        const url = api + `usuarios/outroperfil/${id}`;
        console.log(url);
        axios.get(url, {})
        .then(response => {
            const usu = response.data.dados;
            setUsuario(usu);

            if (!usu && !usuario){
                return;
            }

            if (usu.imagem && usu.imagem.data && usu.imagemtipo) {
                const blob = new Blob([new Uint8Array(usu.imagem.data)], { type: usu.imagemtipo });
                const urlImagem = URL.createObjectURL(blob);
                setImagemUrl(urlImagem);
            } else {
                setImagemUrl("/imgs/verPerfil/perfil.png"); // Ou uma imagem padrão
            }

            if (usu.banner && usu.banner.data && usu.bannertipo) {
                const blob = new Blob([new Uint8Array(usu.banner.data)], { type: usu.bannertipo });
                const urlImagem = URL.createObjectURL(blob);
                setBannerUrl(urlImagem);
            } else {
                setBannerUrl(undefined);
            }

            if (usu.cor1) setPainelPerfilCor("#" + usu.cor1);
        })
        .catch(error => {
            console.log(error);
            console.log('Token inválido ou expirado');
        });
    }
    const MeusPosts = async (id : string | undefined) => {
        const url = api + `posts/usuario/${id}`;
        console.log(url);
        axios.get(url, { })
        .then(response => {
            const postsBD = response.data.dados;
            if (!postsBD && !posts){
                return;
            }
            const postLista: Array<Post> = postsBD.map((p: Post) => {
                const obj: Post = {
                    titulo: p.titulo,
                    usuario: p.usuario,
                    usuarioid: p.usuarioid,
                    sensivel: p.sensivel,
                    rascunho: p.rascunho,
                    imagemUrl: ''
                };

                if (p.imagem && p.imagemtipo) {
                    const blob = new Blob([new Uint8Array(p.imagem.data)], { type: p.imagemtipo });
                    const urlImagem = URL.createObjectURL(blob);
                    obj.imagemUrl = urlImagem;
                }

                if (obj.usuario && obj.usuario && obj.usuario.imagem && obj.usuario.imagemtipo) {
                    const blob = new Blob([new Uint8Array(obj.usuario.imagem.data)], { type: obj.usuario.imagemtipo });
                    const urlImagem = URL.createObjectURL(blob);
                    obj.usuario.imagemUrl = urlImagem;
                } else {
                    if (obj.usuario) obj.usuario.imagemUrl = "/imgs/verPerfil/perfil.png";
                }

                return obj;
            });
            setPosts(postLista);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const VerificaSeSouEu = async () => {
        if (perfilid && Number(perfilid) > 0) {
            axios.get(api + `usuarios/soueu/${perfilid}`, {
                headers: {
                    'Authorization': `Bearer ${tokenAtual}`
                }
            })
            .then(response => {
                if (response.data) {
                    if (response.data.ehMeuPerfil) navegar('/meuperfil');
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const VerificarToken = async () => {
        const token = await VerificaToken();
        if (token) atualizarTokenAtual(token);
    }
    useEffect(() => {
        VerificarToken();
    }, []);

    useEffect(() => {
        if (tokenAtual){
            VerificaSeSouEu();
        }
        MeusPosts(perfilid);
        MontarPerfil(perfilid);
    }, [tokenAtual]);

    return (
        <div className="paginaPerfil">
            <HeaderSite />
            <form action="" className="banner ">
                <img className="esconda" alt="Banner Image" src={bannerUrl} id="imgBanner" />
                {
                    !usuario?.banner && ehMeuPerfil? 
                    ( 
                    <div className="banner-text">
                        Adicionar uma imagem de banner<br />
                        Dimensões ideais 3200 x 410px
                    </div>
                    )
                    :
                    ""
                }
               
            </form>

            <div className="page-container">
                <div className="main-content">
                    <div className="portfolio-section">
                        <h1 className="dmSansThin">Portfólio</h1>
                        <div className="portfolio-grid">
                            {
                                posts.length < 1  && ehMeuPerfil?
                                (
                                <div className="new-project-card">
                                    <a href="" className="new-project-button">
                                        <span className="new-project-icon dmSansThin">+</span>
                                        <span className="new-project-text dmSansThin">Criar um Projeto</span>
                                    </a>
                                    <p className="new-project-description dmSans">
                                        Exiba sua arte, receba curtidas e comentários, e chame a atenção de compradores em potencial.
                                    </p>
                                </div>
                                )
                                :
                                (null)
                            }

                            {
                                posts.length < 1 && ehMeuPerfil ?
                                (
                                <div className="project-card guiaCondutor">
                                    <p className="dmSansThin">Lista de verificação de perfil</p>
                                    <ul>
                                        <li>
                                            <a className="bordaInferiror" href="#">
                                                <div>
                                                    <canvas className="circuloBrancoVazio"></canvas>
                                                    <span className="dmSansThin">Adicionar Localização</span>
                                                </div>
                                                <img src="/imgs/verPerfil/setaDireita.svg" alt="Seta apontando pra direita." />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="bordaInferiror" href="#">
                                                <div>
                                                    <canvas className="circuloBrancoVazio"></canvas>
                                                    <span className="dmSansThin">Adicionar Contatos</span>
                                                </div>
                                                <img src="/imgs/verPerfil/setaDireita.svg" alt="Seta apontando pra direita." />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="bordaInferiror" href="#">
                                                <div>
                                                    <canvas className="circuloBrancoVazio"></canvas>
                                                    <span className="dmSansThin">Adicionar Biografia</span>
                                                </div>
                                                <img src="/imgs/verPerfil/setaDireita.svg" alt="Seta apontando pra direita." />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div>
                                                    <canvas className="circuloBrancoVazio"></canvas>
                                                    <span className="dmSansThin">Adicionar Foto de Perfil</span>
                                                </div>
                                                <img src="/imgs/verPerfil/setaDireita.svg" alt="Seta apontando pra direita." />
                                            </a>
                                        </li>
                                    </ul>
                                    <a href=""><b className="bordaInferiror dmSansThin">Não mostrar novamente</b></a>
                                </div> 
                                )
                                :
                                (null)
                            }
                            

                            
                            {
                                posts.length < 1 ?
                                (
                                    null
                                )
                                :
                                (
                                    posts.map((post, index) => 
                                    (
                                        <div key={index} className="project-card imagemPortifolio">
                                            <a href="">
                                                <img className={ post.sensivel ? "conteudoSensivel" : ""} src={post.imagemUrl} alt="Obra do artista." />
                                                {
                                                post.sensivel ?
                                                (
                                                <div>
                                                    <img src="/imgs/verPerfil/olhoSensivel.svg" alt="Icone indicando conteudo sensivel." />
                                                </div>
                                                )
                                                :
                                                (null)
                                                }
                                                
                                            </a>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>

                    <div className="profile-card" style={{ backgroundColor: painelPerfilCor }}>
                        <div className="profile-header">
                            <div style={{ backgroundColor: painelPerfilCor, boxShadow: '' }} className="profile-image-background"></div>
                            <img src={imagemUrl} alt="Imagem de Perfil" className="profile-image" />
                            <div className="profile-info">
                                <h2 className="dmSansThin"> {usuario ? usuario.nome : ""}</h2>
                                <p className="dmSansThin"> {usuario?.tipoid ? usuario.tipoid : ""}</p>

                                <a href="" className={`dmSansThin botaoComum ${ehMeuPerfil ? "visibilidadeOculta" : ""} fundoBtVermelho`}> 
                                <img src="/imgs/header/maisIcone.png" />Seguir
                                </a>

                                <div className='seguidoresArea'>
                                    <div className='seguidoresLinha '>
                                        <p><b className='dmSansThin'>Seguidores: </b></p>
                                        <p><b className='dmSansThin'>0</b></p>
                                    </div>
                                    <div className='seguidoresLinha'>
                                        <p className='dmSansThin'>Exibições de Posts:</p>
                                        <p className='dmSansThin'>0</p>
                                    </div>

                                </div>
                                {usuario?.localizacao ?
                                    (
                                        <p className="dmSansThin textoLocalizacao">
                                            <img className="location-icon" src="/imgs/verPerfil/location_icon.png" alt="Localização" />
                                            {usuario.localizacao}
                                        </p>
                                    )

                                    : ""
                                }

                            </div>
                        </div>

                        <p className="dmSansThin descricaoPerfil">
                            {usuario ? usuario.biografia : ""}
                        </p>

                        <div className="profile-contacts">
                            <h3 className="dmSansThin">Contatos</h3>
                            <p>Na WEB</p>
                            <table className="contacts-table">
                                <tbody>
                                    <tr>
                                        <td className="contact-cell">
                                            <div className="contact-content">
                                                <Link className='linkContatos' to={usuario?.zap ? usuario?.zap : "#"}>
                                                    <img className="contact-icon" src="/imgs/verPerfil/whatsapp_icon.png" alt="WhatsApp" />
                                                    <span>WhatsApp</span>
                                                    <img className="external-icon" src="/imgs/verPerfil/external_link_icon.png" alt="External Link" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="contact-cell">
                                            <div className="contact-content">
                                                <Link className='linkContatos' to={usuario?.face ? usuario?.face : "#"}>
                                                    <img className="contact-icon" src="/imgs/verPerfil/facebook logo_icon.png" alt="Facebook" />
                                                    <span>Facebook</span>
                                                    <img className="external-icon" src="/imgs/verPerfil/external_link_icon.png" alt="External Link" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="contact-cell">
                                            <div className="contact-content">
                                                <Link className='linkContatos' to={usuario?.insta ? usuario?.insta : "#"}>
                                                    <img className="contact-icon" src="/imgs/verPerfil/instagram_icon.png" alt="Instagram" />
                                                    <span>Instagram</span>
                                                    <img className="external-icon" src="/imgs/verPerfil/external_link_icon.png" alt="External Link" />
                                                </Link>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="contact-cell">
                                            <div className="contact-content">
                                                <Link className='linkContatos' to={usuario?.youtube ? usuario?.youtube : "#"}>
                                                    <img className="contact-icon" src="/imgs/verPerfil/youtubelogo_icon.png" alt="YouTube" />
                                                    <span>YouTube</span>
                                                    <img className="external-icon" src="/imgs/verPerfil/external_link_icon.png" alt="External Link" />
                                                </Link>

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {
                            ehMeuPerfil ?
                            (
                            <div className="profile-actions">
                                <a href=""><img className="button-icon" src="/imgs/verPerfil/edit_icon.svg" alt="Editar" />Editar Informações do
                                    perfil</a>
                                <a href="" className="no-padding branco"><img className="button-icon" src="/imgs/verPerfil/personalize_icon.svg"
                                    alt="Personalizar" />Personalizar perfil</a>
                            </div>
                            )
                            :
                            (null)
                        }
                      
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Perfil;