import HeaderSite from '../componentes/header';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Usuario } from '../interfaces/Usuario';

const Feed: React.FC = () => {
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('tokenODO');
        if (!token) {
            navegar('/');
        }
        else {
            axios.get('http://localhost:3000/usuarios/perfil', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data.dados);
                    setUsuario(response.data.dados);
                    console.log('Token válido');
                })
                .catch(error => {
                    console.log(token);
                    console.log('Token inválido ou expirado');
                    localStorage.removeItem('tokenODO');
                    navegar('/');
                });
        }
    }, [navegar]);

    return (
        <div className="paginaPerfil">
            <HeaderSite />
            <form action="" className="banner ">
                <img className="esconda" alt="Banner Image" id="imgBanner" />
                <button type="button" className="add-banner-btn">
                    <img src="/imgs/verPerfil/add_image.svg" alt="Add Banner" />
                </button>
                <input type="file" id="inputImgBanner" />
                <div className="banner-text">
                    Adicionar uma imagem de banner<br />
                    Dimensões ideais 3200 x 410px
                </div>
            </form>

            <div className="page-container">
                <div className="main-content">
                    <div className="portfolio-section">
                        <h1 className="dmSansThin">Portfólio</h1>
                        <div className="portfolio-grid">
                            <div className="new-project-card">
                                <a href="" className="new-project-button">
                                    <span className="new-project-icon dmSansThin">+</span>
                                    <span className="new-project-text dmSansThin">Criar um Projeto</span>
                                </a>
                                <p className="new-project-description dmSans">
                                    Exiba sua arte, receba curtidas e comentários, e chame a atenção de compradores em potencial.
                                </p>
                            </div>
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
                            <div className="project-card imagemPortifolio">
                                <a href="">
                                    <img src="/imgs/temp/imgPortifolio.png" alt="Obra do artista." />
                                </a>
                            </div>
                            <div className="project-card imagemPortifolio">
                                <a href="">
                                    <img src="/imgs/temp/imgPortifolio.png" alt="Obra do artista." />
                                </a>
                            </div>
                            <div className="project-card imagemPortifolio">
                                <a href="">
                                    <img className="conteudoSensivel" src="/imgs/temp/imgPortifolio.png" alt="Obra do artista." />
                                    <div>
                                        <img src="/imgs/verPerfil/olhoSensivel.svg" alt="Icone indicando conteudo sensivel." />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="profile-card">
                        <div className="profile-header">
                            <div className="profile-image-background"></div>
                            <img src={usuario?.imagem ? usuario.imagem : "/imgs/verPerfil/perfil.png"} alt="Imagem de Perfil" className="profile-image" />
                            <div className="profile-info">
                                <h2 className="dmSansThin"> {usuario ? usuario.nome : ""}</h2>
                                <p className="dmSansThin"> {usuario ? usuario.tipo : ""}</p>
                                <a href="" className="dmSansThin botaoComum fundoBtVermelho"> <img src="/imgs/header/maisIcone.png" />Seguir</a>
                                <p className="dmSans"><img className="location-icon" src="/imgs/verPerfil/location_icon.png" alt="Localização" />
                                    {usuario ? usuario.localizacao : ""}</p>
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

                        <div className="profile-actions">
                            <a href=""><img className="button-icon" src="/imgs/verPerfil/edit_icon.svg" alt="Editar" />Editar Informações do
                                perfil</a>
                            <a href="" className="no-padding"><img className="button-icon" src="/imgs/verPerfil/personalize_icon.svg"
                                alt="Personalizar" />Personalizar perfil</a>
                        </div>

                        <div className="profile-stats">
                            <div className="stat">
                                <span className="count">1234</span>
                                <span className="label">Seguidores</span>
                            </div>
                            <div className="stat">
                                <span className="count">56</span>
                                <span className="label">Posts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Feed;