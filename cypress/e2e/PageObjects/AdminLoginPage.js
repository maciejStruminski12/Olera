export class AdminLoginPage {
    
    getEmail(){
        return cy.get('#user_email')
        }
    getPassword(){
        return cy.get('#user_password')
        }
    getSubmitButton(){
        return cy.get('input[name=commit]')
        }
    getForgotPasswordLink(){
        return cy.get('[href="/users/password/new"]')
        }
    getEmailConfirmationLink(){
        return cy.get('[href="/users/confirmation/new"]')
        }
    validateAlert(text){
        cy.get('.alert').should('have.text',text)
        }
    validatePageTitle(text){
        cy.get('h2').should('have.text',text)
    }
}