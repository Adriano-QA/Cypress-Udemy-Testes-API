/// <reference types="cypress"/>

describe('Should test at a functional level', () => {

    let token
    before(() => {
        cy.getToken('teste@qaadriano.com.br', 'qaadriano')
            .then(tkn => {
                token = tkn
            })

    })

    beforeEach(() => {
        cy.resetRest()

    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta via REST'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via REST')
        })
    })

    it('Should update an account', () => {
        cy.request({
            method: 'GET',
            url: 'contas/',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `/contas/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'Conta alterada vis REST'
                }
            }).as('response')
        })

        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Should not create an account with same name', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create a transaction', () => {


    })

    it('Should get a balance', () => {



    })

    it('Should remove a transaction', () => {


    })

});