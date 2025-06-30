/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it.only('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
                return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
            method: 'GET',
            url: 'usuarios'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('usuarios')
            expect(response.duration).to.be.lessThan(20)
        })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let usuario = `usuario j01 ${Math.floor(Math.random() * 100000000)}`
    let email = `teste${Math.floor(Math.random() * 1_000_000_000)}@qa.com.br`
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": usuario,
                "email": email,
                "password": "teste",
                "administrador": "true"
            },
            headers: { authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario('user 001', 'teste@qa.com.br', 'teste', 'true')
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Este email já está sendo usado')
            })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
      cy.request('usuarios').then(response => {
            let id = response.body.usuarios[0]._id
            cy.request({
                method: 'PUT', 
                url: `usuarios/${id}`,
                body: 
                {
                    "nome": "usuario Editado",
                    "email": 'teste@qa.com.br',
                    "passowrd": "teste",
                    "administrador": "true"
                  }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
     let usuario = `usuario j01 ${Math.floor(Math.random() * 100000000)}`
        cy.cadastrarUsuario('user 001', 'teste@qa.com.br', 'teste', 'true')
        .then(response => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,
            }).then(response =>{
                expect(response.body.message).to.equal('Registro excluído com sucesso | Nenhum registro excluído')
                expect(response.status).to.equal(200)
            })
        })
  });


});
