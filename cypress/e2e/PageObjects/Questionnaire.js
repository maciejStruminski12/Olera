export class Questionnaire{
    answer(answer){
        return cy.get('div').contains(answer)
    }
    getNextButton(){
        return cy.get('div').contains('Next')
    }
    getFinnishButton(){
        return cy.get('button').contains('Finish')
    }
}