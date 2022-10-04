function d(date) {
    return date.toDate().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })
  }
  
  function template(params) {
    return `
        <!DOCTYPE html>Fala builder 👷👷‍♀️!! danicuki da web3dev aqui.<br>
        <br>
        Sua inscrição foi feita no bootcamp "${
          params.course.title
        }".&nbsp; O bootcamp já esta disponível.<br>
        <br>
        <b>Esse projeto é praticamente todo assíncrono.</b>&nbsp;O único momento ao vivo foi em nossa live que já aconteceu. Ela está gravada e disponibilizada para você assistir no nosso youtube aqui<a href="ttps://www.youtube.com/c/web3dev"<br>
        <br>
        <b>O material do bootcamp está disponível <a href="https://bootcamp.web3dev.com.br/courses/${
          params.cohort.course_id
        }">aqui</a>&nbsp;<br>
        <br>
        <h3>Algumas informações importantes</h3>
        1.Ao final do bootcamp você terá direito a receber um <b>NFT exclusivo</b>. Vamos dar para você o cargo de #graduad@ no nosso Discord e terá acesso a vagas de trabalho web3 em nossos parceiros.<br>
        <br>
        2. Não se esqueça de conectar seu Discord na <a href="https://bootcamp.web3dev.com.br/courses/${
          params.cohort.course_id
        }">plataforma de bootcamps</a>, pois precisamos adicionar você no canal secreto "#⛺ | ${
      params.cohort.discord_channel
    }" da turma que fará parte deste bootcamp junto com você.<br>
        <br>
        3. Por favor, não chama isso de "curso"! É um projeto, bootcamp, hackday, chama do que quiser. Só quero que você faça um trabalho legal com um pouco de guia :-).<br>
        <br>
        Se tiver perguntas, mande no canal #chat-geral.<br>
        <br>
        Estou animado para ver o projeto de todo mundo 💜💜💜.<br>
        <br>
        danicuki
    `
  }
  module.exports = template