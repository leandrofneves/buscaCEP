import React, {useState} from 'react';
import { MDBInputGroup, MDBBtn } from 'mdb-react-ui-kit';
import InputMask from 'react-input-mask';
import { FiSearch } from "react-icons/fi";
import api from './services/api';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './style/index.css';

export default function App() {
  const [input, setInput] = useState('');
  const [CEP, setCEP] = useState('');

  async function handleSearch() {
    const cep = input.replace(/-/g, '');

    if(cep === ''){
      alert('Informe o CEP');
      return;
    }

    try {
      // 01001000/json/
      const response = await api.get(`${cep}/json/`)
      setCEP(response.data);
      setInput('');
    } catch (error) {
      alert('Erro ao buscar dados');
      setInput('');
    }
  }

  return (
    <div>
      <h4>Busca CEP</h4>
      <div className='container'>
        <div className='containerInput'>
          <InputMask mask="99999-999" maskPlaceholder={null}  value={input} onChange={(e) => setInput(e.target.value)}>
            {() => (
            <MDBInputGroup className='mb-3'>
              <input className='form-control' placeholder="Informe o CEP" type='text'/>
              <MDBBtn outline onClick={handleSearch}><FiSearch size={15}/></MDBBtn>
            </MDBInputGroup>
            )}
          </InputMask>
        </div>
      </div>
      <main className='main'>
        <h5>{CEP.cep}</h5>
        <span>{CEP.logradouro} {CEP.complemento}</span>
        <span>{CEP.bairro}</span>
        <span>{CEP.localidade} {CEP.uf}</span>
      </main>
    </div>
  );
}