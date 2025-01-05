export const tempoRelativo = (data: Date | null | undefined): string => {
    if (data && data instanceof Date){
        const agora = new Date();
        const diferencaMs = agora.getTime() - data.getTime();
        const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
        const diferencaHoras = Math.floor(diferencaMs / (1000 * 60 * 60));
        const diferencaDias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
        const diferencaMeses = Math.floor(diferencaDias / 30);
        const diferencaAnos = Math.floor(diferencaMeses / 12);
      
        if (diferencaMinutos < 60) {
          return `Há ${diferencaMinutos} minuto${diferencaMinutos !== 1 ? 's' : ''} atrás`;
        } else if (diferencaHoras < 24) {
          return `Há ${diferencaHoras} hora${diferencaHoras !== 1 ? 's' : ''} atrás`;
        } else if (diferencaDias < 30) {
          return `Há ${diferencaDias} dia${diferencaDias !== 1 ? 's' : ''} atrás`;
        } else if (diferencaMeses < 12) {
          return `Há ${diferencaMeses} mês${diferencaMeses !== 1 ? 'es' : ''} atrás`;
        } else {
          return `Há ${diferencaAnos} ano${diferencaAnos !== 1 ? 's' : ''} atrás`;
        }
    }
    else return "";
   
}  