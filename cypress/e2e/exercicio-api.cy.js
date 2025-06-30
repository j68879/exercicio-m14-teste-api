/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it.only('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
                return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    //TODO: 
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    //TODO: 
  });

  it('Deve validar um usuário com email inválido', () => {
    //TODO: 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    //TODO: 
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
  });


});
