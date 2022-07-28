export class CarePlan{
    getTitle(){
        return cy.get('h1').contains('Your personalized dashboard for elder care planning.')
    }
    getResultCategoryName(category){
        return cy.get('h2').contains(category)
    }
}