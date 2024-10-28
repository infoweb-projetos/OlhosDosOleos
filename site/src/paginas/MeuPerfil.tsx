import HeaderSite from '../componentes/header';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Usuario } from '../interfaces/Usuario';
import { Post } from '../interfaces/Post';
import {api} from '../apiUrl.ts';

const MeuPerfil: React.FC = () => {
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [imagemUrl, setImagemUrl] = useState<string>("/imgs/verPerfil/perfil.png");
    const [bannerUrl, setBannerUrl] = useState<string | undefined>(undefined);
    const [posts, setPosts] = useState<Array<Post>>([]);

    const [painelPerfilCor, setPainelPerfilCor] = useState<string>('');

    const [imgBtBanner, setImgBtBanner] = useState<string>("/imgs/verPerfil/add_image.svg");
    const arquivoInputRef = useRef<HTMLInputElement | null>(null);
    const [estiloBtBanner, setEstiloBtBanner] = useState({});

    const [ehMeuPerfil, setEhMeuPerfil] = useState<boolean>(false);

    const btEnviarBanner = () => {
        arquivoInputRef.current?.click();
    };
    const aoMudarValorInputArquivo = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const token = localStorage.getItem('tokenODO');
        const arquivo = event.target.files?.[0];
        if (arquivo && ehMeuPerfil) {
            const formData = new FormData();
            formData.append('banner', arquivo);
            try {
                // Enviar o arquivo com Axios
                const response = await axios.patch(api + 'usuarios/banner', formData, {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'multipart/form-data',
                    },
                  });
                console.log('Arquivo enviado com sucesso', response.data);
                navegar(0);
            } catch (error) {
                console.error('Erro ao enviar o arquivo', error);
            }
        }
    };

    const MontarPerfil = useCallback(async(token : string | null) => {
        const url = api + 'usuarios/perfil';
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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
                setImgBtBanner('/imgs/verPerfil/editarBanner.svg');
                setEstiloBtBanner({
                    top: "90%",
                    left: "3%"
                });
            } else {
                setBannerUrl(undefined);
                setImgBtBanner('/imgs/verPerfil/add_image.svg');
                setEstiloBtBanner({});
            }

            if (usu.cor1) setPainelPerfilCor("#" + usu.cor1);
        })
        .catch(error => {
            console.log(error);
            console.log('Token inválido ou expirado');
            setEhMeuPerfil(false)
        });
    }, [usuario]);
    const MeusPosts = useCallback(async (token : string | null) => {
        const url = api + 'posts/meus'
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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
            setEhMeuPerfil(false)
        });
    }, [posts])

    useEffect(() => {
        const token = localStorage.getItem('tokenODO');

        if (!token) navegar('/');

        if(token){   
            setEhMeuPerfil(true);
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
        }
        if (!usuario) MontarPerfil(token);
        if (posts.length < 1) MeusPosts(token);
    }, [MeusPosts, MontarPerfil, navegar, posts.length, usuario]);

    return (
        <div className="paginaPerfil">
            <HeaderSite />
            <form action="" className="banner ">
                <img className="esconda" alt="Banner Image" src={bannerUrl} id="imgBanner" />
                {
                    ehMeuPerfil ?
                    (
                    <button style={estiloBtBanner}  onClick={btEnviarBanner} type="button" className="add-banner-btn">
                        <img src={imgBtBanner} alt="Add Banner" />
                    </button>

                    )
                    :
                    (null)
                }
                <input type="file" id="inputImgBanner"  ref={arquivoInputRef} onChange={aoMudarValorInputArquivo}/>
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
                                <Link to="/editar/perfil"><img className="button-icon" src="/imgs/verPerfil/edit_icon.svg" alt="Editar" />Editar Informações do
                                    perfil</Link>
                                <Link to="editar/perfil" className="no-padding branco"><img className="button-icon" src="/imgs/verPerfil/personalize_icon.svg"
                                    alt="Personalizar" />Personalizar perfil</Link>
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
export default MeuPerfil;