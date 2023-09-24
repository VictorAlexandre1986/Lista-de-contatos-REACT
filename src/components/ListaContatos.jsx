import React from 'react'
import './ListContatos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/free-solid-svg-icons'

const ListaContatos = ({listaContatos, remover}) => {
  return (
    <div>
        <ul>
            {listaContatos.map((contato)=>{
                return <li key={contato.id}>{"Nome: " + contato.nome + " | Telefone: " + contato.telefone + "    "} 
                       <button className="btn btn-outline-danger ml-5" onClick={() =>{remover(contato.id)}}><FontAwesomeIcon icon={faTrash} /></button></li>
            })}
        </ul>
    </div>
  )
}

export default ListaContatos