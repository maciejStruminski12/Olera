/// <reference types="cypress" />

import { HomePage } from "../PageObjects/HomePage"
import { SignInPage } from "../PageObjects/SignInPage"

const signIn = new SignInPage()
const home = new HomePage()


describe('first front test', () => {
    const usermail = Cypress.env('userEmail')
    const password = Cypress.env('password')
    beforeEach(() => {
        cy.visit('/sign-in') 
        
    })
    
    it('1.1.1 unregistered email', () => {
        signIn.getEmail().type('qatest+wrongmail@xfive.co')
        signIn.getPassword().type(password)
        signIn.getSubmitButton().click()
        signIn.getValidation().should('have.text','Invalid Email or password.')
        })
    it('1.1.1 successful login', () => {
        signIn.getEmail().type(usermail)
        signIn.getPassword().type(password)
       
        cy.intercept({
            method: 'POST',
            url: 'https://staging-api.olera.care/users/sign_in',
            }).as('signInCheck')
        signIn.getSubmitButton().click()
        cy. wait('@signInCheck')
        cy.url().should('eq',Cypress.config().baseUrl)
        home.getTopBar_Dropdown().click()
        home.getLogoutButton().click()
        cy.wait(1000)
        home.getTopBar_LoginButton().should('exist')
        })
    


})
