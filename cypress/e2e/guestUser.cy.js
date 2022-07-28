/// <reference types="cypress" />

import { HomePage } from "./PageObjects/HomePage"

const home = new HomePage()

beforeEach(() => {
    cy.visit('/')
})

describe('guest user tests', () => { 
    it('1.1.1 Homepage', () => {

        home.getTopBar_LoginButton().should('exist')
        cy.get('input').should('have.length',2).within((el)=>{
            cy.get(el[0]).should('have.attr','placeholder','Zip Code')
            cy.get(el[1]).should('have.attr','placeholder','Enter your email')
        })
        home.getGetStartedButton().should('be.visible')
    })
    it('1.1.2 Learn', () => {
        home.getTopBar_LearnButton().click()
        cy.url().should('eq',Cypress.config().baseUrl+'learn')
        //add stub for leaar materials and evaluate filters
    })   
      
})