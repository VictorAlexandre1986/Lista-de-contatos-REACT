import React, {useState, useRef, useEffect} from 'react'

import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faList, faTrash } from '@fortawesome/free-solid-svg-icons'

import ListaContatos from './components/ListaContatos'

import {v4 as uuid} from 'uuid';



function App() {

  const inputNomeRef = useRef()


  const [contato, setContato] = useState(()=>{
    return{
      id:"",
      nome:'',
      telefone:''
    } 
  })


  // carregar lista de contatos do localStorage caso nao exista cria uma lista de contato 
  const [listaContatos, setListaContatos] = useState(() => {
    if (localStorage.getItem('meus_contatos') !== null) {
      return JSON.parse(localStorage.getItem('meus_contatos'));
    } else {
      return [];
    }
  });

  function definirNome(event){
    setContato({...contato, nome: event.target.value})
  }

  function definirTelefone(event){
    setContato({...contato, telefone: event.target.value})
  }

  function Confirmar(event){
    const teclaPressionada = event.code 
    if (teclaPressionada === 'Enter'){
      salvarContato()
    }
  }

  function salvarContato(){

    //Validar campos
    if(contato.nome === '' || contato.telefone === ''){
      return
    }

    //Verificar se existi duplicado
    const duplicado = listaContatos.find((ct)=>{
      return ct.nome === contato.nome && ct.telefone === contato.telefone
    })

    if(typeof duplicado === 'undefined'){
      //Adicionar novo contato na lista de contatos
      setListaContatos([...listaContatos, {...contato, id: uuid()}])
      
    }else{
      alert('Contato ja existe!')
    }
  
    //Limpar inputs
    setContato({nome:'', telefone:''})

    //Dar o focus ao nome
    inputNomeRef.current.focus()

  }

  function limparStorage(){
    setListaContatos([])
  }


  //persistencia
  //atualizar a lista de  contatos no localStorage
  useEffect(()=>{
      localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
  }, [listaContatos])


  //remover um contato pelo id
  function removerContato(id){
    let tmp = listaContatos.filter(ct => ct.id !== id)
    setListaContatos(tmp)
  }
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col text-center'>
            <h2 className='text-center'> <FontAwesomeIcon icon={faList} /> Cadastrar contatos</h2>
          </div>
        </div>
      </div>

      <hr/>

      <div className='entradas'>
        <label htmlFor='nome'>Nome:  </label>
        <input ref={inputNomeRef} className="m-2" type="text" onChange={definirNome} value={contato.nome} name='nome'/>

        <label htmlFor='telefone'>Telefone:  </label>
        <input className="m-2" type="cel" onChange={definirTelefone} onKeyUp={Confirmar} value={contato.telefone}/>
      </div>

      <div className='painelBotoes'>
        <button className="btn btn-outline-dark m-2" onClick={salvarContato}>
        <FontAwesomeIcon icon={faCirclePlus} />Salvar</button>
        <button className="btn btn-outline-danger m-2"  onClick={limparStorage}>
        <FontAwesomeIcon icon={faTrash} /> Limpar</button>
      </div>

      <hr/>
      
      <div className='container'>
        <div className='row'>
          <div className='col text-center'>
            <h2 className='text-center'>Minha lista de contatos</h2>
          </div>
        </div>
      </div>
      <hr/>
      <ListaContatos listaContatos={listaContatos} remover={removerContato}/>
    </>
  )
}

export default App
