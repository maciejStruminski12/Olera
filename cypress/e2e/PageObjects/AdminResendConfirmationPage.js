export class ResendConfirmationPage {
  
    getEmail(){
        return cy.get('#user_email')
    }
    getSubmitButton(){
        return cy.get('input[name=commit]')
        }
    validateNotice(text){
        cy.get('.notice').should('have.text',text)
        }
}