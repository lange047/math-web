import { useState } from 'react';

function App() {

  const [numeroUm, alterarNumeroUm] = useState('');
  const [numeroDois, alterarNumeroDois] = useState('');
  const [resultadoConta, alterarResultado] = useState('');

  async function realizarOperacao(tipo) {

    if (numeroUm === '' || numeroDois === '') {
      alterarResultado('Digite os números');
      return;
    }

    try {

      const resposta = await fetch(
        `http://localhost:8080/${tipo}?a=${numeroUm}&b=${numeroDois}`
      );

      const dados = await resposta.json();

      alterarResultado(dados.result);

    } catch {

      alterarResultado('Erro na conexão');

    }

  }

  return (

    <div style={estilos.fundo}>

      <div style={estilos.calculadora}>

        <h1 style={estilos.titulo}>
          Calculadora Web
        </h1>

        <input
          type="number"
          placeholder="Primeiro valor"
          value={numeroUm}
          onChange={(e) => alterarNumeroUm(e.target.value)}
          style={estilos.input}
        />

        <input
          type="number"
          placeholder="Segundo valor"
          value={numeroDois}
          onChange={(e) => alterarNumeroDois(e.target.value)}
          style={estilos.input}
        />

        <div style={estilos.areaBotoes}>

          <button
            style={estilos.botao}
            onClick={() => realizarOperacao('soma')}
          >
            +
          </button>

          <button
            style={estilos.botao}
            onClick={() => realizarOperacao('subtracao')}
          >
            -
          </button>

          <button
            style={estilos.botao}
            onClick={() => realizarOperacao('multiplicacao')}
          >
            ×
          </button>

          <button
            style={estilos.botao}
            onClick={() => realizarOperacao('divisao')}
          >
            ÷
          </button>

        </div>

        <div style={estilos.resultado}>
          Resultado: {resultadoConta}
        </div>

      </div>

    </div>

  );

}

const estilos = {

  fundo: {
    background: '#0f172a',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  calculadora: {
    width: '350px',
    background: '#1e293b',
    padding: '30px',
    borderRadius: '12px'
  },

  titulo: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '20px'
  },

  input: {
    width: '100%',
    height: '45px',
    marginBottom: '15px',
    border: 'none',
    borderRadius: '8px',
    paddingLeft: '10px'
  },

  areaBotoes: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px'
  },

  botao: {
    height: '45px',
    border: 'none',
    borderRadius: '8px',
    background: '#2563eb',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px'
  },

  resultado: {
    marginTop: '20px',
    background: '#111827',
    color: 'white',
    height: '50px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

};

export default App;