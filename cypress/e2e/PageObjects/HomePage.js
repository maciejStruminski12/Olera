export class HomePage{
    getTopBar_Dropdown(){
        return cy.contains('QA Test')
    }
    getLogoutButton(){
        return cy.get('li > a').contains('Logout')
    }
    getTopBar_LoginButton(){
        return cy.get('li > a').contains('Login')
    }
    getGetStartedButton(){
        return cy.get('a').contains('Get started')
    }
    getTopBar_LearnButton(){
        return cy.get('a').contains('Learn')
    }
    getTopBar_CarePlanButton(){
        return cy.get('li > a').contains('Care plan')
    }
    getBrowseNowButton(){
        return cy.get('a').contains('Browse now')
    }
}