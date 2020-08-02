class EnderecoService {
  static async buscarPorCep(cep) {

      cep = cep.replace('.', '')
      cep = cep.replace('-', '')
  
      try {
          let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json`)
          let resultado = await resposta.json()
          if (resultado.erro) throw {
              message: "CEP não reconhecido",
              mensagemCliente: "CEP não reconhecido"
          }
          return {
              cep: resultado.cep,
              logradouro: resultado.logradouro,
              bairro: resultado.bairro,
              cidade: resultado.localidade,
              estado: resultado.uf
          }
      } catch (erro) {
          throw {
              message: `[EnderecoService]->buscarPorCep: Erro ao buscar endereço por CEP: ${erro.message}`,
              mensagemCliente: erro.mensagemCliente || "Erro ao buscar endereço"
          }
      }
  }
}

export default EnderecoService