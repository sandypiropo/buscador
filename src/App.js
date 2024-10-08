import { useState } from 'react';
import {FaSearchLocation} from 'react-icons/fa';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    
    if(input === ''){
      alert("Preencha com o cep desejado");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      //console.log(response.data);
      setCep(response.data);
      setInput("");

    } catch {
      alert("Erro ao buscar")
      setInput("");
    }
  }

  return (
    
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite o CEP desejado..."
        value={input}
        onChange={(event) => setInput(event.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FaSearchLocation size={28} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
