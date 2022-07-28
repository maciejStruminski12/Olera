export class SignInPage{
    
    getEmail(){
        return cy.get('#signin-email')
    }
    getPassword(){
        return cy.get('#signin-password')
    }
    getSubmitButton(){
        return cy.get('button[type="submit"]').contains('Sign In')
    }
    getValidation(){
        return cy.get('form p')
    }
}