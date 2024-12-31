import '../estilos/verPost.css';

const VerPost: React.FC = () => {
    return (
        <div className="modalVerPost">
            <button>
                <img src='/imgs/verPost/iconeFechar.svg'/>
            </button>
            <div className='modalVerPostCorpo'>
                <div className='modalVerPostConteudo'>
                    <div className='modalVerPostConteudoCabecalho'>
                        <img src='/imgs/verPerfil/perfil.png'/>
                        <div>
                            <h5>Titulo</h5>
                            <div>
                                <span>Autor</span>
                                <canvas></canvas>
                                <button> Seguir</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className='modalVerPostConteudoImagens'>
                        <img src='/imgs/temp/bannerTemp.png'/>
                    </div>

                    <div className='modalVerPostConteudoDesc'>
                        <h4>Titulo</h4>
                        <p>Desc</p>
                        <div>
                            <figure>
                                <img src='/imgs/verPost/iconeCoracaoBranco.svg' />
                                <figcaption>1</figcaption>
                            </figure>
                            <figure>
                                <img src='/imgs/verPost/iconeComentarioBranco.svg' />
                                <figcaption>1</figcaption>
                            </figure>
                        </div>
                    </div>

                    <div className='modalVerPostConteudoAreaComentario'>
                        <div className='modalVerPostConteudoComentarios'>
                            <div>
                                <div>
                                    <img src='/imgs/verPerfil/perfil.png' />
                                    <textarea placeholder='O que você achou da postagem?'></textarea>
                                </div>
                                <button>Publicar um comentário</button>
                            </div>
                            <ul>
                                <li>
                                    <figure>
                                        <a href='#'><img src='/imgs/verPerfil/perfil.png' /></a>
                                    </figure>
                                    <div>
                                        <div>
                                            <h6 className='ubuntoThin'>Nome</h6>
                                            <canvas></canvas>
                                            <span className='ubuntoThin'>Há 5 dias</span>
                                        </div>
                                        
                                        <p className='ubuntoThin'>comentário</p>
                                    </div>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <a href='#'><img src='/imgs/verPerfil/perfil.png' /></a>
                                    </figure>
                                    <div>
                                        <div>
                                            <h6 className='ubuntoThin'>Nome</h6>
                                            <canvas></canvas>
                                            <span className='ubuntoThin'>Há 5 dias</span>
                                        </div>
                                        
                                        <p className='ubuntoThin'>comentário</p>
                                    </div>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <a href='#'><img src='/imgs/verPerfil/perfil.png' /></a>
                                    </figure>
                                    <div>
                                        <div>
                                            <h6 className='ubuntoThin'>Nome</h6>
                                            <canvas></canvas>
                                            <span className='ubuntoThin'>Há 5 dias</span>
                                        </div>
                                        
                                        <p className='ubuntoThin'>comentário</p>
                                    </div>
                                   
                                </li>
                            </ul>
                        </div>
                        <div className='modalVerPostConteudoAreaComentarioAside'>
                            <div className='modalVerPostConteudoAreaComentarioAsideProprietario'>
                                <p>PROPRIETÁRIO</p>
                                <div>
                                    <img src='/imgs/verPerfil/perfil.png'/>
                                    <div>
                                        <p>Autor</p>
                                        <span><img src='/imgs/verPost/iconeLocalizacao.svg'/> Localização</span>
                                    </div>
                                </div>
                                <button className='modalVerPostConteudoAreaComentarioAsideProprietarioBtSeguir' >
                                    <img src='/imgs/verPost/iconeSeguir.svg' />
                                    Seguir
                                    </button>
                                <button className='modalVerPostConteudoAreaComentarioAsideProprietarioBtVer'>
                                    <img  src='/imgs/verPost/iconeVer.svg' />
                                    Ver Perfi
                                </button>
                            </div>
                            <div className='modalVerPostConteudoAreaComentarioAsidePosts'>
                                <h5>Titulo</h5>
                                <div>
                                    <figure>
                                        <img src='/imgs/verPost/iconeCoracaoVermelho.svg' />
                                        <figcaption>1</figcaption>
                                    </figure>
                                    <figure>
                                        <img src='/imgs/verPost/iconeComentarioVermelho.svg' />
                                        <figcaption>1</figcaption>
                                    </figure>
                                </div>
                                <p>Publicado em: 22 de Outubro de 2024</p>
                            </div>
                            <ul className='modalVerPostConteudoAreaComentarioAsideTags modalVerPostConteudoAreaComentarioAsideTagsTag'>
                                <li># tag</li>
                                <li># tag</li>
                                <li># tag</li>
                                <li># tag</li>
                                <li># tag</li>
                                <li># tag</li>
                            </ul>
                            <ul className='modalVerPostConteudoAreaComentarioAsideTags'>
                                <li># tag</li>
                            </ul>
                        </div>
                    </div>
                </div>
               
            </div>
            <ul>
                   <li className='modalVerPostAcoesPerfil'>
                       <button>
                           <img src='/imgs/verPerfil/perfil.png'/>
                       </button>
                       <p>Seguir</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeCurtir.svg' />
                       </button>
                       <p>Curtir</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeComentar.svg' />
                       </button>
                       <p>Comentar</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeSalvar.svg' />
                       </button>
                       <p>Salvar</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeCompartilhar.svg' />
                       </button>
                       <p>Compartilhar</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeBaixar.svg' />
                       </button>
                       <p>Baixar</p>
                    </li> 
                </ul>
        </div>
    );
}
export default VerPost;